/* Word-building breakdowns for selected German A1 cards.
 *
 * Each part is a short, tappable segment. Types are used only for colour:
 * prefix, root, suffix, compound or link.
 */
window.WORD_PARTS = {
  Anrufbeantworter: [
    { text: "An", type: "prefix", note: "an- = toward / on" },
    { text: "ruf", type: "root", note: "rufen = to call" },
    { text: "be", type: "prefix", note: "be- makes a verb transitive" },
    { text: "antwort", type: "root", note: "die Antwort = answer" },
    { text: "er", type: "suffix", note: "-er = person or thing that does" }
  ],
  ausziehen: [
    { text: "aus", type: "prefix", note: "aus- = out / off" },
    { text: "zieh", type: "root", note: "ziehen = to pull" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  anziehen: [
    { text: "an", type: "prefix", note: "an- = on / toward" },
    { text: "zieh", type: "root", note: "ziehen = to pull" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  aufstehen: [
    { text: "auf", type: "prefix", note: "auf- = up" },
    { text: "steh", type: "root", note: "stehen = to stand" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  einkaufen: [
    { text: "ein", type: "prefix", note: "ein- = in / into" },
    { text: "kauf", type: "root", note: "kaufen = to buy" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  anrufen: [
    { text: "an", type: "prefix", note: "an- = toward / on" },
    { text: "ruf", type: "root", note: "rufen = to call" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  anfangen: [
    { text: "an", type: "prefix", note: "an- = on / at" },
    { text: "fang", type: "root", note: "fangen = to catch" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  aufhören: [
    { text: "auf", type: "prefix", note: "auf- = up / complete" },
    { text: "hör", type: "root", note: "hören = to hear" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  mitkommen: [
    { text: "mit", type: "prefix", note: "mit- = with / along" },
    { text: "komm", type: "root", note: "kommen = to come" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  bekommen: [
    { text: "be", type: "prefix", note: "be- is an inseparable prefix" },
    { text: "komm", type: "root", note: "kommen = to come" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  verstehen: [
    { text: "ver", type: "prefix", note: "ver- is an inseparable prefix" },
    { text: "steh", type: "root", note: "stehen = to stand" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  verkaufen: [
    { text: "ver", type: "prefix", note: "ver- is an inseparable prefix" },
    { text: "kauf", type: "root", note: "kaufen = to buy" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  bezahlen: [
    { text: "be", type: "prefix", note: "be- is an inseparable prefix" },
    { text: "zahl", type: "root", note: "zahlen = to pay" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  erklären: [
    { text: "er", type: "prefix", note: "er- is an inseparable prefix" },
    { text: "klär", type: "root", note: "klar = clear" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  Wohnung: [
    { text: "wohn", type: "root", note: "wohnen = to live" },
    { text: "ung", type: "suffix", note: "-ung makes a noun from a verb" }
  ],
  Rechnung: [
    { text: "rechn", type: "root", note: "rechnen = to calculate" },
    { text: "ung", type: "suffix", note: "-ung makes a noun from a verb" }
  ],
  Zeitung: [
    { text: "Zeit", type: "root", note: "die Zeit = time" },
    { text: "ung", type: "suffix", note: "-ung makes a noun" }
  ],
  Fahrkarte: [
    { text: "Fahr", type: "compound", note: "fahren = to travel" },
    { text: "Karte", type: "compound", note: "die Karte = card / ticket" }
  ],
  Hausaufgabe: [
    { text: "Haus", type: "compound", note: "das Haus = house" },
    { text: "Aufgabe", type: "compound", note: "die Aufgabe = task" }
  ],
  Wochenende: [
    { text: "Wochen", type: "compound", note: "die Woche = week" },
    { text: "Ende", type: "compound", note: "das Ende = end" }
  ],
  Geburtstag: [
    { text: "Geburt", type: "compound", note: "die Geburt = birth" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "Tag", type: "compound", note: "der Tag = day" }
  ],
  Frühstück: [
    { text: "früh", type: "compound", note: "früh = early" },
    { text: "Stück", type: "compound", note: "das Stück = piece" }
  ],
  Arbeitsplatz: [
    { text: "Arbeit", type: "compound", note: "die Arbeit = work" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "Platz", type: "compound", note: "der Platz = place" }
  ],
  Flughafen: [
    { text: "Flug", type: "compound", note: "der Flug = flight" },
    { text: "Hafen", type: "compound", note: "der Hafen = harbour" }
  ],
  Bahnhof: [
    { text: "Bahn", type: "compound", note: "die Bahn = railway" },
    { text: "Hof", type: "compound", note: "der Hof = yard" }
  ],
  Kühlschrank: [
    { text: "Kühl", type: "compound", note: "kühl = cool" },
    { text: "Schrank", type: "compound", note: "der Schrank = cupboard" }
  ],
  Wörterbuch: [
    { text: "Wörter", type: "compound", note: "die Wörter = words" },
    { text: "Buch", type: "compound", note: "das Buch = book" }
  ],
  Fahrrad: [
    { text: "Fahr", type: "compound", note: "fahren = to travel" },
    { text: "Rad", type: "compound", note: "das Rad = wheel" }
  ],
  Autobahn: [
    { text: "Auto", type: "compound", note: "das Auto = car" },
    { text: "Bahn", type: "compound", note: "die Bahn = railway / lane" }
  ],
  Anmeldung: [
    { text: "an", type: "prefix", note: "an- = on / at" },
    { text: "meld", type: "root", note: "melden = to report" },
    { text: "ung", type: "suffix", note: "-ung makes a noun" }
  ],
  Abfahrt: [
    { text: "ab", type: "prefix", note: "ab- = away / off" },
    { text: "fahrt", type: "root", note: "fahren = to travel" }
  ],
  Ausgang: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "gang", type: "root", note: "gehen = to go" }
  ],
  Eingang: [
    { text: "ein", type: "prefix", note: "ein- = in" },
    { text: "gang", type: "root", note: "gehen = to go" }
  ],
  Ausland: [
    { text: "aus", type: "prefix", note: "aus- = out / abroad" },
    { text: "Land", type: "compound", note: "das Land = country" }
  ],
  Vormittag: [
    { text: "vor", type: "prefix", note: "vor- = before" },
    { text: "Mittag", type: "compound", note: "der Mittag = midday" }
  ],
  Nachmittag: [
    { text: "nach", type: "prefix", note: "nach- = after" },
    { text: "Mittag", type: "compound", note: "der Mittag = midday" }
  ],
  Lehrer: [
    { text: "lehr", type: "root", note: "lehren = to teach" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ]
};
