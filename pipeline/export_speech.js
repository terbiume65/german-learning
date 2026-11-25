#!/usr/bin/env node
"use strict";

/* Collect every fixed German string that the app can speak. The output is
   consumed by pipeline/build_audio.py. Run from the project root with:
     node pipeline/export_speech.js
*/

const fs = require("fs");
const path = require("path");

global.window = {};
require(path.join(__dirname, "..", "german-app", "data", "vocab.js"));
require(path.join(__dirname, "..", "german-app", "data", "dictation-data.js"));
require(path.join(__dirname, "..", "german-app", "data", "grammar-de.js"));
require(path.join(__dirname, "..", "german-app", "data", "reader-de.js"));

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

const seen = new Set();
const texts = [];
function add(text) {
  const key = speechKey(text);
  if (!key || key.length > 220 || seen.has(key)) return;
  seen.add(key);
  texts.push(key);
}

(window.VOCAB || []).forEach((card) => {
  add(card.word);
  if (card.lemma && card.lemma !== card.word) add(card.lemma);
  add(card.example_ko);
});

(window.GRAMMAR_ITEMS || []).forEach((item) => {
  (item.examples || []).forEach((example) => add(example[0]));
  (item.forms || []).forEach(add);
});

(window.GRAMMAR_UNITS || []).forEach((unit) => {
  (unit.context || []).forEach((line) => add(line.text));
});

(window.READER_TEXTS || []).forEach((text) => {
  (text.lines || []).forEach((line) => add(line.ko));
  (text.vocab || []).forEach(add);
});

Object.keys(window.GRAMMAR_GLOSSARY || {}).forEach(add);

((window.DICTATION_DATA || {}).fixed || []).forEach((item) => add(item.de));

fs.mkdirSync(path.join(__dirname, "work"), { recursive: true });
fs.writeFileSync(
  path.join(__dirname, "work", "speech_texts.json"),
  JSON.stringify({ texts, count: texts.length }, null, 2)
);
console.log("wrote", texts.length, "unique speech strings");
