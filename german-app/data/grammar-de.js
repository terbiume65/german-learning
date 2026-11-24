/* German A1–A2 grammar: original explanations with visual grammar panels. */
window.GRAMMAR_ITEMS = [
  {
    id: "u1-1", unit: "u1", num: 1, title: "Gender & definite articles", pattern: "der / die / das",
    summary: "Every German noun has a grammatical gender. Learn the noun together with its article.",
    formation: ["masculine: der Tisch", "feminine: die Lampe", "neuter: das Fenster"],
    examples: [["Der Tisch ist neu.", "The table is new."], ["Die Lampe ist hell.", "The lamp is bright."]],
    blank: "Der", blank2: "Die", distractors: ["Die", "Das"], forms: ["Der Tisch", "Die Lampe", "Das Fenster"],
    tip: "Gender is not about biology. Learn der/die/das as part of the word.",
    visual: { kind: "gender", columns: [
      { article: "der", tone: "m", words: ["Tisch", "Mann", "Apfel"] },
      { article: "die", tone: "f", words: ["Lampe", "Frau", "Tasche"] },
      { article: "das", tone: "n", words: ["Fenster", "Kind", "Buch"] }
    ] }
  },
  {
    id: "u1-2", unit: "u1", num: 2, title: "Plural nouns", pattern: "die + plural",
    summary: "German plurals change the noun ending. The plural article is always die.",
    formation: ["-e: Tisch → Tische", "-en: Lampe → Lampen", "-er: Kind → Kinder", "-s: Auto → Autos"],
    examples: [["Die Tische sind neu.", "These tables are new."], ["Die Lampen sind hell.", "The lamps are bright."]],
    blank: "Tische", blank2: "Lampen", distractors: ["Tisch", "Lampe"], forms: ["Tische", "Lampen", "Kinder"],
    tip: "The dictionary form often shows the plural ending after a comma: die Lampe, -n.",
    visual: { kind: "plural", groups: [
      { end: "-e", examples: ["Tische", "Stühle"] },
      { end: "-en", examples: ["Lampen", "Frauen"] },
      { end: "-er", examples: ["Kinder", "Bücher"] },
      { end: "-s", examples: ["Autos", "Cafés"] }
    ] }
  },
  {
    id: "u1-3", unit: "u1", num: 3, title: "Present tense: regular verbs", pattern: "stam + ending",
    summary: "Regular verbs take personal endings. The verb is in position two in a main clause.",
    formation: ["ich wohne", "du wohnst", "er/sie/es wohnt", "wir wohnen", "ihr wohnt", "sie/Sie wohnen"],
    examples: [["Ich wohne in Berlin.", "I live in Berlin."], ["Du lernst Deutsch.", "You learn German."]],
    blank: "wohne", blank2: "lernst", distractors: ["wohnt", "wohnen"], forms: ["wohne", "wohnst", "wohnt", "wohnen"],
    tip: "Find the stem first: wohnen → wohn-, then add the ending.",
    visual: { kind: "verb", verb: "wohnen", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"] }
  },
  {
    id: "u1-4", unit: "u1", num: 4, title: "sein & haben", pattern: "bin / bist / ist · habe / hast / hat",
    summary: "Two of the most important verbs are irregular. Learn their forms by heart.",
    formation: ["ich bin / du bist / er ist", "wir sind / ihr seid / sie sind", "ich habe / du hast / er hat"],
    examples: [["Ich bin müde.", "I'm tired."], ["Du hast Zeit.", "You have time."]],
    blank: "bin", blank2: "hast", distractors: ["bist", "ist"], forms: ["bin", "bist", "ist", "sind", "habe", "hast", "hat"],
    tip: "sein and haben are also auxiliary verbs for the perfect tense.",
    visual: { kind: "verb", verb: "sein / haben", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["bin / habe", "bist / hast", "ist / hat", "sind / haben", "seid / habt", "sind / haben"] }
  },

  {
    id: "u2-1", unit: "u2", num: 1, title: "Nominative: the subject", pattern: "der / die / das",
    summary: "The nominative marks the subject: the person or thing doing the action.",
    formation: ["Der Mann liest.", "Die Kinder spielen.", "Das Buch liegt hier."],
    examples: [["Der Mann liest.", "The man is reading."], ["Die Kinder spielen.", "Children are playing."]],
    blank: "Der", blank2: "Die", distractors: ["Den", "Dem"], forms: ["Der Mann", "Die Kinder", "Das Buch"],
    tip: "Ask: Who or what is doing the action? That is the nominative.",
    visual: { kind: "cases", columns: ["Nominativ"], rows: [["der"], ["die"], ["das"], ["die"]] }
  },
  {
    id: "u2-2", unit: "u2", num: 2, title: "Accusative: the direct object", pattern: "den / die / das / die",
    summary: "The accusative marks the direct object. Only masculine articles change: der → den.",
    formation: ["Ich sehe den Mann.", "Ich kaufe die Tasche.", "Ich lese das Buch."],
    examples: [["Ich sehe den Mann.", "I see the man."], ["Ich kaufe die Tasche.", "I am buying the bag."]],
    blank: "den", blank2: "die", distractors: ["der", "dem"], forms: ["den Mann", "die Tasche", "das Buch"],
    tip: "Masculine is the only article that changes in the accusative.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ"], rows: [["der", "den"], ["die", "die"], ["das", "das"], ["die", "die"]] }
  },
  {
    id: "u2-3", unit: "u2", num: 3, title: "Negation: nicht & kein", pattern: "nicht / kein",
    summary: "Use nicht for verbs, adjectives and names. Use kein for nouns with ein/eine.",
    formation: ["Ich arbeite nicht.", "Das ist nicht mein Buch.", "Ich habe kein Auto."],
    examples: [["Ich habe kein Auto.", "I don't have a car."], ["Das ist nicht mein Buch.", "This is not my book."]],
    blank: "kein", blank2: "nicht", distractors: ["nicht", "keine"], forms: ["kein Auto", "nicht mein Buch"],
    tip: "kein has the same endings as ein: kein, keine, keinen …",
    visual: { kind: "contrast", left: { title: "nicht", text: "verbs · adjectives · names", examples: ["nicht kommen", "nicht müde", "nicht Anna"] }, right: { title: "kein", text: "nouns with ein/eine", examples: ["kein Auto", "keine Zeit", "keinen Hund"] } }
  },
  {
    id: "u2-4", unit: "u2", num: 4, title: "Questions", pattern: "W-Wort + Verb … ? / Verb + subject … ?",
    summary: "In a W-question the question word comes first, then the verb. In a yes/no question the verb comes first.",
    formation: ["Wo wohnst du?", "Wie heißt du?", "Sprichst du Deutsch?"],
    examples: [["Wo wohnst du?", "Where do you live?"], ["Sprichst du Deutsch?", "Do you speak German?"]],
    blank: "Wo", blank2: "Sprichst", distractors: ["Wer", "Wie"], forms: ["Wo wohnst du", "Sprichst du Deutsch"],
    tip: "The verb stays in position two in W-questions and moves to position one in yes/no questions.",
    visual: { kind: "question", w: [["Wo", "where"], ["Wer", "who"], ["Wie", "how"], ["Wann", "when"], ["Warum", "why"]], yesno: ["Sprichst du Deutsch?", "Kommst du morgen?"] }
  },

  {
    id: "u3-1", unit: "u3", num: 1, title: "Indefinite articles: ein / eine", pattern: "ein / eine",
    summary: "Use ein for masculine and neuter nouns, eine for feminine nouns.",
    formation: ["ein Tisch", "eine Lampe", "ein Fenster", "einen Tisch (accusative)"],
    examples: [["Das ist ein Tisch.", "This is a table."], ["Das ist eine Lampe.", "This is a lamp."]],
    blank: "ein", blank2: "eine", distractors: ["eine", "einen"], forms: ["ein Tisch", "eine Lampe", "ein Fenster"],
    tip: "ein has no plural. For plural nouns, use the bare noun or kein/ein paar.",
    visual: { kind: "gender", columns: [
      { article: "ein", tone: "m", words: ["Tisch", "Mann", "Apfel"] },
      { article: "eine", tone: "f", words: ["Lampe", "Frau", "Tasche"] },
      { article: "ein", tone: "n", words: ["Fenster", "Kind", "Buch"] }
    ] }
  },
  {
    id: "u3-2", unit: "u3", num: 2, title: "Possessive articles", pattern: "mein / dein / sein / ihr …",
    summary: "Possessive articles show who owns something. They take the same endings as ein.",
    formation: ["mein Bruder / meine Schwester", "dein Vater / deine Mutter", "sein/ihr Auto"],
    examples: [["Das ist mein Bruder.", "This is my brother."], ["Das ist meine Schwester.", "This is my sister."]],
    blank: "mein", blank2: "meine", distractors: ["meine", "meinen"], forms: ["mein Bruder", "meine Schwester", "mein Auto"],
    tip: "The ending depends on the noun after it, not on the owner.",
    visual: { kind: "possessive", rows: [["ich", "mein"], ["du", "dein"], ["er", "sein"], ["sie", "ihr"], ["wir", "unser"], ["ihr", "euer"], ["sie/Sie", "ihr/Ihr"]] }
  },
  {
    id: "u3-3", unit: "u3", num: 3, title: "Demonstrative articles", pattern: "dieser / diese / dieses",
    summary: "dieser points to a specific noun: this or that.",
    formation: ["dieser Tisch", "diese Lampe", "dieses Fenster", "diesen Tisch (acc.)"],
    examples: [["Dieser Tisch ist frei.", "This table is free."], ["Diese Tasche ist teuer.", "This bag is expensive."]],
    blank: "Dieser", blank2: "Diese", distractors: ["Diese", "Dieses"], forms: ["Dieser Tisch", "Diese Tasche", "Dieses Buch"],
    tip: "The forms are very close to der/die/das: dies + er/die/es.",
    visual: { kind: "gender", columns: [
      { article: "dieser", tone: "m", words: ["Tisch", "Mann", "Apfel"] },
      { article: "diese", tone: "f", words: ["Lampe", "Frau", "Tasche"] },
      { article: "dieses", tone: "n", words: ["Fenster", "Kind", "Buch"] }
    ] }
  },
  {
    id: "u3-4", unit: "u3", num: 4, title: "Adjective endings I", pattern: "der neue Tisch / den neuen Tisch",
    summary: "An adjective before a noun needs an ending. The article and case decide the ending.",
    formation: ["der neue Tisch (nominative)", "den neuen Tisch (accusative)", "die neue Lampe", "das neue Buch"],
    examples: [["Der neue Tisch ist groß.", "The new table is big."], ["Ich sehe den neuen Tisch.", "I see the new table."]],
    blank: "neue", blank2: "neuen", distractors: ["neuen", "neuer"], forms: ["der neue Tisch", "den neuen Tisch"],
    tip: "After der/die/das, the adjective often takes -e or -en. Learn the pattern with the article.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ"], rows: [["der neue", "den neuen"], ["die neue", "die neue"], ["das neue", "das neue"], ["die neuen", "die neuen"]] }
  },

  {
    id: "u4-1", unit: "u4", num: 1, title: "Modal verbs", pattern: "Modal + … + infinitive at the end",
    summary: "Modal verbs change the main verb into an infinitive at the end of the sentence.",
    formation: ["Ich kann kommen.", "Du musst lernen.", "Er will schlafen.", "Wir dürfen gehen."],
    examples: [["Ich kann heute kommen.", "I can come today."], ["Du musst mehr lernen.", "You must study more."]],
    blank: "kann", blank2: "musst", distractors: ["kannst", "muss"], forms: ["kann kommen", "musst lernen", "will schlafen"],
    tip: "The modal verb is in position two; the infinitive goes to the end.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["kann", "modal"], ["heute", "time"], ["kommen", "infinitive"]] }
  },
  {
    id: "u4-2", unit: "u4", num: 2, title: "Separable verbs", pattern: "prefix + … + verb",
    summary: "Some verbs have a prefix that separates and moves to the end in a main clause.",
    formation: ["aufstehen → Ich stehe … auf.", "einkaufen → Wir kaufen … ein.", "anrufen → Er ruft … an."],
    examples: [["Ich stehe um sieben Uhr auf.", "I get up at seven o'clock."], ["Wir kaufen im Supermarkt ein.", "We shop in the supermarket."]],
    blank: "stehe", blank2: "ein", distractors: ["aufstehe", "stehst"], forms: ["stehe ... auf", "kaufe ... ein", "rufe ... an"],
    tip: "The prefix goes to the end. In a subordinate clause it stays with the verb.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["stehe", "verb"], ["um sieben Uhr", "time"], ["auf", "prefix"]] }
  },
  {
    id: "u4-3", unit: "u4", num: 3, title: "Imperative", pattern: "Verb stem …! / Verb + Sie …!",
    summary: "Use the imperative to give instructions, requests or advice.",
    formation: ["Komm her! (du)", "Kommt her! (ihr)", "Kommen Sie bitte! (Sie)", "Sei ruhig!"],
    examples: [["Komm bitte her!", "Please come!"], ["Nehmen Sie bitte Platz!", "Please take a seat!"]],
    blank: "Komm", blank2: "Nehmen", distractors: ["Kommt", "Kommen"], forms: ["Komm her", "Nehmen Sie Platz"],
    tip: "The Sie-form keeps the pronoun and the verb ends in -en.",
    visual: { kind: "contrast", left: { title: "du", text: "verb stem", examples: ["Komm!", "Lern!", "Sei ruhig!"] }, right: { title: "Sie", text: "verb + Sie", examples: ["Kommen Sie!", "Lernen Sie!", "Seien Sie ruhig!"] } }
  },
  {
    id: "u4-4", unit: "u4", num: 4, title: "Reflexive verbs", pattern: "sich + verb",
    summary: "Reflexive verbs refer back to the subject. The reflexive pronoun changes with the person.",
    formation: ["ich freue mich", "du freust dich", "er freut sich", "wir freuen uns"],
    examples: [["Ich freue mich auf den Urlaub.", "I'm looking forward to the holidays."], ["Er wäscht sich die Hände.", "He washes his hands."]],
    blank: "mich", blank2: "sich", distractors: ["mir", "dich"], forms: ["mich freuen", "dich freuen", "sich freuen"],
    tip: "Some verbs are always reflexive; learn the pronoun with the verb.",
    visual: { kind: "reflexive", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["mich", "dich", "sich", "uns", "euch", "sich"] }
  },

  {
    id: "u5-1", unit: "u5", num: 1, title: "Dative case", pattern: "dem / der / dem / den + -n",
    summary: "The dative marks the indirect object or the person something is done for.",
    formation: ["Ich helfe dem Mann.", "Ich danke der Frau.", "Ich gebe dem Kind das Buch."],
    examples: [["Ich helfe dem Mann.", "I help the man."], ["Ich danke der Frau.", "I thank the woman."]],
    blank: "dem", blank2: "der", distractors: ["den", "des"], forms: ["dem Mann", "der Frau", "dem Kind"],
    tip: "Plural nouns add -n in the dative: den Kindern.",
    visual: { kind: "cases", columns: ["Nominativ", "Dativ"], rows: [["der", "dem"], ["die", "der"], ["das", "dem"], ["die", "den + -n"]] }
  },
  {
    id: "u5-2", unit: "u5", num: 2, title: "Dative pronouns", pattern: "mir / dir / ihm / ihr …",
    summary: "Dative pronouns show who receives something or for whom something is done.",
    formation: ["mir", "dir", "ihm/ihr", "uns", "euch", "ihnen"],
    examples: [["Das Buch gehört mir.", "This book belongs to me."], ["Ich helfe dir.", "I help you."]],
    blank: "mir", blank2: "dir", distractors: ["mich", "dich"], forms: ["mir", "dir", "ihm", "ihr"],
    tip: "Do not mix mich/dich (accusative) with mir/dir (dative).",
    visual: { kind: "reflexive", pronouns: ["ich", "du", "er", "sie", "wir", "ihr", "sie"], forms: ["mir", "dir", "ihm", "ihr", "uns", "euch", "ihnen"] }
  },
  {
    id: "u5-3", unit: "u5", num: 3, title: "Prepositions with fixed case", pattern: "Akkusativ / Dativ",
    summary: "Some prepositions always take the accusative; others always take the dative.",
    formation: ["Accusative: durch, für, gegen, ohne, um", "Dative: aus, bei, mit, nach, seit, von, zu"],
    examples: [["Ich gehe durch den Park.", "I walk through the park."], ["Ich fahre mit dem Bus.", "I go by bus."]],
    blank: "durch", blank2: "mit", distractors: ["für", "ohne"], forms: ["durch den Park", "mit dem Bus"],
    tip: "Learn the preposition together with its case. The ending on the article shows the case.",
    visual: { kind: "prepositions", accusative: ["durch", "für", "gegen", "ohne", "um"], dative: ["aus", "bei", "mit", "nach", "seit", "von", "zu"] }
  },
  {
    id: "u5-4", unit: "u5", num: 4, title: "Two-way prepositions", pattern: "Wo? + Dativ / Wohin? + Akkusativ",
    summary: "With in, an, auf, über, unter, vor, hinter, neben, zwischen: location uses dative, direction uses accusative.",
    formation: ["Wo? auf dem Tisch (Dativ)", "Wohin? auf den Tisch (Akkusativ)"],
    examples: [["Das Buch liegt auf dem Tisch.", "The book is on the table."], ["Ich lege das Buch auf den Tisch.", "I put the book on the table."]],
    blank: "dem", blank2: "den", distractors: ["den", "der"], forms: ["auf dem Tisch", "auf den Tisch"],
    tip: "Ask Wo? for a position and Wohin? for a movement.",
    visual: { kind: "twoway", preps: ["in", "an", "auf", "über", "unter", "vor", "hinter", "neben", "zwischen"], wo: "dem Tisch", wohin: "den Tisch" }
  },

  {
    id: "u6-1", unit: "u6", num: 1, title: "Time prepositions", pattern: "am / um / im / von … bis / seit",
    summary: "Use different prepositions for days, clock times, months and periods.",
    formation: ["am Montag", "um neun Uhr", "im Januar", "von neun bis fünf", "seit einem Jahr"],
    examples: [["Am Montag habe ich Deutsch.", "I have German class on Monday."], ["Der Kurs beginnt um neun Uhr.", "The course starts at nine o'clock."]],
    blank: "Am", blank2: "um", distractors: ["Im", "Um"], forms: ["am Montag", "um neun Uhr", "im Januar"],
    tip: "am + day/date, um + clock time, im + month/season.",
    visual: { kind: "timeline", items: [["am", "Tag / Datum"], ["um", "Uhrzeit"], ["im", "Monat / Jahr"], ["von … bis", "Zeitraum"], ["seit", "Vergangenheit"]] }
  },
  {
    id: "u6-2", unit: "u6", num: 2, title: "Perfect with haben", pattern: "haben + Partizip II",
    summary: "Most verbs form the perfect with haben and the past participle.",
    formation: ["regular: ge- + stem + -t (lernen → gelernt)", "irregular: ge- + stem change + -en (backen → gebacken)"],
    examples: [["Ich habe Deutsch gelernt.", "I learned German."], ["Wir haben einen Kuchen gebacken.", "We baked a cake."]],
    blank: "gelernt", blank2: "gebacken", distractors: ["lernen", "lernt"], forms: ["gelernt", "gebacken", "gemacht"],
    tip: "The participle goes to the end of the sentence.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["habe", "auxiliary"], ["Deutsch", "object"], ["gelernt", "participle"]] }
  },
  {
    id: "u6-3", unit: "u6", num: 3, title: "Perfect with sein", pattern: "sein + Partizip II",
    summary: "Verbs of movement and change use sein in the perfect.",
    formation: ["Ich bin gefahren.", "Sie ist gekommen.", "Wir sind geblieben."],
    examples: [["Ich bin nach Berlin gefahren.", "I went to Berlin."], ["Sie ist nach Hause gekommen.", "She went home."]],
    blank: "bin", blank2: "ist", distractors: ["habe", "hat"], forms: ["bin gefahren", "ist gekommen", "sind geblieben"],
    tip: "Bewegung von A nach B and change of state usually take sein.",
    visual: { kind: "contrast", left: { title: "sein", text: "movement / change", examples: ["gefahren", "gekommen", "geworden"] }, right: { title: "haben", text: "most other verbs", examples: ["gelernt", "gegessen", "gemacht"] } }
  },
  {
    id: "u6-4", unit: "u6", num: 4, title: "Word order: verb second", pattern: "Position 1 + Verb + …",
    summary: "In a German main clause, the conjugated verb is always in position two.",
    formation: ["Heute lerne ich Deutsch.", "Ich lerne heute Deutsch.", "Deutsch lerne ich heute."],
    examples: [["Heute lerne ich Deutsch.", "Today I am learning German."], ["Ich fahre morgen mit dem Zug nach Berlin.", "I am taking the train to Berlin tomorrow."]],
    blank: "lerne", blank2: "morgen", distractors: ["lernen", "lernt"], forms: ["Heute lerne ich", "Ich fahre morgen"],
    tip: "If you move a time expression to the front, the verb and subject swap.",
    visual: { kind: "sentence", chunks: [["Heute", "position 1"], ["lerne", "verb"], ["ich", "subject"], ["Deutsch", "object"]] }
  },

  {
    id: "u7-1", unit: "u7", num: 1, title: "Subordinate clauses: weil / dass / wenn", pattern: "…, weil + subject + … + verb",
    summary: "After a subordinating conjunction, the conjugated verb moves to the end.",
    formation: ["Ich bleibe zu Hause, weil es regnet.", "Ich weiß, dass du Recht hast.", "Wenn ich Zeit habe, komme ich."],
    examples: [["Ich bleibe zu Hause, weil es regnet.", "I am staying at home because it is raining."], ["Ich weiß, dass du Recht hast.", "I know you are right."]],
    blank: "weil", blank2: "dass", distractors: ["denn", "aber"], forms: ["weil es regnet", "dass du Recht hast"],
    tip: "denn keeps normal word order; weil sends the verb to the end.",
    visual: { kind: "clause", main: "Ich bleibe zu Hause", connector: "weil", sub: ["es", "regnet"], rule: "Verb at the end" }
  },
  {
    id: "u7-2", unit: "u7", num: 2, title: "Relative clauses", pattern: "der / die / das … + verb at the end",
    summary: "Relative clauses describe a noun. The relative pronoun takes the case of its role in the clause.",
    formation: ["Der Mann, der dort steht, ist mein Lehrer.", "Das Buch, das ich lese, ist spannend."],
    examples: [["Der Mann, der dort steht, ist mein Lehrer.", "The man standing there is my teacher."], ["Das Buch, das ich lese, ist spannend.", "The book I am reading is exciting."]],
    blank: "der", blank2: "das", distractors: ["den", "die"], forms: ["der dort steht", "das ich lese"],
    tip: "The relative pronoun agrees with the noun in gender and number, but its case comes from the relative clause.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ", "Dativ"], rows: [["der", "den", "dem"], ["die", "die", "der"], ["das", "das", "dem"], ["die", "die", "denen"]] }
  },
  {
    id: "u7-3", unit: "u7", num: 3, title: "Comparative & superlative", pattern: "-er / am -sten",
    summary: "Compare two things with the comparative; compare with everything with the superlative.",
    formation: ["schnell → schneller → am schnellsten", "gut → besser → am besten", "gern → lieber → am liebsten"],
    examples: [["Ein Zug ist schneller als ein Bus.", "Trains are faster than buses."], ["Das ist der beste Kuchen.", "This is the best cake."]],
    blank: "schneller", blank2: "beste", distractors: ["schnell", "am schnellsten"], forms: ["schneller", "besser", "am besten"],
    tip: "Use als after the comparative: schneller als …",
    visual: { kind: "compare", items: [["schnell", "schneller", "am schnellsten", 35, 65, 95], ["gut", "besser", "am besten", 40, 75, 100], ["gern", "lieber", "am liebsten", 30, 60, 90]] }
  },
  {
    id: "u7-4", unit: "u7", num: 4, title: "Future & Konjunktiv II", pattern: "werden + Infinitiv / würde, hätte, wäre",
    summary: "Use werden for future plans. Use Konjunktiv II for wishes, polite requests and unreal situations.",
    formation: ["Ich werde morgen anrufen.", "Wenn ich Zeit hätte, würde ich kommen.", "Das wäre schön."],
    examples: [["Ich werde morgen anrufen.", "I'll call tomorrow."], ["Wenn ich Zeit hätte, würde ich kommen.", "If I had time, I would come."]],
    blank: "werde", blank2: "hätte", distractors: ["wird", "werden"], forms: ["werde anrufen", "hätte", "würde kommen", "wäre"],
    tip: "würde + infinitive is the usual polite or unreal form; hätte and wäre are common by themselves.",
    visual: { kind: "contrast", left: { title: "Future", text: "werden + infinitive", examples: ["Ich werde kommen.", "Es wird regnen."] }, right: { title: "Konjunktiv II", text: "wish / polite / unreal", examples: ["Ich würde kommen.", "Das wäre schön."] } }
  }
];

window.GRAMMAR_UNITS = [
  { id: "u1", num: 1, title: "Fundamentals", subtitle: "Gender, articles, plurals and the present tense.", context: [
    { speaker: "A", text: "Hallo! Ich heiße Lena. [[Der|g:u1-1]] Kurs ist gut.", en: "Hello! My name is Lena. This course is very good." },
    { speaker: "B", text: "Ich bin Tom. Ich [[wohne|g:u1-3]] in Berlin und [[habe|g:u1-4]] heute Zeit.", en: "I'm Tom. I live in Berlin and have some time today." },
    { speaker: "A", text: "Die [[Tische|g:u1-2]] dort sind frei. Komm, wir lernen zusammen!", en: "The tables over there are free. Come, let's learn together!" }
  ] },
  { id: "u2", num: 2, title: "The Four Cases", subtitle: "Nominative, accusative, negation and questions.", context: [
    { speaker: "A", text: "[[Der|g:u2-1]] Mann dort ist mein Lehrer.", en: "The man over there is my teacher." },
    { speaker: "B", text: "Siehst du [[den|g:u2-2]] Mann? Ich habe [[kein|g:u2-3]] Auto.", en: "Do you see that man? I don't have a car." },
    { speaker: "A", text: "[[Wo|g:u2-4]] wohnst du? [[Sprichst|g:u2-4]] du Deutsch?", en: "Where do you live? Do you speak German?" }
  ] },
  { id: "u3", num: 3, title: "Articles & Possession", subtitle: "ein/eine, possessives, demonstratives and adjective endings.", context: [
    { speaker: "A", text: "Das ist [[ein|g:u3-1]] Tisch. Und das ist [[meine|g:u3-2]] Tasche.", en: "This is a table. This is my bag." },
    { speaker: "B", text: "[[Dieser|g:u3-3]] Stuhl ist frei. Der [[neue|g:u3-4]] Stuhl ist bequem.", en: "This chair is free. The new chair is comfortable." }
  ] },
  { id: "u4", num: 4, title: "Verbs in Action", subtitle: "Modals, separable verbs, imperatives and reflexives.", context: [
    { speaker: "A", text: "Ich [[kann|g:u4-1]] heute kommen. Ich [[stehe|g:u4-2]] um sieben Uhr auf.", en: "I can come today. I get up at seven o'clock." },
    { speaker: "B", text: "[[Komm|g:u4-3]] bitte her! Ich [[freue|g:u4-4]] mich auf den Kurs.", en: "Please come here! I'm looking forward to this class." }
  ] },
  { id: "u5", num: 5, title: "Dative & Prepositions", subtitle: "Dative objects, pronouns, fixed-case and two-way prepositions.", context: [
    { speaker: "A", text: "Ich helfe [[dem|g:u5-1]] Mann. Das Buch gehört [[mir|g:u5-2]].", en: "I help the man. This book belongs to me." },
    { speaker: "B", text: "Ich gehe [[durch|g:u5-3]] den Park. Das Buch liegt [[auf dem|g:u5-4]] Tisch.", en: "I walk through the park. The book is on the table." }
  ] },
  { id: "u6", num: 6, title: "Time & the Past", subtitle: "Time prepositions, the perfect tense and German word order.", context: [
    { speaker: "A", text: "[[Am|g:u6-1]] Montag habe ich Deutsch. Ich habe gestern [[gelernt|g:u6-2]].", en: "I have German class on Monday. I studied yesterday." },
    { speaker: "B", text: "Ich [[bin|g:u6-3]] nach Berlin gefahren. [[Heute|g:u6-4]] lerne ich Deutsch.", en: "I went to Berlin. Today I am learning German." }
  ] },
  { id: "u7", num: 7, title: "Sentences & A2", subtitle: "Subordinate and relative clauses, comparison, future and wishes.", context: [
    { speaker: "A", text: "Ich bleibe zu Hause, [[weil|g:u7-1]] es regnet. Der Mann, [[der|g:u7-2]] dort steht, ist mein Lehrer.", en: "I am staying at home because it is raining. The man standing there is my teacher." },
    { speaker: "B", text: "Ein Zug ist [[schneller|g:u7-3]] als ein Bus. Ich [[werde|g:u7-4]] morgen anrufen.", en: "Trains are faster than buses. I'll call tomorrow." }
  ] }
];
