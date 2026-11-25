/* Dictation engine: recorded example sentences, a daily-life sentence
   generator and tolerant answer checking. */
(function (root) {
  "use strict";

  var DATA = root.DICTATION_DATA || {};
  var coreCache = null;
  var fixedCache = null;

  function hash(text) {
    if (root.Deck && typeof root.Deck.hash === "function") return root.Deck.hash(text);
    var h = 2166136261;
    for (var i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
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

  function pick(list, rnd) {
    return list && list.length ? list[Math.floor(rnd() * list.length)] : null;
  }

  function chance(rnd, probability) {
    return rnd() < probability;
  }

  function cap(text) {
    text = String(text || "");
    return text ? text.charAt(0).toLocaleUpperCase("de") + text.slice(1) : text;
  }

  function shuffle(list) {
    var out = list.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function wordCount(text) {
    return String(text || "").trim().split(/\s+/).filter(Boolean).length;
  }

  function personVerb(person, verb) {
    return verb.forms[person.idx];
  }

  function enVerb(person, verb) {
    return person.idx === 2 ? verb.en3 : verb.en;
  }

  function doSupport(person) {
    return person.idx === 2 ? "does" : "do";
  }

  function dontSupport(person) {
    return person.idx === 2 ? "doesn't" : "don't";
  }

  function bePresent(person) {
    if (person.idx === 0) return "am";
    if (person.idx === 2) return "is";
    return "are";
  }

  function bePast(person) {
    if (person.idx === 0 || person.idx === 2) return "was";
    return "were";
  }

  function auxForm(person, aux) {
    var forms = aux === "sein" ? ["bin", "bist", "ist", "sind", "seid", "sind"] : ["habe", "hast", "hat", "haben", "habt", "haben"];
    return forms[person.idx];
  }

  function gernOk(verb) {
    return ["haben", "brauchen", "finden", "verstehen", "öffnen", "schließen"].indexOf(verb.inf) < 0;
  }

  function byInf(inf) {
    return (DATA.verbs || []).filter(function (v) {
      return v.inf === inf;
    })[0];
  }

  function futureTime(time) {
    return time && ["morgen", "jetzt", "später", "nächste Woche"].indexOf(time.de) >= 0;
  }

  function routineTime(time) {
    return time && ["diese Woche", "nächste Woche"].indexOf(time.de) < 0;
  }

  function collectWords() {
    var out = [];
    var seen = {};
    Array.prototype.slice.call(arguments).forEach(function (list) {
      (list || []).forEach(function (word) {
        if (!word || !word.de || seen[word.de]) return;
        seen[word.de] = true;
        out.push({ de: word.de, en: word.en || "" });
      });
    });
    return out;
  }

  function pickObject(rnd, verb) {
    var categories = (verb && verb.objects) || [];
    if (!categories.length) return null;
    var category = pick(categories, rnd);
    return pick((DATA.objects || {})[category] || [], rnd);
  }

  function pickPlace(rnd, verb) {
    var mode = verb.place;
    if (!mode) return null;
    var choices = (DATA.places || []).filter(function (place) {
      return place.verbs && place.verbs.indexOf(verb.inf) >= 0 && (mode === "wo" ? place.wo : place.wohin);
    });
    return pick(choices, rnd);
  }

  function makeCore() {
    if (coreCache) return coreCache;
    var seen = {};
    coreCache = [];
    var deck = (root.Deck && root.Deck.all) || [];
    deck.forEach(function (card) {
      var de = String(card.example_ko || "").trim();
      var en = String(card.example_en || "").trim();
      if (!de || !en) return;
      if (/[()]/.test(de) || de.indexOf("...") >= 0 || de.indexOf("\n") >= 0) return;
      if (/\bz\.\s?B\./i.test(de) || /[.,;:!?]{2,}/.test(de)) return;
      if (/[,;:]$/.test(de)) return;
      var count = wordCount(de);
      if (count < 3 || count > 18) return;
      if (!root.Deck || typeof root.Deck.audioFor !== "function" || !root.Deck.audioFor(de)) return;
      var key = normalize(de);
      if (!key || seen[key]) return;
      seen[key] = true;
      coreCache.push({
        de: de,
        en: en,
        source: "recorded",
        words: collectWords([{ de: cleanWord(card.word), en: card.meaning_en }]),
      });
    });
    return coreCache;
  }

  function cleanWord(word) {
    return String(word || "")
      .replace(/^\([^)]*\)\s*/, "")
      .replace(/[()]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function makeFixed() {
    if (fixedCache) return fixedCache;
    fixedCache = (DATA.fixed || []).map(function (item) {
      return {
        de: item.de,
        en: item.en,
        source: "recorded",
        words: [],
      };
    });
    return fixedCache;
  }

  function decorate(sentence) {
    if (!sentence) return null;
    var de = String(sentence.de || "").replace(/\s+/g, " ").trim();
    var en = String(sentence.en || "").replace(/\s+/g, " ").trim();
    if (!de || !en) return null;
    var recorded = sentence.source === "recorded";
    if (!recorded && !/[.!?]$/.test(de)) de += ".";
    if (!recorded && !/[.!?]$/.test(en)) en += ".";
    var count = wordCount(de);
    if (count < 2 || count > 20) return null;
    return {
      de: de,
      en: en,
      source: sentence.source || "generated",
      words: sentence.words || [],
      hash: hash(de),
    };
  }

  /* ---------------------------------------------------------------- recipes */

  function presentTransitive(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.objects && !v.dative && !v.things;
    }), rnd);
    if (!person || !verb) return null;
    var object = pickObject(rnd, verb);
    if (!object) return null;
    var time = chance(rnd, 0.24) ? pick(DATA.times, rnd) : null;
    var gern = gernOk(verb) && chance(rnd, 0.22);
    var de = cap(person.de) + " " + personVerb(person, verb) +
      (time ? " " + time.de : "") +
      (gern ? " gern" : "") + " " + object.akk +
      (verb.sep ? " " + verb.sep : "") + ".";
    var en = cap(person.en) + " " +
      (gern ? (person.idx === 2 ? "likes to " : "like to ") + verb.en : enVerb(person, verb)) +
      " " + object.en + (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object.words),
    };
  }

  function presentTime(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return ["arbeiten", "schlafen", "frühstücken", "fernsehen", "aufstehen", "warten", "spazieren"].indexOf(v.inf) >= 0;
    }), rnd);
    var time = pick((DATA.times || []).filter(routineTime), rnd);
    if (!person || !verb || !time) return null;
    var de = cap(person.de) + " " + personVerb(person, verb) + " " + time.de +
      (verb.sep ? " " + verb.sep : "") + ".";
    var en = cap(person.en) + " " + enVerb(person, verb) + " " + time.en + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }]),
    };
  }

  function placeWo(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return ["wohnen", "arbeiten", "sein", "einkaufen", "spazieren"].indexOf(v.inf) >= 0;
    }), rnd);
    if (!person || !verb) return null;
    var place = pickPlace(rnd, verb);
    if (!place) return null;
    var time = chance(rnd, 0.28) ? pick(DATA.times, rnd) : null;
    var de = cap(person.de) + " " + personVerb(person, verb) +
      (time ? " " + time.de : "") + " " + place.wo +
      (verb.sep ? " " + verb.sep : "") + ".";
    var en = cap(person.en) + " " + enVerb(person, verb) + " " + (place.woEn || place.en) +
      (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], place.words),
    };
  }

  function placeWohin(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.inf === "gehen" || v.inf === "fahren";
    }), rnd);
    if (!person || !verb) return null;
    var place = pickPlace(rnd, verb);
    if (!place) return null;
    var time = chance(rnd, 0.5) ? pick(DATA.times, rnd) : null;
    var de = cap(person.de) + " " + personVerb(person, verb) +
      (time ? " " + time.de : "") + " " + place.wohin + ".";
    var en = cap(person.en) + " " + enVerb(person, verb) + " " +
      (place.wohinEn || place.en) + (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], place.words),
    };
  }

  function modalActivity(rnd) {
    var person = pick(DATA.people, rnd);
    var modal = pick(DATA.modals, rnd);
    var activity = pick(DATA.activities, rnd);
    if (!person || !modal || !activity) return null;
    var time = chance(rnd, 0.55) ? pick(DATA.times, rnd) : null;
    var de = cap(person.de) + " " + modal.forms[person.idx] +
      (time ? " " + time.de : "") + " " + activity.de + ".";
    var en = cap(person.en) + " " + (person.idx === 2 ? modal.en3 : modal.en) + " " + activity.en +
      (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, activity.words),
    };
  }

  function modalObject(rnd) {
    var person = pick(DATA.people, rnd);
    var modal = pick((DATA.modals || []).filter(function (m) { return m.de === "möchte"; }), rnd);
    var object = pick((DATA.objects || {}).order, rnd);
    if (!person || !modal || !object) return null;
    var bitte = chance(rnd, 0.4);
    var de = cap(person.de) + " " + modal.forms[person.idx] + (bitte ? " bitte" : "") + " " + object.akk + ".";
    var en = cap(person.en) + " would like " + object.en + (bitte ? ", please" : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, object.words),
    };
  }

  function yesNoTransitive(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.objects && !v.dative && !v.things;
    }), rnd);
    if (!person || !verb) return null;
    var object = pickObject(rnd, verb);
    if (!object) return null;
    var time = chance(rnd, 0.3) ? pick(DATA.times, rnd) : null;
    var de = cap(personVerb(person, verb)) + " " + person.de +
      (time ? " " + time.de : "") + " " + object.akk +
      (verb.sep ? " " + verb.sep : "") + "?";
    var en = cap(doSupport(person)) + " " + person.en + " " + verb.en +
      " " + object.en + (time ? " " + time.en : "") + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object.words),
    };
  }

  function yesNoModal(rnd) {
    var person = pick(DATA.people, rnd);
    var modal = pick(DATA.modals, rnd);
    var activity = pick(DATA.activities, rnd);
    if (!person || !modal || !activity) return null;
    var time = chance(rnd, 0.45) ? pick(DATA.times, rnd) : null;
    var de = cap(modal.forms[person.idx]) + " " + person.de +
      (time ? " " + time.de : "") + " " + activity.de + "?";
    var tail = activity.en + (time ? " " + time.en : "");
    var en;
    if (modal.de === "will") en = cap(doSupport(person)) + " " + person.en + " want to " + tail + "?";
    else if (modal.de === "möchte") en = "Would " + person.en + " like to " + tail + "?";
    else en = cap(modal.en) + " " + person.en + " " + tail + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, activity.words),
    };
  }

  function wQuestionWas(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.objects && !v.dative && !v.things && ["anrufen", "sprechen"].indexOf(v.inf) < 0;
    }), rnd);
    if (!person || !verb) return null;
    var time = chance(rnd, 0.4) ? pick(DATA.times, rnd) : null;
    var de = "Was " + personVerb(person, verb) + " " + person.de +
      (time ? " " + time.de : "") + (verb.sep ? " " + verb.sep : "") + "?";
    var en = "What " + doSupport(person) + " " + person.en + " " + verb.en +
      (time ? " " + time.en : "") + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }]),
    };
  }

  function wQuestionWo(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return ["wohnen", "arbeiten", "sein"].indexOf(v.inf) >= 0;
    }), rnd);
    if (!person || !verb) return null;
    var de = "Wo " + personVerb(person, verb) + " " + person.de + "?";
    var en = "Where " + (verb.inf === "sein" ? bePresent(person) + " " + person.en : doSupport(person) + " " + person.en + " " + verb.en) + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }]),
    };
  }

  function wQuestionWann(rnd) {
    var isThing = !chance(rnd, 0.6);
    var person = isThing ? pick(DATA.things, rnd) : pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      if (isThing) {
        var allowed = [];
        if (person.starts) allowed.push("beginnen", "anfangen");
        if (person.opens) allowed.push("öffnen", "schließen");
        if (person.mobile) allowed.push("kommen");
        return allowed.indexOf(v.inf) >= 0;
      }
      return ["arbeiten", "aufstehen", "fernsehen", "schlafen", "frühstücken", "warten", "kommen"].indexOf(v.inf) >= 0;
    }), rnd);
    if (!person || !verb) return null;
    var de = "Wann " + personVerb(person, verb) + " " + person.de +
      (verb.sep ? " " + verb.sep : "") + "?";
    var en = "When " + doSupport(person) + " " + person.en + " " + verb.en + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }]),
    };
  }

  function wQuestionWohin(rnd) {
    var mobileThings = (DATA.things || []).filter(function (t) { return t.mobile; });
    var person = chance(rnd, 0.7) || !mobileThings.length ? pick(DATA.people, rnd) : pick(mobileThings, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.inf === "gehen" || v.inf === "fahren";
    }), rnd);
    if (!person || !verb) return null;
    var time = chance(rnd, 0.25) ? pick(DATA.times, rnd) : null;
    var de = "Wohin " + personVerb(person, verb) + " " + person.de +
      (time ? " " + time.de : "") + "?";
    var en = "Where " + bePresent(person) + " " + person.en + " going" +
      (time ? " " + time.en : "") + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }]),
    };
  }

  function wQuestionWoher(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = byInf("kommen");
    if (!person || !verb) return null;
    var de = "Woher " + personVerb(person, verb) + " " + person.de + "?";
    var en = "Where " + doSupport(person) + " " + person.en + " come from?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: "kommen", en: "come" }]),
    };
  }

  function negation(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.objects && !v.dative && !v.things && v.objects.some(function (cat) {
        return (DATA.objects[cat] || []).some(function (o) { return o.neg; });
      });
    }), rnd);
    if (!person || !verb) return null;
    var category = pick(verb.objects.filter(function (cat) {
      return (DATA.objects[cat] || []).some(function (o) { return o.neg; });
    }), rnd);
    var object = pick((DATA.objects[category] || []).filter(function (o) { return o.neg; }), rnd);
    if (!object) return null;
    var time = chance(rnd, 0.3) ? pick(DATA.times, rnd) : null;
    var de = cap(person.de) + " " + personVerb(person, verb) +
      (time ? " " + time.de : "") + " " + object.neg + ".";
    var en = cap(person.en) + " " + dontSupport(person) + " " + verb.en +
      " " + object.en + (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object.words),
    };
  }

  function perfect(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      if (!v.part || v.inf === "spazieren" || v.inf === "mitkommen") return false;
      return !!(v.objects || v.place || ["arbeiten", "schlafen", "frühstücken", "warten", "fernsehen", "aufstehen", "einkaufen"].indexOf(v.inf) >= 0);
    }), rnd);
    if (!person || !verb) return null;
    var time = verb.inf === "wohnen" ? null : (chance(rnd, 0.55) ? pick((DATA.times || []).filter(function (t) { return !futureTime(t); }), rnd) : null);
    var object = null;
    var place = null;
    if (verb.objects) {
      object = pickObject(rnd, verb);
      if (!object) return null;
    } else if (verb.place) {
      place = pickPlace(rnd, verb);
      if (!place) return null;
    }
    var parts = [cap(person.de), auxForm(person, verb.aux)];
    if (time) parts.push(time.de);
    if (object) parts.push(object.akk);
    if (place) parts.push(verb.place === "wohin" ? place.wohin : place.wo);
    parts.push(verb.part);
    var de = parts.join(" ") + ".";
    var enParts = [cap(person.en), verb.inf === "sein" ? bePast(person) : verb.enPast];
    if (object) enParts.push(object.en);
    if (place) enParts.push(verb.place === "wohin" ? (place.wohinEn || place.en) : (place.woEn || place.en));
    if (time) enParts.push(time.en);
    return {
      de: de,
      en: enParts.join(" ") + ".",
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object && object.words, place && place.words),
    };
  }

  function adjective(rnd) {
    var person = pick(DATA.people, rnd);
    var adj = pick(DATA.adjectives, rnd);
    var sein = byInf("sein");
    if (!person || !adj || !sein) return null;
    var time = chance(rnd, 0.3) ? pick((DATA.times || []).filter(function (t) { return !futureTime(t); }), rnd) : null;
    var de = cap(person.de) + " " + personVerb(person, sein) +
      (time ? " " + time.de : "") + " " + adj.de + ".";
    var en = cap(person.en) + " " + bePresent(person) + " " + adj.en +
      (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, adj.words),
    };
  }

  function origin(rnd) {
    var person = pick(DATA.people, rnd);
    var place = pick(DATA.origins, rnd);
    var verb = byInf("kommen");
    if (!person || !place || !verb) return null;
    var de = cap(person.de) + " " + personVerb(person, verb) + " " + place.de + ".";
    var en = cap(person.en) + " " + enVerb(person, verb) + " " + place.en + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: "kommen", en: "come" }], place.words),
    };
  }

  function inversionTransitive(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.objects && !v.dative && !v.things &&
        ["haben", "brauchen", "finden", "verstehen"].indexOf(v.inf) < 0;
    }), rnd);
    var time = pick(DATA.times, rnd);
    if (!person || !verb || !time) return null;
    var object = pickObject(rnd, verb);
    if (!object) return null;
    var de = cap(time.de) + " " + personVerb(person, verb) + " " + person.de +
      " " + object.akk + (verb.sep ? " " + verb.sep : "") + ".";
    var en = cap(time.en) + ", " + person.en + " " + enVerb(person, verb) + " " + object.en + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object.words),
    };
  }

  function inversionPlace(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return v.inf === "gehen" || v.inf === "fahren";
    }), rnd);
    var time = pick(DATA.times, rnd);
    if (!person || !verb || !time) return null;
    var place = pickPlace(rnd, verb);
    if (!place) return null;
    var de = cap(time.de) + " " + personVerb(person, verb) + " " + person.de + " " + place.wohin + ".";
    var en = cap(time.en) + ", " + person.en + " " + enVerb(person, verb) + " " + (place.wohinEn || place.en) + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], place.words),
    };
  }

  function dativeHelp(rnd) {
    var person = pick(DATA.people, rnd);
    var target = pick(DATA.objects.peopleDat, rnd);
    var verb = byInf("helfen");
    if (!person || !target || !verb) return null;
    var bare = function (text) {
      return String(text).toLowerCase().replace(/^(der|die|das|den|dem|mein|meine|meinen|meinem|meiner)\s+/, "").trim();
    };
    if (bare(person.de) === bare(target.dat)) return null;
    var time = chance(rnd, 0.2) ? pick(DATA.times, rnd) : null;
    var de = cap(person.de) + " " + personVerb(person, verb) + " " + target.dat +
      (time ? " " + time.de : "") + ".";
    var en = cap(person.en) + " " + enVerb(person, verb) + " " + target.en +
      (time ? " " + time.en : "") + ".";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: "helfen", en: "help" }], target.words),
    };
  }

  function gernQuestion(rnd) {
    var person = pick(DATA.people, rnd);
    var verb = pick((DATA.verbs || []).filter(function (v) {
      return ["trinken", "essen", "lesen", "hören", "sehen", "kaufen", "kochen"].indexOf(v.inf) >= 0;
    }), rnd);
    if (!person || !verb) return null;
    var object = pickObject(rnd, verb);
    if (!object) return null;
    var de = cap(personVerb(person, verb)) + " " + person.de + " gern " + object.akk +
      (verb.sep ? " " + verb.sep : "") + "?";
    var en = cap(doSupport(person)) + " " + person.en + " like to " + verb.en +
      " " + object.en + "?";
    return {
      de: de,
      en: en,
      words: collectWords(person.words, [{ de: verb.inf, en: verb.en }], object.words),
    };
  }

  function fixed(rnd) {
    var item = pick(DATA.fixed, rnd);
    if (!item) return null;
    return { de: item.de, en: item.en, source: "recorded", words: [] };
  }

  var RECIPES = [
    presentTransitive,
    presentTime,
    placeWo,
    placeWohin,
    modalActivity,
    modalObject,
    yesNoTransitive,
    yesNoModal,
    wQuestionWas,
    wQuestionWo,
    wQuestionWann,
    wQuestionWohin,
    wQuestionWoher,
    negation,
    perfect,
    adjective,
    origin,
    inversionTransitive,
    inversionPlace,
    dativeHelp,
    gernQuestion,
    fixed,
  ];

  function generatedOne(seed) {
    var rnd = mulberry32(seed >>> 0);
    var recipe = pick(RECIPES, rnd);
    if (!recipe) return null;
    return decorate(recipe(rnd));
  }

  function recentSet(recent) {
    var set = {};
    (recent || []).forEach(function (item) {
      var key = typeof item === "string" ? item : item && item.hash;
      if (key) set[key] = true;
    });
    return set;
  }

  function buildSession(count, recent) {
    count = Math.max(1, Math.min(40, Number(count) || 10));
    var seen = recentSet(recent);
    var core = makeCore().filter(function (s) { return !seen[s.hash]; });
    var fixedList = makeFixed().filter(function (s) { return !seen[hash(s.de)]; });
    var recorded = shuffle(core.concat(fixedList));
    var picked = [];
    var targetRecorded = Math.max(1, Math.round(count * 0.5));
    recorded.forEach(function (sentence) {
      if (picked.length >= targetRecorded) return;
      var item = decorate(sentence);
      if (!item || seen[item.hash]) return;
      seen[item.hash] = true;
      picked.push(item);
    });

    var generated = [];
    var tries = 0;
    var wanted = count - picked.length;
    while (generated.length < wanted && tries < Math.max(80, wanted * 50)) {
      tries++;
      var item = generatedOne(Math.floor(Math.random() * 4294967295));
      if (!item || seen[item.hash]) continue;
      seen[item.hash] = true;
      generated.push(item);
    }

    var all = picked.concat(generated);
    if (all.length < count) {
      recorded.forEach(function (sentence) {
        if (all.length >= count) return;
        var item = decorate(sentence);
        if (!item || seen[item.hash]) return;
        seen[item.hash] = true;
        all.push(item);
      });
    }
    all = all.slice(0, count);
    all.sort(function (a, b) {
      return wordCount(a.de) - wordCount(b.de) || a.de.localeCompare(b.de, "de");
    });
    return all;
  }

  function sample(count, source) {
    var out = [];
    var seen = {};
    var tries = 0;
    count = Math.max(1, Number(count) || 10);
    while (out.length < count && tries < count * 80) {
      tries++;
      var item = source === "core" ? decorate(pick(makeCore(), Math.random)) : generatedOne(Math.floor(Math.random() * 4294967295));
      if (!item || seen[item.hash]) continue;
      seen[item.hash] = true;
      out.push(item);
    }
    return out;
  }

  function words(text) {
    return String(text || "")
      .trim()
      .split(/\s+/)
      .map(function (raw) {
        return { raw: raw, norm: normWord(raw) };
      })
      .filter(function (item) {
        return !!item.norm;
      });
  }

  function normWord(word) {
    return String(word || "")
      .toLocaleLowerCase("de")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]/g, "");
  }

  function normalize(text) {
    return words(text)
      .map(function (item) { return item.norm; })
      .join(" ");
  }

  function check(expected, actual) {
    var e = words(expected);
    var a = words(actual);
    var n = e.length;
    var m = a.length;
    var dp = [];
    for (var i = 0; i <= n; i++) {
      dp[i] = [];
      for (var j = 0; j <= m; j++) dp[i][j] = 0;
    }
    for (i = 1; i <= n; i++) {
      for (j = 1; j <= m; j++) {
        dp[i][j] = e[i - 1].norm === a[j - 1].norm
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    var eMark = [];
    var aMark = [];
    for (i = 0; i < n; i++) eMark[i] = false;
    for (j = 0; j < m; j++) aMark[j] = false;
    i = n;
    j = m;
    while (i > 0 && j > 0) {
      if (e[i - 1].norm === a[j - 1].norm) {
        eMark[i - 1] = true;
        aMark[j - 1] = true;
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    var lcs = n ? dp[n][m] : 0;
    var correct = n > 0 && n === m && lcs === n;
    var recall = n ? lcs / n : 0;
    var precision = m ? lcs / m : 0;
    var score = recall + precision ? (2 * recall * precision) / (recall + precision) : 0;
    return {
      correct: correct,
      score: score,
      expected: e.map(function (item, index) {
        return { text: item.raw, ok: eMark[index] };
      }),
      actual: a.map(function (item, index) {
        return { text: item.raw, ok: aMark[index] };
      }),
      missing: e.filter(function (item, index) { return !eMark[index]; }).map(function (item) { return item.raw; }),
      extra: a.filter(function (item, index) { return !aMark[index]; }).map(function (item) { return item.raw; }),
    };
  }

  root.Dictation = {
    buildSession: buildSession,
    check: check,
    normalize: normalize,
    sample: sample,
    coreCount: function () { return makeCore().length; },
    fixedCount: function () { return makeFixed().length; },
    wordCount: wordCount,
    hash: hash,
  };
})(typeof self !== "undefined" ? self : this);
