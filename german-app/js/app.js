(function () {
  "use strict";

  var app = {
    state: Store.load(),
    view: "dashboard",
    session: null,
    current: null,
    currentItem: null,
    mode: "front",
    mcq: null,
    mcqStart: 0,
    cardStart: 0,
    last: null,
    browse: { query: "", filter: "all", limit: 100 },
    dashboardDirection: "forward",
    statsDirection: "forward",
    grammarSearch: "",
    grammarExercise: null,
    readerLevel: "all",
    readerTranslation: false,
    readerRate: 0.9,
    readerPlaying: false,
    readerToken: 0,
    tipEl: null,
    tipHideTimer: null,
    audio: new Audio(),
    soundWarned: false,
    toastTimer: null,
    autoNextTimer: null,
    summary: null,
    dictation: null,
  };

  var GRAMMAR_ITEMS = window.GRAMMAR_ITEMS || [];
  var GRAMMAR_UNITS = window.GRAMMAR_UNITS || [];
  var GI = {};
  var GU = {};
  GRAMMAR_ITEMS.forEach(function (x) { GI[x.id] = x; });
  GRAMMAR_UNITS.forEach(function (x) { GU[x.id] = x; });

  var READER_TEXTS = window.READER_TEXTS || [];
  var READER_LEVELS = window.READER_LEVELS || [];
  var RI = {};
  var RL = {};
  READER_TEXTS.forEach(function (x) { RI[x.id] = x; });
  READER_LEVELS.forEach(function (x) { RL[x.id] = x; });

  var ICONS = {
    speaker:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    back:
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    arrow:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
    sun:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>',
    flame:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4 0 7-3 7-7 0-3-2-5-3.5-7.5C14 5 13 3 13 2c-1.5 2-3 4-3 6.5 0 1.5.5 2.5 1 3.5-2 0-3.5-2-4-4C5 10 5 12 5 15c0 4 3 7 7 7Z"/></svg>',
    book:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    chart:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    gear:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/></svg>',
    search:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    check:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>',
    x:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    clock:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
    target:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
    sparkle:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></svg>',
    trophy:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v2a4 4 0 0 0 4 4M17 5h3v2a4 4 0 0 1-4 4"/></svg>',
    bean:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="currentColor"/><circle cx="12" cy="12" r="6.4" stroke="var(--surface)" stroke-width="1.2" opacity=".7"/><path d="M12 8v8M9.8 10h4.4M9.8 14h4.4" stroke="var(--surface)" stroke-width="1.25" stroke-linecap="round" opacity=".9"/></svg>',
    star:
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.6l6.5-.9L12 2.8Z"/></svg>',
    coffee:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 3v2M11 3v2M15 3v2"/></svg>',
  };

  function icon(name, size) {
    var svg = ICONS[name] || "";
    if (size) {
      return svg.replace('width="' + (name === "speaker" ? 20 : 18) + '"', 'width="' + size + '"').replace('height="' + (name === "speaker" ? 20 : 18) + '"', 'height="' + size + '"');
    }
    return svg;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pct(n, d) {
    if (!d) return 0;
    return Math.max(0, Math.min(100, Math.round((n / d) * 100)));
  }

  function starWord(n) {
    return Number(n) === 1 ? "star" : "stars";
  }

  function approxTime(seconds) {
    if (seconds < 60) return Math.round(seconds) + "s";
    var m = Math.floor(seconds / 60);
    var s = Math.round(seconds % 60);
    return m + "m" + (s ? " " + s + "s" : "");
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return "Still up?";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }

  function prettyDate() {
    try {
      return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(new Date());
    } catch (e) {
      return new Date().toDateString();
    }
  }

  function toast(msg, type) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.className = "toast show" + (type === "error" ? " error" : "");
    clearTimeout(app.toastTimer);
    app.toastTimer = setTimeout(function () {
      t.className = "toast";
    }, type === "error" ? 4200 : 2400);
  }

  function applyTheme() {
    var setting = app.state.settings.theme || "system";
    var dark =
      setting === "dark" ||
      (setting === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }

  function init() {
    Deck.all.forEach(function (c) {
      Store.getCard(app.state, c.id, "forward");
      Store.getCard(app.state, c.id, "reverse");
    });
    Store.syncGrammarStars(app.state);
    Store.save(app.state);
    app.dashboardDirection = app.state.settings.lastDirection === "reverse" ? "reverse" : "forward";
    applyTheme();
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (app.state.settings.theme === "system") applyTheme();
      });
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        if (app.view === "settings") render();
      };
    }
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerover", onGlossOver);
    document.addEventListener("pointerout", onGlossOut);
    document.addEventListener("focusin", onGlossOver);
    document.addEventListener("focusout", onGlossOut);
    window.addEventListener("scroll", hideGloss, true);
    var tip = document.getElementById("gloss-tip");
    if (tip) {
      tip.addEventListener("pointerenter", function () { clearTimeout(app.tipHideTimer); });
      tip.addEventListener("pointerleave", scheduleHideGloss);
    }
    window.addEventListener("hashchange", route);
    if (window.CloudSync) {
      CloudSync.init({
        getState: function () { return app.state; },
        setState: function (next) {
          var studying = location.hash.indexOf("#/learn") === 0 && app.session && !app.session.finished;
          var dictating = app.view === "dictation" && app.dictation && !app.dictation.finished;
          app.state = next;
          Store.save(app.state);
          if (!studying && !dictating) render();
        },
      });
      window.addEventListener("cloud:changed", function () {
        if (app.view === "settings") render();
      });
    }
    route();
  }

  function counts(direction) {
    direction = direction === "reverse" ? "reverse" : "forward";
    var now = Date.now();
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var due = 0;
    var learning = 0;
    var fresh = 0;
    Deck.all.forEach(function (c) {
      var cs = map[c.id];
      if (!cs || cs.state === "new") fresh++;
      else if (cs.due <= now) {
        due++;
        if (cs.state === "learning" || cs.state === "relearning") learning++;
      }
    });
    var d = Store.today(app.state);
    var settings = app.state.settings;
    var newToday = direction === "reverse" ? d.reverseNew : d.new;
    var reviewsToday = direction === "reverse" ? d.reverseReviews : d.reviews;
    return {
      due: due,
      learning: learning,
      newTotal: fresh,
      newToday: newToday,
      reviewsToday: reviewsToday,
      newAllowance: Math.max(0, Number(settings.newPerDay) - newToday),
      reviewAllowance: Math.max(0, Number(settings.reviewsPerDay) - reviewsToday),
    };
  }

  function buildQueue(direction, limitOverride) {
    direction = direction === "reverse" ? "reverse" : "forward";
    var now = Date.now();
    var c = counts(direction);
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var reviewLimit = limitOverride && limitOverride.reviews != null ? limitOverride.reviews : c.reviewAllowance;
    var newLimit = limitOverride && limitOverride.newCards != null ? limitOverride.newCards : c.newAllowance;
    var due = [];
    var fresh = [];
    Deck.all.forEach(function (card) {
      var cs = map[card.id];
      if (!cs) return;
      if (cs.state === "new") fresh.push(card);
      else if (cs.due <= now) due.push(card);
    });
    due.sort(function (a, b) {
      return map[a.id].due - map[b.id].due;
    });
    fresh.sort(function (a, b) {
      return a.id.localeCompare(b.id);
    });
    var q = due.slice(0, Math.max(0, reviewLimit)).map(function (c) {
      return { id: c.id, isNew: false };
    });
    return q.concat(
      fresh.slice(0, Math.max(0, newLimit)).map(function (c) {
        return { id: c.id, isNew: true };
      })
    );
  }

  function startSession(opts) {
    opts = opts || {};
    var direction = opts.direction === "reverse" ? "reverse" : opts.direction === "forward" ? "forward" : app.dashboardDirection || "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var queue;
    if (opts.cards) {
      queue = opts.cards.map(function (c) {
        return { id: c.id, isNew: map[c.id].state === "new" };
      });
    } else if (opts.practice) {
      var shuffled = Deck.all.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = t;
      }
      queue = shuffled.slice(0, opts.practice).map(function (c) {
        return { id: c.id, isNew: false };
      });
    } else {
      queue = buildQueue(direction);
    }
    if (!queue.length) {
      toast("Nothing due right now — practice ahead instead.");
      return;
    }
    app.dashboardDirection = direction;
    app.state.settings.lastDirection = direction;
    Store.save(app.state);
    app.session = {
      queue: queue,
      direction: direction,
      total: queue.length,
      done: 0,
      correct: 0,
      wrong: 0,
      newDone: 0,
      beans: 0,
      beansBonus: 0,
      visitors: 0,
      visitorsBonus: 0,
      start: Date.now(),
      missed: [],
      practice: !!opts.practice,
      label: opts.label || "",
      finished: false,
    };
    app.summary = null;
    app.current = null;
    app.mode = "front";
    app.last = null;
    if (location.hash !== "#/learn") location.hash = "#/learn";
    else showNext();
  }

  function showNext() {
    clearAutoNext();
    if (!app.session) return;
    if (app.session.queue.length === 0) {
      finishSession();
      return;
    }
    var item = app.session.queue.shift();
    app.currentItem = item;
    app.current = Deck.byId[item.id];
    app.mode = "front";
    app.mcq = null;
    app.last = null;
    app.cardStart = Date.now();
    app.mcqStart = 0;
    render();
    if (app.session.direction === "forward" && app.state.settings.autoplayWord) {
      playAudio(Deck.wordAudio(app.current));
    }
  }

  function finishSession() {
    if (!app.session) return;
    app.session.finished = true;
    app.session.end = Date.now();
    app.summary = app.session;
    location.hash = "#/summary";
    if (location.hash === "#/summary") render();
  }

  var NOVELTY_VOICES = /eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|albert|bahh|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox/i;

  function germanVoices() {
    if (!window.speechSynthesis || !window.speechSynthesis.getVoices) return [];
    return window.speechSynthesis
      .getVoices()
      .filter(function (voice) {
        return /^de([-_]|$)/i.test(voice.lang || "");
      })
      .sort(function (a, b) {
        return voiceScore(b) - voiceScore(a) || String(a.name).localeCompare(String(b.name));
      });
  }

  function voiceScore(voice) {
    var name = String(voice.name || "");
    var score = 0;
    if (voice.localService) score += 5;
    if (/premium/i.test(name)) score += 120;
    else if (/enhanced/i.test(name)) score += 90;
    else if (/siri/i.test(name)) score += 80;
    else if (/google/i.test(name)) score += 70;
    else if (/neural|natural/i.test(name)) score += 60;
    else if (/anna/i.test(name)) score += 35;
    else if (/helena|martin|petra|markus/i.test(name)) score += 20;
    if (NOVELTY_VOICES.test(name)) score -= 120;
    if (String(voice.lang || "").toLowerCase() === "de-de") score += 6;
    return score;
  }

  function germanVoice() {
    var voices = germanVoices();
    var uri = app.state.settings.voiceURI;
    if (uri) {
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].voiceURI === uri) return voices[i];
      }
    }
    return voices[0] || null;
  }

  function speakGerman(text, rate, onend) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast("Speech audio is not available in this browser.");
      if (onend) onend();
      return;
    }
    var clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) {
      if (onend) onend();
      return;
    }
    var u = new window.SpeechSynthesisUtterance(clean);
    u.lang = "de-DE";
    u.rate = rate == null ? 0.94 : Number(rate) || 0.94;
    u.pitch = 1;
    u.volume = 1;
    var voice = germanVoice();
    if (voice) u.voice = voice;
    if (onend) u.onend = onend;
    window.speechSynthesis.speak(u);
  }

  function playAudio(src, rate, onend) {
    if (!src) return;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (String(src).indexOf("tts:") === 0) {
      speakGerman(
        String(src).slice(4),
        rate == null ? Number(app.state.settings.audioRate) || 0.94 : rate,
        onend
      );
      return;
    }
    try {
      app.audio.pause();
      app.audio.onended = null;
      app.audio.onerror = null;
      app.audio.src = src;
      app.audio.currentTime = 0;
      app.audio.playbackRate = rate == null ? Number(app.state.settings.audioRate) || 1 : Number(rate) || 1;
      app.audio.onended = onend || null;
      var p = app.audio.play();
      if (p && p.catch) {
        p.catch(function () {
          if (!app.soundWarned) {
            app.soundWarned = true;
            toast("Sound is blocked — tap the speaker button to enable it.");
          }
        });
      }
    } catch (e) {
      /* ignore */
    }
  }

  function playSequence(paths) {
    var list = (paths || []).filter(Boolean);
    if (!list.length) return;
    var i = 0;
    function next() {
      if (i >= list.length) {
        app.audio.onended = null;
        return;
      }
      playAudio(list[i++], null, next);
    }
    next();
  }

  function playAnswerAudio(card, direction) {
    var word = Deck.wordAudio(card);
    var example = Deck.exampleAudio(card);
    if (direction === "reverse") {
      var paths = [];
      if (app.state.settings.autoplayWord) paths.push(word);
      if (app.state.settings.autoplayExample) paths.push(example);
      playSequence(paths);
    } else if (app.state.settings.autoplayExample) {
      playAudio(example);
    }
  }

  function replayWord() {
    if (app.current) playAudio(Deck.wordAudio(app.current));
  }

  function replayExample() {
    if (app.current) playAudio(Deck.exampleAudio(app.current));
  }

  function flip() {
    if (!app.current) return;
    app.mode = "back";
    render();
    if (app.session && app.session.direction === "reverse") {
      playAnswerAudio(app.current, "reverse");
    } else if (app.state.settings.autoplayExample) {
      playAudio(Deck.exampleAudio(app.current));
    }
  }

  function startMCQ() {
    if (!app.current) return;
    app.mode = "mcq";
    app.mcq = app.session && app.session.direction === "reverse" ? Deck.getReverseOptions(app.current) : Deck.getOptions(app.current);
    app.mcqStart = Date.now();
    render();
  }

  function clearAutoNext() {
    if (app.autoNextTimer) {
      clearTimeout(app.autoNextTimer);
      app.autoNextTimer = null;
    }
  }

  function scheduleAutoNext() {
    clearAutoNext();
    app.autoNextTimer = setTimeout(function () {
      app.autoNextTimer = null;
      if (app.mode === "result" && app.session && !app.session.finished) nextCard();
    }, 1000);
  }

  function applyAnswer(grade, correct, elapsed) {
    if (!app.current || !app.session) return;
    var card = app.current;
    var direction = app.session.direction;
    var wasMode = app.mode;
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var before = map[card.id].state;
    var reward = Store.answer(app.state, card.id, grade, correct, elapsed, Date.now(), direction);
    var updated = reward.card;
    var dueIn = (updated.due - Date.now()) / FSRS.DAY;
    app.last = {
      grade: grade,
      correct: correct,
      dueLabel: FSRS.formatInterval(dueIn),
      dueIn: dueIn,
      state: updated.state,
      beans: reward.beans,
      bonus: reward.bonus,
      visitors: reward.visitors,
      visitorsBonus: reward.visitorsBonus,
      selectedIndex: app.last && app.last.selectedIndex != null ? app.last.selectedIndex : null,
      mode: app.mode,
    };
    var s = app.session;
    s.done++;
    s.beans = (s.beans || 0) + reward.beans;
    s.beansBonus = (s.beansBonus || 0) + reward.bonus;
    s.visitors = (s.visitors || 0) + (reward.visitors || 0);
    s.visitorsBonus = (s.visitorsBonus || 0) + (reward.visitorsBonus || 0);
    if (correct) s.correct++;
    else {
      s.wrong++;
      if (s.missed.indexOf(card.id) < 0) s.missed.push(card.id);
    }
    if (before === "new") s.newDone++;
    if (grade === 1 || updated.state === "learning" || updated.state === "relearning") {
      var pos = Math.min(3, s.queue.length);
      s.queue.splice(pos, 0, { id: card.id, isNew: false, relearn: true });
    }
    app.mode = "result";
    clearAutoNext();
    Store.save(app.state);
    render();
    if (wasMode === "back" || grade === 1 || !correct) scheduleAutoNext();
    if (wasMode === "mcq") playAnswerAudio(card, direction);
  }

  function rate(grade) {
    if (app.mode !== "back") return;
    applyAnswer(grade, grade > 1, Date.now() - app.cardStart);
  }

  function selectOption(index) {
    if (app.mode !== "mcq" || !app.mcq) return;
    var correct = index === app.mcq.correctIndex;
    var elapsed = Date.now() - app.mcqStart;
    var direction = app.session && app.session.direction === "reverse" ? "reverse" : "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var wasNew = map[app.current.id].state === "new";
    var grade = correct ? (!wasNew && elapsed < 3200 ? 4 : 3) : 1;
    app.last = { selectedIndex: index };
    applyAnswer(grade, correct, elapsed);
  }

  function nextCard() {
    if (app.mode !== "result") return;
    clearAutoNext();
    showNext();
  }

  function exitStudy() {
    if (app.session && !app.session.finished && app.session.done > 0) {
      if (!window.confirm("Leave this session? Your answers are already saved.")) return;
    }
    clearAutoNext();
    app.audio.pause();
    app.session = null;
    location.hash = "#/";
    render();
  }

  function navigate(hash) {
    if (app.session && !app.session.finished && !hash.startsWith("#/learn")) {
      if (!window.confirm("Leave this session? Your answers are already saved.")) return;
      app.session = null;
    }
    clearAutoNext();
    app.audio.pause();
    location.hash = hash;
  }

  function route() {
    hideGloss();
    window.scrollTo(0, 0);
    if (app.readerPlaying || (window.speechSynthesis && window.speechSynthesis.speaking)) readerStop();
    var raw = location.hash.replace(/^#\/?/, "");
    var view = (raw.split("/")[0] || "dashboard").trim();
    if (view !== "learn") clearAutoNext();
    if (view === "learn") {
      if (!app.session) {
        var dir = app.dashboardDirection || "forward";
        var q = buildQueue(dir);
        if (!q.length) {
          location.hash = "#/";
          return;
        }
        startSession({ direction: dir });
        return;
      }
      render();
      return;
    }
    if (view === "summary") {
      if (!app.summary) {
        location.hash = "#/";
        return;
      }
      app.view = "summary";
      render();
      return;
    }
    if (view === "dictation") {
      app.view = "dictation";
      render();
      return;
    }
    if (view === "grammar") {
      app.view = "grammar";
      app.grammarRoute = (location.hash.replace(/^#\/?/, "").split("/") || []).slice(1);
      render();
      return;
    }
    if (view === "reader") {
      app.view = "reader";
      app.readerRoute = (location.hash.replace(/^#\/?/, "").split("/") || []).slice(1);
      render();
      return;
    }
    if (["dashboard", "browse", "stats", "settings", "cafe"].indexOf(view) < 0) view = "dashboard";
    app.view = view;
    render();
  }

  function navActive(view) {
    if (view === "dashboard") return "dashboard";
    return view;
  }

  function shell(content, view) {
    var active = navActive(view);
    var cafe = app.state.cafe || {};
    var beans = cafe.beans || 0;
    var stars = cafe.stars || 0;
    return (
      '<header class="topbar"><div class="topbar-inner">' +
      '<a class="brand" href="#/" data-nav="dashboard"><span class="brand-mark">D</span><span>Deutsch<small>Learn German</small></span></a>' +
      '<nav class="nav">' +
      '<a href="#/" data-nav="dashboard" class="' + (active === "dashboard" ? "active" : "") + '">Today</a>' +
      '<a href="#/dictation" data-nav="dictation" class="' + (active === "dictation" ? "active" : "") + '">Dictation</a>' +
      '<a href="#/reader" data-nav="reader" class="' + (active === "reader" ? "active" : "") + '">Reader</a>' +
      '<a href="#/grammar" data-nav="grammar" class="' + (active === "grammar" ? "active" : "") + '">Grammar</a>' +
      '<a href="#/stats" data-nav="stats" class="' + (active === "stats" ? "active" : "") + '">Progress</a>' +
      '<a href="#/browse" data-nav="browse" class="' + (active === "browse" ? "active" : "") + '">Word List</a>' +
      '<a href="#/settings" data-nav="settings" class="' + (active === "settings" ? "active" : "") + '">Settings</a>' +
      "</nav>" +
      '<div class="wallet">' +
      '<button class="bean-pill" data-action="cafe" title="Taler — open the Christmas market" aria-label="Open Christmas market, ' + beans + " " + (beans === 1 ? "Taler" : "Taler") + '">' + icon("bean") + "<span>" + beans + "</span></button>" +
      '<button class="bean-pill star-pill" data-action="atelier" title="Grammar stars — open the atelier" aria-label="Open grammar atelier, ' + stars + " " + starWord(stars) + '">' + icon("star") + "<span>" + stars + "</span></button>" +
      "</div>" +
      '<button class="icon-btn" data-action="toggle-theme" aria-label="Toggle theme" title="Toggle theme">' +
      (document.documentElement.dataset.theme === "dark" ? icon("sun") : icon("moon")) +
      "</button>" +
      "</div></header>" +
      '<main class="shell">' + content + "</main>"
    );
  }

  function render() {
    var html;
    if (app.view === "learn" || location.hash.indexOf("#/learn") === 0) {
      html = renderLearn();
    } else if (app.view === "summary") {
      html = shell(renderSummary(), "dashboard");
    } else if (app.view === "browse") {
      html = shell(renderBrowse(), "browse");
    } else if (app.view === "stats") {
      html = shell(renderStats(), "stats");
    } else if (app.view === "cafe") {
      html = shell(renderCafe(), "cafe");
    } else if (app.view === "grammar") {
      html = shell(renderGrammar(), "grammar");
    } else if (app.view === "reader") {
      html = shell(renderReader(), "reader");
    } else if (app.view === "dictation") {
      html = shell(renderDictation(), "dictation");
    } else if (app.view === "settings") {
      html = shell(renderSettings(), "settings");
    } else {
      html = shell(renderDashboard(), "dashboard");
    }
    document.getElementById("app").innerHTML = html;
    if (app.view === "browse") {
      var input = document.querySelector(".search");
      if (input && document.activeElement !== input && app.browse.focus) {
        input.focus();
        var pos = input.value.length;
        input.setSelectionRange(pos, pos);
      }
    }
  }

  function renderDashboard() {
    var direction = app.dashboardDirection === "reverse" ? "reverse" : "forward";
    var isRev = direction === "reverse";
    var c = counts(direction);
    var settings = app.state.settings;
    var learned = Deck.count - c.newTotal;
    var learnedForward = Deck.count - counts("forward").newTotal;
    var learnedReverse = Deck.count - counts("reverse").newTotal;
    var totals = Store.totals(app.state, 30);
    var streak = app.state.streak.current || 0;
    var d = Store.today(app.state);
    var totalToday = (d.reviews || 0) + (d.reverseReviews || 0);
    var goal = Math.max(1, Number(settings.dailyGoal) || 20);
    var p = pct(totalToday, goal);
    var queue = buildQueue(direction);
    var forecast = Store.forecast(app.state, 7, Date.now(), direction);
    var maxF = Math.max.apply(
      null,
      forecast.map(function (x) {
        return x.count;
      }).concat([1])
    );
    var wod = Deck.todayCard();
    var dueNow = c.due + Math.min(c.newTotal, c.newAllowance);
    var ctaLabel = queue.length ? (isRev ? "Start recall session" : "Start recognition session") : "Practice 10 random words";
    var ctaAction = queue.length ? "start" : "practice";
    var bars = forecast
      .map(function (x) {
        var height = Math.max(4, Math.round((x.count / maxF) * 100));
        var label = new Date(x.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2);
        return '<div class="bar-col"><div class="bar" style="--h:' + height + '" title="' + x.count + ' due"></div><span>' + esc(label) + "</span></div>";
      })
      .join("");
    var cafe = app.state.cafe || { beans: 0, items: {}, totalEarned: 0 };
    var level = Store.cafeLevel(app.state);
    var itemCount = Cafe.items.filter(function (i) {
      return cafe.items && cafe.items[i.id];
    }).length;
    var wordsTouched = Deck.all.filter(function (card) {
      return app.state.cards[card.id].state !== "new" || app.state.reverseCards[card.id].state !== "new";
    }).length;
    var grammarProg = Store.grammarProgress(app.state);
    var grammarNext = grammarNextItem();
    var grammarStarStats = Store.grammarStars(app.state);
    var readingProg = Store.readingProgress(app.state);
    var readingNext = readerNextText();
    var dictStats = Store.dictationStats(app.state);
    var modeSwitch =
      '<div class="mode-switch">' +
      '<button class="mode-btn ' + (!isRev ? "active" : "") + '" data-action="set-direction" data-direction="forward">German → English<small>Recognition</small></button>' +
      '<button class="mode-btn ' + (isRev ? "active" : "") + '" data-action="set-direction" data-direction="reverse">English → German<small>Recall</small></button>' +
      "</div>";

    return (
      '<section class="hero">' +
      '<div class="hero-copy">' +
      modeSwitch +
      '<p class="eyebrow">' + esc(prettyDate()) + " · " + (isRev ? "recall mode" : "recognition mode") + "</p>" +
      "<h1>" + (isRev ? "See the meaning. <em>Recall the word.</em>" : esc(greeting()) + (greeting().slice(-1) === "?" ? " " : ". ") + "Ready to learn some <em>German</em>?") + "</h1>" +
      '<p class="lead">' +
      (isRev
        ? "Reverse mode uses a separate review schedule. You see the English meaning and produce the German word; audio plays after you reveal it. "
        : Deck.count.toLocaleString() + " German words and 28 visual grammar lessons. Vocabulary uses FSRS; grammar is a guided path. ") +
      (queue.length
        ? "You have <strong>" + c.due + "</strong> review" + (c.due === 1 ? "" : "s") + " and <strong>" + Math.min(c.newTotal, c.newAllowance) + "</strong> new card" + (Math.min(c.newTotal, c.newAllowance) === 1 ? "" : "s") + " ready."
        : "Nothing is due right now. Keep the streak alive with a short practice round.") +
      "</p>" +
      '<div class="hero-actions">' +
      '<button class="btn btn-primary btn-lg" data-action="' + ctaAction + '">' + esc(ctaLabel) + " " + icon("arrow") + "</button>" +
      '<button class="btn btn-soft btn-lg" data-action="reader">Reader</button>' +
      '<button class="btn btn-ghost btn-lg" data-action="grammar">Grammar path</button>' +
      "</div>" +
      "</div>" +
      '<aside class="today-card">' +
      '<div class="today-head"><div><h2>Today\'s goal</h2><p>' + esc(prettyDate()) + "</p></div>" +
      '<div class="ring" style="--p:' + p + '"><div class="ring-inner"><strong>' + (queue.length ? dueNow : "✓") + "</strong><span>" + (queue.length ? "cards left" : "all clear") + "</span></div></div>" +
      "</div>" +
      '<div class="today-list">' +
      '<div class="today-row"><span>Reviews due</span><strong>' + c.due + "</strong></div>" +
      '<div class="today-row"><span>New cards ready</span><strong>' + Math.min(c.newTotal, c.newAllowance) + "</strong></div>" +
      '<div class="today-row"><span>' + (isRev ? "Words recalled" : "Words recognized") + "</span><strong>" + learned.toLocaleString() + "</strong></div>" +
      '<div class="today-row"><span>Daily goal</span><strong>' + totalToday + " / " + goal + "</strong></div>" +
      "</div>" +
      '<button class="btn btn-primary today-cta" data-action="' + ctaAction + '">' + esc(ctaLabel) + "</button>" +
      "</aside>" +
      "</section>" +
      '<section class="stat-grid">' +
      '<div class="stat-card"><div class="stat-icon">' + icon("flame") + '</div><div><strong>' + streak + '</strong><span>day streak</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon teal">' + icon("book") + '</div><div><strong>' + learnedForward.toLocaleString() + '</strong><span>recognized</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon gold">' + icon("target") + '</div><div><strong>' + learnedReverse.toLocaleString() + '</strong><span>recalled</span></div></div>' +
      '<div class="stat-card"><div class="stat-icon green">' + icon("chart") + '</div><div><strong>' + (totals.reviews ? Math.round(totals.accuracy * 100) + "%" : "—") + '</strong><span>accuracy · 30d</span></div></div>' +
      "</section>" +
      '<section class="cafe-mini-strip">' +
      '<div class="cafe-mini-art">🎄</div>' +
      '<div><h2>Weihnachtsmarkt · Level ' + level + "</h2><p>" + (cafe.beans || 0) + " Taler · " + (cafe.visitors || 0) + " visitors waiting · " + itemCount + " / " + Cafe.items.length + " stalls</p></div>" +
      '<button class="btn btn-soft" data-action="cafe">Visit Christmas market ' + icon("arrow") + "</button>" +
      "</section>" +
      '<section class="cafe-mini-strip grammar-mini-strip">' +
      '<div class="cafe-mini-art">G</div>' +
      '<div><h2>Grammar path · ' + grammarProg.completed + " / " + grammarProg.total + " · ★ " + grammarStarStats.balance + "</h2><p>" + (grammarNext ? "Next: " + esc(grammarNext.title) + " · " + esc(grammarNext.pattern) : "All 28 lessons complete") + " · " + grammarStarStats.units + " / " + grammarStarStats.total + " unit stars</p></div>" +
      '<a class="btn btn-soft" href="#/grammar">Open grammar ' + icon("arrow") + "</a>" +
      "</section>" +
      '<section class="cafe-mini-strip reader-mini-strip">' +
      '<div class="cafe-mini-art">📖</div>' +
      '<div><h2>Reader · ' + readingProg.read + " / " + readingProg.total + " texts</h2><p>" + (readingNext ? "Next: " + esc(readingNext.title) + " · Level " + esc(String(readingNext.level)) + " · " + readerWordCount(readingNext) + " words" : "Every text read — revisit any level") + "</p></div>" +
      '<a class="btn btn-soft" href="#/reader">Open reader ' + icon("arrow") + "</a>" +
      "</section>" +
      '<section class="cafe-mini-strip dictation-mini-strip">' +
      '<div class="cafe-mini-art">🎧</div>' +
      '<div><h2>Dictation · ' + (dictStats.today ? dictStats.today + " today" : "train your ear") + "</h2><p>" + (dictStats.attempts ? Math.round(dictStats.accuracy * 100) + "% accuracy · " + dictStats.clean + " clean · best streak " + dictStats.bestStreak : "Recorded examples and generated daily-life sentences.") + "</p></div>" +
      '<button class="btn btn-soft" data-action="dictation-start" data-size="' + dictationSize() + '">Start dictation ' + icon("arrow") + "</button>" +
      "</section>" +
      '<section class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>Next 7 days · ' + (isRev ? "recall" : "recognition") + '</h2><span>' + forecast.reduce(function (a, b) { return a + b.count; }, 0) + ' scheduled</span></div><div class="bars">' + bars + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Word of the day</h2><span>' + esc(wod.gender_info || "Wort des Tages") + '</span></div><div class="word-of-day">' +
      '<div class="wod-word">' + esc(wod.word) + "</div>" +
      '<div class="wod-meta"><span>' + esc(wod.romanization) + "</span>" +
      '<button class="speaker small soft" data-action="play-card-word" data-id="' + esc(wod.id) + '" aria-label="Play word">' + icon("speaker", 17) + "</button></div>" +
      '<div class="wod-meaning">' + esc(wod.meaning_en) + "</div>" +
      '<div class="wod-example">' + esc(wod.example_ko) + "<br>" + esc(wod.example_en) + "</div>" +
      "</div></div>" +
      "</section>"
    );
  }

  function renderLearn() {
    if (!app.current) {
      if (app.session && app.session.queue.length) {
        showNext();
        if (app.current) return renderLearn();
      }
      return '<main class="study-wrap"><p class="muted">Loading…</p></main>';
    }
    var s = app.session || { done: 0, queue: [], correct: 0, wrong: 0, direction: "forward", beans: 0 };
    var direction = s.direction === "reverse" ? "reverse" : "forward";
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var currentOpen = app.mode === "front" || app.mode === "back" || app.mode === "mcq";
    var total = s.done + s.queue.length + (currentOpen ? 1 : 0);
    var progress = total ? Math.round((s.done / total) * 100) : 0;
    var statusClass = Deck.status(map[app.current.id]);
    var status = Deck.statusLabel(map[app.current.id]);
    var c = app.current;
    var content;

    if (app.mode === "front") content = renderFront(c, status, statusClass, direction);
    else if (app.mode === "back") content = renderBack(c, true, direction);
    else if (app.mode === "mcq") content = renderMCQ(c, direction);
    else content = renderResult(c, direction);
    var audioButton =
      direction === "forward" || app.mode === "back" || app.mode === "result"
        ? '<button class="icon-btn" data-action="replay-word" aria-label="Replay word">' + icon("speaker") + "</button>"
        : '<span style="width:38px"></span>';

    return (
      '<main class="study-wrap">' +
      '<div class="study-top">' +
      '<button class="icon-btn" data-action="exit" aria-label="Exit study">' + icon("back") + "</button>" +
      '<div class="study-progress"><div class="track"><div class="fill" style="width:' + progress + '%"></div></div>' +
      '<div class="meta"><span>' + s.done + " done · " + s.queue.length + " left</span><span>" + (direction === "reverse" ? "Recall" : "Recognize") + " · " + (s.beans || 0) + " Taler · " + (s.visitors || 0) + " visitors</span></div></div>" +
      audioButton +
      "</div>" +
      '<div class="study-card' + (app.mode === "front" ? "" : " no-enter") + '">' + content + "</div>" +
      '<div class="study-footer"><span class="muted">Space to reveal / next · 1–4 to choose · A word audio · S example audio · Esc to exit</span>' +
      '<button class="btn btn-ghost btn-sm" data-action="exit">End session</button></div>' +
      "</main>"
    );
  }

  function renderFront(c, status, statusClass, direction) {
    var reverse = direction === "reverse";
    return (
      '<div class="card-stage">' +
      '<div class="card-kicker"><span class="pill ' + (statusClass || status) + '">' + esc(status) + "</span><span>" + (reverse ? "English → German · recall" : "German → English · recognize") + "</span></div>" +
      '<div class="word ' + (reverse ? "prompt-en" : "") + '">' + esc(reverse ? c.meaning_en : c.word) + "</div>" +
      (reverse
        ? '<p class="reverse-prompt-note">Recall the German word. Audio stays hidden until you reveal the answer.</p>'
        : app.state.settings.showRomanization
        ? '<div class="word-rom">' + esc(c.romanization) + "</div>"
        : "") +
      (reverse ? "" : '<button class="speaker" data-action="replay-word" aria-label="Play word">' + icon("speaker", 24) + "</button>") +
      '<p class="hint">' + (reverse ? "Say the German word out loud, then reveal — or test yourself." : "Say it out loud, then reveal the meaning — or test yourself with a quick multiple choice.") + "</p>" +
      '<div class="front-actions">' +
      '<button class="btn btn-primary btn-lg" data-action="flip">Show answer</button>' +
      '<button class="btn btn-ghost btn-lg" data-action="mcq">I know it · test me</button>' +
      "</div></div>"
    );
  }

  function autoWordParts(card) {
    var base = String(card.lemma || "").replace(/^\([^)]*\)\s*/, "").trim();
    if (base.length < 6) return null;
    var lower = base.toLowerCase();
    var rules = [
      ["keit", "-keit = noun suffix"],
      ["heit", "-heit = noun suffix"],
      ["schaft", "-schaft = noun suffix"],
      ["ung", "-ung = noun suffix"],
      ["chen", "-chen = small / diminutive"],
      ["lich", "-lich = adjective suffix"],
      ["isch", "-isch = adjective suffix"],
    ];
    for (var i = 0; i < rules.length; i++) {
      var suffix = rules[i][0];
      if (lower.length > suffix.length + 2 && lower.slice(-suffix.length) === suffix) {
        return [
          { text: base.slice(0, -suffix.length), type: "root", note: "stem of " + base },
          { text: base.slice(-suffix.length), type: "suffix", note: rules[i][1] },
        ];
      }
    }
    if (card.gender === "f." && lower.slice(-2) === "in" && lower.length > 5) {
      return [
        { text: base.slice(0, -2), type: "root", note: "stem of " + base },
        { text: "in", type: "suffix", note: "-in = female person" },
      ];
    }
    return null;
  }

  function wordPartsFor(card) {
    var map = window.WORD_PARTS || {};
    if (!card) return null;
    var candidates = [card.lemma, card.word];
    var base = String(card.lemma || "").replace(/^\([^)]*\)\s*/, "").trim();
    if (base) candidates.push(base);
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] && map[candidates[i]]) return map[candidates[i]];
    }
    return autoWordParts(card);
  }

  function renderWordParts(card) {
    var parts = wordPartsFor(card);
    if (!parts || !parts.length) return "";
    return (
      '<div class="word-parts">' +
      '<div class="word-parts-head"><strong>Word building</strong><span>tap a part</span></div>' +
      '<div class="word-parts-chain">' +
      parts
        .map(function (part, i) {
          return (
            (i ? '<span class="word-part-plus">+</span>' : "") +
            '<button class="word-part word-part-' + esc(part.type) + '" data-action="word-part" data-part="' + esc(part.text) + '" data-note="' + esc(part.note) + '">' + esc(part.text) + "</button>"
          );
        })
        .join("") +
      "</div>" +
      '<p class="word-part-note">Tap a coloured part to see what it means.</p>' +
      '<div class="word-part-legend"><span class="word-part-key prefix">prefix</span><span class="word-part-key root">root</span><span class="word-part-key suffix">suffix</span><span class="word-part-key compound">compound</span></div>' +
      "</div>"
    );
  }

  function hanjaChip(c) {
    if (!app.state.settings.showHanja || !c.gender_info) return "";
    return '<div class="hanja-chip"><b>' + esc(c.gender_info) + "</b></div>";
  }

  function renderBack(c, rating, direction) {
    var reverse = direction === "reverse";
    var answerMain = reverse
      ? '<div class="answer-main"><div><div class="answer-word">' + esc(c.word) + "</div>" +
        '<div class="answer-word-rom">' + esc(c.romanization) + "</div>" +
        '<div class="meaning" style="font-size:1.05rem;margin-top:10px">' + esc(c.meaning_en) + "</div>" +
        (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
        "</div>" + hanjaChip(c) + "</div>"
      : '<div class="answer-main"><div><div class="meaning">' + esc(c.meaning_en) + "</div>" +
        (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
        "</div>" + hanjaChip(c) + "</div>";
    return (
      '<div class="card-stage" style="align-items:stretch;text-align:left">' +
      '<div class="answer">' +
      answerMain +
      '<div class="example-box"><button class="speaker small" data-action="replay-example" aria-label="Play example">' + icon("speaker", 18) + "</button>" +
      '<div><div class="example-ko">' + esc(c.example_ko) + "</div>" +
      (app.state.settings.showRomanization ? '<div class="example-rom">' + esc(c.example_romanization) + "</div>" : "") +
      '<div class="example-en">' + esc(c.example_en) + "</div></div></div>" +
      renderWordParts(c) +
      (rating ? renderRating(c, direction) : "") +
      "</div></div>"
    );
  }

  function renderRating(c, direction) {
    var map = direction === "reverse" ? app.state.reverseCards : app.state.cards;
    var preview = FSRS.preview(map[c.id] || FSRS.newCard(c.id));
    var labels = ["Again", "Hard"];
    var classes = ["again", "hard"];
    return (
      '<div><div class="rating-label">How well did you know it?</div><div class="rating-row two">' +
      preview
        .slice(0, 2)
        .map(function (p, i) {
          return '<button class="rate-btn ' + classes[i] + '" data-action="rate" data-grade="' + (i + 1) + '">' + labels[i] + "<small>" + FSRS.formatInterval(p.intervalDays) + "</small></button>";
        })
        .join("") +
      '</div><p class="rating-hint">Know it well? Use “I know it · test me” instead — Good and Easy are earned in the quiz.</p></div>'
    );
  }

  function renderMCQ(c, direction) {
    var reverse = direction === "reverse";
    var m = app.mcq || (reverse ? Deck.getReverseOptions(c) : Deck.getOptions(c));
    return (
      '<div class="card-stage">' +
      '<div class="card-kicker"><span>Multiple choice</span><span>' + (reverse ? "Which German word means this?" : "What does this word mean?") + "</span></div>" +
      '<div class="word ' + (reverse ? "prompt-en" : "") + '">' + esc(reverse ? c.meaning_en : c.word) + "</div>" +
      (!reverse && app.state.settings.showRomanization ? '<div class="word-rom">' + esc(c.romanization) + "</div>" : "") +
      '<div class="options">' +
      m.options
        .map(function (o, i) {
          return '<button class="option" data-action="option" data-index="' + i + '"><span class="key">' + (i + 1) + "</span>" + esc(o) + "</button>";
        })
        .join("") +
      "</div></div>"
    );
  }

  function renderResult(c, direction) {
    var last = app.last || { correct: false, dueLabel: "", grade: 3, mode: "back" };
    var isMCQ = last.mode === "mcq" || (app.mcq && last.selectedIndex != null);
    var beans = last.beans ? '<span class="pill" style="margin-left:8px;background:var(--surface-2);color:var(--gold)">+' + last.beans + " Taler</span>" : "";
    var visitorsPill = last.visitors ? '<span class="pill" style="margin-left:6px;background:var(--teal-soft);color:var(--teal)">+' + last.visitors + " visitor" + (last.visitors === 1 ? "" : "s") + "</span>" : "";
    var againRating = Number(last.grade) === 1 && last.mode !== "mcq";
    var banner = againRating
      ? '<div class="result-banner again">' + icon("clock") + "Again — this card will come back in a few cards." + beans + visitorsPill + "</div>"
      : last.correct
      ? '<div class="result-banner good">' + icon("check") + "Correct — next review in " + esc(last.dueLabel) + beans + visitorsPill + "</div>"
      : '<div class="result-banner bad">' + icon("x") + "Not quite — this card will come back in a few cards." + beans + visitorsPill + "</div>";
    var options = "";
    if (isMCQ && app.mcq) {
      options =
        '<div class="options">' +
        app.mcq.options
          .map(function (o, i) {
            var cls = "";
            var mark = "";
            if (i === app.mcq.correctIndex) {
              cls = " correct";
              mark = '<span class="mark">' + icon("check") + "</span>";
            } else if (i === last.selectedIndex) {
              cls = " wrong";
              mark = '<span class="mark">' + icon("x") + "</span>";
            }
            return '<button class="option' + cls + '" disabled><span class="key">' + (i + 1) + "</span>" + esc(o) + mark + "</button>";
          })
          .join("") +
        "</div>";
    }
    return (
      '<div class="card-stage" style="align-items:stretch;text-align:left">' +
      banner +
      options +
      renderBack(c, false, direction) +
      '<div class="study-footer" style="margin-top:4px"><span class="muted">' + (last.mode === "back" ? (last.correct ? "Next word in 1s…" : "This card will return soon. Next word in 1s…") : (last.correct ? "Keep going." : "This card will return soon. Next word in 1s…")) + '</span><button class="btn btn-primary" data-action="next">' + (last.mode === "back" || !last.correct ? "Next now" : "Next") + " " + icon("arrow") + "</button></div>" +
      "</div>"
    );
  }

  function renderSummary() {
    var s = app.summary;
    if (!s) return "";
    var total = s.done;
    var accuracy = total ? Math.round((s.correct / total) * 100) : 0;
    var secs = Math.max(1, Math.round(((s.end || Date.now()) - s.start) / 1000));
    var direction = s.direction === "reverse" ? "reverse" : "forward";
    var missed = s.missed
      .map(function (id) {
        return Deck.byId[id];
      })
      .filter(Boolean)
      .slice(0, 8);
    var moreAction = buildQueue(direction).length ? "start" : "practice";
    var moreLabel = moreAction === "start" ? "Study more" : "Practice 10";
    return (
      '<div class="summary-card">' +
      '<p class="eyebrow">' + (direction === "reverse" ? "Recall session complete" : "Recognition session complete") + "</p>" +
      "<h1>" + (s.practice ? "Nice practice." : "Well done.") + "</h1>" +
      "<p>You studied " + total + " card" + (total === 1 ? "" : "s") + " in " + approxTime(secs) + ", earned <strong>" + (s.beans || 0) + " Taler</strong> and attracted <strong>" + (s.visitors || 0) + " visitor" + ((s.visitors || 0) === 1 ? "" : "s") + "</strong> to the Christmas market.</p>" +
      '<div class="summary-stats">' +
      '<div class="summary-stat"><strong>' + total + "</strong><span>cards</span></div>" +
      '<div class="summary-stat"><strong>' + accuracy + "%</strong><span>accuracy</span></div>" +
      '<div class="summary-stat"><strong>' + s.newDone + "</strong><span>new words</span></div>" +
      '<div class="summary-stat"><strong>' + (s.beans || 0) + "</strong><span>Taler</span></div>" +
      '<div class="summary-stat"><strong>' + (s.visitors || 0) + "</strong><span>visitors</span></div>" +
      "</div>" +
      (missed.length
        ? '<div class="missed-list"><div class="rating-label" style="text-align:left">Worth another look</div>' +
          missed
            .map(function (m) {
              return '<div class="missed-row"><strong>' + esc(m.word) + "</strong><span>" + esc(m.meaning_en) + "</span></div>";
            })
            .join("") +
          "</div>"
        : "") +
      '<div class="hero-actions" style="justify-content:center">' +
      '<button class="btn btn-primary btn-lg" data-action="home">Back to today</button>' +
      (missed.length ? '<button class="btn btn-soft btn-lg" data-action="review-missed">Review missed</button>' : "") +
      '<button class="btn btn-ghost btn-lg" data-action="' + moreAction + '">' + moreLabel + "</button>" +
      '<button class="btn btn-soft btn-lg" data-action="cafe">Visit Christmas market</button>' +
      "</div></div>"
    );
  }

  function renderCafe() {
    var cafe = app.state.cafe || {};
    var level = Store.cafeLevel(app.state);
    var reputation = Number(cafe.reputation) || 0;
    var intoLevel = reputation % 50;
    var levelPct = Math.round((intoLevel / 50) * 100);
    var owned = cafe.items || {};
    var upgrades = cafe.upgrades || {};
    var beans = Number(cafe.beans) || 0;
    var stock = Math.max(0, Math.floor(Number(cafe.stock) || 0));
    var visitors = Math.max(0, Math.floor(Number(cafe.visitors) || 0));
    var stockCap = Store.marketStockCap(app.state);
    var yieldPer = Store.marketYield(app.state);
    var stars = Number(cafe.stars) || 0;
    var starStats = Store.grammarStars(app.state);
    var charms = cafe.charms || {};
    var charmCount = Object.keys(charms).length;
    var ownedCount = Cafe.items.filter(function (i) {
      return !!owned[i.id];
    }).length;
    var today = Store.dateKey();
    var servedToday = cafe.lastMarketDay === today ? Number(cafe.servedToday) || 0 : 0;
    var revenueToday = cafe.lastMarketDay === today ? Number(cafe.revenueToday) || 0 : 0;
    var report = cafe.lastMarketReport;
    var canServe = visitors > 0 && stock > 0;
    var stockSpace = Math.max(0, stockCap - stock);
    var buyQty = Math.min(Cafe.supplyPack, stockSpace);
    var buyCost = Math.ceil((buyQty * Cafe.supplyCost) / Cafe.supplyPack);
    var cafeQueue = buildQueue(app.dashboardDirection);
    var studyAction = cafeQueue.length ? "start" : "practice";

    var shop = Cafe.items
      .map(function (item) {
        var has = !!owned[item.id];
        var itemLevel = Math.max(1, Math.min(5, Number(upgrades[item.id]) || 1));
        var locked = level < item.level;
        var action;
        var price = item.cost;
        var levelNote = "";
        if (!has) {
          action = locked
            ? '<span class="pill">Reputation level ' + item.level + "</span>"
            : '<button class="btn ' + (beans >= item.cost ? "btn-soft" : "btn-ghost") + '" data-action="buy-item" data-item="' + item.id + '"' + (beans >= item.cost ? "" : " disabled") + ">Buy</button>";
        } else if (itemLevel >= 5) {
          action = '<span class="pill mature">Max level</span>';
          price = null;
        } else {
          var required = item.level + itemLevel;
          var cost = Store.upgradeCost(item, itemLevel);
          price = cost;
          var canUpgrade = level >= required && beans >= cost;
          levelNote = level < required ? "Needs reputation level " + required : "Level " + itemLevel + " / 5";
          action = '<button class="btn ' + (canUpgrade ? "btn-soft" : "btn-ghost") + '" data-action="upgrade-item" data-item="' + item.id + '"' + (canUpgrade ? "" : " disabled") + ">Upgrade</button>";
        }
        return (
          '<div class="shop-card ' + (has ? "owned" : "") + " " + (locked ? "locked" : "") + '">' +
          '<div class="shop-icon">' + item.icon + "</div>" +
          "<h3>" + esc(item.name) + "</h3>" +
          "<p>" + esc(item.desc) + "</p>" +
          '<div class="shop-level">' + (has ? "Level " + itemLevel + " / 5" : levelNote || "Not built") + "</div>" +
          '<div class="shop-meta">' + (price == null ? "" : '<span class="cost">' + icon("bean") + price + "</span>") + action + "</div>" +
          "</div>"
        );
      })
      .join("");

    var charmCards = (Cafe.charms || [])
      .map(function (item) {
        var has = !!charms[item.id];
        var can = stars >= item.stars && beans >= item.beans;
        var action = has
          ? '<span class="pill mature">Synthesized</span>'
          : '<button class="btn ' + (can ? "btn-soft" : "btn-ghost") + '" data-action="synth-item" data-item="' + item.id + '" title="Costs ' + item.stars + ' stars and ' + item.beans + ' Taler"' + (can ? "" : " disabled") + ">Synthesize</button>";
        return (
          '<div class="shop-card charm-card ' + (has ? "owned" : "") + '">' +
          '<div class="charm-glyph" style="background:' + esc(item.color) + '">' + esc(item.glyph) + "</div>" +
          "<h3>" + esc(item.name) + "</h3>" +
          "<p>" + esc(item.desc) + "</p>" +
          '<div class="shop-meta"><span class="cost">' + icon("star") + item.stars + " · " + icon("bean") + item.beans + "</span>" + action + "</div>" +
          "</div>"
        );
      })
      .join("");

    var reportHtml = report
      ? '<div class="market-report"><div class="market-report-head"><strong>Last market day</strong><span>' + (report.levelAfter > report.levelBefore ? "Level up! → " + report.levelAfter : "Level " + (report.levelAfter || level)) + '</span></div>' +
        '<div class="market-report-grid"><span><b>+' + report.revenue + '</b> Taler</span><span><b>' + report.served + '</b> served</span><span><b>' + report.missed + '</b> missed</span><span><b>+' + report.reputation + '</b> reputation</span></div></div>'
      : "";

    return (
      '<div class="cafe-page">' +
      '<div class="page-head"><div><p class="eyebrow">Market office</p><h1>Weihnachtsmarkt</h1><p>Reviews attract visitors. Serve the queue, restock the stalls, and build a market worth visiting.</p></div>' +
      '<div class="cafe-wallet">' +
      '<div class="bean-pill" style="font-size:14px;padding:10px 14px">' + icon("bean") + " " + beans.toLocaleString() + " Taler</div>" +
      '<div class="bean-pill" style="font-size:14px;padding:10px 14px">👥 ' + visitors + " waiting</div>" +
      '<div class="bean-pill star-pill" style="font-size:14px;padding:10px 14px">' + icon("star") + " " + stars + " " + starWord(stars) + "</div>" +
      "</div></div>" +
      '<div class="cafe-layout">' +
      "<div>" +
      Cafe.scene(owned, visitors, level, charms, upgrades) +
      '<div class="cafe-scene-footer"><div><strong>Level ' + level + "</strong><span> · " + visitors + " visitors · " + stock + " / " + stockCap + " supplies · " + ownedCount + " / " + Cafe.items.length + " stalls</span></div>" +
      '<button class="btn btn-ghost btn-sm" data-action="' + studyAction + '">Study for more visitors ' + icon("arrow") + "</button></div>" +
      '<div class="market-operation">' +
      '<div class="market-op-head"><div><p class="eyebrow">Today\'s market</p><h2>Open the stalls</h2></div><span class="market-level-pill">Level ' + level + '</span></div>' +
      '<div class="market-stat-grid">' +
      '<div class="market-stat"><strong>' + visitors + "</strong><span>visitors waiting</span></div>" +
      '<div class="market-stat"><strong>' + stock + "</strong><span>supplies</span></div>" +
      '<div class="market-stat"><strong>' + yieldPer + "</strong><span>Taler / visitor</span></div>" +
      '<div class="market-stat"><strong>' + servedToday + "</strong><span>served today</span></div>" +
      "</div>" +
      '<div class="market-actions">' +
      '<button class="btn btn-primary" data-action="serve-market"' + (canServe ? "" : " disabled") + ">" + (visitors > 0 && stock === 0 ? "Buy supplies first" : "Serve " + Math.min(visitors, stock) + " visitors") + "</button>" +
      '<button class="btn btn-soft" data-action="buy-stock"' + (buyQty > 0 && beans >= buyCost ? "" : " disabled") + ">" + (buyQty > 0 ? "Buy " + buyQty + " supplies · " + buyCost + " Taler" : "Stockroom full") + "</button>" +
      "</div>" +
      '<p class="market-help">' + (visitors === 0 ? "No visitors yet — study a few cards to attract a crowd." : stock === 0 ? "The shelves are empty. Buy supplies before serving visitors." : "Each visitor buys one supply and pays " + yieldPer + " Taler. Missed visitors are lost.") + "</p>" +
      '<div class="level-line"><div class="level-track"><div class="level-fill" style="width:' + levelPct + '%"></div></div><div class="level-meta"><span>Reputation ' + reputation + '</span><span>' + intoLevel + " / 50 to level " + (level + 1) + "</span></div></div>" +
      reportHtml +
      "</div>" +
      '<div class="market-today"><span>Today: ' + servedToday + " served · " + revenueToday + " Taler earned · " + stock + " supplies left</span><span>Every review attracts a visitor; correct answers add a Taler.</span></div>" +
      "</div>" +
      '<div class="cafe-side">' +
      '<div class="cafe-balance">' +
      '<div class="row"><div><h2>Your wallet</h2><p>Taler from market sales; stars from grammar units.</p></div><div class="beans-big">' + icon("bean") + beans.toLocaleString() + "</div></div>" +
      '<div class="level-line"><div class="level-track"><div class="level-fill" style="width:' + levelPct + '%"></div></div>' +
      '<div class="level-meta"><span>Market level ' + level + "</span><span>" + intoLevel + " / 50 reputation</span></div></div>" +
      '<div class="cafe-star-balance"><span>' + icon("star") + " " + stars + " grammar " + starWord(stars) + "</span><span>" + starStats.units + " / " + starStats.total + " units complete</span></div>" +
      '<p class="about-box" style="margin:14px 0 0">Correct review +1 Taler · card +1 visitor · new card +1 visitor<br>First review +5 visitors · daily goal +10 visitors<br>Serve visitors to earn Taler and reputation.</p>' +
      "</div>" +
      '<div class="shop-panel"><h2>Build & upgrade the market</h2><p>Stalls increase your income and stock capacity. Upgrades need reputation, so keep serving.</p><div class="shop-grid">' + shop + "</div></div>" +
      "</div>" +
      "</div>" +
      '<div class="shop-panel atelier-panel" id="atelier"><div class="panel-head"><h2>Grammar atelier</h2><span>' + stars + " " + starWord(stars) + " · " + starStats.units + " / " + starStats.total + " units</span></div>" +
      '<p class="atelier-intro">Complete a whole grammar unit to earn a star. Synthesize permanent study charms with stars and Taler; each one appears on the Christmas market wall.</p>' +
      '<div class="charm-grid">' + charmCards + "</div>" +
      '<div class="atelier-foot"><button class="btn btn-ghost btn-sm" data-action="grammar">Open grammar path ' + icon("arrow") + '</button><span class="muted">' + charmCount + " / " + Cafe.charms.length + " charms synthesized</span></div></div>" +
      "</div>"
    );
  }

  function dictationSize() {
    return Math.max(5, Math.min(20, Number(app.state.dictation && app.state.dictation.sessionSize) || 10));
  }

  function playDictation(slow) {
    var d = app.dictation;
    if (!d || !d.current || app.view !== "dictation") return;
    var base = Number(app.state.settings.audioRate) || 0.94;
    var rate = slow ? Math.min(0.76, base) : base;
    playAudio(Deck.audioFor(d.current.de) || "tts:" + d.current.de, rate);
  }

  function startDictation(size) {
    if (!window.Dictation) {
      toast("Dictation could not load — refresh the page.");
      return;
    }
    size = Math.max(5, Math.min(20, Number(size) || dictationSize()));
    var recent = Store.dictationStats(app.state).recent;
    var queue = window.Dictation.buildSession(size, recent);
    if (!queue.length) {
      toast("No dictation sentences are available yet.");
      return;
    }
    app.state.dictation.sessionSize = size;
    Store.save(app.state);
    readerStop();
    app.dictation = {
      queue: queue,
      index: 0,
      current: queue[0],
      checked: false,
      result: null,
      hinted: false,
      input: "",
      correctCount: 0,
      cleanCount: 0,
      missed: [],
      beans: 0,
      visitors: 0,
      startedAt: Date.now(),
      shownAt: Date.now(),
      finished: false,
      lastReward: null,
    };
    app.view = "dictation";
    if (location.hash !== "#/dictation") location.hash = "#/dictation";
    else render();
    setTimeout(function () {
      playDictation(false);
      var input = document.querySelector("[data-role='dictation-input']");
      if (input) input.focus();
    }, 180);
  }

  function checkDictation() {
    var d = app.dictation;
    if (!d || !d.current || d.checked) return;
    var input = document.querySelector("[data-role='dictation-input']");
    var value = input ? input.value : d.input;
    if (!value || !value.trim()) {
      toast("Type the sentence you hear first.");
      if (input) input.focus();
      return;
    }
    var result = window.Dictation.check(d.current.de, value);
    var reward = Store.recordDictation(app.state, {
      correct: result.correct,
      hinted: d.hinted,
      de: d.current.de,
      hash: d.current.hash,
    });
    d.checked = true;
    d.result = result;
    d.input = value;
    d.lastReward = reward;
    d.beans += reward.beans;
    d.visitors += reward.visitors;
    if (result.correct) d.correctCount += 1;
    if (result.correct && !d.hinted) d.cleanCount += 1;
    if (!result.correct || d.hinted) {
      d.missed.push({
        de: d.current.de,
        en: d.current.en,
        correct: result.correct,
        hinted: d.hinted,
      });
    }
    render();
    setTimeout(function () {
      var next = document.querySelector("[data-action='dictation-next']");
      if (next) next.focus();
    }, 40);
  }

  function nextDictation() {
    var d = app.dictation;
    if (!d) return;
    if (!d.checked) {
      checkDictation();
      return;
    }
    if (d.index + 1 >= d.queue.length) {
      d.finished = true;
      readerStop();
      render();
      return;
    }
    d.index += 1;
    d.current = d.queue[d.index];
    d.checked = false;
    d.result = null;
    d.hinted = false;
    d.input = "";
    d.shownAt = Date.now();
    d.lastReward = null;
    render();
    setTimeout(function () {
      playDictation(false);
      var input = document.querySelector("[data-role='dictation-input']");
      if (input) input.focus();
    }, 160);
  }

  function exitDictation() {
    readerStop();
    app.dictation = null;
    render();
  }

  function dictationSizeButtons(size) {
    return [5, 10, 20]
      .map(function (n) {
        return '<button class="dictation-size-btn ' + (n === size ? "active" : "") + '" data-action="dictation-size" data-size="' + n + '">' + n + "</button>";
      })
      .join("");
  }

  function dictationLanding() {
    var stats = Store.dictationStats(app.state);
    var size = dictationSize();
    var recorded = window.Dictation ? window.Dictation.coreCount() + window.Dictation.fixedCount() : 0;
    var recent = stats.recent.slice(0, 6);
    var recentHtml = recent.length
      ? recent
          .map(function (item) {
            var good = item.correct && !item.hinted;
            var when = new Date(item.at || Date.now()).toLocaleDateString(undefined, { month: "short", day: "numeric" });
            return (
              '<div class="dictation-recent-row">' +
              '<span class="dictation-dot ' + (good ? "good" : "bad") + '"></span>' +
              '<div class="dictation-recent-text"><strong>' + esc(item.de) + "</strong><span>" + (item.hinted ? "with hint" : good ? "clean" : "needs review") + " · " + when + "</span></div>" +
              '<button class="speaker small soft" data-action="dictation-say" data-text="' + esc(item.de) + '" aria-label="Play sentence">' + icon("speaker", 15) + "</button>" +
              "</div>"
            );
          })
          .join("")
      : '<div class="empty">Your first session will appear here.</div>';
    return (
      '<div class="dictation-page">' +
      '<div class="page-head dictation-head"><div><p class="eyebrow">Listening lab · Diktat</p><h1>Dictation</h1><p>Hear a German sentence, type what you hear, and check it word by word.</p></div><div class="dictation-head-art">🎧</div></div>' +
      '<section class="dictation-hero">' +
      '<div class="dictation-hero-main"><p class="eyebrow">Comprehensible input</p><h2>Train your ear with everyday German</h2>' +
      '<p>Short recorded examples and thousands of generated daily-life sentences. Every answer shows the German sentence, the English meaning, and the words you missed.</p>' +
      '<div class="dictation-size-row"><span>Session length</span><div class="dictation-size-options">' + dictationSizeButtons(size) + "</div></div>" +
      '<button class="btn btn-primary btn-lg" data-action="dictation-start" data-size="' + size + '">Start dictation ' + icon("arrow") + "</button>" +
      "</div>" +
      '<div class="dictation-stat-grid">' +
      '<div class="dictation-stat"><strong>' + stats.attempts + "</strong><span>sentences</span></div>" +
      '<div class="dictation-stat"><strong>' + (stats.attempts ? Math.round(stats.accuracy * 100) + "%" : "—") + "</strong><span>accuracy</span></div>" +
      '<div class="dictation-stat"><strong>' + stats.clean + "</strong><span>clean answers</span></div>" +
      '<div class="dictation-stat"><strong>' + stats.bestStreak + "</strong><span>best streak</span></div>" +
      "</div>" +
      "</section>" +
      '<section class="dictation-features">' +
      '<div class="dictation-feature"><span>🎙️</span><div><strong>' + recorded + " recorded sentences</strong><p>Natural Tanja audio from the vocabulary examples and daily phrases.</p></div></div>" +
      '<div class="dictation-feature"><span>🧩</span><div><strong>Thousands of combinations</strong><p>Generated from your A1 words with controlled grammar and daily-life situations.</p></div></div>' +
      '<div class="dictation-feature"><span>⌨️</span><div><strong>Tolerant checking</strong><p>Capitalisation and punctuation are forgiving; umlauts can be typed as ae, oe, ue.</p></div></div>' +
      "</section>" +
      '<section class="panel dictation-recent-panel"><div class="panel-head"><h2>Recent dictation</h2><span>' + (stats.today ? stats.today + " today" : "not started today") + '</span></div><div class="dictation-recent-list">' + recentHtml + "</div></section>" +
      "</div>"
    );
  }

  function dictationResultHtml(d) {
    var r = d.result;
    if (!r) return "";
    var expected = r.expected
      .map(function (word) {
        return '<span class="diff-word ' + (word.ok ? "ok" : "miss") + '">' + esc(word.text) + "</span>";
      })
      .join(" ");
    var actual = r.actual.length
      ? r.actual
          .map(function (word) {
            return '<span class="diff-word ' + (word.ok ? "ok" : "extra") + '">' + esc(word.text) + "</span>";
          })
          .join(" ")
      : '<span class="diff-empty">—</span>';
    var chips = (d.current.words || [])
      .slice(0, 6)
      .map(function (word) {
        return '<button class="dictation-word" data-action="dictation-say" data-text="' + esc(word.de) + '"><strong>' + esc(word.de) + "</strong><span>" + esc(word.en) + "</span></button>";
      })
      .join("");
    return (
      '<div class="dictation-result ' + (r.correct ? "good" : "bad") + '" aria-live="polite">' +
      '<div class="dictation-verdict">' +
      '<span class="dictation-verdict-icon">' + (r.correct ? icon("check") : icon("x")) + "</span>" +
      "<div><strong>" + (r.correct ? "Exactly right" : "Not quite yet") + "</strong><span>" + (r.correct ? "You caught every word." : Math.round(r.score * 100) + "% word match — compare the highlights.") + "</span></div>" +
      "</div>" +
      '<div class="dictation-diff"><div class="diff-row"><span>Correct</span><div>' + expected + "</div></div>" +
      '<div class="diff-row"><span>You wrote</span><div>' + actual + "</div></div></div>" +
      '<div class="dictation-translation"><span>English</span><p>' + esc(d.current.en) + "</p></div>" +
      (chips ? '<div class="dictation-words"><span>Words in this sentence</span><div>' + chips + "</div></div>" : "") +
      '<div class="dictation-reward"><span>+' + (d.lastReward ? d.lastReward.beans : 0) + " Taler</span><span>+" + (d.lastReward ? d.lastReward.visitors : 0) + " market visitors</span></div>" +
      "</div>"
    );
  }

  function dictationSession() {
    var d = app.dictation;
    var total = d.queue.length;
    var progress = Math.round(((d.index + (d.checked ? 1 : 0)) / total) * 100);
    var recorded = !!Deck.audioFor(d.current.de);
    return (
      '<div class="dictation-page dictation-live">' +
      '<div class="dictation-toolbar"><button class="btn btn-ghost btn-sm" data-action="dictation-exit">' + icon("back") + " Exit</button>" +
      '<div class="dictation-progress"><div class="level-track"><div class="level-fill" style="width:' + progress + '%"></div></div><span>' + (d.index + 1) + " / " + total + "</span></div>" +
      '<div class="dictation-session-meta"><span>' + d.correctCount + " correct</span><span>" + d.cleanCount + " clean</span></div></div>" +
      '<section class="dictation-card">' +
      '<div class="dictation-card-head"><div><p class="eyebrow">Sentence ' + (d.index + 1) + " of " + total + '</p><h2>Listen and type</h2></div><span class="pill ' + (recorded ? "mature" : "") + '">' + (recorded ? "Recorded voice" : "Browser voice") + "</span></div>" +
      '<div class="dictation-audio-row"><button class="dictation-play" data-action="dictation-play" aria-label="Play sentence">' + icon("speaker", 26) + "<span>Play sentence</span></button>" +
      '<button class="btn btn-ghost btn-sm" data-action="dictation-slow">Play slower</button>' +
      '<span class="dictation-audio-note">' + (recorded ? "Tanja · natural speed" : "Uses your browser's German voice") + "</span></div>" +
      '<label class="dictation-input-wrap"><span>Type what you hear</span><textarea data-role="dictation-input" rows="3" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Schreibe den Satz auf Deutsch …"' + (d.checked ? " disabled" : "") + ">" + esc(d.input || "") + "</textarea></label>" +
      '<div class="dictation-actions">' +
      (!d.checked
        ? '<button class="btn btn-ghost" data-action="dictation-hint">' + (d.hinted ? "English hint shown" : "Show English hint") + '</button><button class="btn btn-primary" data-action="dictation-check">Check sentence</button>'
        : '<button class="btn btn-ghost" data-action="dictation-play">Replay</button><button class="btn btn-primary" data-action="dictation-next">' + (d.index + 1 >= total ? "See summary" : "Next sentence") + " " + icon("arrow") + "</button>") +
      "</div>" +
      (d.hinted && !d.checked ? '<div class="dictation-hint"><span>English hint</span><p>' + esc(d.current.en) + "</p></div>" : "") +
      (d.checked ? dictationResultHtml(d) : "") +
      '<p class="dictation-shortcuts">' + (d.checked ? "Press Enter for the next sentence." : "Press Enter to check · Shift + Enter for a new line.") + "</p>" +
      "</section>" +
      "</div>"
    );
  }

  function dictationSummary() {
    var d = app.dictation;
    var total = d.queue.length;
    var accuracy = total ? Math.round((d.correctCount / total) * 100) : 0;
    var missed = d.missed || [];
    var review = missed.length
      ? missed
          .map(function (item) {
            return (
              '<div class="dictation-review-row">' +
              '<button class="speaker small soft" data-action="dictation-say" data-text="' + esc(item.de) + '" aria-label="Play sentence">' + icon("speaker", 15) + "</button>" +
              '<div><strong>' + esc(item.de) + "</strong><span>" + esc(item.en) + "</span></div>" +
              '<span class="pill ' + (item.hinted ? "" : "bad") + '">' + (item.hinted ? "hinted" : "missed") + "</span>" +
              "</div>"
            );
          })
          .join("")
      : '<div class="empty">Clean sweep — every sentence was correct.</div>';
    return (
      '<div class="dictation-page dictation-summary">' +
      '<div class="dictation-summary-head"><p class="eyebrow">Session complete</p><h1>' + (accuracy === 100 ? "Perfect listening." : "Good work — keep listening.") + "</h1><p>" + total + " sentences · " + accuracy + "% correct · " + d.cleanCount + " clean answers</p></div>" +
      '<div class="dictation-summary-stats">' +
      '<div class="dictation-stat"><strong>' + d.correctCount + " / " + total + "</strong><span>correct</span></div>" +
      '<div class="dictation-stat"><strong>' + accuracy + "%</strong><span>accuracy</span></div>" +
      '<div class="dictation-stat"><strong>+' + d.beans + "</strong><span>Taler</span></div>" +
      '<div class="dictation-stat"><strong>+' + d.visitors + "</strong><span>visitors</span></div>" +
      "</div>" +
      '<section class="panel dictation-review-panel"><div class="panel-head"><h2>Review</h2><span>' + missed.length + " to revisit</span></div>" + review + "</section>" +
      '<div class="dictation-summary-actions"><button class="btn btn-primary" data-action="dictation-start" data-size="' + d.queue.length + '">New session ' + icon("arrow") + '</button><button class="btn btn-ghost" data-action="dictation-exit">Back to overview</button></div>' +
      "</div>"
    );
  }

  function renderDictation() {
    if (!app.dictation) return dictationLanding();
    if (app.dictation.finished) return dictationSummary();
    return dictationSession();
  }

  function renderBrowse() {
    var q = app.browse.query;
    var filter = app.browse.filter;
    var results = Deck.search(q).filter(function (c) {
      return filter === "all" || Deck.status(app.state.cards[c.id]) === filter;
    });
    var shown = results.slice(0, app.browse.limit);
    var rows = shown
      .map(function (c) {
        var cs = app.state.cards[c.id];
        var st = Deck.status(cs);
        return (
          '<div class="word-row" data-action="open-card" data-id="' + esc(c.id) + '">' +
          '<div><div class="ko">' + esc(c.word) + '</div><div class="rom">' + esc(c.romanization) + "</div></div>" +
          '<div class="meaning">' + esc(c.meaning_en) + "</div>" +
          '<div><span class="pill ' + st + '">' + st + "</span></div>" +
          '<div class="due">' + (cs.state === "new" ? "new" : "due " + FSRS.dueLabel(cs.due)) + "</div>" +
          '<div class="audio"><button class="speaker small soft" data-action="play-card-word" data-id="' + esc(c.id) + '" aria-label="Play word">' + icon("speaker", 16) + "</button></div>" +
          "</div>"
        );
      })
      .join("");
    var chips = [
      ["all", "All"],
      ["new", "New"],
      ["learning", "Learning"],
      ["young", "Young"],
      ["mature", "Mature"],
    ]
      .map(function (x) {
        return '<button class="chip ' + (filter === x[0] ? "active" : "") + '" data-action="filter" data-filter="' + x[0] + '">' + x[1] + "</button>";
      })
      .join("");
    return (
      '<div class="page-head"><div><p class="eyebrow">The deck</p><h1>Word List</h1><p>' + Deck.count.toLocaleString() + " entries — search by German, word type, gender, or English.</p></div>" +
      '<button class="btn btn-primary" data-action="start">Study due cards ' + icon("arrow") + "</button></div>" +
      '<div class="search-wrap">' + icon("search") + '<input class="search" type="search" placeholder="Search the A1 word list…" value="' + esc(q) + '" data-role="search" /></div>' +
      '<div class="chips">' + chips + '<span class="muted" style="font-size:11px;align-self:center;margin-left:auto">' + results.length + " results</span></div>" +
      '<div class="word-list">' + (rows || '<div class="empty">No words match that search.</div>') + "</div>" +
      (results.length > shown.length ? '<div style="text-align:center;margin-top:16px"><button class="btn btn-ghost" data-action="load-more">Show more</button></div>' : "")
    );
  }

  function renderStats() {
    var direction = app.statsDirection === "reverse" ? "reverse" : "forward";
    var isRev = direction === "reverse";
    var map = isRev ? app.state.reverseCards : app.state.cards;
    var m = Store.mastery(app.state, direction);
    var total = Deck.count;
    var learned = total - m.new;
    var totals = Store.totals(app.state, 30, direction);
    var streak = app.state.streak;
    var grammarProg = Store.grammarProgress(app.state);
    var grammarNext = grammarNextItem();
    var grammarStarStats = Store.grammarStars(app.state);
    var readingProg = Store.readingProgress(app.state);
    var readingNext = readerNextText();
    var dictStats = Store.dictationStats(app.state);
    var forecast = Store.forecast(app.state, 14, Date.now(), direction);
    var maxF = Math.max.apply(
      null,
      forecast.map(function (d) {
        return d.count;
      }).concat([1])
    );
    var bars = forecast
      .map(function (d, i) {
        var height = Math.max(3, Math.round((d.count / maxF) * 100));
        var label = i % 3 === 0 ? new Date(d.date).toLocaleDateString(undefined, { day: "numeric" }) : "";
        return '<div class="bar-col"><div class="bar" style="--h:' + height + '" title="' + d.count + ' due"></div><span>' + label + "</span></div>";
      })
      .join("");
    var act = Store.activity(app.state, 91);
    var maxAct = Math.max.apply(null, act.map(function (a) { return a.reviews; }).concat([1]));
    var heat = act
      .map(function (a) {
        var lvl = a.reviews === 0 ? 0 : Math.min(4, Math.ceil((a.reviews / maxAct) * 4));
        return '<div class="heat-cell ' + (lvl ? "l" + lvl : "") + '" title="' + a.date + ": " + a.reviews + ' reviews"></div>';
      })
      .join("");
    var hard = Object.keys(map)
      .map(function (id) {
        return { c: Deck.byId[id], s: map[id] };
      })
      .filter(function (x) {
        return x.c && x.s.lapses > 0;
      })
      .sort(function (a, b) {
        return b.s.lapses - a.s.lapses;
      })
      .slice(0, 8);
    var segs = [
      { key: "new", label: "New", color: "var(--accent)", n: m.new },
      { key: "learning", label: "Learning", color: "var(--gold)", n: m.learning },
      { key: "young", label: "Young", color: "var(--teal)", n: m.young },
      { key: "mature", label: "Mature", color: "var(--green)", n: m.mature },
    ];
    var circ = 2 * Math.PI * 15.9155;
    var offset = 0;
    var donut = segs
      .map(function (s) {
        var len = total ? (s.n / total) * circ : 0;
        var el = '<circle r="15.9155" cx="21" cy="21" fill="none" stroke="' + s.color + '" stroke-width="6" stroke-dasharray="' + len + " " + (circ - len) + '" stroke-dashoffset="' + (-offset) + '"></circle>';
        offset += len;
        return el;
      })
      .join("");
    return (
      '<div class="page-head"><div><p class="eyebrow">Your progress</p><h1>The long game</h1><p>Consistency beats cramming. ' + (isRev ? "Recall (English → German)" : "Recognition (German → English)") + " progress below.</p></div></div>" +
      '<div class="mode-switch">' +
      '<button class="mode-btn ' + (!isRev ? "active" : "") + '" data-action="set-stats-direction" data-direction="forward">Recognition<small>German → English</small></button>' +
      '<button class="mode-btn ' + (isRev ? "active" : "") + '" data-action="set-stats-direction" data-direction="reverse">Recall<small>English → German</small></button>' +
      "</div>" +
      '<div class="stat-large">' +
      '<div class="metric"><strong>' + learned.toLocaleString() + "</strong><span>" + (isRev ? "words recalled" : "words recognized") + "</span></div>" +
      '<div class="metric"><strong>' + m.mature.toLocaleString() + "</strong><span>mature words</span></div>" +
      '<div class="metric"><strong>' + (totals.reviews ? Math.round(totals.accuracy * 100) + "%" : "—") + "</strong><span>accuracy · 30d</span></div>" +
      '<div class="metric"><strong>' + streak.current + "</strong><span>day streak · best " + streak.longest + "</span></div>" +
      "</div>" +
      '<div class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>' + (isRev ? "Recall mastery" : "Recognition mastery") + '</h2><span>' + learned + " / " + total + "</span></div>" +
      '<div class="donut-wrap"><svg class="donut" viewBox="0 0 42 42"><circle r="15.9155" cx="21" cy="21" fill="none" stroke="var(--surface-2)" stroke-width="6"></circle>' + donut + '<text x="21" y="20.5" text-anchor="middle" font-size="5.4" font-weight="800" fill="var(--ink)">' + Math.round((learned / total) * 100) + '%</text><text x="21" y="25.3" text-anchor="middle" font-size="2.6" fill="var(--muted)">learned</text></svg>' +
      '<div class="donut-legend">' + segs.map(function (s) { return '<div><span class="dot" style="background:' + s.color + '"></span>' + s.label + " · " + s.n + "</div>"; }).join("") + "</div></div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Next 14 days · ' + (isRev ? "recall" : "recognition") + '</h2><span>' + forecast.reduce(function (a, b) { return a + b.count; }, 0) + " reviews</span></div><div class=\"bars\">" + bars + "</div></div>" +
      "</div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Activity</h2><span>last 13 weeks · both modes</span></div><div class="heatmap">' + heat + "</div></div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Grammar path</h2><span>' + grammarProg.completed + " / " + grammarProg.total + " lessons · ★ " + grammarStarStats.balance + "</span></div>" +
      grammarProgressHtml(grammarProg.completed, grammarProg.total, false) +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
      (grammarNext ? '<a class="btn btn-soft btn-sm" href="#/grammar/item/' + esc(grammarNext.id) + '">Continue · ' + esc(grammarNext.title) + "</a>" : '<span class="pill mature">All lessons complete</span>') +
      '<a class="btn btn-ghost btn-sm" href="#/grammar">Grammar index ' + icon("arrow") + '</a><button class="btn btn-soft btn-sm" data-action="atelier">Atelier ' + icon("arrow") + "</button></div></div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Reader</h2><span>' + readingProg.read + " / " + readingProg.total + " texts read</span></div>" +
      '<div class="level-track" role="progressbar" aria-label="Reader progress" aria-valuemin="0" aria-valuemax="' + readingProg.total + '" aria-valuenow="' + readingProg.read + '"><div class="level-fill" style="width:' + (readingProg.total ? Math.round((readingProg.read / readingProg.total) * 100) : 0) + '%"></div></div>' +
      '<div class="level-meta"><span>Comprehensible input</span><span>' + (readingProg.total ? Math.round((readingProg.read / readingProg.total) * 100) : 0) + '%</span></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
      (readingNext ? '<a class="btn btn-soft btn-sm" href="#/reader/' + esc(readingNext.id) + '">Continue · ' + esc(readingNext.title) + "</a>" : '<span class="pill mature">All texts read</span>') +
      '<a class="btn btn-ghost btn-sm" href="#/reader">Reader index ' + icon("arrow") + "</a></div></div>" +
      '<div class="panel" style="margin-bottom:18px"><div class="panel-head"><h2>Dictation</h2><span>' + dictStats.attempts + " sentences · " + dictStats.clean + " clean</span></div>" +
      '<div class="dictation-stats-row">' +
      '<div><strong>' + (dictStats.attempts ? Math.round(dictStats.accuracy * 100) + "%" : "—") + "</strong><span>accuracy</span></div>" +
      '<div><strong>' + dictStats.bestStreak + "</strong><span>best streak</span></div>" +
      '<div><strong>' + dictStats.today + "</strong><span>today</span></div>" +
      '<div><strong>' + dictStats.clean + "</strong><span>clean answers</span></div>" +
      "</div>" +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
      '<button class="btn btn-soft btn-sm" data-action="dictation-start" data-size="' + dictationSize() + '">Start dictation ' + icon("arrow") + "</button>" +
      '<a class="btn btn-ghost btn-sm" href="#/dictation">Dictation overview ' + icon("arrow") + "</a></div></div>" +
      '<div class="two-col">' +
      '<div class="panel"><div class="panel-head"><h2>Leeches · ' + (isRev ? "recall" : "recognition") + '</h2><span>most lapses</span></div><div class="hard-list">' +
      (hard.length
        ? hard.map(function (x) { return '<div class="hard-row"><span class="ko">' + esc(x.c.word) + '</span><span class="meaning">' + esc(x.c.meaning_en) + '</span><span class="lapses">' + x.s.lapses + " lapses</span></div>"; }).join("")
        : '<div class="empty">No leeches yet — nice.</div>') +
      "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Recent activity</h2><span>last 7 days</span></div><div class="hard-list">' +
      Store.activity(app.state, 14)
        .slice(-7)
        .reverse()
        .map(function (a) {
          return '<div class="hard-row"><span class="ko" style="min-width:82px">' + a.date.slice(5) + '</span><span class="meaning">' + a.reviews + " reviews</span><span class=\"lapses\" style=\"background:var(--teal-soft);color:var(--teal)\">" + Math.round((a.correct / (a.reviews || 1)) * 100) + "%</span></div>";
        })
        .join("") +
      "</div></div>" +
      "</div>"
    );
  }

  function renderSettings() {
    var s = app.state.settings;
    var voices = germanVoices();
    var voiceOptions =
      '<option value="">Auto — best installed voice</option>' +
      voices
        .map(function (voice) {
          return (
            '<option value="' + esc(voice.voiceURI) + '"' +
            (s.voiceURI === voice.voiceURI ? " selected" : "") + ">" +
            esc(voice.name) + (voice.localService ? " · on device" : " · online") +
            "</option>"
          );
        })
        .join("");
    if (!voices.length) {
      voiceOptions = '<option value="">No German voice detected yet</option>';
    }
    function toggle(key, label, desc) {
      return (
        '<div class="field"><div><label>' + label + '</label><span class="desc">' + desc + "</span></div>" +
        '<button class="toggle ' + (s[key] ? "on" : "") + '" data-action="toggle-setting" data-setting="' + key + '" aria-pressed="' + (s[key] ? "true" : "false") + '" aria-label="' + label + '"></button></div>'
      );
    }
    return (
      '<div class="page-head"><div><p class="eyebrow">Preferences</p><h1>Settings</h1><p>Make the session fit your day and your memory.</p></div></div>' +
      '<div class="settings-grid">' +
      '<div class="settings-panel"><h2>Daily limits</h2><p>These limits apply separately to recognition and recall.</p>' +
      '<div class="field"><div><label for="set-new-per-day">New cards per day</label><span class="desc">Per mode. 20 is a good default; lower it if reviews pile up.</span></div><input id="set-new-per-day" type="number" min="0" max="100" value="' + Number(s.newPerDay) + '" data-setting="newPerDay" /></div>' +
      '<div class="field"><div><label for="set-review-limit">Review limit per day</label><span class="desc">Per mode. Stops the queue from becoming overwhelming.</span></div><input id="set-review-limit" type="number" min="0" max="500" value="' + Number(s.reviewsPerDay) + '" data-setting="reviewsPerDay" /></div>' +
      '<div class="field"><div><label for="set-daily-goal">Daily goal</label><span class="desc">Total answers across both modes that earns the Christmas market bonus.</span></div><input id="set-daily-goal" type="number" min="1" max="300" value="' + Number(s.dailyGoal || 20) + '" data-setting="dailyGoal" /></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Audio</h2><p>Words and examples use recorded Tanja neural audio; browser speech is only a fallback. Autoplay is on by default.</p>' +
      toggle("autoplayWord", "Autoplay the word", "Play the word when each card appears.") +
      toggle("autoplayExample", "Autoplay the example", "Play the sentence when the answer is revealed.") +
      '<div class="field"><div><label for="set-audio-rate">Playback speed</label><span class="desc">Slow down if the voice feels fast.</span></div><select id="set-audio-rate" data-setting="audioRate"><option value="0.8"' + (Number(s.audioRate) === 0.8 ? " selected" : "") + '>0.8×</option><option value="1"' + (Number(s.audioRate) === 1 ? " selected" : "") + '>1×</option><option value="1.2"' + (Number(s.audioRate) === 1.2 ? " selected" : "") + '>1.2×</option></select></div>' +
      '<div class="field field-voice"><div><label for="set-voice-uri">Fallback voice</label><span class="desc">Only used when a recorded clip is unavailable. Recorded words use the Tanja neural voice.</span></div><select id="set-voice-uri" data-setting="voiceURI">' + voiceOptions + "</select></div>" +
      '<div class="settings-actions" style="margin-top:12px"><button class="btn btn-soft btn-sm" data-action="test-voice">Test fallback voice</button></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Display</h2><p>Keep the front of the card as minimal as you like.</p>' +
      toggle("showRomanization", "Show word type / forms", "Part of speech and gender under the German word.") +
      toggle("showHanja", "Show gender & plural", "Gender, article and plural (when listed) on the answer side.") +
      '<div class="field"><div><label for="set-theme">Theme</label><span class="desc">System follows your Mac/phone setting.</span></div><select id="set-theme" data-setting="theme"><option value="system"' + (s.theme === "system" ? " selected" : "") + '>System</option><option value="light"' + (s.theme === "light" ? " selected" : "") + '>Light</option><option value="dark"' + (s.theme === "dark" ? " selected" : "") + '>Dark</option></select></div>' +
      "</div>" +
      '<div class="settings-panel"><h2>Progress data</h2><p>Everything is stored locally in this browser. Export a backup before clearing site data.</p>' +
      '<div class="settings-actions"><button class="btn btn-soft" data-action="export">Export progress</button><button class="btn btn-ghost" data-action="import">Import</button><button class="btn btn-danger" data-action="reset">Reset all progress</button></div>' +
      '<p class="about-box" style="margin-top:16px"><strong>' + Deck.count.toLocaleString() + ' cards</strong> · FSRS scheduling · local-first; cloud sync is optional.<br>Keyboard: Space to reveal, 1–4 to answer/rate, A/S for audio, Esc to exit.</p>' +
      "</div>" +
      '<div class="settings-panel sync-panel"><h2>Cloud sync</h2>' + (window.CloudSync ? CloudSync.settingsHtml() : '<p class="sync-status error">Cloud sync module not loaded.</p>') + "</div>" +
      "</div>"
    );
  }

  function openCard(id) {
    var c = Deck.byId[id];
    if (!c) return;
    var f = app.state.cards[id];
    var r = app.state.reverseCards[id];
    document.body.style.overflow = "hidden";
    document.getElementById("modal-root").innerHTML =
      '<div class="modal-backdrop" data-action="close-modal"><div class="modal" role="dialog" aria-modal="true">' +
      '<div class="modal-head"><div><div class="modal-word">' + esc(c.word) + '</div><div class="modal-rom">' + esc(c.romanization) + "</div></div>" +
      '<button class="icon-btn" data-action="close-modal" aria-label="Close">' + icon("x") + "</button></div>" +
      '<div class="modal-meaning">' + esc(c.meaning_en) + (c.gender_info ? ' <span class="hanja-chip" style="margin-left:6px"><b>' + esc(c.gender_info) + "</b></span>" : "") + "</div>" +
      (c.alt_meanings && c.alt_meanings.length ? '<div class="meaning-sub">also: ' + esc(c.alt_meanings.join(" · ")) + "</div>" : "") +
      '<div class="modal-example"><div class="ko">' + esc(c.example_ko) + "</div>" +
      (app.state.settings.showRomanization ? '<div class="example-rom">' + esc(c.example_romanization) + "</div>" : "") +
      '<div class="en">' + esc(c.example_en) + "</div></div>" +
      renderWordParts(c) +
      '<div class="settings-actions" style="margin:0 0 14px">' +
      '<button class="btn btn-soft btn-sm" data-action="play-card-word" data-id="' + esc(c.id) + '">' + icon("speaker", 15) + ' Word</button>' +
      '<button class="btn btn-ghost btn-sm" data-action="play-card-example" data-id="' + esc(c.id) + '">' + icon("speaker", 15) + ' Example</button></div>' +
      '<div class="rating-label" style="text-align:left">Recognition</div>' +
      '<div class="modal-stats"><div class="modal-stat"><strong>' + Deck.statusLabel(f) + "</strong><span>status</span></div><div class=\"modal-stat\"><strong>" + (f.state === "new" ? "—" : FSRS.dueLabel(f.due)) + "</strong><span>due</span></div><div class=\"modal-stat\"><strong>" + (f.reps || 0) + "</strong><span>reviews</span></div><div class=\"modal-stat\"><strong>" + (f.lapses || 0) + "</strong><span>lapses</span></div></div>" +
      '<div class="rating-label" style="text-align:left">Recall</div>' +
      '<div class="modal-stats"><div class="modal-stat"><strong>' + Deck.statusLabel(r) + "</strong><span>status</span></div><div class=\"modal-stat\"><strong>" + (r.state === "new" ? "—" : FSRS.dueLabel(r.due)) + "</strong><span>due</span></div><div class=\"modal-stat\"><strong>" + (r.reps || 0) + "</strong><span>reviews</span></div><div class=\"modal-stat\"><strong>" + (r.lapses || 0) + "</strong><span>lapses</span></div></div>" +
      '<div class="settings-actions"><button class="btn btn-primary" data-action="practice-card" data-id="' + esc(c.id) + '" data-direction="forward">Practice recognition</button>' +
      '<button class="btn btn-soft" data-action="practice-card" data-id="' + esc(c.id) + '" data-direction="reverse">Practice recall</button>' +
      '<button class="btn btn-ghost" data-action="close-modal">Close</button></div>' +
      "</div></div>";
  }

  function closeModal() {
    document.getElementById("modal-root").innerHTML = "";
    document.body.style.overflow = "";
  }

  function exportProgress() {
    var data = Store.exportProgress(app.state);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "deutsch-a1-progress.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    toast("Progress exported.");
  }

  function importProgress() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var next = Store.importProgress(String(reader.result));
          Deck.all.forEach(function (c) {
            Store.getCard(next, c.id, "forward");
            Store.getCard(next, c.id, "reverse");
          });
          app.state = next;
          Store.syncGrammarStars(app.state);
          Store.save(app.state);
          app.grammarExercise = null;
          app.grammarSearch = "";
          app.readerLevel = "all";
          app.readerTranslation = false;
          app.readerRate = 0.9;
          readerStop();
          applyTheme();
          render();
          toast("Progress imported.");
        } catch (e) {
          toast(e.message || "Could not import that file.", "error");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /* ---------------------------------------------------------------------
     Graded reader: comprehensible input with hover glosses and TTS.
     --------------------------------------------------------------------- */

  function readerRead(id) {
    return !!(app.state.reading && app.state.reading[id] && app.state.reading[id].read);
  }

  function readerNextText() {
    return READER_TEXTS.filter(function (text) {
      return !readerRead(text.id);
    })[0];
  }

  function readerLevelInfo(level) {
    return RL[level] || { id: level, name: "", en: "", desc: "" };
  }

  function readerWordCount(text) {
    return text.lines.reduce(function (n, line) {
      return n + cleanMarkup(line.ko).split(/\s+/).filter(Boolean).length;
    }, 0);
  }

  function readerWordInfo(word) {
    var res = resolveGloss(word);
    if (!res) return { word: word, rom: "", meaning: "", hanja: "" };
    if (res.kind === "word") {
      return {
        word: res.card.word,
        rom: res.card.gender_info || res.card.romanization || "",
        meaning: res.card.meaning_en || "",
        gender: res.card.gender_info || "",
      };
    }
    var entry = res.entry || {};
    return {
      word: entry.word || word,
      rom: entry.r || "",
      meaning: entry.en || "",
      hanja: "",
    };
  }

  function renderReader() {
    var parts = app.readerRoute || [];
    if (parts[0] && RI[parts[0]]) return renderReaderText(parts[0]);
    return renderReaderIndex();
  }

  function renderReaderIndex() {
    var prog = Store.readingProgress(app.state);
    var next = readerNextText();
    var filter = app.readerLevel || "all";
    var pct = prog.total ? Math.round((prog.read / prog.total) * 100) : 0;
    var list = READER_TEXTS.filter(function (text) {
      return filter === "all" || String(text.level) === String(filter);
    });
    var totalWords = READER_TEXTS.reduce(function (n, text) { return n + readerWordCount(text); }, 0);
    var chips = [["all", "All levels"]]
      .concat(READER_LEVELS.map(function (level) {
        return [String(level.id), level.id + " · " + level.name + " · " + level.en];
      }))
      .map(function (x) {
        return '<button class="chip ' + (String(filter) === x[0] ? "active" : "") + '" data-action="reader-level" data-level="' + x[0] + '">' + esc(x[1]) + "</button>";
      })
      .join("");
    var cards = list.map(function (text) {
      var level = readerLevelInfo(text.level);
      var words = readerWordCount(text);
      var minutes = Math.max(1, Math.round(words / 90));
      var read = readerRead(text.id);
      return (
        '<a class="reader-card reader-level-' + esc(String(text.level)) + '" href="#/reader/' + esc(text.id) + '">' +
        '<div class="reader-card-top"><span class="reader-level-badge reader-level-' + esc(String(text.level)) + '">L' + esc(String(text.level)) + " · " + esc(level.name) + '</span>' + (read ? '<span class="pill mature">read</span>' : "") + "</div>" +
        '<div class="reader-card-icon" aria-hidden="true">' + esc(text.icon) + "</div>" +
        "<h3>" + esc(text.title) + "</h3>" +
        '<p class="reader-card-sub">' + esc(text.subtitle) + "</p>" +
        "<p>" + esc(text.summary) + "</p>" +
        '<div class="reader-card-meta"><span>' + words + " words</span><span>~" + minutes + " min</span><span>" + text.grammar.length + " grammar points</span></div>" +
        "</a>"
      );
    }).join("");
    return (
      '<div class="reader-page">' +
      '<div class="page-head"><div><p class="eyebrow">Comprehensible input</p><h1>Reader</h1><p>Read and listen to German from first words to longer stories. Hover any highlighted word for help.</p></div>' +
      '<div class="bean-pill" style="font-size:13px;padding:9px 13px">' + icon("book") + " " + prog.read + " / " + prog.total + " read</div></div>" +
      '<div class="reader-intro">' +
      '<div><p class="eyebrow">The natural way</p><h2>Read first. Translate later.</h2><p>Start with a short text and read it once without translating. Let the situation and repeated words carry you. Hover underlined words, listen line by line, and only open the English translation when you need a check.</p></div>' +
      '<div class="reader-steps"><div><strong>1</strong><span>Read</span></div><div><strong>2</strong><span>Listen</span></div><div><strong>3</strong><span>Re-read</span></div></div>' +
      "</div>" +
      '<div class="reader-progress-panel"><div class="level-track" role="progressbar" aria-label="Reader progress" aria-valuemin="0" aria-valuemax="' + prog.total + '" aria-valuenow="' + prog.read + '"><div class="level-fill" style="width:' + pct + '%"></div></div><div class="level-meta"><span>' + prog.read + " / " + prog.total + " texts read · " + totalWords + " words in the reader</span><span>" + pct + "%</span></div></div>" +
      (next
        ? '<a class="grammar-continue reader-continue" href="#/reader/' + esc(next.id) + '"><div class="cafe-mini-art">' + esc(next.icon) + '</div><div><h2>Continue · ' + esc(next.title) + '</h2><p>Level ' + esc(String(next.level)) + " · " + esc(next.subtitle) + " · " + readerWordCount(next) + " words</p></div><span class=\"btn btn-primary\">Open text " + icon("arrow") + "</span></a>"
        : '<div class="grammar-continue done"><div class="cafe-mini-art">✓</div><div><h2>Every text read</h2><p>Revisit any level whenever you want.</p></div></div>') +
      '<div class="chips reader-level-chips">' + chips + "</div>" +
      '<div class="reader-grid">' + (cards || '<div class="empty">No texts in this level yet.</div>') + "</div>" +
      "</div>"
    );
  }

  function renderReaderText(textId) {
    var text = RI[textId];
    if (!text) return renderReaderIndex();
    var level = readerLevelInfo(text.level);
    var read = readerRead(textId);
    var words = readerWordCount(text);
    var minutes = Math.max(1, Math.round(words / 90));
    var index = READER_TEXTS.map(function (t) { return t.id; }).indexOf(textId);
    var prev = index > 0 ? READER_TEXTS[index - 1] : null;
    var next = index >= 0 && index < READER_TEXTS.length - 1 ? READER_TEXTS[index + 1] : null;
    var transOn = !!app.readerTranslation;
    var wordList = text.vocab.map(function (word) {
      var info = readerWordInfo(word);
      return (
        '<button class="reader-word" data-action="reader-word" data-text="' + esc(word) + '">' +
        "<strong>" + esc(info.word) + "</strong>" +
        "<span>" + esc(info.meaning) + "</span>" +
        (info.rom ? '<small>' + esc(info.rom) + "</small>" : "") +
        "</button>"
      );
    }).join("");
    var grammarTags = text.grammar.map(function (id) {
      var g = GI[id];
      if (!g) return "";
      return '<a class="reader-grammar-tag" href="#/grammar/item/' + esc(g.id) + '"><strong>' + esc(g.title) + '</strong><span>' + esc(g.pattern) + "</span></a>";
    }).join("");
    var lines = text.lines.map(function (line, i) {
      return (
        '<div class="reader-line" data-reader-line="' + i + '">' +
        '<button class="reader-line-audio" data-action="reader-line" data-index="' + i + '" aria-label="Listen to line ' + (i + 1) + '">' + icon("speaker", 15) + "</button>" +
        '<div><p class="reader-ko" lang="de">' + glossMarkup(line.ko, [], null) + '</p><p class="reader-en" lang="en">' + esc(line.en) + "</p></div>" +
        "</div>"
      );
    }).join("");
    var rates = [0.75, 0.9, 1.05].map(function (rate) {
      return '<button class="reader-rate-btn ' + (Number(app.readerRate) === rate ? "active" : "") + '" data-action="reader-rate" data-rate="' + rate + '" aria-pressed="' + (Number(app.readerRate) === rate ? "true" : "false") + '">' + rate + "×</button>";
    }).join("");
    return (
      '<div class="reader-page">' +
      '<div class="grammar-breadcrumb"><a href="#/reader">Reader</a><span>/</span><span>Level ' + esc(String(text.level)) + " · " + esc(level.name) + "</span><span>/</span><span>" + esc(text.title) + "</span></div>" +
      '<div class="grammar-hero reader-hero"><div class="reader-hero-cover" aria-hidden="true">' + esc(text.icon) + '</div><div><p class="eyebrow">Level ' + esc(String(text.level)) + " · " + esc(level.name) + " · " + esc(level.en) + "</p><h1>" + esc(text.title) + '</h1><p class="reader-hero-sub">' + esc(text.subtitle) + "</p><p>" + esc(text.summary) + '</p><div class="reader-hero-meta"><span>' + words + ' words</span><span>~' + minutes + ' min</span><span>' + text.grammar.length + ' grammar points</span>' + (read ? '<span class="pill mature">read</span>' : "") + "</div></div></div>" +
      '<div class="reader-layout"><div class="reader-main">' +
      '<div class="reader-toolbar">' +
      '<button class="btn btn-primary" data-action="reader-play">' + icon("speaker", 16) + " Play all</button>" +
      '<button class="btn btn-ghost" data-action="reader-stop">Stop</button>' +
      '<button class="btn ' + (transOn ? "btn-soft" : "btn-ghost") + '" data-action="reader-translation" aria-pressed="' + (transOn ? "true" : "false") + '">' + (transOn ? "Hide translation" : "Show translation") + "</button>" +
      '<div class="reader-rate"><span>Speed</span>' + rates + "</div>" +
      "</div>" +
      '<div class="panel reader-text-panel ' + (transOn ? "translation-on" : "") + '"><div class="panel-head"><h2>Read &amp; listen</h2><span>hover words · tap the speaker for one line</span></div><div class="reader-lines">' + lines + "</div></div>" +
      '<div class="reader-prevnext">' + (prev ? '<a class="btn btn-ghost" href="#/reader/' + esc(prev.id) + '">' + icon("back") + " Previous</a>" : "<span></span>") + (next ? '<a class="btn btn-soft" href="#/reader/' + esc(next.id) + '">Next text ' + icon("arrow") + "</a>" : '<a class="btn btn-soft" href="#/reader">Reader index ' + icon("arrow") + "</a>") + "</div>" +
      "</div><aside class=\"reader-side\">" +
      '<div class="panel"><div class="panel-head"><h2>New words</h2><span>tap to hear</span></div><div class="reader-word-list">' + (wordList || '<p class="muted">No word list for this text.</p>') + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Grammar in this text</h2><span>' + text.grammar.length + " points</span></div><div class=\"reader-grammar-list\">" + (grammarTags || '<p class="muted">No grammar tags.</p>') + "</div></div>" +
      '<div class="panel"><div class="panel-head"><h2>Your reading</h2><span>' + (read ? "finished" : "in progress") + "</span></div>" +
      '<p class="about-box">' + (read ? "You have finished this text. Read it again anytime; the audio and glosses stay available." : "Mark this text as read after you finish. First read earns +5 Taler.") + "</p>" +
      (read ? '<span class="pill mature">Read</span>' : '<button class="btn btn-primary btn-sm" data-action="reader-read">Mark as read · +5 Taler</button>') +
      "</div>" +
      '<div class="panel"><div class="panel-head"><h2>How to read</h2><span>natural method</span></div><p class="reader-howto">Read the German first without translation. Use the situation and repeated words to guess. Hover underlined words only when needed. Listen to a line, then read it aloud. Show English at the end as a check, not as the first step.</p></div>' +
      "</aside></div></div>"
    );
  }

  function readerClearHighlight() {
    var current = document.querySelector(".reader-line.playing");
    if (current) current.classList.remove("playing");
  }

  function readerStop() {
    app.readerPlaying = false;
    app.readerToken = (app.readerToken || 0) + 1;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    app.audio.pause();
    app.audio.onended = null;
    app.audio.onerror = null;
    readerClearHighlight();
  }

  function readerSpeakLine(index) {
    var text = RI[(app.readerRoute || [])[0]];
    if (!text || !text.lines[index]) return;
    readerStop();
    var el = document.querySelector('[data-reader-line="' + index + '"]');
    if (el) {
      el.classList.add("playing");
      el.scrollIntoView({ block: "nearest" });
    }
    app.readerPlaying = true;
    var token = app.readerToken;
    var lineText = cleanMarkup(text.lines[index].ko);
    function finish() {
      if (token !== app.readerToken) return;
      if (el) el.classList.remove("playing");
      app.readerPlaying = false;
    }
    speak(lineText, Number(app.readerRate) || 0.9, finish);
  }

  function readerPlayAll() {
    var text = RI[(app.readerRoute || [])[0]];
    if (!text) return;
    readerStop();
    var i = 0;
    var token = app.readerToken;
    app.readerPlaying = true;
    function next() {
      if (token !== app.readerToken || !app.readerPlaying || i >= text.lines.length) {
        if (token === app.readerToken) readerStop();
        return;
      }
      var index = i;
      var el = document.querySelector('[data-reader-line="' + index + '"]');
      readerClearHighlight();
      if (el) {
        el.classList.add("playing");
        el.scrollIntoView({ block: "nearest" });
      }
      var lineText = cleanMarkup(text.lines[index].ko);
      speak(lineText, Number(app.readerRate) || 0.9, function () {
        if (token !== app.readerToken) return;
        if (el) el.classList.remove("playing");
        i += 1;
        setTimeout(next, 120);
      });
    }
    next();
  }

  /* ---------------------------------------------------------------------
     Grammar path: index, unit conversations, lessons and practice.
     --------------------------------------------------------------------- */

  function grammarCompleted(id) {
    return !!(app.state.grammar && app.state.grammar[id] && app.state.grammar[id].completed);
  }

  function grammarNextItem() {
    return GRAMMAR_ITEMS.filter(function (i) {
      return !grammarCompleted(i.id);
    })[0];
  }

  function grammarItemIndex(id) {
    for (var i = 0; i < GRAMMAR_ITEMS.length; i++) if (GRAMMAR_ITEMS[i].id === id) return i;
    return -1;
  }

  function grammarShortLabel(item) {
    var label = (item.pattern || item.title || "").replace(/\s+/g, " ").trim();
    if (label.length > 22) {
      var comma = label.split(",")[0].trim();
      if (comma.length >= 6 && comma.length <= 22) {
        label = comma;
      } else {
        var slash = label.split(" / ")[0].trim();
        if (slash.length >= 6 && slash.length <= 22) label = slash;
        else label = label.slice(0, 21) + "…";
      }
    }
    return label;
  }

  function seededShuffle(arr, seed) {
    var a = arr.slice();
    var x = seed >>> 0;
    function rnd() {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return ((x >>> 0) % 1000000) / 1000000;
    }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function cleanMarkup(text) {
    return String(text || "").replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
  }

  function stripEndPunct(text) {
    return String(text || "").replace(/[.!?。？！]+$/g, "").trim();
  }

  function normalizeKo(text) {
    return String(text || "")
      .trim()
      .replace(/[.!?。？！,，"'“”‘’]/g, "")
      .replace(/\s+/g, " ");
  }

  function buildGrammarExerciseData(item) {
    var ex0 = item.examples[0][0];
    var ex1 = item.examples[1][0];
    var choiceBlank = item.blank;
    var choiceOptions = seededShuffle([choiceBlank].concat(item.distractors || []), Deck.hash(item.id + "choice"));
    var fillBlank = item.blank2 || item.blank;
    if (ex1.indexOf(fillBlank) < 0) fillBlank = item.blank;

    var orderSentence = item.order || "";
    var unit = GU[item.unit];
    var forms = item.forms || [];
    if (!orderSentence && unit && unit.context) {
      var bestScore = 0;
      var bestClause = "";
      for (var i = 0; i < unit.context.length; i++) {
        var raw = unit.context[i].text;
        var marked = raw.match(new RegExp("\\[\\[([^\\]|]+)\\|g:" + item.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\]\\]"));
        var marker = marked ? marked[1] : "";
        var clean = cleanMarkup(raw);
        var clauses = clean.split(/[,.?!]/);
        for (var j = 0; j < clauses.length; j++) {
          var clause = clauses[j].trim();
          if (!clause || clause.length < 4 || /[“”"]/.test(clause)) continue;
          var strict = forms.some(function (f) {
            return f && clause.indexOf(f) >= 0;
          });
          if (!strict && item.blank) strict = clause.indexOf(item.blank) >= 0;
          var score = strict ? 2 : marker && clause.indexOf(marker) >= 0 ? 1 : 0;
          if (!score) continue;
          var candidate = clause.split(/\s+/).filter(Boolean);
          if (candidate.length < 3 || candidate.length > 12) continue;
          if (score > bestScore) {
            bestScore = score;
            bestClause = clause;
          }
        }
      }
      orderSentence = bestClause;
    }
    if (!orderSentence) orderSentence = stripEndPunct(ex1);
    orderSentence = stripEndPunct(orderSentence);

    var orderTokens = orderSentence.split(/\s+/).filter(Boolean);
    var orderShuffled = seededShuffle(
      orderTokens.map(function (t, i) {
        return { text: t, i: i };
      }),
      Deck.hash(item.id + "order")
    );
    return {
      choice: {
        sentence: ex0.replace(choiceBlank, "____"),
        options: choiceOptions,
        answer: choiceOptions.indexOf(choiceBlank),
        correctText: choiceBlank,
      },
      fill: {
        sentence: ex1.replace(fillBlank, "____"),
        answer: fillBlank,
        correctText: fillBlank,
      },
      order: {
        tokens: orderShuffled,
        answer: orderTokens,
        sentence: orderSentence,
      },
    };
  }

  function ensureGrammarExercise(item) {
    if (app.grammarExercise && app.grammarExercise.itemId === item.id) return app.grammarExercise;
    app.grammarExercise = {
      itemId: item.id,
      data: buildGrammarExerciseData(item),
      choice: { selected: null, checked: false, correct: false },
      fill: { value: "", checked: false, correct: false },
      order: { picked: [], checked: false, correct: false },
      completed: false,
    };
    return app.grammarExercise;
  }

  function grammarScore(ex) {
    return (ex.choice.correct ? 1 : 0) + (ex.fill.correct ? 1 : 0) + (ex.order.correct ? 1 : 0);
  }

  function grammarAllChecked(ex) {
    return ex.choice.checked && ex.fill.checked && ex.order.checked;
  }

  function maybeCompleteGrammar(item, ex) {
    if (!grammarAllChecked(ex) || ex.completed) return;
    ex.completed = true;
    var res = Store.completeGrammar(app.state, item.id, grammarScore(ex));
    var unit = res.unitId ? GU[res.unitId] : null;
    var unitLabel = unit ? "Unit " + unit.num : "Unit";
    if (res.starEarned && res.newlyCompleted) toast(unitLabel + " complete · +1 star ★ · +10 Taler 🪙");
    else if (res.starEarned) toast(unitLabel + " complete · +1 star ★");
    else if (res.newlyCompleted) toast("Lesson complete · +10 Taler 🪙");
  }

  function grammarProgressHtml(done, total, compact) {
    var p = total ? Math.round((done / total) * 100) : 0;
    return (
      '<div class="grammar-progress ' + (compact ? "compact" : "") + '">' +
      '<div class="level-track" role="progressbar" aria-label="Grammar progress" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + done + '"><div class="level-fill" style="width:' + p + '%"></div></div>' +
      '<div class="level-meta"><span>' + done + " / " + total + " lessons</span><span>" + p + "%</span></div></div>"
    );
  }

  function renderGrammar() {
    var parts = app.grammarRoute || [];
    if (parts[0] === "unit" && GU[parts[1]]) return renderGrammarUnit(parts[1]);
    if (parts[0] === "item" && GI[parts[1]]) return renderGrammarItem(parts[1]);
    return renderGrammarIndex();
  }

  function renderGrammarIndex() {
    var prog = Store.grammarProgress(app.state);
    var starStats = Store.grammarStars(app.state);
    var starUnits = (app.state.cafe && app.state.cafe.starUnits) || {};
    var q = (app.grammarSearch || "").trim().toLowerCase();
    var next = grammarNextItem();
    var body;
    if (q) {
      var found = GRAMMAR_ITEMS.filter(function (i) {
        var u = GU[i.unit] || {};
        return (
          i.title.toLowerCase().indexOf(q) >= 0 ||
          i.pattern.toLowerCase().indexOf(q) >= 0 ||
          i.summary.toLowerCase().indexOf(q) >= 0 ||
          (i.examples || []).some(function (e) { return e[0].toLowerCase().indexOf(q) >= 0; }) ||
          (i.formation || []).some(function (f) { return f.toLowerCase().indexOf(q) >= 0; }) ||
          (u.title || "").toLowerCase().indexOf(q) >= 0
        );
      });
      body =
        '<div class="grammar-search-count">' + found.length + " matching lessons</div>" +
        '<div class="grammar-result-list">' +
        (found
          .map(function (i) {
            var u = GU[i.unit] || {};
            return (
              '<a class="grammar-result-row" href="#/grammar/item/' + esc(i.id) + '">' +
              '<div><span class="grammar-unit-label">Unit ' + esc(String(u.num || "")) + " · " + esc(u.title || "") + "</span>" +
              "<strong>" + esc(i.title) + "</strong><span class=\"pattern-text\">" + esc(i.pattern) + "</span></div>" +
              '<span class="pill ' + (grammarCompleted(i.id) ? "mature" : "") + '">' + (grammarCompleted(i.id) ? "done" : "lesson") + "</span></a>"
            );
          })
          .join("") || '<div class="empty">No grammar lessons match that search.</div>') +
        "</div>";
    } else {
      body =
        '<div class="grammar-unit-grid">' +
        GRAMMAR_UNITS.map(function (u) {
          var items = GRAMMAR_ITEMS.filter(function (i) { return i.unit === u.id; });
          var done = items.filter(function (i) { return grammarCompleted(i.id); }).length;
          return (
            '<a class="grammar-unit-card" href="#/grammar/unit/' + esc(u.id) + '">' +
            '<div class="grammar-unit-top"><span>Unit ' + esc(String(u.num)) + '</span><span class="grammar-unit-top-right"><span class="unit-star ' + (starUnits[u.id] ? "earned" : "") + '" aria-hidden="true" title="' + (starUnits[u.id] ? "Unit star earned" : "Complete this unit to earn a star") + '">★</span>' + done + " / " + items.length + "</span></div>" +
            "<h3>" + esc(u.title) + "</h3><p>" + esc(u.subtitle || "") + "</p>" +
            '<div class="grammar-unit-bar"><div style="width:' + (items.length ? (done / items.length) * 100 : 0) + '%"></div></div>' +
            '<div class="grammar-unit-items">' +
            items.slice(0, 4).map(function (i) { return "<span>" + esc(grammarShortLabel(i)) + "</span>"; }).join("") +
            (items.length > 4 ? "<span>+" + (items.length - 4) + "</span>" : "") +
            "</div></a>"
          );
        }).join("") +
        "</div>";
    }
    return (
      '<div class="grammar-page">' +
      '<div class="page-head"><div><p class="eyebrow">The grammar path</p><h1>Grammar</h1><p>28 visual A1–A2 lessons inspired by Dieses kleine Buch ist für dich, with examples, context and practice.</p></div>' +
      '<div class="grammar-head-meta"><div class="bean-pill" style="font-size:13px;padding:9px 13px">' + icon("book") + " " + prog.completed + " / " + prog.total + '</div><button class="bean-pill star-pill" style="font-size:13px;padding:9px 13px" data-action="atelier">' + icon("star") + " " + starStats.balance + " stars</button></div></div>" +
      grammarProgressHtml(prog.completed, prog.total, false) +
      '<div class="grammar-star-panel">' +
      '<div class="grammar-star-head"><div class="grammar-star-emblem" aria-hidden="true">★</div><div><h2>Grammar stars</h2><p>Complete a whole unit to earn one star. Spend stars in the Christmas market atelier on permanent study charms.</p></div><div class="grammar-star-total"><strong>' + starStats.balance + '</strong><span>' + starWord(starStats.balance) + " · " + starStats.units + " / " + starStats.total + " units</span></div></div>" +
      '<div class="grammar-star-pips">' + GRAMMAR_UNITS.map(function (u) { return '<span class="grammar-star-pip ' + (starUnits[u.id] ? "earned" : "") + '" aria-hidden="true" title="Unit ' + esc(String(u.num)) + " · " + esc(u.title) + (starUnits[u.id] ? " — star earned" : " — not yet earned") + '">★</span>'; }).join("") + '</div>' +
      '<div class="grammar-star-actions"><button class="btn btn-soft btn-sm" data-action="atelier">Open synthesis atelier ' + icon("arrow") + '</button><span class="muted">' + starStats.earned + " " + starWord(starStats.earned) + " earned in total</span></div></div>" +
      (next
        ? '<a class="grammar-continue" href="#/grammar/item/' + esc(next.id) + '"><div class="cafe-mini-art">G</div><div><h2>Continue · ' + esc(next.title) + '</h2><p>' + esc(next.pattern) + " · " + esc(next.summary) + '</p></div><span class="btn btn-primary">Open lesson ' + icon("arrow") + "</span></a>"
        : '<div class="grammar-continue done"><div class="cafe-mini-art">✓</div><div><h2>All 28 lessons complete</h2><p>Revisit any unit whenever you want.</p></div></div>') +
      '<div class="search-wrap" style="margin-top:20px">' + icon("search") + '<input class="search" type="search" placeholder="Search grammar, pattern or unit…" value="' + esc(app.grammarSearch) + '" data-role="grammar-search" /></div>' +
      body +
      "</div>"
    );
  }

  function renderGrammarUnit(unitId) {
    var unit = GU[unitId];
    var items = GRAMMAR_ITEMS.filter(function (i) { return i.unit === unitId; });
    var done = items.filter(function (i) { return grammarCompleted(i.id); }).length;
    var starEarned = !!(app.state.cafe && app.state.cafe.starUnits && app.state.cafe.starUnits[unitId]);
    return (
      '<div class="grammar-page">' +
      '<div class="grammar-breadcrumb"><a href="#/grammar">Grammar</a><span>/</span><span>Unit ' + esc(String(unit.num)) + "</span></div>" +
      '<div class="grammar-hero"><div><p class="eyebrow">Unit ' + esc(String(unit.num)) + "</p><h1>" + esc(unit.title) + "</h1><p>" + esc(unit.subtitle || "") + "</p></div>" +
      '<div class="grammar-hero-progress"><strong>' + done + "</strong><span>/ " + items.length + ' complete</span><div class="unit-hero-star ' + (starEarned ? "earned" : "") + '" aria-hidden="true" title="' + (starEarned ? "Unit star earned" : "Complete this unit to earn a grammar star") + '">★</div></div></div>' +
      '<div class="grammar-layout"><div class="grammar-main">' +
      '<section class="panel"><div class="panel-head"><h2>In context</h2><span>hover or tap highlighted words and patterns</span></div><div class="dialogue">' +
      (unit.context || []).map(function (line) {
        return '<div class="dialogue-line"><span class="speaker-tag">' + esc(line.speaker) + '</span><div><div class="grammar-ko" lang="de">' + glossMarkup(line.text, [], null) + '</div><div class="grammar-en" lang="en">' + esc(line.en) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel"><div class="panel-head"><h2>Lessons in this unit</h2><span>' + done + " / " + items.length + "</span></div><div class=\"unit-item-list\">" +
      items.map(function (i) {
        return '<a class="unit-item-row" href="#/grammar/item/' + esc(i.id) + '"><div><span class="grammar-unit-label">' + esc(String(i.num).padStart(2, "0")) + "</span><strong>" + esc(i.title) + '</strong><span class="pattern-text">' + esc(i.pattern) + "</span></div>" + (grammarCompleted(i.id) ? '<span class="pill mature">done</span>' : '<span class="pill">open</span>') + "</a>";
      }).join("") +
      "</div></section>" +
      "</div><aside class=\"grammar-side\">" +
      '<div class="panel"><div class="panel-head"><h2>Unit progress</h2><span>28 lessons total</span></div>' + grammarProgressHtml(done, items.length, false) +
      '<div class="grammar-unit-reward ' + (starEarned ? "earned" : "") + '"><span class="grammar-unit-reward-star" aria-hidden="true">★</span><div><strong>Unit reward</strong><p>' + (starEarned ? "Earned. Spend it in the Christmas market atelier." : "Complete all " + items.length + " lessons to earn 1 grammar star.") + '</p></div></div>' +
      '<p class="about-box" style="margin-top:14px">Open a lesson to read the explanation, hover the examples, then complete the three practice exercises.</p></div>' +
      '<div class="panel"><div class="panel-head"><h2>All units</h2><span><a class="link" href="#/grammar">View index</a></span></div><div class="unit-mini-list">' +
      GRAMMAR_UNITS.map(function (u) { return '<a href="#/grammar/unit/' + esc(u.id) + '" class="' + (u.id === unitId ? "active" : "") + '">' + esc(String(u.num)) + ". " + esc(u.title) + "</a>"; }).join("") +
      "</div></div></aside></div></div>"
    );
  }


  function renderGrammarVisual(item) {
    var v = item.visual;
    if (!v) return "";
    var body = "";
    if (v.kind === "gender") {
      body = '<div class="vis-gender-grid">' + v.columns.map(function (col) {
        return '<div class="vis-gender-col vis-' + esc(col.tone) + '"><div class="vis-gender-art">' + esc(col.article) + '</div><div class="vis-gender-words">' +
          col.words.map(function (w) { return '<button class="vis-word" data-action="g-visual">' + esc(w) + '</button>'; }).join("") +
          '</div><div class="vis-gender-foot">masculine / feminine / neuter</div></div>';
      }).join("") + '</div>';
    } else if (v.kind === "plural") {
      body = '<div class="vis-plural-grid">' + v.groups.map(function (g) {
        return '<div class="vis-plural-card"><strong>' + esc(g.end) + '</strong>' + g.examples.map(function (e) { return '<span>' + esc(e) + '</span>'; }).join("") + '</div>';
      }).join("") + '</div>';
    } else if (v.kind === "verb") {
      body = '<div class="vis-verb-head"><span>' + esc(v.verb) + '</span><span>verb stem + ending</span></div><div class="vis-verb-grid">' +
        v.pronouns.map(function (p, i) {
          return '<button class="vis-verb-cell" data-action="g-visual"><span>' + esc(p) + '</span><strong>' + esc(v.forms[i]) + '</strong></button>';
        }).join("") + '</div>';
    } else if (v.kind === "cases") {
      body = '<div class="vis-case-grid" style="grid-template-columns:44px repeat(' + v.columns.length + ',minmax(0,1fr))"><div class="vis-case-corner"></div>' +
        v.columns.map(function (c, i) { return '<div class="vis-case-head vis-case-' + i + '">' + esc(c) + '</div>'; }).join("") +
        v.rows.map(function (row, ri) {
          var rowLabels = v.rowLabels || (v.rows.length === 4 ? ["m", "f", "n", "pl"] : []);
          return '<div class="vis-case-row-label">' + esc(rowLabels[ri] || String(ri + 1)) + '</div>' + row.map(function (cell, ci) {
            return '<button class="vis-case-cell vis-case-' + ci + '" data-action="g-visual">' + esc(cell) + '</button>';
          }).join("");
        }).join("") + '</div>';
    } else if (v.kind === "contrast") {
      body = '<div class="vis-contrast-grid"><div class="vis-contrast-card vis-left"><h3>' + esc(v.left.title) + '</h3><p>' + esc(v.left.text) + '</p>' + v.left.examples.map(function (e) { return '<span>' + esc(e) + '</span>'; }).join("") + '</div>' +
        '<div class="vis-contrast-card vis-right"><h3>' + esc(v.right.title) + '</h3><p>' + esc(v.right.text) + '</p>' + v.right.examples.map(function (e) { return '<span>' + esc(e) + '</span>'; }).join("") + '</div></div>';
    } else if (v.kind === "question") {
      body = '<div class="vis-question"><div class="vis-qwords">' + v.w.map(function (x) { return '<span><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</span>'; }).join("") + '</div><div class="vis-yesno">' +
        v.yesno.map(function (e) { return '<button class="vis-sentence-chip" data-action="g-visual">' + esc(e) + '</button>'; }).join("") + '</div></div>';
    } else if (v.kind === "possessive" || v.kind === "reflexive") {
      if (v.kind === "possessive") {
        body = '<div class="vis-pronoun-table">' + v.rows.map(function (r) { return '<div><span>' + esc(r[0]) + '</span><strong>' + esc(r[1]) + '</strong></div>'; }).join("") + '</div>';
      } else {
        body = '<div class="vis-pronoun-table">' + v.pronouns.map(function (p, i) { return '<div><span>' + esc(p) + '</span><strong>' + esc(v.forms[i]) + '</strong></div>'; }).join("") + '</div>';
      }
    } else if (v.kind === "sentence") {
      body = '<div class="vis-sentence-flow">' + v.chunks.map(function (c, i) {
        return '<button class="vis-sentence-chip vis-sentence-' + (i % 4) + '" data-action="g-visual"><strong>' + esc(c[0]) + '</strong><span>' + esc(c[1]) + '</span></button>' + (i < v.chunks.length - 1 ? '<i class="vis-arrow">→</i>' : "");
      }).join("") + '</div>';
    } else if (v.kind === "prepositions") {
      body = '<div class="vis-contrast-grid"><div class="vis-contrast-card vis-left"><h3>Akkusativ</h3>' + v.accusative.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join("") + '</div><div class="vis-contrast-card vis-right"><h3>Dativ</h3>' + v.dative.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join("") + '</div></div>';
    } else if (v.kind === "twoway") {
      body = '<div class="vis-twoway"><div><strong>Wo?</strong><span>Dativ</span><b>' + esc(v.wo) + '</b></div><div class="vis-twoway-move">→</div><div><strong>Wohin?</strong><span>Akkusativ</span><b>' + esc(v.wohin) + '</b></div></div><div class="vis-prep-pills">' + v.preps.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join("") + '</div>';
    } else if (v.kind === "timeline") {
      body = '<div class="vis-timeline">' + v.items.map(function (x) { return '<div class="vis-time-item"><strong>' + esc(x[0]) + '</strong><span>' + esc(x[1]) + '</span></div>'; }).join("") + '</div>';
    } else if (v.kind === "clause") {
      body = '<div class="vis-clause"><div class="vis-clause-main"><span>main clause</span><strong>' + esc(v.main) + '</strong></div><div class="vis-clause-arrow">+</div><div class="vis-clause-sub"><span>' + esc(v.connector) + '</span><strong>' + esc(v.sub.join(" ")) + '</strong><em>' + esc(v.rule) + '</em></div></div>';
    } else if (v.kind === "compare") {
      body = '<div class="vis-compare-legend"><span class="c1">base</span><span class="c2">comparative</span><span class="c3">superlative</span></div><div class="vis-compare">' + v.items.map(function (x) {
        return '<div class="vis-compare-row"><span>' + esc(x[0]) + '</span><div class="vis-compare-bars"><i style="--w:' + x[3] + '%"></i><i style="--w:' + x[4] + '%"></i><i style="--w:' + x[5] + '%"></i></div><b>' + esc(x[1]) + ' · ' + esc(x[2]) + '</b></div>';
      }).join("") + '</div>';
    }
    return '<section class="panel grammar-visual-panel"><div class="panel-head"><h2>Visual grammar</h2><span>' + esc(item.pattern) + '</span></div>' + body + '</section>';
  }

  function renderGrammarItem(itemId) {
    var item = GI[itemId];
    if (!item) return renderGrammarIndex();
    var unit = GU[item.unit] || {};
    var ex = ensureGrammarExercise(item);
    var idx = grammarItemIndex(item.id);
    var prev = idx > 0 ? GRAMMAR_ITEMS[idx - 1] : null;
    var next = idx >= 0 && idx < GRAMMAR_ITEMS.length - 1 ? GRAMMAR_ITEMS[idx + 1] : null;
    var unitItems = GRAMMAR_ITEMS.filter(function (i) { return i.unit === item.unit; });
    if (grammarAllChecked(ex) && !ex.completed) maybeCompleteGrammar(item, ex);
    var g = app.state.grammar[item.id] || {};
    var score = grammarScore(ex);
    var started = !!(g.attempts || g.seen || ex.choice.checked || ex.fill.checked || ex.order.checked);
    return (
      '<div class="grammar-page">' +
      '<div class="grammar-breadcrumb"><a href="#/grammar">Grammar</a><span>/</span><a href="#/grammar/unit/' + esc(item.unit) + '">Unit ' + esc(String(unit.num)) + "</a><span>/</span><span>" + esc(item.title) + "</span></div>" +
      '<div class="grammar-hero"><div><p class="eyebrow">Unit ' + esc(String(unit.num)) + " · Lesson " + esc(String(item.num)) + "</p><h1>" + esc(item.title) + '</h1><div class="pattern-chip">' + esc(item.pattern) + "</div><p>" + esc(item.summary) + "</p></div>" +
      '<div class="grammar-hero-progress"><strong>' + (g.bestScore || 0) + "</strong><span>/ 3 best score</span><div style=\"margin-top:6px\">" + (grammarCompleted(item.id) ? '<span class="pill mature">completed</span>' : (started ? '<span class="pill">in progress</span>' : '<span class="pill">not started</span>')) + "</div></div></div>" +
      '<div class="grammar-layout"><div class="grammar-main">' +
      renderGrammarVisual(item) +
      '<section class="panel"><div class="panel-head"><h2>How it works</h2><span>' + esc(item.pattern) + '</span></div><p class="grammar-explanation">' + esc(item.summary) + "</p>" +
      '<div class="formation-list">' + (item.formation || []).map(function (f) { return "<div>" + esc(f) + "</div>"; }).join("") + "</div>" +
      (item.tip ? '<div class="grammar-tip"><strong>Tip</strong> ' + esc(item.tip) + "</div>" : "") +
      "</section>" +
      '<section class="panel"><div class="panel-head"><h2>Examples</h2><span>hover the highlighted parts</span></div><div class="grammar-examples">' +
      item.examples.map(function (e) {
        return '<div class="grammar-example"><button class="speaker small soft" data-action="speak" data-text="' + esc(e[0]) + '" aria-label="Listen">' + icon("speaker", 16) + '</button><div><div class="grammar-ko" lang="de">' + glossText(e[0], item.forms, item.id) + '</div><div class="grammar-en" lang="en">' + esc(e[1]) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel"><div class="panel-head"><h2>In context · Unit ' + esc(String(unit.num)) + '</h2><span>your target is highlighted</span></div><div class="dialogue">' +
      (unit.context || []).map(function (line) {
        return '<div class="dialogue-line"><span class="speaker-tag">' + esc(line.speaker) + '</span><div><div class="grammar-ko" lang="de">' + glossMarkup(line.text, [], item.id) + '</div><div class="grammar-en" lang="en">' + esc(line.en) + "</div></div></div>";
      }).join("") +
      "</div></section>" +
      '<section class="panel grammar-practice"><div class="panel-head"><h2>Practice</h2><span>3 exercises · +1 Taler for each first correct answer</span></div>' +
      renderGrammarExercises(item, ex, score) +
      "</section>" +
      "</div><aside class=\"grammar-side\">" +
      '<div class="panel"><div class="panel-head"><h2>Your progress</h2><span>' + (g.attempts || 0) + " attempts</span></div>" +
      '<div class="grammar-progress"><div class="level-track"><div class="level-fill" style="width:' + (score / 3) * 100 + '%"></div></div><div class="level-meta"><span>This attempt</span><span>' + score + " / 3</span></div></div>" +
      '<p class="about-box" style="margin-top:14px">' + (grammarCompleted(item.id) ? "Completed. Revisit anytime; your best score is " + (g.bestScore || 0) + " / 3." : "Complete at least 2 of 3 exercises to finish the lesson.") + "</p></div>" +
      '<div class="panel"><div class="panel-head"><h2>In this unit</h2><span><a class="link" href="#/grammar/unit/' + esc(item.unit) + '">Unit ' + esc(String(unit.num)) + "</a></span></div><div class=\"unit-mini-list\">" +
      unitItems.map(function (i) { return '<a href="#/grammar/item/' + esc(i.id) + '" class="' + (i.id === item.id ? "active" : "") + '">' + esc(String(i.num)) + ". " + esc(i.title) + "</a>"; }).join("") +
      "</div></div>" +
      '<div class="grammar-prevnext">' + (prev ? '<a class="btn btn-ghost" href="#/grammar/item/' + esc(prev.id) + '">' + icon("back") + " Previous</a>" : "<span></span>") + (next ? '<a class="btn btn-soft" href="#/grammar/item/' + esc(next.id) + '">Next ' + icon("arrow") + "</a>" : '<a class="btn btn-soft" href="#/grammar">Grammar index ' + icon("arrow") + "</a>") + "</div>" +
      "</aside></div></div>"
    );
  }

  function renderGrammarExercises(item, ex, score) {
    var d = ex.data;
    var choiceOptions = d.choice.options.map(function (o, i) {
      var cls = "";
      if (ex.choice.checked) {
        if (i === d.choice.answer) cls = " correct";
        else if (i === ex.choice.selected) cls = " wrong";
      }
      return '<button class="exercise-option' + cls + '" data-action="g-choice" data-index="' + i + '"' + (ex.choice.checked ? " disabled" : "") + '><span class="key">' + (i + 1) + "</span>" + esc(o) + "</button>";
    }).join("");
    var choiceFeedback = ex.choice.checked
      ? '<div class="exercise-feedback ' + (ex.choice.correct ? "good" : "bad") + '">' + (ex.choice.correct ? "Correct. " : "Not quite. The answer is " + esc(d.choice.correctText) + ". ") + esc(item.summary) + "</div>"
      : "";
    var fillFeedback = ex.fill.checked
      ? '<div class="exercise-feedback ' + (ex.fill.correct ? "good" : "bad") + '">' + (ex.fill.correct ? "Correct. " : "Not quite. The answer is " + esc(d.fill.correctText) + ". ") + esc(item.summary) + "</div>"
      : "";
    var pickedText = ex.order.picked.map(function (i) { return d.order.tokens[i] ? d.order.tokens[i].text : ""; }).join(" ");
    var orderFeedback = ex.order.checked
      ? '<div class="exercise-feedback ' + (ex.order.correct ? "good" : "bad") + '">' + (ex.order.correct ? "Correct. " : "Not quite. Correct order: " + esc(d.order.answer.join(" ")) + ". ") + esc(item.summary) + "</div>"
      : "";
    var allDone = grammarAllChecked(ex);
    var completeBanner = allDone
      ? '<div class="exercise-complete ' + (score >= 2 ? "good" : "bad") + '">' + (score >= 2 ? "Lesson complete — " + score + " / 3 correct." : "You got " + score + " / 3. Review the explanation and try again.") + "</div>"
      : "";
    var tokens = d.order.tokens.map(function (t, i) {
      var picked = ex.order.picked.indexOf(i) >= 0;
      return '<button class="order-token' + (picked ? " picked" : "") + '" data-action="g-order" data-index="' + i + '"' + (picked || ex.order.checked ? " disabled" : "") + ">" + esc(t.text) + "</button>";
    }).join("");
    var next = GRAMMAR_ITEMS[grammarItemIndex(item.id) + 1];
    var nextHref = next ? "#/grammar/item/" + esc(next.id) : "#/grammar";
    return (
      '<div class="exercise-grid">' +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">1</span><div><h3>Choose the correct form</h3><p>' + esc(d.choice.sentence) + '</p><p class="exercise-en">' + esc(item.examples[0][1]) + "</p></div></div>" +
      '<div class="exercise-options">' + choiceOptions + "</div>" + choiceFeedback + "</div>" +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">2</span><div><h3>Fill in the blank</h3><p>' + esc(d.fill.sentence) + '</p><p class="exercise-en">' + esc(item.examples[1][1]) + "</p></div></div>" +
      '<div class="exercise-fill"><input class="exercise-input" data-role="g-fill" value="' + esc(ex.fill.value) + '" placeholder="Type the missing form" ' + (ex.fill.checked ? "disabled" : "") + ' /><button class="btn btn-primary btn-sm" data-action="g-check-fill"' + (ex.fill.checked ? " disabled" : "") + ">Check</button></div>" +
      fillFeedback + "</div>" +
      '<div class="exercise-card"><div class="exercise-head"><span class="exercise-num">3</span><div><h3>Put the sentence in order</h3><p>Tap the words in the correct order. Use every word once.</p></div></div>' +
      '<div class="order-picked">' + (pickedText || '<span class="muted">Your sentence appears here</span>') + "</div>" +
      '<div class="order-tokens">' + tokens + "</div>" +
      '<div class="exercise-actions"><button class="btn btn-ghost btn-sm" data-action="g-order-undo"' + (ex.order.checked || !ex.order.picked.length ? " disabled" : "") + ">Undo</button><button class=\"btn btn-primary btn-sm\" data-action=\"g-check-order\"" + (ex.order.checked || !ex.order.picked.length ? " disabled" : "") + ">Check</button></div>" +
      orderFeedback + "</div>" +
      "</div>" + completeBanner +
      (allDone ? '<div class="exercise-actions" style="margin-top:14px"><button class="btn btn-soft" data-action="g-reset">Try again</button><a class="btn btn-primary" href="' + nextHref + '">' + (next ? "Next lesson" : "Back to grammar") + " " + icon("arrow") + "</a></div>" : "")
    );
  }

  function grammarExercise() {
    return app.grammarExercise;
  }

  function checkGrammarChoice(index) {
    var ex = grammarExercise();
    if (!ex || ex.choice.checked) return;
    ex.choice.selected = index;
    ex.choice.checked = true;
    ex.choice.correct = index === ex.data.choice.answer;
    if (ex.choice.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 0)) toast("+1 Taler 🪙");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function checkGrammarFill() {
    var ex = grammarExercise();
    if (!ex || ex.fill.checked) return;
    var input = document.querySelector("[data-role='g-fill']");
    if (input) ex.fill.value = input.value;
    var given = normalizeKo(ex.fill.value);
    var answer = normalizeKo(ex.data.fill.answer);
    ex.fill.checked = true;
    ex.fill.correct = given === answer || given.replace(/\s/g, "") === answer.replace(/\s/g, "");
    if (ex.fill.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 1)) toast("+1 Taler 🪙");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function pickGrammarOrder(index) {
    var ex = grammarExercise();
    if (!ex || ex.order.checked || ex.order.picked.indexOf(index) >= 0) return;
    ex.order.picked.push(index);
    render();
  }

  function undoGrammarOrder() {
    var ex = grammarExercise();
    if (!ex || ex.order.checked || !ex.order.picked.length) return;
    ex.order.picked.pop();
    render();
  }

  function checkGrammarOrder() {
    var ex = grammarExercise();
    if (!ex || ex.order.checked) return;
    if (ex.order.picked.length !== ex.data.order.tokens.length) {
      toast("Use all the words first.");
      return;
    }
    var given = ex.order.picked.map(function (i) { return ex.data.order.tokens[i].text; }).join(" ");
    ex.order.checked = true;
    ex.order.correct = normalizeKo(given) === normalizeKo(ex.data.order.answer.join(" "));
    if (ex.order.correct && Store.rewardGrammarExercise(app.state, ex.itemId, 2)) toast("+1 Taler 🪙");
    maybeCompleteGrammar(GI[ex.itemId], ex);
    render();
  }

  function resetGrammarExercise() {
    var ex = grammarExercise();
    if (!ex) return;
    ex.choice = { selected: null, checked: false, correct: false };
    ex.fill = { value: "", checked: false, correct: false };
    ex.order = { picked: [], checked: false, correct: false };
    ex.completed = false;
    render();
  }

  /* ---------------------------------------------------------------------
     Hover/tap glosses for vocabulary and grammar in context.
     --------------------------------------------------------------------- */

  function stripGlossPunct(text) {
    return String(text || "")
      .replace(/[.!?。？！,;:，"'“”‘’()\[\]]/g, "")
      .replace(/^[-–—]+|[-–—]+$/g, "")
      .trim();
  }

  function lowerFirst(text) {
    return text ? text.charAt(0).toLowerCase() + text.slice(1) : text;
  }

  function upperFirst(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
  }

  function glossNote(text) {
    if (!text || !window.GRAMMAR_GLOSSARY) return null;
    return (
      window.GRAMMAR_GLOSSARY[text] ||
      window.GRAMMAR_GLOSSARY[lowerFirst(text)] ||
      window.GRAMMAR_GLOSSARY[upperFirst(text)] ||
      null
    );
  }

  function glossCard(text) {
    if (!text) return null;
    return Deck.byWord[text] || Deck.byLemma[text] || Deck.byLemmaLower[String(text).toLowerCase()] || null;
  }

  /* German words change at the end far more than at the start. These
     candidates cover the regular noun plurals, adjective endings and
     present/past verb forms that appear in the A1–A2 texts. Nothing is
     guessed unless the candidate is already in the deck or glossary. */
  function germanCandidates(text) {
    var out = [];
    function add(x) {
      if (x && x.length >= 3 && x !== text && out.indexOf(x) < 0) out.push(x);
    }
    var lower = text.toLowerCase();
    add(lowerFirst(text));

    var nounSuffixes = ["innen", "ungen", "heiten", "keiten", "schaften", "ern", "em", "er", "en", "es", "e", "n", "s"];
    nounSuffixes.forEach(function (suf) {
      if (lower.length <= suf.length + 2 || lower.slice(-suf.length) !== suf) return;
      var stem = text.slice(0, -suf.length);
      add(stem);
      add(stem + "e");
      add(stem + "en");
      add(lowerFirst(stem));
      add(upperFirst(lowerFirst(stem)));
    });

    var verbSuffixes = ["ieren", "ierte", "iert", "test", "ten", "tet", "est", "ete", "et", "st", "te", "en", "e", "t"];
    verbSuffixes.forEach(function (suf) {
      if (lower.length <= suf.length + 2 || lower.slice(-suf.length) !== suf) return;
      var stem = lower.slice(0, -suf.length);
      add(stem + "en");
      add(stem + "n");
      add(stem + "e");
      add(stem);
    });

    if (lower.slice(0, 2) === "ge" && lower.length > 5) {
      var part = lower.slice(2);
      if (part.slice(-2) === "en") add(part.slice(0, -2) + "en");
      if (part.slice(-1) === "t") add(part.slice(0, -1) + "en");
    }
    return out;
  }

  function resolveGloss(surface, depth) {
    var s = stripGlossPunct(surface);
    if (!s) return null;
    if (app.view === "reader" && window.READER_OVERRIDES && window.READER_OVERRIDES[s]) {
      return { kind: "note", surface: s, entry: window.READER_OVERRIDES[s] };
    }
    var card = glossCard(s);
    if (card) return { kind: "word", surface: s, card: card };
    var note = glossNote(s);
    if (note) return { kind: "note", surface: s, entry: note };
    if ((depth || 0) < 2) {
      var candidates = germanCandidates(s);
      for (var i = 0; i < candidates.length; i++) {
        var c = glossCard(candidates[i]);
        if (c) return { kind: "word", surface: s, card: c, note: "base form: " + c.word };
        var n = glossNote(candidates[i]);
        if (n) return { kind: "note", surface: s, entry: n, note: "base form: " + candidates[i] };
      }
    }
    return null;
  }

  function glossSpan(surface, key, targetId) {
    var cls = "gloss";
    var isGrammar = key.indexOf("g:") === 0;
    if (isGrammar) cls += " grammar";
    if (isGrammar && targetId && key === "g:" + targetId) cls += " target";
    return '<span class="' + cls + '" data-gloss="' + esc(key) + '" tabindex="0" aria-describedby="gloss-tip">' + esc(surface) + "</span>";
  }

  function glossMarkup(text, forms, targetId) {
    var re = /\[\[([^\]]+)\]\]/g;
    var out = "";
    var last = 0;
    var m;
    while ((m = re.exec(text))) {
      out += glossPlain(text.slice(last, m.index), forms, targetId);
      var inside = m[1];
      var parts = inside.split("|");
      var surface = parts[0];
      var key = parts.length > 1 ? parts[1] : "w:" + surface;
      if (key.indexOf("g:") === 0 && GI[key.slice(2)]) {
        out += glossSpan(surface, key, targetId);
      } else {
        var wkey = key.indexOf("w:") === 0 ? key.slice(2) : key;
        if (resolveGloss(wkey)) out += glossSpan(surface, "w:" + wkey, targetId);
        else out += esc(surface);
      }
      last = re.lastIndex;
    }
    out += glossPlain(text.slice(last), forms, targetId);
    return out;
  }

  function glossText(text, forms, targetId) {
    return glossMarkup(text, forms || [], targetId);
  }

  function glossPlain(text, forms, targetId) {
    var source = String(text || "");
    var placed = [];
    (forms || []).slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (form) {
      if (!form) return;
      var idx = source.indexOf(form);
      while (idx >= 0) {
        var ph = "\u0001" + placed.length + "\u0001";
        placed.push(glossSpan(form, "g:" + targetId, targetId));
        source = source.slice(0, idx) + ph + source.slice(idx + form.length);
        idx = source.indexOf(form, idx + ph.length);
      }
    });
    var out = source.split(/(\s+)/).map(function (token) {
      if (!token) return "";
      if (token.indexOf("\u0001") >= 0) return token;
      var m = token.match(/^([^A-Za-zÄÖÜäöüß0-9]*)(.*?)([^A-Za-zÄÖÜäöüß0-9]*)$/);
      if (!m) return esc(token);
      var pre = m[1], core = m[2], post = m[3];
      if (!core) return esc(token);
      if (resolveGloss(core)) return esc(pre) + glossSpan(core, "w:" + core, targetId) + esc(post);
      return esc(token);
    }).join("");
    return out.replace(/\u0001(\d+)\u0001/g, function (_, n) { return placed[Number(n)] || ""; });
  }

  function showGloss(el) {
    var tip = document.getElementById("gloss-tip");
    if (!tip || !el) return;
    var key = el.getAttribute("data-gloss") || "";
    var html = "";
    if (key.indexOf("g:") === 0) {
      var g = GI[key.slice(2)];
      if (!g) { hideGloss(); return; }
      html =
        '<div class="tip-kicker">Grammar pattern</div><div class="tip-title">' + esc(g.title) + '</div><div class="tip-pattern">' + esc(g.pattern) + "</div><p>" + esc(g.summary) + '</p><button class="btn btn-soft btn-sm" data-action="tip-grammar" data-id="' + esc(g.id) + '">Open lesson ' + icon("arrow") + "</button>";
    } else {
      var surface = key.indexOf("w:") === 0 ? key.slice(2) : key;
      var res = resolveGloss(surface);
      if (!res) { hideGloss(); return; }
      if (res.kind === "word") {
        var c = res.card;
        var sub = c.word + (c.romanization ? " · " + c.romanization : "");
        html =
          '<div class="tip-kicker">Vocabulary</div><div class="tip-title">' + esc(res.surface || c.word) + '</div><div class="tip-rom">' + esc(sub) + "</div><p>" + esc(c.meaning_en) + "</p>";
        if (res.note) html += '<div class="tip-note">' + esc(res.note) + "</div>";
        if (c.gender_info) html += '<div class="tip-hanja">' + esc(c.gender_info) + "</div>";
        html += '<div class="tip-actions"><button class="btn btn-soft btn-sm" data-action="tip-speak" data-audio="' + esc(Deck.wordAudio(c)) + '" data-text="' + esc(res.surface || c.word) + '">' + icon("speaker", 14) + ' Listen</button><button class="btn btn-ghost btn-sm" data-action="tip-card" data-id="' + esc(c.id) + '">Open card</button></div>';
      } else {
        var e = res.entry || {};
        var line = e.word ? e.word + (e.r ? " · " + e.r : "") : e.r || "";
        html =
          '<div class="tip-kicker">Vocabulary</div><div class="tip-title">' + esc(res.surface || e.word || surface) + '</div><div class="tip-rom">' + esc(line) + "</div><p>" + esc(e.en || "") + "</p>";
        if (e.note) html += '<div class="tip-note">' + esc(e.note) + "</div>";
        html += '<div class="tip-actions"><button class="btn btn-soft btn-sm" data-action="tip-speak" data-text="' + esc(res.surface || e.word || surface) + '">' + icon("speaker", 14) + " Listen</button></div>";
      }
    }
    tip.innerHTML = html;
    tip.classList.add("show");
    app.tipEl = el;
    requestAnimationFrame(function () {
      var r = el.getBoundingClientRect();
      var tw = tip.offsetWidth || 300;
      var th = tip.offsetHeight || 160;
      var left = Math.max(12, Math.min(window.innerWidth - tw - 12, r.left + r.width / 2 - tw / 2));
      var top = r.top - th - 10;
      if (top < 12) top = r.bottom + 10;
      tip.style.left = left + "px";
      tip.style.top = top + "px";
    });
  }

  function hideGloss() {
    var tip = document.getElementById("gloss-tip");
    if (tip) tip.classList.remove("show");
    app.tipEl = null;
  }

  function scheduleHideGloss() {
    clearTimeout(app.tipHideTimer);
    app.tipHideTimer = setTimeout(hideGloss, 140);
  }

  function onGlossOver(e) {
    var el = e.target.closest && e.target.closest(".gloss");
    if (!el) return;
    clearTimeout(app.tipHideTimer);
    showGloss(el);
  }

  function onGlossOut(e) {
    var el = e.target.closest && e.target.closest(".gloss");
    if (!el) return;
    if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("#gloss-tip")) return;
    scheduleHideGloss();
  }

  function speak(text, rate, onend) {
    var path = Deck.audioFor(text);
    if (path) {
      playAudio(path, rate, onend);
      return;
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast("Speech audio is not available in this browser.");
      if (onend) onend();
      return;
    }
    window.speechSynthesis.cancel();
    speakGerman(text, rate == null ? 0.94 : rate, onend);
  }


  function onClick(e) {
    var gloss = e.target.closest(".gloss");
    if (gloss) {
      e.preventDefault();
      showGloss(gloss);
      return;
    }
    if (!e.target.closest("#gloss-tip")) hideGloss();
    var link = e.target.closest("a[href^='#/']");
    if (link) {
      if (app.session && !app.session.finished && !link.getAttribute("href").startsWith("#/learn")) {
        if (!window.confirm("Leave this session? Your answers are already saved.")) {
          e.preventDefault();
          return;
        }
        app.session = null;
      }
      return;
    }
    var btn = e.target.closest("[data-action]");
    if (!btn) {
      if (e.target.classList && e.target.classList.contains("modal-backdrop")) closeModal();
      return;
    }
    var action = btn.getAttribute("data-action");
    switch (action) {
      case "start":
        startSession({ direction: app.dashboardDirection });
        break;
      case "practice":
        startSession({ practice: 10, direction: app.dashboardDirection });
        break;
      case "set-direction":
        app.dashboardDirection = btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward";
        app.state.settings.lastDirection = app.dashboardDirection;
        Store.save(app.state);
        render();
        break;
      case "set-stats-direction":
        app.statsDirection = btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward";
        render();
        break;
      case "dictation-start":
        startDictation(btn.getAttribute("data-size"));
        break;
      case "dictation-size":
        app.state.dictation.sessionSize = Math.max(5, Math.min(20, Number(btn.getAttribute("data-size")) || 10));
        Store.save(app.state);
        render();
        break;
      case "dictation-play":
        playDictation(false);
        break;
      case "dictation-slow":
        playDictation(true);
        break;
      case "dictation-hint":
        if (app.dictation && !app.dictation.checked) {
          app.dictation.hinted = true;
          render();
          setTimeout(function () {
            var input = document.querySelector("[data-role='dictation-input']");
            if (input) input.focus();
          }, 30);
        }
        break;
      case "dictation-check":
        checkDictation();
        break;
      case "dictation-next":
        nextDictation();
        break;
      case "dictation-exit":
        exitDictation();
        break;
      case "dictation-say":
        var dictationText = btn.getAttribute("data-text") || "";
        if (dictationText) {
          playAudio(Deck.audioFor(dictationText) || "tts:" + dictationText, Number(app.state.settings.audioRate) || 0.94);
        }
        break;
      case "cafe":
        navigate("#/cafe");
        break;
      case "grammar":
        navigate("#/grammar");
        break;
      case "reader":
        navigate("#/reader");
        break;
      case "reader-level":
        app.readerLevel = btn.getAttribute("data-level") || "all";
        render();
        break;
      case "reader-play":
        readerPlayAll();
        break;
      case "reader-stop":
        readerStop();
        break;
      case "reader-line":
        readerSpeakLine(Number(btn.getAttribute("data-index")));
        break;
      case "reader-word":
        readerStop();
        speak(btn.getAttribute("data-text") || "");
        break;
      case "reader-translation":
        app.readerTranslation = !app.readerTranslation;
        var readerPanel = document.querySelector(".reader-text-panel");
        if (readerPanel) readerPanel.classList.toggle("translation-on", app.readerTranslation);
        btn.className = "btn " + (app.readerTranslation ? "btn-soft" : "btn-ghost");
        btn.textContent = app.readerTranslation ? "Hide translation" : "Show translation";
        btn.setAttribute("aria-pressed", app.readerTranslation ? "true" : "false");
        break;
      case "reader-rate":
        app.readerRate = Number(btn.getAttribute("data-rate")) || 0.9;
        Array.prototype.forEach.call(document.querySelectorAll(".reader-rate-btn"), function (button) {
          var active = Number(button.getAttribute("data-rate")) === Number(app.readerRate);
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", active ? "true" : "false");
        });
        if (app.readerPlaying && app.audio.src) app.audio.playbackRate = Number(app.readerRate) || 1;
        break;
      case "reader-read":
        var readingId = (app.readerRoute || [])[0];
        if (readingId && RI[readingId]) {
          var marked = Store.markReading(app.state, readingId);
          readerStop();
          render();
          if (marked.newlyRead) toast("Text finished · +5 Taler 🪙");
        }
        break;
      case "atelier":
        navigate("#/cafe");
        setTimeout(function () {
          var atelier = document.getElementById("atelier");
          if (!atelier) return;
          var y = atelier.getBoundingClientRect().top + window.pageYOffset - 78;
          window.scrollTo(0, Math.max(0, y));
        }, 220);
        break;
      case "synth-item":
        var charmId = btn.getAttribute("data-item");
        var charm = (Cafe.charms || []).filter(function (c) { return c.id === charmId; })[0];
        if (!charm) break;
        var synth = Store.synthesize(app.state, charm);
        if (synth.ok) {
          toast(charm.name + " synthesized! ★");
          render();
        } else if (synth.reason === "stars") {
          toast("Not enough grammar stars — complete another unit first.");
        } else if (synth.reason === "beans") {
          toast("Not enough Taler yet — review a few cards first.");
        } else if (synth.reason === "owned") {
          toast("You already synthesized that charm.");
        }
        break;
      case "buy-item":
        var itemId = btn.getAttribute("data-item");
        var item = Cafe.items.filter(function (i) { return i.id === itemId; })[0];
        if (!item) break;
        var bought = Store.buyItem(app.state, item);
        if (bought.ok) {
          toast(item.name + " added to the Christmas market! 🪙");
          render();
        } else if (bought.reason === "beans") {
          toast("Not enough Taler yet — study a few cards first.");
        } else if (bought.reason === "level") {
          toast("Reach level " + item.level + " to unlock that item.");
        }
        break;
      case "upgrade-item":
        var upgradeId = btn.getAttribute("data-item");
        var upgradeTarget = Cafe.items.filter(function (i) { return i.id === upgradeId; })[0];
        if (!upgradeTarget) break;
        var upgraded = Store.upgradeItem(app.state, upgradeTarget);
        if (upgraded.ok) {
          toast(upgradeTarget.name + " upgraded to level " + upgraded.level + "!");
          render();
        } else if (upgraded.reason === "level") {
          toast("Reach reputation level " + upgraded.required + " to upgrade that stall.");
        } else if (upgraded.reason === "beans") {
          toast("Not enough Taler for that upgrade.");
        } else if (upgraded.reason === "max") {
          toast("That stall is already at maximum level.");
        }
        break;
      case "serve-market":
        var served = Store.serveMarket(app.state);
        if (served.ok) {
          toast("Market day: +" + served.revenue + " Taler · " + served.served + " visitors served · +" + served.reputation + " reputation");
          render();
        } else if (served.reason === "stock") {
          toast("The shelves are empty — buy supplies first.");
        } else {
          toast("No visitors yet — study a few cards first.");
        }
        break;
      case "buy-stock":
        var stockBought = Store.buyStock(app.state, Cafe.supplyPack);
        if (stockBought.ok) {
          toast(stockBought.quantity + " supplies bought for " + stockBought.cost + " Taler.");
          render();
        } else if (stockBought.reason === "full") {
          toast("The stockroom is full.");
        } else {
          toast("Not enough Taler for supplies.");
        }
        break;
      case "browse":
        navigate("#/browse");
        break;
      case "toggle-theme":
        var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        app.state.settings.theme = next;
        Store.save(app.state);
        applyTheme();
        render();
        break;
      case "flip":
        flip();
        break;
      case "mcq":
        startMCQ();
        break;
      case "rate":
        rate(Number(btn.getAttribute("data-grade")));
        break;
      case "option":
        selectOption(Number(btn.getAttribute("data-index")));
        break;
      case "next":
        nextCard();
        break;
      case "exit":
        exitStudy();
        break;
      case "replay-word":
        replayWord();
        break;
      case "replay-example":
        replayExample();
        break;
      case "play-card-word":
        playAudio(Deck.wordAudio(Deck.byId[btn.getAttribute("data-id")]));
        break;
      case "play-card-example":
        playAudio(Deck.exampleAudio(Deck.byId[btn.getAttribute("data-id")]));
        break;
      case "filter":
        app.browse.filter = btn.getAttribute("data-filter");
        app.browse.limit = 100;
        render();
        break;
      case "load-more":
        app.browse.limit += 150;
        render();
        break;
      case "open-card":
        openCard(btn.getAttribute("data-id"));
        break;
      case "close-modal":
        closeModal();
        break;
      case "practice-card":
        closeModal();
        startSession({
          cards: [Deck.byId[btn.getAttribute("data-id")]],
          direction: btn.getAttribute("data-direction") === "reverse" ? "reverse" : "forward",
        });
        break;
      case "g-choice":
        checkGrammarChoice(Number(btn.getAttribute("data-index")));
        break;
      case "g-check-fill":
        checkGrammarFill();
        break;
      case "g-order":
        pickGrammarOrder(Number(btn.getAttribute("data-index")));
        break;
      case "g-order-undo":
        undoGrammarOrder();
        break;
      case "g-check-order":
        checkGrammarOrder();
        break;
      case "g-reset":
        resetGrammarExercise();
        break;
      case "tip-grammar":
        hideGloss();
        navigate("#/grammar/item/" + btn.getAttribute("data-id"));
        break;
      case "tip-speak":
        var tipAudio = btn.getAttribute("data-audio");
        if (tipAudio) playAudio(tipAudio);
        else speak(btn.getAttribute("data-text") || "");
        break;
      case "tip-card":
        hideGloss();
        openCard(btn.getAttribute("data-id"));
        break;
      case "g-visual":
        btn.classList.toggle("active");
        break;
      case "word-part":
        var wordParts = btn.closest(".word-parts");
        if (wordParts) {
          Array.prototype.forEach.call(wordParts.querySelectorAll(".word-part.active"), function (part) {
            part.classList.remove("active");
          });
          btn.classList.add("active");
          var partNote = wordParts.querySelector(".word-part-note");
          if (partNote) partNote.textContent = btn.getAttribute("data-part") + " — " + btn.getAttribute("data-note");
        }
        break;
      case "speak":
        speak(btn.getAttribute("data-text") || "");
        break;
      case "test-voice":
        speak("Dies ist ein Test der Ersatzstimme.");
        break;
      case "home":
        location.hash = "#/";
        break;
      case "review-missed":
        var missed = (app.summary && app.summary.missed || []).map(function (id) { return Deck.byId[id]; }).filter(Boolean);
        if (missed.length) {
          startSession({
            cards: missed,
            direction: app.summary && app.summary.direction === "reverse" ? "reverse" : "forward",
            label: "Missed words",
          });
        }
        break;
      case "toggle-setting":
        var key = btn.getAttribute("data-setting");
        app.state.settings[key] = !app.state.settings[key];
        Store.save(app.state);
        btn.classList.toggle("on", app.state.settings[key]);
        btn.setAttribute("aria-pressed", app.state.settings[key] ? "true" : "false");
        break;
      case "export":
        exportProgress();
        break;
      case "import":
        importProgress();
        break;
      case "reset":
        if (window.confirm("Reset all progress? This cannot be undone. Export a backup first if you want to keep it.")) {
          Store.reset();
          app.state = Store.load();
          Deck.all.forEach(function (c) { Store.getCard(app.state, c.id, "forward"); Store.getCard(app.state, c.id, "reverse"); });
          Store.save(app.state);
          app.grammarExercise = null;
          app.grammarSearch = "";
          app.readerLevel = "all";
          app.readerTranslation = false;
          app.readerRate = 0.9;
          readerStop();
          applyTheme();
          toast("Progress reset.");
          render();
        }
        break;
      default:
        break;
    }
  }

  function onChange(e) {
    var el = e.target.closest("[data-setting]");
    if (!el) return;
    var key = el.getAttribute("data-setting");
    var val = el.type === "number" ? Number(el.value) : el.value;
    if (el.type === "number") {
      var min = Number(el.min || 0);
      var max = Number(el.max || 999);
      val = Math.max(min, Math.min(max, val || 0));
      el.value = val;
    }
    app.state.settings[key] = val;
    Store.save(app.state);
    if (key === "theme") {
      applyTheme();
      render();
    } else if (key === "audioRate") {
      app.audio.playbackRate = Number(val) || 1;
    }
  }

  function onInput(e) {
    var dictationInput = e.target.closest("[data-role='dictation-input']");
    if (dictationInput) {
      if (app.dictation) app.dictation.input = dictationInput.value;
      return;
    }
    var grammarSearch = e.target.closest("[data-role='grammar-search']");
    if (grammarSearch) {
      app.grammarSearch = grammarSearch.value;
      var gpos = grammarSearch.selectionStart;
      render();
      var gnext = document.querySelector("[data-role='grammar-search']");
      if (gnext) {
        gnext.focus();
        gnext.setSelectionRange(gpos, gpos);
      }
      return;
    }
    var grammarFill = e.target.closest("[data-role='g-fill']");
    if (grammarFill && app.grammarExercise) {
      app.grammarExercise.fill.value = grammarFill.value;
      return;
    }
    var el = e.target.closest("[data-role='search']");
    if (!el) return;
    app.browse.query = el.value;
    app.browse.limit = 100;
    app.browse.focus = true;
    var pos = el.selectionStart;
    render();
    var next = document.querySelector(".search");
    if (next) {
      next.focus();
      next.setSelectionRange(pos, pos);
    }
    setTimeout(function () { app.browse.focus = false; }, 0);
  }

  function onKey(e) {
    if (e.target && e.target.matches && e.target.matches("[data-role='g-fill']") && e.key === "Enter") {
      e.preventDefault();
      checkGrammarFill();
      return;
    }
    if (e.target && e.target.matches && e.target.matches("[data-role='dictation-input']") && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (app.dictation && app.dictation.checked) nextDictation();
      else checkDictation();
      return;
    }
    if (app.view === "dictation" && app.dictation && app.dictation.checked && e.key === "Enter" && e.target && !/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName)) {
      e.preventDefault();
      nextDictation();
      return;
    }
    if (e.key === "Escape") hideGloss();
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key === "Escape") {
      if (app.readerPlaying || (window.speechSynthesis && window.speechSynthesis.speaking)) {
        readerStop();
        return;
      }
      if (document.getElementById("modal-root").innerHTML) {
        closeModal();
        return;
      }
      if (location.hash.indexOf("#/learn") === 0) exitStudy();
      return;
    }
    if (location.hash.indexOf("#/learn") !== 0) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (app.mode === "front") flip();
      else if (app.mode === "result") nextCard();
      return;
    }
    if (e.key === "Enter" && app.mode === "result") {
      e.preventDefault();
      nextCard();
      return;
    }
    if (/^[1-4]$/.test(e.key)) {
      if (app.mode === "mcq") {
        e.preventDefault();
        selectOption(Number(e.key) - 1);
      } else if (app.mode === "back") {
        e.preventDefault();
        var rating = Number(e.key);
        if (rating <= 2) rate(rating);
      }
      return;
    }
    if (e.key.toLowerCase() === "a") {
      if (!(app.session && app.session.direction === "reverse" && app.mode === "front")) replayWord();
    }
    if (e.key.toLowerCase() === "s") {
      if (!(app.session && app.session.direction === "reverse" && app.mode === "front")) replayExample();
    }
  }

  init();
})();
