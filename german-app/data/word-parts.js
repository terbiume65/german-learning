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
  ],

  Reisebüro: [
    { text: "Reise", type: "compound", note: "die Reise = trip" },
    { text: "Büro", type: "compound", note: "das Büro = office" }
  ],
  Hausfrau: [
    { text: "Haus", type: "compound", note: "das Haus = house" },
    { text: "Frau", type: "compound", note: "die Frau = woman" }
  ],
  Hausmann: [
    { text: "Haus", type: "compound", note: "das Haus = house" },
    { text: "Mann", type: "compound", note: "der Mann = man" }
  ],
  Ehefrau: [
    { text: "Ehe", type: "compound", note: "die Ehe = marriage" },
    { text: "Frau", type: "compound", note: "die Frau = woman / wife" }
  ],
  Ehemann: [
    { text: "Ehe", type: "compound", note: "die Ehe = marriage" },
    { text: "Mann", type: "compound", note: "der Mann = man / husband" }
  ],
  Doppelzimmer: [
    { text: "Doppel", type: "compound", note: "doppelt = double" },
    { text: "Zimmer", type: "compound", note: "das Zimmer = room" }
  ],
  Einzelzimmer: [
    { text: "Einzel", type: "compound", note: "einzeln = single" },
    { text: "Zimmer", type: "compound", note: "das Zimmer = room" }
  ],
  Familienname: [
    { text: "Familie", type: "compound", note: "die Familie = family" },
    { text: "n", type: "link", note: "linking -n-" },
    { text: "Name", type: "compound", note: "der Name = name" }
  ],
  Familienstand: [
    { text: "Familie", type: "compound", note: "die Familie = family" },
    { text: "n", type: "link", note: "linking -n-" },
    { text: "Stand", type: "compound", note: "der Stand = status" }
  ],
  Feierabend: [
    { text: "Feier", type: "compound", note: "die Feier = celebration" },
    { text: "Abend", type: "compound", note: "der Abend = evening" }
  ],
  Feiertag: [
    { text: "Feier", type: "compound", note: "die Feier = celebration" },
    { text: "Tag", type: "compound", note: "der Tag = day" }
  ],
  Flugzeug: [
    { text: "Flug", type: "compound", note: "der Flug = flight" },
    { text: "Zeug", type: "compound", note: "das Zeug = thing / equipment" }
  ],
  Freizeit: [
    { text: "frei", type: "compound", note: "frei = free" },
    { text: "Zeit", type: "compound", note: "die Zeit = time" }
  ],
  Geburtsjahr: [
    { text: "Geburt", type: "compound", note: "die Geburt = birth" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "Jahr", type: "compound", note: "das Jahr = year" }
  ],
  Geburtsort: [
    { text: "Geburt", type: "compound", note: "die Geburt = birth" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "Ort", type: "compound", note: "der Ort = place" }
  ],
  Großeltern: [
    { text: "Groß", type: "compound", note: "groß = grand / big" },
    { text: "Eltern", type: "compound", note: "die Eltern = parents" }
  ],
  Großmutter: [
    { text: "Groß", type: "compound", note: "groß = grand / big" },
    { text: "Mutter", type: "compound", note: "die Mutter = mother" }
  ],
  Großvater: [
    { text: "Groß", type: "compound", note: "groß = grand / big" },
    { text: "Vater", type: "compound", note: "der Vater = father" }
  ],
  Haltestelle: [
    { text: "Halte", type: "compound", note: "halten = to stop" },
    { text: "Stelle", type: "compound", note: "die Stelle = place" }
  ],
  Halbpension: [
    { text: "Halb", type: "compound", note: "halb = half" },
    { text: "Pension", type: "compound", note: "die Pension = guesthouse" }
  ],
  Kindergarten: [
    { text: "Kinder", type: "compound", note: "die Kinder = children" },
    { text: "Garten", type: "compound", note: "der Garten = garden" }
  ],
  Kugelschreiber: [
    { text: "Kugel", type: "compound", note: "die Kugel = ball" },
    { text: "Schreiber", type: "compound", note: "schreiben = to write" }
  ],
  Lebensmittel: [
    { text: "Lebens", type: "compound", note: "das Leben = life" },
    { text: "Mittel", type: "compound", note: "das Mittel = means / product" }
  ],
  Postleitzahl: [
    { text: "Post", type: "compound", note: "die Post = mail" },
    { text: "Leit", type: "compound", note: "leiten = to guide" },
    { text: "Zahl", type: "compound", note: "die Zahl = number" }
  ],
  Reiseführer: [
    { text: "Reise", type: "compound", note: "die Reise = trip" },
    { text: "Führer", type: "compound", note: "führen = to guide" }
  ],
  Speisekarte: [
    { text: "Speise", type: "compound", note: "die Speise = dish" },
    { text: "Karte", type: "compound", note: "die Karte = card / menu" }
  ],
  Straßenbahn: [
    { text: "Straßen", type: "compound", note: "die Straße = street" },
    { text: "Bahn", type: "compound", note: "die Bahn = railway" }
  ],
  Schwimmbad: [
    { text: "Schwimm", type: "compound", note: "schwimmen = to swim" },
    { text: "Bad", type: "compound", note: "das Bad = bath / pool" }
  ],
  Vorname: [
    { text: "Vor", type: "prefix", note: "vor- = before" },
    { text: "Name", type: "compound", note: "der Name = name" }
  ],
  Wochentag: [
    { text: "Woche", type: "compound", note: "die Woche = week" },
    { text: "n", type: "link", note: "linking -n-" },
    { text: "Tag", type: "compound", note: "der Tag = day" }
  ],
  "S-Bahn": [
    { text: "S", type: "prefix", note: "S = Schnellbahn / city rail" },
    { text: "Bahn", type: "compound", note: "die Bahn = railway" }
  ],
  Abflug: [
    { text: "ab", type: "prefix", note: "ab- = away / off" },
    { text: "Flug", type: "compound", note: "der Flug = flight" }
  ],
  Absender: [
    { text: "ab", type: "prefix", note: "ab- = away" },
    { text: "send", type: "root", note: "senden = to send" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ],
  Anruf: [
    { text: "an", type: "prefix", note: "an- = toward / on" },
    { text: "ruf", type: "root", note: "rufen = to call" }
  ],
  Anschluss: [
    { text: "an", type: "prefix", note: "an- = on / toward" },
    { text: "schluss", type: "root", note: "schließen = to close / connect" }
  ],
  Anzeige: [
    { text: "an", type: "prefix", note: "an- = on / toward" },
    { text: "zeig", type: "root", note: "zeigen = to show" },
    { text: "e", type: "suffix", note: "-e = noun ending" }
  ],
  Aufzug: [
    { text: "auf", type: "prefix", note: "auf- = up" },
    { text: "zug", type: "root", note: "ziehen = to pull" }
  ],
  Ausflug: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "Flug", type: "compound", note: "der Flug = flight / trip" }
  ],
  Ausländer: [
    { text: "Ausländ", type: "root", note: "Ausland = foreign country" },
    { text: "er", type: "suffix", note: "-er = person from" }
  ],
  Ausweis: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "weis", type: "root", note: "weisen = to show / point" }
  ],
  Bäckerei: [
    { text: "Bäcker", type: "root", note: "der Bäcker = baker" },
    { text: "ei", type: "suffix", note: "-ei = place / shop" }
  ],
  Bahnsteig: [
    { text: "Bahn", type: "compound", note: "die Bahn = railway" },
    { text: "Steig", type: "compound", note: "der Steig = path / platform" }
  ],
  Briefmarke: [
    { text: "Brief", type: "compound", note: "der Brief = letter" },
    { text: "Marke", type: "compound", note: "die Marke = stamp / brand" }
  ],
  Brötchen: [
    { text: "Bröt", type: "root", note: "Brot = bread (with umlaut)" },
    { text: "chen", type: "suffix", note: "-chen = small / diminutive" }
  ],
  Einladung: [
    { text: "ein", type: "prefix", note: "ein- = in" },
    { text: "lad", type: "root", note: "laden = to invite" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Eintritt: [
    { text: "ein", type: "prefix", note: "ein- = in" },
    { text: "tritt", type: "root", note: "treten = to step" }
  ],
  Empfänger: [
    { text: "empfang", type: "root", note: "empfangen = to receive" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ],
  Ergebnis: [
    { text: "er", type: "prefix", note: "er- is an inseparable prefix" },
    { text: "geb", type: "root", note: "geben = to give" },
    { text: "nis", type: "suffix", note: "-nis = result / noun suffix" }
  ],
  Entschuldigung: [
    { text: "ent", type: "prefix", note: "ent- = away / undo" },
    { text: "schuldig", type: "root", note: "schuldig = guilty" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Fahrer: [
    { text: "fahr", type: "root", note: "fahren = to drive" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ],
  Fehler: [
    { text: "fehl", type: "root", note: "fehlen = to be missing / wrong" },
    { text: "er", type: "suffix", note: "-er = noun ending" }
  ],
  Führung: [
    { text: "führ", type: "root", note: "führen = to guide" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Glückwunsch: [
    { text: "Glück", type: "compound", note: "das Glück = luck / happiness" },
    { text: "Wunsch", type: "compound", note: "der Wunsch = wish" }
  ],
  Hilfe: [
    { text: "hilf", type: "root", note: "helfen = to help" },
    { text: "e", type: "suffix", note: "-e = noun ending" }
  ],
  Hochzeit: [
    { text: "hoch", type: "compound", note: "hoch = high" },
    { text: "Zeit", type: "compound", note: "die Zeit = time" }
  ],
  Jugendliche: [
    { text: "Jugend", type: "root", note: "die Jugend = youth" },
    { text: "lich", type: "suffix", note: "-lich = relating to" },
    { text: "e", type: "suffix", note: "-e = noun ending" }
  ],
  Kleidung: [
    { text: "Kleid", type: "root", note: "das Kleid = dress / clothing" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Lösung: [
    { text: "lös", type: "root", note: "lösen = to solve" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Ordnung: [
    { text: "ordn", type: "root", note: "ordnen = to arrange" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Partnerin: [
    { text: "Partner", type: "root", note: "der Partner = partner" },
    { text: "in", type: "suffix", note: "-in = female person" }
  ],
  Papiere: [
    { text: "Papier", type: "root", note: "das Papier = paper" },
    { text: "e", type: "suffix", note: "-e = plural ending" }
  ],
  Prüfung: [
    { text: "prüf", type: "root", note: "prüfen = to examine" },
    { text: "ung", type: "suffix", note: "-ung = noun suffix" }
  ],
  Sehenswürdigkeit: [
    { text: "sehen", type: "root", note: "sehen = to see" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "würdig", type: "root", note: "würdig = worth seeing" },
    { text: "keit", type: "suffix", note: "-keit = noun suffix" }
  ],
  übernachten: [
    { text: "über", type: "prefix", note: "über- = over / through" },
    { text: "nacht", type: "root", note: "die Nacht = night" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  überweisen: [
    { text: "über", type: "prefix", note: "über- = over / across" },
    { text: "weis", type: "root", note: "weisen = to direct" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  Unterschrift: [
    { text: "unter", type: "prefix", note: "unter- = under" },
    { text: "Schrift", type: "root", note: "die Schrift = writing" }
  ],
  Verkäufer: [
    { text: "ver", type: "prefix", note: "ver- is an inseparable prefix" },
    { text: "kauf", type: "root", note: "kaufen = to buy" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ],
  Vermieter: [
    { text: "ver", type: "prefix", note: "ver- is an inseparable prefix" },
    { text: "miet", type: "root", note: "mieten = to rent" },
    { text: "er", type: "suffix", note: "-er = person who does" }
  ],
  Vorsicht: [
    { text: "vor", type: "prefix", note: "vor- = before / in front" },
    { text: "Sicht", type: "root", note: "die Sicht = sight / view" }
  ],
  Vorwahl: [
    { text: "vor", type: "prefix", note: "vor- = before" },
    { text: "Wahl", type: "root", note: "die Wahl = choice" }
  ],
  arbeitslos: [
    { text: "Arbeit", type: "root", note: "die Arbeit = work" },
    { text: "s", type: "link", note: "linking -s-" },
    { text: "los", type: "suffix", note: "-los = without" }
  ],
  automatisch: [
    { text: "Automat", type: "root", note: "der Automat = machine" },
    { text: "isch", type: "suffix", note: "-isch = adjective ending" }
  ],
  bestellen: [
    { text: "be", type: "prefix", note: "be- is an inseparable prefix" },
    { text: "stell", type: "root", note: "stellen = to place" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  besichtigen: [
    { text: "be", type: "prefix", note: "be- is an inseparable prefix" },
    { text: "sichtig", type: "root", note: "Sicht = sight" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  buchstabieren: [
    { text: "Buchstab", type: "root", note: "der Buchstabe = letter" },
    { text: "ier", type: "suffix", note: "-ier- = verb-forming suffix" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  einsteigen: [
    { text: "ein", type: "prefix", note: "ein- = in" },
    { text: "steig", type: "root", note: "steigen = to climb" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  aussteigen: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "steig", type: "root", note: "steigen = to climb" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  fernsehen: [
    { text: "fern", type: "prefix", note: "fern = far" },
    { text: "seh", type: "root", note: "sehen = to see" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  kennenlernen: [
    { text: "kennen", type: "root", note: "kennen = to know" },
    { text: "lernen", type: "root", note: "lernen = to learn" }
  ],
  mitbringen: [
    { text: "mit", type: "prefix", note: "mit- = along / with" },
    { text: "bring", type: "root", note: "bringen = to bring" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  mitmachen: [
    { text: "mit", type: "prefix", note: "mit- = along / with" },
    { text: "mach", type: "root", note: "machen = to do" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  mitnehmen: [
    { text: "mit", type: "prefix", note: "mit- = along / with" },
    { text: "nehm", type: "root", note: "nehmen = to take" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  umziehen: [
    { text: "um", type: "prefix", note: "um- = around / over" },
    { text: "zieh", type: "root", note: "ziehen = to pull / move" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  wehtun: [
    { text: "weh", type: "root", note: "weh = sore / painful" },
    { text: "tun", type: "root", note: "tun = to do" }
  ],
  wiederholen: [
    { text: "wieder", type: "prefix", note: "wieder- = again" },
    { text: "hol", type: "root", note: "holen = to fetch" },
    { text: "en", type: "suffix", note: "-en = infinitive ending" }
  ],
  Anfang: [
    { text: "an", type: "prefix", note: "an- = on / at" },
    { text: "fang", type: "root", note: "fangen = to catch / begin" }
  ],
  Angebot: [
    { text: "an", type: "prefix", note: "an- = toward" },
    { text: "gebot", type: "root", note: "bieten = to offer" }
  ],
  Ankunft: [
    { text: "an", type: "prefix", note: "an- = at / toward" },
    { text: "kunft", type: "root", note: "kommen = to come" }
  ],
  Antwort: [
    { text: "ant", type: "prefix", note: "ant- = back / against" },
    { text: "Wort", type: "root", note: "das Wort = word" }
  ],
  Aufgabe: [
    { text: "auf", type: "prefix", note: "auf- = up / on" },
    { text: "Gabe", type: "root", note: "geben = to give" }
  ],
  Aussage: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "Sage", type: "root", note: "sagen = to say" }
  ],
  Auskunft: [
    { text: "aus", type: "prefix", note: "aus- = out" },
    { text: "Kunft", type: "root", note: "kommen = to come" }
  ],
  Beruf: [
    { text: "be", type: "prefix", note: "be- is an inseparable prefix" },
    { text: "Ruf", type: "root", note: "rufen = to call" }
  ],
  Getränk: [
    { text: "ge", type: "prefix", note: "ge- = noun-forming prefix" },
    { text: "Tränk", type: "root", note: "trinken = to drink" }
  ],
  "(Kredit)-Karte": [
    { text: "Kredit", type: "compound", note: "der Kredit = credit" },
    { text: "Karte", type: "compound", note: "die Karte = card" }
  ],
  "E-Mail": [
    { text: "E", type: "prefix", note: "E = electronic" },
    { text: "Mail", type: "compound", note: "die Mail = mail" }
  ],
  Anrede: [
    { text: "an", type: "prefix", note: "an- = toward" },
    { text: "Rede", type: "root", note: "die Rede = speech" }
  ],
  Ansage: [
    { text: "an", type: "prefix", note: "an- = on / toward" },
    { text: "Sage", type: "root", note: "sagen = to say" }
  ],
  Durchsage: [
    { text: "durch", type: "prefix", note: "durch- = through" },
    { text: "Sage", type: "root", note: "sagen = to say" }
  ],
  Gewicht: [
    { text: "ge", type: "prefix", note: "ge- = noun-forming prefix" },
    { text: "wicht", type: "root", note: "wiegen = to weigh" }
  ],
  Reparatur: [
    { text: "repar", type: "root", note: "reparieren = to repair" },
    { text: "atur", type: "suffix", note: "-atur = noun suffix" }
  ],
};
