# Deutsch — Learn German

A small, local-first German learning app built on the Goethe-Zertifikat A1 word list, with a visual A1–A2 grammar path, a graded reader and a Christmas market that grows as you study.

The interface is in English; meanings, translations and grammar explanations are in Simplified Chinese. Progress stays in the browser.

## Run it

```bash
cd german-learning/german-app
python3 serve.py
# open http://127.0.0.1:8766/
```

On macOS you can double-click `start.command`. It starts the same server and opens the app on port **8766**.

There is no build step and no external service. Open the folder with any static web server if you prefer.

## What is inside

- **804 A1 vocabulary cards** from the official Goethe A1 word list, with articles, gender, plural forms, part of speech, a Chinese meaning and an example sentence with a Chinese translation.
- **FSRS scheduling** for long-term retention. Recognition (German → Chinese) and recall (Chinese → German) have separate schedules.
- **28 visual grammar lessons** in 7 units, covering a curated A1–A2 core path: gender and articles, plurals, the present tense, cases, negation, questions, possessives, adjective endings, modals, separable verbs, the imperative, reflexives, the dative, prepositions, the perfect tense, word order, subordinate and relative clauses, comparison, the future and Konjunktiv II.
- **Original grammar diagrams**: gender columns, case tables, verb grids, sentence flows, two-way preposition diagrams, timelines and comparison bars. Many elements are tappable.
- **9 original graded reader texts** from first introductions to longer stories, with hover/tap glosses, Chinese translation on demand, line-by-line and whole-text German TTS, new-word lists and grammar links.
- **German TTS** through the browser's `de-DE` voice. No audio files are required.
- **Weihnachtsmarkt**: reviews earn Taler; Taler buy wooden stalls, fairy lights, Glühwein, gingerbread, a tree, a carousel and more. Completing a grammar unit earns a star; stars plus Taler synthesize permanent study charms for the market wall.
- **Progress, streaks, forecasts, a searchable word list and local export/import.**

## Vocabulary

The deck is generated from `../data/anki_notes.jsonl`, a structured extraction of the Goethe A1 list. The official PDF in `../source/A1_SD1_Wortliste_02.pdf` is the reference source.

```bash
cd german-learning
python3 pipeline/build_deck.py
```

This rewrites:

- `data/a1_vocab.json` — readable deck
- `data/a1_vocab.csv` — spreadsheet export
- `german-app/data/vocab.js` — what the app loads
- `data/translation_cache.json` — cached machine translations

Hand-written overrides for ambiguous machine translations and the few entries without a natural example live in `MANUAL_ZH` and `MANUAL_EXAMPLES` inside `pipeline/build_deck.py`. The deck contains a few official subentries and variants, which is why the count is higher than the round “circa 650” figure in the PDF.

## Grammar

`german-app/data/grammar-de.js` contains the 28 lessons. Each lesson has:

- a short explanation and formation patterns,
- two example sentences with Chinese translations,
- a visual panel rendered by `renderGrammarVisual()` in `js/app.js`,
- a unit conversation with hoverable words and target patterns,
- three exercises: choose the form, fill the blank and order the sentence.

The scope is A1–A2. The visual language is inspired by *Dieses kleine Buch ist für dich*; the explanations and examples are original.

## Reader

`german-app/data/reader-de.js` contains nine original texts in three levels:

- **Level 1 · Start** — first introductions, daily routine, café
- **Level 2 · Alltag** — weekend trip, lost ticket, Christmas market
- **Level 3 · Geschichten** — a letter home, why I learn German, a short fairy tale

Markup in a line uses `[[surface|w:lemma]]` for vocabulary and `[[surface|g:lesson-id]]` for grammar. `window.GRAMMAR_GLOSSARY` supplies extra high-frequency words and irregular forms so most of each line is hoverable, not only the tagged words.

## Christmas market

- Every review: **+1 Taler**; correct answer: **+1**; new card: **+2**.
- First review of the day: **+5**; daily goal reached: **+15**.
- Completing a grammar lesson: **+10 Taler**; completing a whole unit: **+1 grammar star**.
- Stars and Taler synthesize five permanent charms: Case Star, Verb Bell, Sentence Star, Preposition Lantern and Sound Angel.
- The scene is pure SVG in `js/cafe.js`; it scales cleanly and needs no images.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell and script order |
| `css/styles.css` | Design system, visual grammar, market scene |
| `js/app.js` | Routing, study sessions, grammar, reader, glosses, TTS, UI |
| `js/data.js` | Deck helpers, search, multiple-choice generation, TTS paths |
| `js/store.js` | Local progress, FSRS state, streaks, Taler, stars, export/import |
| `js/fsrs.js` | FSRS scheduler |
| `js/cafe.js` | Market catalog, charms and SVG scene |
| `data/vocab.js` | Generated 804-card deck |
| `data/grammar-de.js` | 28 visual grammar lessons |
| `data/reader-de.js` | 9 graded texts, glossary and levels |

## Notes

- Progress is stored under the localStorage key `deutsch-a1-v1`.
- **Settings → Reset all progress** clears the deck, grammar, reader and market while keeping the app installed.
- Export produces `deutsch-a1-progress.json`; import accepts that file.
- German audio depends on a German voice being installed in the browser/OS. Chrome, Edge and Safari usually provide one.
- The market and charms are cosmetic and never change scheduling or review load.
