# German Learning

A self-contained German A1 study project: vocabulary deck, visual A1–A2 grammar course, graded reader and a Christmas market reward system.

## Contents

| Folder | What it is |
| --- | --- |
| `german-app/` | The local web app. Open `german-app/index.html` through a server. |
| `data/` | Generated A1 deck (`a1_vocab.json`, `a1_vocab.csv`), the structured source (`anki_notes.jsonl`), and the translation cache. |
| `pipeline/` | Deck and audio builders: `build_deck.py`, `export_speech.js` and `build_audio.py`. |
| `source/` | The official Goethe A1 word list PDF and the visual grammar reference PDF. |

## Run

```bash
cd german-app
python3 serve.py
# http://127.0.0.1:8766/
```

On macOS, `german-app/start.command` does the same.

## Rebuild the vocabulary deck

```bash
python3 pipeline/build_deck.py
```

This writes `data/a1_vocab.json`, `data/a1_vocab.csv` and `german-app/data/vocab.js`. Hand-written corrections live in `pipeline/build_deck.py` under `MANUAL_ZH` and `MANUAL_EXAMPLES`.

## Rebuild the audio pack

```bash
node pipeline/export_speech.js
pipeline/.venv/bin/python pipeline/build_audio.py
```

The app includes pre-generated Tanja neural MP3s, so this is only needed after changing vocabulary, grammar examples or reader lines.

See `german-app/README.md` for the feature guide, grammar scope, reader markup and market economy.
