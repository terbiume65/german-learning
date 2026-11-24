#!/usr/bin/env python3
"""Build English glosses for the German reader glossary.

The existing app data is already Chinese-free, but the first pass translated
the old Chinese glosses. This script re-translates the German headwords
directly to English, which is much more reliable for function words and verb
forms. A small override map fixes grammar terms and names.
"""
import json
import ssl
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEYS = ROOT / "pipeline" / "work" / "glossary_keys.json"
OUT = ROOT / "german-app" / "data" / "glossary-en.js"
CACHE = ROOT / "pipeline" / "work" / "glossary_en_cache.json"

OVERRIDES = {
    "der": "the (masculine)",
    "die": "the (feminine/plural)",
    "das": "the (neuter); this",
    "den": "the (masculine, accusative)",
    "dem": "the (masculine/neuter, dative)",
    "des": "the (masculine/neuter, genitive)",
    "ein": "a/an (masculine/neuter)",
    "eine": "a/an (feminine)",
    "einen": "a/an (masculine, accusative)",
    "einem": "a/an (masculine/neuter, dative)",
    "einer": "a/an (feminine, dative)",
    "kein": "no (masculine/neuter)",
    "keine": "no (feminine/plural)",
    "keinen": "no (masculine, accusative)",
    "keinem": "no (masculine/neuter, dative)",
    "keiner": "no (feminine, dative)",
    "Sie": "you (formal)",
    "ihr": "you (plural); her",
    "uns": "us",
    "euch": "you (plural)",
    "mich": "me (accusative)",
    "dich": "you (accusative)",
    "mir": "me (dative)",
    "dir": "you (dative)",
    "ihm": "him (dative)",
    "ihnen": "them (dative)",
    "sich": "oneself",
    "mein": "my",
    "meine": "my",
    "meinen": "my (masculine, accusative)",
    "dein": "your",
    "deine": "your",
    "sein": "his; to be",
    "seine": "his",
    "ihre": "her/their",
    "unser": "our",
    "unsere": "our",
    "dieser": "this (masculine)",
    "diese": "this (feminine/plural)",
    "dieses": "this (neuter)",
    "diesen": "this (masculine, accusative)",
    "denn": "because",
    "weil": "because",
    "dass": "that",
    "wenn": "if; when",
    "ob": "whether",
    "als": "than; when",
    "wie": "how; like",
    "man": "one; people",
    "doch": "yes, on the contrary",
    "nicht": "not",
    "gern": "gladly; like to",
    "pro": "per",
    "letzt": "last; previous",
    "nächst": "next",
    "passen": "to fit; to suit",
    "passt": "fits; suits",
    "verlieren": "to lose",
    "kaufen": "to buy",
    "üben": "to practice",
    "weinen": "to cry",
    "schauen": "to look",
    "denken": "to think",
    "Lena": "Lena (name)",
    "Studentin": "female student",
    "Geschenk": "gift",
    "Zimt": "cinnamon",
    "Glühwein": "mulled wine",
    "Hamburg": "Hamburg",
    "Berlin": "Berlin",
    "Deutsch": "German",
    "Spaß": "fun",
    "Stück": "piece",
    "Euro": "euro",
    "Museum": "museum",
    "Markt": "market",
    "Monat": "month",
    "Grammatik": "grammar",
    "Ausflug": "outing; trip",
    "Grüße": "greetings",
    "Angst": "fear",
    "Geschichte": "story",
    "leuchten": "to shine",
    "lächeln": "to smile",
    "Stern": "star",
    "Erde": "earth",
    "Mädchen": "girl",
    "Himmel": "sky",
    "stressig": "stressful",
    "pünktlich": "on time; punctual",
    "lecker": "delicious",
    "nachts": "at night",
    "vielleicht": "perhaps; maybe",
    "zufrieden": "satisfied",
    "glücklich": "happy",
    "Café": "café",
    "Wörter": "words",
    "Bücher": "books",
    "Hände": "hands",
    "waschen": "to wash",
    "wäscht": "washes",
    "Komm": "come (imperative)",
    "her": "here; over here",
    "Park": "park",
    "Recht": "right; reason",
    "spannend": "exciting; suspenseful",
    "Supermarkt": "supermarket",
    "Tom": "Tom (name)",
    "Hallo": "hello",
    "Tschüss": "bye",
    "Uhr": "clock; o'clock",
    "Abend": "evening",
    "Jahr": "year",
    "Woche": "week",
    "Tag": "day",
    "Nacht": "night",
    "Zeit": "time",
    "Licht": "light",
    "Stadt": "city",
    "Übung": "exercise",
    "Baum": "tree",
    "Lichter": "lights",
    "gut": "good",
    "neu": "new",
    "alt": "old",
    "groß": "big",
    "klein": "small",
    "schön": "beautiful",
    "schnell": "fast",
    "langsam": "slow",
    "leicht": "easy; light",
    "schwer": "difficult; heavy",
    "richtig": "correct",
    "falsch": "wrong",
    "müde": "tired",
    "hell": "bright",
    "frei": "free; available",
    "bequem": "comfortable",
    "beste": "best",
    "backen": "to bake",
    "gebacken": "baked",
    "Hand": "hand",
    "Lehrerin": "female teacher",
    "macht": "does; makes",
    "freut": "is happy; pleases",
    "trifft": "meets",
    "erklärt": "explains; explained",
    "besucht": "visits; visited",
    "aufstehen": "to get up",
    "einkaufen": "to shop",
    "anrufen": "to call",
    "mag": "likes",
    "möchte": "would like",
    "freuen": "to be happy; to look forward to",
    "treffen": "to meet",
    "erklären": "to explain",
    "besuchen": "to visit",
}


def translate(keys):
    cache = json.loads(CACHE.read_text(encoding="utf-8")) if CACHE.exists() else {}
    todo = [k for k in keys if k not in cache]
    for i in range(0, len(todo), 20):
        batch = todo[i : i + 20]
        params = [("client", "dict-chrome-ex"), ("sl", "de"), ("tl", "en")]
        params += [("q", k) for k in batch]
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
                for key, value in zip(batch, values):
                    cache[key] = value if isinstance(value, str) else ""
                break
            except Exception as exc:  # noqa: BLE001
                print("batch failed", exc, attempt + 1)
                time.sleep(1.5 * (attempt + 1))
        else:
            for key in batch:
                cache.setdefault(key, key)
        time.sleep(0.1)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=1), encoding="utf-8")
    return cache


def main():
    keys = json.loads(KEYS.read_text(encoding="utf-8"))
    cache = translate(keys)
    glosses = {}
    for key in keys:
        gloss = OVERRIDES.get(key) or cache.get(key) or key
        glosses[key] = gloss.strip() or key
    body = json.dumps(glosses, ensure_ascii=False, indent=2)
    OUT.write_text(
        "/* English glosses for the reader vocabulary hover cards. */\n"
        "window.GRAMMAR_GLOSSARY_EN = " + body + ";\n"
        "(function () {\n"
        "  var glossary = window.GRAMMAR_GLOSSARY || {};\n"
        "  Object.keys(window.GRAMMAR_GLOSSARY_EN).forEach(function (key) {\n"
        "    if (glossary[key]) glossary[key].en = window.GRAMMAR_GLOSSARY_EN[key];\n"
        "  });\n"
        "})();\n",
        encoding="utf-8",
    )
    print("wrote", OUT, len(glosses), "glosses")


if __name__ == "__main__":
    main()
