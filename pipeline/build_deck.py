#!/usr/bin/env python3
"""Build the German A1 deck from the Goethe A1 list (structured JSONL)."""
import csv
import json
import os
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
APP_DATA = os.path.join(ROOT, "german-app", "data")
SRC = os.path.join(DATA, "anki_notes.jsonl")
CACHE_PATH = os.path.join(DATA, "translation_cache.json")

# A few abbreviations and grammar words that machine translation handles poorly.
MANUAL_ZH = {
    "der, die, das": "定冠词（der/die/das）",
    "ein-": "不定冠词词干（ein-）",
    "kein-": "否定冠词词干（kein-）",
    "mein-": "我的（物主冠词词干）",
    "dein-": "你的（物主冠词词干）",
    "sein-": "他的/它的（物主冠词词干）",
    "ihr-": "她的/他们的（物主冠词词干）",
    "unser-": "我们的（物主冠词词干）",
    "euer": "你们的（物主冠词词干）",
    "dies-": "这个（指示冠词词干）",
    "jed-": "每个（词干）",
    "welch-": "哪个（疑问冠词词干）",
    "all-": "所有（词干）",
    "ander-": "另一个（词干）",
    "best-": "最好的（词干）",
    "letzt-": "最后的（词干）",
    "lieb-": "亲爱的（词干）",
    "meist-": "大多数的（词干）",
    "nächst-": "下一个的（词干）",
    "Feier-": "庆祝（构词成分）",
    "Lieblings-": "最喜欢的（构词成分）",
    "ihr/ihm/ihn": "她/他/它（人称代词）",
    "gern(e)": "喜欢地；乐意",
    "zum Beispiel/z. B.": "例如",
    "Grad (Celsius)": "度（摄氏）",
    "(Kredit)-Karte": "信用卡",
    "usw.": "等等",
    "z. B.": "例如",
    "(ein)hundert": "一百",
    "(ein)tausend": "一千",
    "ein halb; halb": "一半",
    "ein Viertel; Viertel": "四分之一",
    "(sich) ausziehen": "脱下（衣服）；搬出",
    "an sein": "开着；亮着",
    "aus sein": "关着；结束",
    "abholen": "接；取",
    "abgeben": "交出；寄存",
    "Achtung": "注意！小心！",
    "bekommen": "得到；收到",
    "besetzt": "被占用的；有人了",
    "bringen": "带来；拿给",
    "da": "那里；在这里",
    "der": "定冠词（阳性）",
    "die": "定冠词（阴性/复数）",
    "das": "定冠词（中性）；这个",
    "fehlen": "缺席；缺少",
    "Frau": "女士；妻子",
    "gefallen": "使喜欢；合意",
    "gegen": "反对；朝；大约",
    "gehen": "去；走；运转",
    "Gleis": "轨道；站台",
    "glauben": "相信；认为",
    "gleich": "相同的；马上",
    "groß": "大的；高的",
    "halten": "停；拿着；认为",
    "hell": "明亮的",
    "lieb": "亲爱的",
    "lieber": "更喜欢",
    "liegen": "躺；位于",
    "machen": "做；制作",
    "man": "人们（泛指）",
    "nehmen": "拿；取用；乘坐",
    "Ordnung": "秩序；整齐；没问题（in Ordnung）",
    "Platz": "座位；广场",
    "Post": "邮局；邮件",
    "Sehenswürdigkeit": "景点",
    "stehen": "站；位于；写着",
    "Stelle": "位置；工作岗位",
    "stellen": "竖放；放置",
    "tun": "做；干",
    "von": "从；……的",
    "Feuer": "火",
    "leicht": "轻的；容易的",
    "bitten": "请求",
    "bis": "直到",
    "bei": "在……旁；在……家",
    "auf": "在……上面；打开",
    "aus": "从……出来；关着",
    "Auskunft": "信息；咨询处",
    "ausländisch": "外国的",
    "Anrede": "称呼",
    "Ansage": "通知；广播",
    "Apartment": "公寓",
    "aufhören": "停止；结束",
    "einfach": "简单的；单程的",
    "einladen": "邀请",
    "Gespräch": "谈话",
    "Herr": "先生",
    "herzlich": "衷心的；热情的",
    "Information": "信息；咨询处",
    "kein": "没有；不是（否定冠词）",
    "Klasse": "班级；年级",
    "lange": "长的；很久",
    "laufen": "走；跑步；运转",
    "Lebensmittel": "食品",
    "leise": "安静的",
    "nach": "去；在……之后",
    "noch": "还；仍然",
    "Ort": "地方",
    "schlecht": "坏的；不舒服",
    "Schluss": "结束；结尾",
    "schnell": "快的",
    "schön": "美丽的；美好的",
    "so": "这样；所以",
    "Stadt": "城市",
    "Unterricht": "课程；上课",
    "vor": "在……前面",
    "Vormittag": "上午",
    "Vorsicht": "小心",
    "wenig": "少的；不多",
    "wie": "如何；像",
    "wohnen": "居住",
    "Wohnung": "公寓",
    "zu": "去；太（第三格）",
    "über": "在……上方；关于；超过",
    "früher": "以前；较早",
    "wer": "谁",
}

MANUAL_EXAMPLES = {
    "(ein)hundert": {
        "de": "Das Buch kostet einhundert Euro.",
        "zh": "这本书一百欧元。",
        "en": "The book costs one hundred euros.",
    },
    "(ein)tausend": {
        "de": "Die Stadt hat eintausend Einwohner.",
        "zh": "这座城市有一千名居民。",
        "en": "The town has one thousand inhabitants.",
    },
    "ein halb; halb": {
        "de": "Ich möchte ein halbes Kilo Tomaten.",
        "zh": "我想要半公斤西红柿。",
        "en": "I would like half a kilo of tomatoes.",
    },
    "Achtung": {
        "de": "Achtung! Das dürfen Sie nicht tun.",
        "zh": "注意！您不可以那样做。",
        "en": "Careful! You are not allowed to do that.",
    },
}



UMLAUT = {"a": "ä", "o": "ö", "u": "ü", "A": "Ä", "O": "Ö", "U": "Ü"}


def make_umlaut(word):
    # Umlaut the last vowel group. In the diphthong "au" the a takes the
    # umlaut (Haus -> Häuser), while a later vowel still wins in compounds
    # (Aufzug -> Aufzüge, Auskunft -> Auskünfte).
    for i in range(len(word) - 1, -1, -1):
        ch = word[i]
        if ch in UMLAUT:
            if ch == "u" and i > 0 and word[i - 1] in ("a", "A"):
                i -= 1
                ch = word[i]
            return word[:i] + UMLAUT[ch] + word[i + 1:]
    return word


def plural_form(lemma, notation):
    """Turn Goethe dictionary notation such as '-e' or '-ä, er' into a
    readable plural. Unknown or plural-only entries are left blank."""
    raw0 = (notation or "").strip()
    quoted = raw0.startswith('"')
    raw = raw0.strip('"')
    if not raw or raw.startswith("("):
        return ""
    if raw in ("-", "–"):
        return lemma
    raw = raw.lstrip('"').split("/")[0].strip()
    if raw in ("-", "–"):
        return lemma
    if raw.startswith("¨-"):
        raw = "-" + raw[2:]
    if not raw.startswith("-") and raw[0] not in "äöüÄÖÜ":
        # A complete plural form was supplied.
        return raw
    parts = [p.strip() for p in raw.split(",") if p.strip()]
    umlaut = quoted
    ending = ""
    for part in parts:
        marker = part.lstrip("-")
        if marker and marker[0] in "äöüÄÖÜ" and len(marker) == 1:
            umlaut = True
        elif marker:
            ending = marker
    base = make_umlaut(lemma) if umlaut else lemma
    # A notation like '-ä' means umlaut only; '-Ä' needs the same treatment.
    return base + ending

def clean_meaning(text):
    parts = [p.strip() for p in re.split(r"[;；]", text or "") if p.strip()]
    unique = []
    for part in parts:
        if part not in unique:
            unique.append(part)
    return "；".join(unique)


def load_cache():
    if os.path.exists(CACHE_PATH):
        return json.load(open(CACHE_PATH))
    return {}


def translate_many(strings, sl, cache):
    tagged = [(sl + ":" + s, s) for s in dict.fromkeys(strings) if s]
    todo = [(k, s) for k, s in tagged if not cache.get(k)]
    for i in range(0, len(todo), 20):
        batch = todo[i:i + 20]
        params = [("client", "dict-chrome-ex"), ("sl", sl), ("tl", "zh-CN")]
        params += [("q", s) for _, s in batch]
        url = "https://clients5.google.com/translate_a/t?" + urllib.parse.urlencode(params)
        try:
            with urllib.request.urlopen(url, timeout=30, context=ssl._create_unverified_context()) as resp:
                vals = json.load(resp)
            if not isinstance(vals, list):
                vals = [vals]
            while len(vals) < len(batch):
                vals.append("")
            for (key, _), val in zip(batch, vals):
                cache[key] = val if isinstance(val, str) else ""
        except Exception as exc:
            print("translate failed", exc, file=sys.stderr)
            for key, _ in batch:
                cache.setdefault(key, "")
        time.sleep(0.10)
        if (i // 20) % 5 == 0:
            print("translated", i + len(batch), "/", len(todo), flush=True)
    json.dump(cache, open(CACHE_PATH, "w"), ensure_ascii=False, indent=1)
    return cache


def main():
    rows = [json.loads(l) for l in open(SRC) if l.strip()]
    rows = [r for r in rows if r.get("cefr") == "A1"]
    rows.sort(key=lambda r: r["lemma"].lower())
    cache = load_cache()
    meanings = [r["meaning_en"] for r in rows if r["lemma"] not in MANUAL_ZH]
    examples = [r["examples"][0]["de"] for r in rows if r.get("examples")]
    cache = translate_many(meanings, "en", cache)
    cache = translate_many(examples, "de", cache)

    out = []
    for i, r in enumerate(rows, 1):
        lemma = r["lemma"].strip()
        article = (r.get("article") or "").strip()
        display = (article + " " + lemma) if article and not lemma.startswith(article + " ") else lemma
        gender = (r.get("gender") or "").strip()
        plural = (r.get("noun_forms_raw") or "").strip()
        plural_word = plural_form(lemma, plural) if r.get("pos") == "n." and not lemma.endswith("-") and not lemma.startswith("(") else ""
        if lemma == "Gramm":
            plural_word = "Gramm"
        gender_label = {
            "m.": "masculine", "f.": "feminine", "n.": "neuter",
            "pl.": "plural", "m./f.": "m/f", "m./n.": "m/n",
        }.get(gender, "")
        info = []
        if gender_label:
            info.append(gender_label)
        if article:
            info.append(article)
        if plural_word and gender in ("m.", "f.", "n.", "pl.", "m./f.", "m./n."):
            info.append("plural " + plural_word)
        pos_label = {
            "n.": "noun", "v.": "verb", "adj.": "adjective", "adv.": "adverb",
            "prep.": "preposition", "conj.": "conjunction", "pron.": "pronoun",
            "det.": "determiner", "det., pron.": "determiner/pronoun",
            "interj.": "interjection", "part.": "particle", "phrase": "phrase",
        }.get(r.get("pos") or "", r.get("pos") or "")
        short_gender = {"m.": "m", "f.": "f", "n.": "n", "pl.": "pl"}.get(gender, "")
        ex = MANUAL_EXAMPLES.get(lemma) or (r.get("examples") or [{}])[0]
        ex_de = (ex.get("de") or "").strip()
        ex_en = (ex.get("en") or "").strip()
        meaning_zh = MANUAL_ZH.get(lemma) or cache.get("en:" + r["meaning_en"], "")
        if not meaning_zh:
            meaning_zh = cache.get("de:" + lemma, "")
        meaning_zh = clean_meaning(meaning_zh)
        out.append({
            "id": "de-a1-%04d" % i,
            "word": display,
            "lemma": lemma,
            "article": article,
            "gender": gender,
            "gender_info": " · ".join(info),
            "pos": r.get("pos") or "",
            "plural": plural,
            "romanization": pos_label + ((" · " + short_gender) if short_gender else ""),
            "hanja": "",
            "hanja_simplified": "",
            "hanja_candidates": [],
            "meaning_en": r.get("meaning_en") or "",
            "alt_meanings": [],
            "example_ko": ex_de,
            "example_romanization": "",
            "example_en": ex_en,
            "verb_forms": r.get("verb_forms_raw") or "",
            "audio": None,
            "flags": [],
            "level": "A1",
        })

    os.makedirs(DATA, exist_ok=True)
    os.makedirs(APP_DATA, exist_ok=True)
    json.dump(out, open(os.path.join(DATA, "a1_vocab.json"), "w"), ensure_ascii=False, indent=1)
    with open(os.path.join(DATA, "a1_vocab.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["id", "word", "pos", "gender_info", "meaning_en", "example_de", "example_en"])
        for c in out:
            w.writerow([c["id"], c["word"], c["pos"], c["gender_info"], c["meaning_en"], c["example_ko"], c["example_en"]])
    js = "window.VOCAB = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\nwindow.DECK_INFO = {count:%d, level:'A1', source:'Goethe-Zertifikat A1 Wortliste'};\n" % len(out)
    open(os.path.join(APP_DATA, "vocab.js"), "w").write(js)
    print("wrote", len(out), "entries")


if __name__ == "__main__":
    main()
