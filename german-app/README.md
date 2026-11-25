# Deutsch — Learn German

A small, local-first German learning app built on the Goethe-Zertifikat A1 word list, with a visual A1–A2 grammar path, a graded reader, a daily-life dictation mode and a Christmas market that grows as you study.

The interface, vocabulary meanings, example translations, grammar notes and reader translations are all in English. Progress stays in the browser.

## Run it

```bash
cd german-learning/german-app
python3 serve.py
# open http://127.0.0.1:8766/
```

On macOS you can double-click `start.command`. It starts the same server and opens the app on port **8766**.

The app itself is static. The fixed German speech is pre-generated and checked in, so playback needs no API key or external service at runtime.

## What is inside

- **804 A1 vocabulary cards** from the official Goethe A1 word list, with articles, gender, plural forms, part of speech, an English meaning and an example sentence with an English translation.
- **FSRS scheduling** for long-term retention. Recognition (German → English) and recall (English → German) have separate schedules.
- After **Show answer**, only **Again** and **Hard** are offered. Choose **I know it · test me** if you want Good/Easy to be earned through a quiz answer.
- **28 visual grammar lessons** in 7 units, covering a curated A1–A2 core path: gender and articles, plurals, the present tense, cases, negation, questions, possessives, adjective endings, modals, separable verbs, the imperative, reflexives, the dative, prepositions, the perfect tense, word order, subordinate and relative clauses, comparison, the future and Konjunktiv II.
- **Original grammar diagrams**: gender columns, case tables, verb grids, sentence flows, two-way preposition diagrams, timelines and comparison bars. Many elements are tappable.
- **9 original graded reader texts** from first introductions to longer stories, with hover/tap glosses, English translation on demand, line-by-line and whole-text recorded German audio, new-word lists and grammar links.
- **Dictation mode**: 821 recorded daily sentences (771 vocabulary examples and 50 daily phrases) plus a daily-life generator with thousands of combinations. Hear a sentence, type it, and get a word-level diff, an English hint on request, and Taler/visitors/streak progress.
- **Recorded neural German audio**: 2,487 short clips generated with the `de-DE-TanjaNeural` voice cover every word, example, grammar sentence, reader line and dictation phrase. Playback is consistent across browsers and devices.
- **Browser voice fallback** for any text without a recorded clip, with a voice picker in Settings. Installed Premium/Enhanced voices are preferred and novelty voices are ranked last.
- **Weihnachtsmarkt management sim**: reviews attract visitors; visitors queue at the market. Serve the queue, consume supplies, earn Taler and reputation, then buy and upgrade stalls and premium attractions. Completing a grammar unit earns a star; stars plus Taler synthesize permanent study charms for the market wall.
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

The deck emits English meanings and example translations; the source already provides English glosses. Hand-written example overrides live in `MANUAL_EXAMPLES` inside `pipeline/build_deck.py`. The deck contains a few official subentries and variants, which is why the count is higher than the round “circa 650” figure in the PDF.

## Audio

The app ships with pre-generated MP3s rather than relying on the visitor's system voice. The voice is **Tanja**, a German neural voice. Files live in `german-app/audio/text/`; `german-app/data/speech.js` maps each normalized text to its clip.

Rebuild the audio pack after changing vocabulary, grammar examples, reader lines or dictation phrases:

```bash
cd german-learning
node pipeline/export_speech.js
pipeline/.venv/bin/python pipeline/build_audio.py
```

If the virtual environment does not exist yet:

```bash
python3 -m venv pipeline/.venv
pipeline/.venv/bin/pip install -r pipeline/requirements-audio.txt
```

The generator is resumable and skips existing clips. It needs network access while generating; the finished app does not. Any string missing from the manifest falls back to the browser's `de-DE` voice.

## Cloud sync

Optional Supabase sync keeps progress together across devices.

- Sign in from **Settings → Cloud sync** with an email and password.
- Each account gets one row per app in `public.app_progress`, protected by row-level security.
- The app pulls and merges on start/focus, and pushes about a second after each change.
- Cloud sync is optional; when signed out, everything still runs locally.

Merge rules are deliberately conservative:

- vocabulary/reverse cards: keep the state with the latest review
- grammar and reading: union completed items, keep the best score
- daily stats: keep the higher count per day
- café items, charms and grammar stars: union
- café currency/streak: keep the higher value

The backend is a free Supabase project. The public project URL and publishable key live in `js/sync-config.js`; the table policy is in `supabase/schema.sql`. Email confirmation is enabled. After creating your own account, disable new sign-ups in Supabase if you want the project private to you. Free Supabase projects pause after a week of inactivity and can be restored from the dashboard.

## Word building

Selected cards show an interactive **Word building** panel on the answer side. It splits a word into prefixes, roots, suffixes, compounds and linking sounds, with a short English note for each part. Tap a coloured part to highlight it and see its explanation.

The breakdowns live in `data/word-parts.js`. They focus on separable verbs and transparent compounds, such as:

- `Anrufbeantworter` → An + ruf + be + antwort + er
- `Reisebüro` → Reise + Büro
- `Hausfrau` → Haus + Frau
- `ausziehen` → aus + zieh + en
- `Fahrkarte` → Fahr + Karte
- `Wohnung` → wohn + ung

There are 130+ curated breakdowns plus automatic detection for common suffixes such as `-ung`, `-in`, `-chen`, `-lich`, `-isch`, `-heit` and `-keit`.

## Grammar

`german-app/data/grammar-de.js` contains the 28 lessons. Each lesson has:

- a short explanation and formation patterns,
- two example sentences with English translations,
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

The market is a small management loop, not just a shop.

- A correct review earns **+1 Taler**.
- Every card attracts **+1 visitor**; a new card adds another visitor.
- The first review of the day adds **+5 visitors**; reaching the daily goal adds **+10 visitors**.
- Visitors wait in the market until you **serve the queue**.
- Serving consumes **supplies** and pays Taler based on your stalls and upgrades. Missed visitors are lost.
- **Reputation** comes from serving visitors and unlocks market levels, upgrades and premium attractions.
- Buy supplies in packs of 25 for 40 Taler. The stockroom capacity grows with stalls and upgrades.

There are 12 original stalls and attractions plus three premium late-game additions:

- Ice rink (reputation level 8)
- Market stage (reputation level 10)
- Christmas train (reputation level 12)

Each can be upgraded to level 5. Upgrades increase market income, stock capacity and the scene’s visual glow. Existing Taler and purchases are preserved for returning players.

Completing a grammar lesson gives **+10 Taler**; completing a whole unit gives **+1 grammar star**. Stars and Taler synthesize five permanent charms: Case Star, Verb Bell, Sentence Star, Preposition Lantern and Sound Angel.

## Dictation

Dictation trains listening and sentence-level comprehension without adding new FSRS cards.

- Each session mixes recorded vocabulary examples with generated daily-life sentences.
- Playback uses the recorded Tanja clip when the sentence has one; otherwise the browser's German voice reads it.
- Typing is checked tolerantly: capitalisation, punctuation, hyphens and `ae/oe/ue/ss` for umlauts are accepted. A word-level diff highlights missing or extra words.
- An English hint can be revealed before checking. Hinted attempts still count as correct but not as “clean”.
- Rewards: **+1 Taler** for a correct sentence; **+1 market visitor** for every checked sentence, plus **+1 extra** for a clean, unhinted answer. Attempts also keep the daily streak alive and are saved in dictation accuracy/best-streak stats.
- Session lengths are 5, 10 or 20 sentences. Recent attempts are stored locally and merged through cloud sync.

The recorded core is created from the 771 vocabulary examples that already have Tanja audio plus the 50 phrases in `DICTATION_DATA.fixed`. Generated combinations use the curated chunks in `data/dictation-data.js`; add a phrase to `fixed` and rebuild the audio pack to make it recorded:

```bash
cd german-learning
node pipeline/export_speech.js
pipeline/.venv/bin/python pipeline/build_audio.py
```

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell and script order |
| `css/styles.css` | Design system, visual grammar, market scene |
| `js/app.js` | Routing, study sessions, dictation UI, grammar, reader, glosses, TTS, UI |
| `js/data.js` | Deck helpers, search, multiple-choice generation, recorded-audio lookup, TTS fallback |
| `js/store.js` | Local progress, FSRS state, streaks, dictation stats, Taler, stars, export/import |
| `js/sync.js` | Optional Supabase sign-in, merge and push/pull |
| `js/sync-config.js` | Supabase project URL, publishable key and app id |
| `supabase/schema.sql` | Progress table and row-level security policy |
| `js/fsrs.js` | FSRS scheduler |
| `js/cafe.js` | Market catalog, charms and SVG scene |
| `js/dictation.js` | Daily-life sentence generator, session builder and tolerant checker |
| `data/vocab.js` | Generated 804-card deck |
| `data/grammar-de.js` | 28 visual grammar lessons |
| `data/reader-de.js` | 9 graded texts, glossary and levels |
| `data/glossary-en.js` | English glosses for the reader hover cards |
| `data/word-parts.js` | Interactive word-building breakdowns |
| `data/dictation-data.js` | Curated dictation lexicon, daily phrases and grammar chunks |
| `data/speech.js` | Generated text → MP3 manifest |
| `audio/text/` | 2,487 recorded neural German clips |
| `pipeline/export_speech.js` | Collects the fixed strings that need audio |
| `pipeline/build_audio.py` | Generates the MP3 pack and `speech.js` |

## Notes

- Progress is stored under the localStorage key `deutsch-a1-v1`.
- **Settings → Reset all progress** clears the deck, grammar, reader and market while keeping the app installed.
- Export produces `deutsch-a1-progress.json`; import accepts that file.
- Recorded audio works without a German system voice. The browser voice picker is only a fallback for strings that have no clip.
- The audio pack adds roughly 38 MB to the app; it is still well under the GitHub Pages 1 GB site limit.
- The market and charms are cosmetic and never change scheduling or review load.
