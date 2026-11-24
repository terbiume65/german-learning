#!/usr/bin/env python3
"""One-off migration for the German app: replace the Chinese translation
strings in grammar-de.js and reader-de.js with English.

The translations are cached in pipeline/work/zh_en_cache.json. The script
keeps the existing data schema; it only replaces string values.
"""
import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP_DATA = ROOT / "german-app" / "data"
CACHE = ROOT / "pipeline" / "work" / "zh_en_cache.json"
FILES = [APP_DATA / "grammar-de.js", APP_DATA / "reader-de.js"]
HAN = re.compile(r'"([^"\n]*[\u4e00-\u9fff][^"\n]*)"')


def translate(texts):
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    todo = [t for t in dict.fromkeys(texts) if t and t not in cache]
    print("translating", len(todo), "strings")
    for i in range(0, len(todo), 20):
        batch = todo[i : i + 20]
        params = [("client", "dict-chrome-ex"), ("sl", "zh-CN"), ("tl", "en")]
        params += [("q", t) for t in batch]
        url = "https://clients5.google.com/translate_a/t?" + urllib.parse.urlencode(params)
        for attempt in range(4):
            try:
                with urllib.request.urlopen(
                    url, timeout=30, context=ssl._create_unverified_context()
                ) as response:
                    values = json.load(response)
                if not isinstance(values, list):
                    values = [values]
                while len(values) < len(batch):
                    values.append("")
                for text, value in zip(batch, values):
                    cache[text] = value if isinstance(value, str) else ""
                break
            except Exception as exc:  # noqa: BLE001
                print("batch failed", exc, "attempt", attempt + 1)
                time.sleep(1.5 * (attempt + 1))
        else:
            for text in batch:
                cache.setdefault(text, "")
        time.sleep(0.1)
        if i % 100 == 0:
            print("progress", i, "/", len(todo), flush=True)
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
    return cache


def main():
    strings = []
    for path in FILES:
        strings.extend(HAN.findall(path.read_text(encoding="utf-8")))
    cache = translate(strings)
    for path in FILES:
        source = path.read_text(encoding="utf-8")

        def repl(match):
            original = match.group(1)
            english = cache.get(original, "").strip() or original
            return json.dumps(english, ensure_ascii=False)

        path.write_text(HAN.sub(repl, source), encoding="utf-8")
        left = HAN.findall(path.read_text(encoding="utf-8"))
        print(path.name, "remaining Chinese strings", len(left))
        if left:
            print(left[:5])


if __name__ == "__main__":
    main()
