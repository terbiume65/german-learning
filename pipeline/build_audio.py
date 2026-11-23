#!/usr/bin/env python3
"""Generate the fixed German speech pack with a neural voice.

The app speaks thousands of short, stable strings: vocabulary, examples,
grammar examples and reader lines. Generating them once gives a consistent,
natural voice on every browser and removes the dependence on the visitor's
installed system voices.

Usage:
    python3 pipeline/export_speech.js
    pipeline/.venv/bin/python pipeline/build_audio.py

The script is resumable: existing non-empty MP3s are skipped. It writes
german-app/data/speech.js, mapping each normalized string to its MP3.
"""
import asyncio
import hashlib
import json
import os
import random
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
TEXT_PATH = ROOT / "pipeline" / "work" / "speech_texts.json"
OUT_DIR = ROOT / "german-app" / "audio" / "text"
MANIFEST_PATH = ROOT / "german-app" / "data" / "speech.js"
VOICE = "de-DE-TanjaNeural"
CONCURRENCY = 4
MIN_BYTES = 600


def audio_name(text):
    return hashlib.sha1(text.encode("utf-8")).hexdigest() + ".mp3"


async def generate_one(text, sem, counters, total):
    path = OUT_DIR / audio_name(text)
    if path.exists() and path.stat().st_size >= MIN_BYTES:
        counters["done"] += 1
        return
    async with sem:
        last_error = ""
        for attempt in range(5):
            tmp = path.with_suffix(".part")
            try:
                communicate = edge_tts.Communicate(text, VOICE)
                await communicate.save(str(tmp))
                if tmp.exists() and tmp.stat().st_size >= MIN_BYTES:
                    tmp.replace(path)
                    counters["done"] += 1
                    if counters["done"] % 50 == 0:
                        print(
                            f"{counters['done']} / {total} clips "
                            f"({counters['failed']} failed)",
                            flush=True,
                        )
                    return
                if tmp.exists():
                    tmp.unlink()
                last_error = "empty audio"
            except Exception as exc:  # noqa: BLE001 - network/API errors vary
                last_error = str(exc)
                if tmp.exists():
                    tmp.unlink()
            if attempt < 4:
                await asyncio.sleep(1.5 * (attempt + 1) + random.random())
        counters["failed"] += 1
        counters["errors"].append({"text": text, "error": last_error})
        print("failed:", text, "|", last_error, file=sys.stderr, flush=True)

async def worker(queue, sem, counters, total):
    while True:
        try:
            text = queue.get_nowait()
        except asyncio.QueueEmpty:
            return
        await generate_one(text, sem, counters, total)


async def main():
    if not TEXT_PATH.exists():
        raise SystemExit(
            "Missing pipeline/work/speech_texts.json. Run `node pipeline/export_speech.js` first."
        )
    data = json.loads(TEXT_PATH.read_text(encoding="utf-8"))
    texts = [t for t in data.get("texts", []) if t.strip()]
    total = len(texts)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    queue = asyncio.Queue()
    for text in texts:
        queue.put_nowait(text)
    sem = asyncio.Semaphore(CONCURRENCY)
    counters = {"done": 0, "failed": 0, "errors": []}
    print(f"generating {total} clips with {VOICE}", flush=True)
    workers = [
        asyncio.create_task(worker(queue, sem, counters, total))
        for _ in range(CONCURRENCY)
    ]
    await asyncio.gather(*workers)

    mapping = {}
    for text in texts:
        path = OUT_DIR / audio_name(text)
        if path.exists() and path.stat().st_size >= MIN_BYTES:
            mapping[text] = "audio/text/" + path.name
    manifest = {
        "voice": VOICE,
        "count": len(mapping),
        "files": mapping,
    }
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(
        "window.SPEECH_AUDIO = "
        + json.dumps(mapping, ensure_ascii=False, separators=(",", ":"))
        + ";\nwindow.SPEECH_INFO = "
        + json.dumps(
            {"voice": VOICE, "count": len(mapping)}, ensure_ascii=False
        )
        + ";\n",
        encoding="utf-8",
    )
    print(
        f"wrote {len(mapping)} / {total} clips, {counters['failed']} failed; "
        f"manifest {MANIFEST_PATH.relative_to(ROOT)}",
        flush=True,
    )
    if counters["failed"]:
        err_path = ROOT / "pipeline" / "work" / "audio_errors.json"
        err_path.write_text(
            json.dumps(counters["errors"], ensure_ascii=False, indent=1),
            encoding="utf-8",
        )
        print(f"errors written to {err_path.relative_to(ROOT)}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
