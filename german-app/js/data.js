/* Deck helpers: search, audio paths, multiple-choice generation. */
(function (root) {
  "use strict";
  var DECK = (root.VOCAB || []).slice();

  function sortKey(c) {
    var k = c.lemma || c.word || "";
    k = k.replace(/^\([^)]*\)\s*/, "").replace(/^[-–—]+/, "").trim();
    k = k.replace(/^(der|die|das)\s+/i, "");
    return k.toLocaleLowerCase("de");
  }

  DECK.sort(function (a, b) {
    return sortKey(a).localeCompare(sortKey(b), "de");
  });


  var byId = {};
  var byWord = {};
  var byLemma = {};
  var byLemmaLower = {};
  DECK.forEach(function (c) {
    byId[c.id] = c;
    if (!byWord[c.word]) byWord[c.word] = c;
    if (c.lemma && !byLemma[c.lemma]) byLemma[c.lemma] = c;
    if (c.lemma) {
      var lower = c.lemma.toLowerCase();
      if (!byLemmaLower[lower]) byLemmaLower[lower] = c;
    }
  });

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function theMeaning(c) {
    return (c.meaning_zh || "").trim();
  }

  function tooSimilar(a, b) {
    if (!a || !b) return true;
    if (a === b) return true;
    if (a.length >= 2 && b.length >= 2 && (a.indexOf(b) >= 0 || b.indexOf(a) >= 0)) return true;
    return false;
  }

  function getOptions(card, count) {
    count = count || 4;
    var correct = theMeaning(card);
    var alt = (card.alt_meanings || []).concat([correct]);
    var seed = hash(card.id + "|" + correct);
    var rnd = mulberry32(seed);
    var pool = [];
    DECK.forEach(function (c) {
      if (c.id === card.id) return;
      var m = theMeaning(c);
      if (!m || m.length > 14) return;
      if (tooSimilar(m, correct)) return;
      if (alt.indexOf(m) >= 0) return;
      var lenDiff = Math.abs(m.length - correct.length);
      var first = m.charAt(0) === correct.charAt(0) ? 0.6 : 0;
      pool.push({ m: m, score: lenDiff + first + rnd() * 2.5 });
    });
    pool.sort(function (a, b) {
      return a.score - b.score;
    });
    var candidates = pool.slice(0, 40).map(function (x) {
      return x.m;
    });
    var picks = [];
    var used = {};
    shuffle(candidates, rnd).forEach(function (m) {
      if (picks.length < count - 1 && !used[m]) {
        used[m] = true;
        picks.push(m);
      }
    });
    var options = shuffle([correct].concat(picks), mulberry32(seed ^ 0x9e3779b9));
    return {
      options: options,
      correctIndex: options.indexOf(correct),
      correct: correct,
    };
  }

  function getReverseOptions(card, count) {
    count = count || 4;
    var correct = card.word;
    var seed = hash(card.id + "|reverse|" + correct);
    var rnd = mulberry32(seed);
    var pool = [];
    var used = {};
    used[correct] = true;
    DECK.forEach(function (c) {
      if (c.id === card.id) return;
      var w = c.word;
      if (!w || used[w] || tooSimilar(w, correct)) return;
      if (c.meaning_zh === card.meaning_zh) return;
      if ((card.alt_meanings || []).indexOf(c.meaning_zh) >= 0) return;
      var lenDiff = Math.abs(w.length - correct.length);
      var first = w.charAt(0) === correct.charAt(0) ? 0.5 : 0;
      pool.push({ m: w, score: lenDiff + first + rnd() * 2.6 });
      used[w] = true;
    });
    pool.sort(function (a, b) {
      return a.score - b.score;
    });
    var candidates = pool.slice(0, 50).map(function (x) {
      return x.m;
    });
    var picks = [];
    var chosen = {};
    shuffle(candidates, rnd).forEach(function (w) {
      if (picks.length < count - 1 && !chosen[w]) {
        chosen[w] = true;
        picks.push(w);
      }
    });
    var options = shuffle([correct].concat(picks), mulberry32(seed ^ 0x51ed270b));
    return {
      options: options,
      correctIndex: options.indexOf(correct),
      correct: correct,
    };
  }

  function speechKey(text) {
    return String(text || "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1")
      .replace(/[„“”]/g, '"')
      .replace(/\s*\/\s*/g, " oder ")
      .replace(/[()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function audioFor(text) {
    var key = speechKey(text);
    var map = root.SPEECH_AUDIO || {};
    return (key && map[key]) || null;
  }

  function wordAudio(c) {
    return audioFor(c.word) || audioFor(c.lemma) || "tts:" + c.word;
  }
  function exampleAudio(c) {
    return audioFor(c.example_ko) || "tts:" + c.example_ko;
  }
  function fullAudio(c) {
    return audioFor(c.word + ". " + c.example_ko) || "tts:" + c.word + ". " + c.example_ko;
  }

  function search(query) {
    var q = (query || "").trim().toLowerCase();
    if (!q) return DECK;
    return DECK.filter(function (c) {
      return (
        c.word.toLowerCase().indexOf(q) >= 0 ||
        (c.lemma || "").toLowerCase().indexOf(q) >= 0 ||
        (c.gender_info || "").toLowerCase().indexOf(q) >= 0 ||
        (c.meaning_zh || "").indexOf(q) >= 0 ||
        (c.meaning_en || "").toLowerCase().indexOf(q) >= 0 ||
        (c.example_ko || "").toLowerCase().indexOf(q) >= 0
      );
    });
  }

  function status(cardState) {
    if (!cardState || cardState.state === "new") return "new";
    if (cardState.state === "learning" || cardState.state === "relearning") return "learning";
    return (cardState.stability || 0) >= 21 ? "mature" : "young";
  }

  function statusLabel(cardState) {
    var s = status(cardState);
    return s === "young" ? "review" : s;
  }

  function todayCard() {
    var d = Store.dateKey();
    var seed = hash(d + "|word");
    var pool = DECK.filter(function (c) {
      return (
        c.word &&
        c.meaning_zh &&
        c.example_ko &&
        c.word.length <= 28 &&
        c.word.charAt(0) !== "(" &&
        !/[();,/]/.test(c.word)
      );
    });
    if (!pool.length) pool = DECK;
    return pool[seed % pool.length];
  }

  function hanjaReliable(c) {
    return !!(c && c.gender_info);
  }

  root.Deck = {
    all: DECK,
    byId: byId,
    byWord: byWord,
    byLemma: byLemma,
    byLemmaLower: byLemmaLower,
    count: DECK.length,
    getOptions: getOptions,
    getReverseOptions: getReverseOptions,
    wordAudio: wordAudio,
    exampleAudio: exampleAudio,
    fullAudio: fullAudio,
    speechKey: speechKey,
    audioFor: audioFor,
    search: search,
    status: status,
    statusLabel: statusLabel,
    todayCard: todayCard,
    hanjaReliable: hanjaReliable,
    hash: hash,
  };
})(typeof self !== "undefined" ? self : this);
