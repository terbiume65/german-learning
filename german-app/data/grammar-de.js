/* German A1–A2 grammar: original explanations with visual grammar panels. */
window.GRAMMAR_ITEMS = [
  {
    id: "u1-1", unit: "u1", num: 1, title: "Gender & definite articles", pattern: "der / die / das",
    summary: "Every German noun has a grammatical gender. Learn the noun together with its article.",
    formation: ["masculine: der Tisch", "feminine: die Lampe", "neuter: das Fenster"],
    examples: [["Der Tisch ist neu.", "这张桌子是新的。"], ["Die Lampe ist hell.", "这盏灯很亮。"]],
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
    examples: [["Die Tische sind neu.", "这些桌子是新的。"], ["Die Lampen sind hell.", "这些灯很亮。"]],
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
    examples: [["Ich wohne in Berlin.", "我住在柏林。"], ["Du lernst Deutsch.", "你学德语。"]],
    blank: "wohne", blank2: "lernst", distractors: ["wohnt", "wohnen"], forms: ["wohne", "wohnst", "wohnt", "wohnen"],
    tip: "Find the stem first: wohnen → wohn-, then add the ending.",
    visual: { kind: "verb", verb: "wohnen", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"] }
  },
  {
    id: "u1-4", unit: "u1", num: 4, title: "sein & haben", pattern: "bin / bist / ist · habe / hast / hat",
    summary: "Two of the most important verbs are irregular. Learn their forms by heart.",
    formation: ["ich bin / du bist / er ist", "wir sind / ihr seid / sie sind", "ich habe / du hast / er hat"],
    examples: [["Ich bin müde.", "我累了。"], ["Du hast Zeit.", "你有时间。"]],
    blank: "bin", blank2: "hast", distractors: ["bist", "ist"], forms: ["bin", "bist", "ist", "sind", "habe", "hast", "hat"],
    tip: "sein and haben are also auxiliary verbs for the perfect tense.",
    visual: { kind: "verb", verb: "sein / haben", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["bin / habe", "bist / hast", "ist / hat", "sind / haben", "seid / habt", "sind / haben"] }
  },

  {
    id: "u2-1", unit: "u2", num: 1, title: "Nominative: the subject", pattern: "der / die / das",
    summary: "The nominative marks the subject: the person or thing doing the action.",
    formation: ["Der Mann liest.", "Die Kinder spielen.", "Das Buch liegt hier."],
    examples: [["Der Mann liest.", "那个男人在读书。"], ["Die Kinder spielen.", "孩子们在玩。"]],
    blank: "Der", blank2: "Die", distractors: ["Den", "Dem"], forms: ["Der Mann", "Die Kinder", "Das Buch"],
    tip: "Ask: Who or what is doing the action? That is the nominative.",
    visual: { kind: "cases", columns: ["Nominativ"], rows: [["der"], ["die"], ["das"], ["die"]] }
  },
  {
    id: "u2-2", unit: "u2", num: 2, title: "Accusative: the direct object", pattern: "den / die / das / die",
    summary: "The accusative marks the direct object. Only masculine articles change: der → den.",
    formation: ["Ich sehe den Mann.", "Ich kaufe die Tasche.", "Ich lese das Buch."],
    examples: [["Ich sehe den Mann.", "我看见那个男人。"], ["Ich kaufe die Tasche.", "我买这个包。"]],
    blank: "den", blank2: "die", distractors: ["der", "dem"], forms: ["den Mann", "die Tasche", "das Buch"],
    tip: "Masculine is the only article that changes in the accusative.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ"], rows: [["der", "den"], ["die", "die"], ["das", "das"], ["die", "die"]] }
  },
  {
    id: "u2-3", unit: "u2", num: 3, title: "Negation: nicht & kein", pattern: "nicht / kein",
    summary: "Use nicht for verbs, adjectives and names. Use kein for nouns with ein/eine.",
    formation: ["Ich arbeite nicht.", "Das ist nicht mein Buch.", "Ich habe kein Auto."],
    examples: [["Ich habe kein Auto.", "我没有车。"], ["Das ist nicht mein Buch.", "这不是我的书。"]],
    blank: "kein", blank2: "nicht", distractors: ["nicht", "keine"], forms: ["kein Auto", "nicht mein Buch"],
    tip: "kein has the same endings as ein: kein, keine, keinen …",
    visual: { kind: "contrast", left: { title: "nicht", text: "verbs · adjectives · names", examples: ["nicht kommen", "nicht müde", "nicht Anna"] }, right: { title: "kein", text: "nouns with ein/eine", examples: ["kein Auto", "keine Zeit", "keinen Hund"] } }
  },
  {
    id: "u2-4", unit: "u2", num: 4, title: "Questions", pattern: "W-Wort + Verb … ? / Verb + subject … ?",
    summary: "In a W-question the question word comes first, then the verb. In a yes/no question the verb comes first.",
    formation: ["Wo wohnst du?", "Wie heißt du?", "Sprichst du Deutsch?"],
    examples: [["Wo wohnst du?", "你住在哪里？"], ["Sprichst du Deutsch?", "你说德语吗？"]],
    blank: "Wo", blank2: "Sprichst", distractors: ["Wer", "Wie"], forms: ["Wo wohnst du", "Sprichst du Deutsch"],
    tip: "The verb stays in position two in W-questions and moves to position one in yes/no questions.",
    visual: { kind: "question", w: [["Wo", "where"], ["Wer", "who"], ["Wie", "how"], ["Wann", "when"], ["Warum", "why"]], yesno: ["Sprichst du Deutsch?", "Kommst du morgen?"] }
  },

  {
    id: "u3-1", unit: "u3", num: 1, title: "Indefinite articles: ein / eine", pattern: "ein / eine",
    summary: "Use ein for masculine and neuter nouns, eine for feminine nouns.",
    formation: ["ein Tisch", "eine Lampe", "ein Fenster", "einen Tisch (accusative)"],
    examples: [["Das ist ein Tisch.", "这是一张桌子。"], ["Das ist eine Lampe.", "这是一盏灯。"]],
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
    examples: [["Das ist mein Bruder.", "这是我哥哥。"], ["Das ist meine Schwester.", "这是我妹妹。"]],
    blank: "mein", blank2: "meine", distractors: ["meine", "meinen"], forms: ["mein Bruder", "meine Schwester", "mein Auto"],
    tip: "The ending depends on the noun after it, not on the owner.",
    visual: { kind: "possessive", rows: [["ich", "mein"], ["du", "dein"], ["er", "sein"], ["sie", "ihr"], ["wir", "unser"], ["ihr", "euer"], ["sie/Sie", "ihr/Ihr"]] }
  },
  {
    id: "u3-3", unit: "u3", num: 3, title: "Demonstrative articles", pattern: "dieser / diese / dieses",
    summary: "dieser points to a specific noun: this or that.",
    formation: ["dieser Tisch", "diese Lampe", "dieses Fenster", "diesen Tisch (acc.)"],
    examples: [["Dieser Tisch ist frei.", "这张桌子空着。"], ["Diese Tasche ist teuer.", "这个包很贵。"]],
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
    examples: [["Der neue Tisch ist groß.", "新桌子很大。"], ["Ich sehe den neuen Tisch.", "我看见新桌子。"]],
    blank: "neue", blank2: "neuen", distractors: ["neuen", "neuer"], forms: ["der neue Tisch", "den neuen Tisch"],
    tip: "After der/die/das, the adjective often takes -e or -en. Learn the pattern with the article.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ"], rows: [["der neue", "den neuen"], ["die neue", "die neue"], ["das neue", "das neue"], ["die neuen", "die neuen"]] }
  },

  {
    id: "u4-1", unit: "u4", num: 1, title: "Modal verbs", pattern: "Modal + … + infinitive at the end",
    summary: "Modal verbs change the main verb into an infinitive at the end of the sentence.",
    formation: ["Ich kann kommen.", "Du musst lernen.", "Er will schlafen.", "Wir dürfen gehen."],
    examples: [["Ich kann heute kommen.", "我今天能来。"], ["Du musst mehr lernen.", "你必须多学习。"]],
    blank: "kann", blank2: "musst", distractors: ["kannst", "muss"], forms: ["kann kommen", "musst lernen", "will schlafen"],
    tip: "The modal verb is in position two; the infinitive goes to the end.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["kann", "modal"], ["heute", "time"], ["kommen", "infinitive"]] }
  },
  {
    id: "u4-2", unit: "u4", num: 2, title: "Separable verbs", pattern: "prefix + … + verb",
    summary: "Some verbs have a prefix that separates and moves to the end in a main clause.",
    formation: ["aufstehen → Ich stehe … auf.", "einkaufen → Wir kaufen … ein.", "anrufen → Er ruft … an."],
    examples: [["Ich stehe um sieben Uhr auf.", "我七点起床。"], ["Wir kaufen im Supermarkt ein.", "我们在超市购物。"]],
    blank: "stehe", blank2: "ein", distractors: ["aufstehe", "stehst"], forms: ["stehe ... auf", "kaufe ... ein", "rufe ... an"],
    tip: "The prefix goes to the end. In a subordinate clause it stays with the verb.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["stehe", "verb"], ["um sieben Uhr", "time"], ["auf", "prefix"]] }
  },
  {
    id: "u4-3", unit: "u4", num: 3, title: "Imperative", pattern: "Verb stem …! / Verb + Sie …!",
    summary: "Use the imperative to give instructions, requests or advice.",
    formation: ["Komm her! (du)", "Kommt her! (ihr)", "Kommen Sie bitte! (Sie)", "Sei ruhig!"],
    examples: [["Komm bitte her!", "请过来！"], ["Nehmen Sie bitte Platz!", "请坐！"]],
    blank: "Komm", blank2: "Nehmen", distractors: ["Kommt", "Kommen"], forms: ["Komm her", "Nehmen Sie Platz"],
    tip: "The Sie-form keeps the pronoun and the verb ends in -en.",
    visual: { kind: "contrast", left: { title: "du", text: "verb stem", examples: ["Komm!", "Lern!", "Sei ruhig!"] }, right: { title: "Sie", text: "verb + Sie", examples: ["Kommen Sie!", "Lernen Sie!", "Seien Sie ruhig!"] } }
  },
  {
    id: "u4-4", unit: "u4", num: 4, title: "Reflexive verbs", pattern: "sich + verb",
    summary: "Reflexive verbs refer back to the subject. The reflexive pronoun changes with the person.",
    formation: ["ich freue mich", "du freust dich", "er freut sich", "wir freuen uns"],
    examples: [["Ich freue mich auf den Urlaub.", "我期待假期。"], ["Er wäscht sich die Hände.", "他洗手。"]],
    blank: "mich", blank2: "sich", distractors: ["mir", "dich"], forms: ["mich freuen", "dich freuen", "sich freuen"],
    tip: "Some verbs are always reflexive; learn the pronoun with the verb.",
    visual: { kind: "reflexive", pronouns: ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"], forms: ["mich", "dich", "sich", "uns", "euch", "sich"] }
  },

  {
    id: "u5-1", unit: "u5", num: 1, title: "Dative case", pattern: "dem / der / dem / den + -n",
    summary: "The dative marks the indirect object or the person something is done for.",
    formation: ["Ich helfe dem Mann.", "Ich danke der Frau.", "Ich gebe dem Kind das Buch."],
    examples: [["Ich helfe dem Mann.", "我帮助那个男人。"], ["Ich danke der Frau.", "我感谢那位女士。"]],
    blank: "dem", blank2: "der", distractors: ["den", "des"], forms: ["dem Mann", "der Frau", "dem Kind"],
    tip: "Plural nouns add -n in the dative: den Kindern.",
    visual: { kind: "cases", columns: ["Nominativ", "Dativ"], rows: [["der", "dem"], ["die", "der"], ["das", "dem"], ["die", "den + -n"]] }
  },
  {
    id: "u5-2", unit: "u5", num: 2, title: "Dative pronouns", pattern: "mir / dir / ihm / ihr …",
    summary: "Dative pronouns show who receives something or for whom something is done.",
    formation: ["mir", "dir", "ihm/ihr", "uns", "euch", "ihnen"],
    examples: [["Das Buch gehört mir.", "这本书属于我。"], ["Ich helfe dir.", "我帮你。"]],
    blank: "mir", blank2: "dir", distractors: ["mich", "dich"], forms: ["mir", "dir", "ihm", "ihr"],
    tip: "Do not mix mich/dich (accusative) with mir/dir (dative).",
    visual: { kind: "reflexive", pronouns: ["ich", "du", "er", "sie", "wir", "ihr", "sie"], forms: ["mir", "dir", "ihm", "ihr", "uns", "euch", "ihnen"] }
  },
  {
    id: "u5-3", unit: "u5", num: 3, title: "Prepositions with fixed case", pattern: "Akkusativ / Dativ",
    summary: "Some prepositions always take the accusative; others always take the dative.",
    formation: ["Accusative: durch, für, gegen, ohne, um", "Dative: aus, bei, mit, nach, seit, von, zu"],
    examples: [["Ich gehe durch den Park.", "我穿过公园。"], ["Ich fahre mit dem Bus.", "我坐公交车。"]],
    blank: "durch", blank2: "mit", distractors: ["für", "ohne"], forms: ["durch den Park", "mit dem Bus"],
    tip: "Learn the preposition together with its case. The ending on the article shows the case.",
    visual: { kind: "prepositions", accusative: ["durch", "für", "gegen", "ohne", "um"], dative: ["aus", "bei", "mit", "nach", "seit", "von", "zu"] }
  },
  {
    id: "u5-4", unit: "u5", num: 4, title: "Two-way prepositions", pattern: "Wo? + Dativ / Wohin? + Akkusativ",
    summary: "With in, an, auf, über, unter, vor, hinter, neben, zwischen: location uses dative, direction uses accusative.",
    formation: ["Wo? auf dem Tisch (Dativ)", "Wohin? auf den Tisch (Akkusativ)"],
    examples: [["Das Buch liegt auf dem Tisch.", "书在桌上。"], ["Ich lege das Buch auf den Tisch.", "我把书放到桌上。"]],
    blank: "dem", blank2: "den", distractors: ["den", "der"], forms: ["auf dem Tisch", "auf den Tisch"],
    tip: "Ask Wo? for a position and Wohin? for a movement.",
    visual: { kind: "twoway", preps: ["in", "an", "auf", "über", "unter", "vor", "hinter", "neben", "zwischen"], wo: "dem Tisch", wohin: "den Tisch" }
  },

  {
    id: "u6-1", unit: "u6", num: 1, title: "Time prepositions", pattern: "am / um / im / von … bis / seit",
    summary: "Use different prepositions for days, clock times, months and periods.",
    formation: ["am Montag", "um neun Uhr", "im Januar", "von neun bis fünf", "seit einem Jahr"],
    examples: [["Am Montag habe ich Deutsch.", "星期一我有德语课。"], ["Der Kurs beginnt um neun Uhr.", "课程九点开始。"]],
    blank: "Am", blank2: "um", distractors: ["Im", "Um"], forms: ["am Montag", "um neun Uhr", "im Januar"],
    tip: "am + day/date, um + clock time, im + month/season.",
    visual: { kind: "timeline", items: [["am", "Tag / Datum"], ["um", "Uhrzeit"], ["im", "Monat / Jahr"], ["von … bis", "Zeitraum"], ["seit", "Vergangenheit"]] }
  },
  {
    id: "u6-2", unit: "u6", num: 2, title: "Perfect with haben", pattern: "haben + Partizip II",
    summary: "Most verbs form the perfect with haben and the past participle.",
    formation: ["regular: ge- + stem + -t (lernen → gelernt)", "irregular: ge- + stem change + -en (backen → gebacken)"],
    examples: [["Ich habe Deutsch gelernt.", "我学了德语。"], ["Wir haben einen Kuchen gebacken.", "我们烤了一个蛋糕。"]],
    blank: "gelernt", blank2: "gebacken", distractors: ["lernen", "lernt"], forms: ["gelernt", "gebacken", "gemacht"],
    tip: "The participle goes to the end of the sentence.",
    visual: { kind: "sentence", chunks: [["Ich", "subject"], ["habe", "auxiliary"], ["Deutsch", "object"], ["gelernt", "participle"]] }
  },
  {
    id: "u6-3", unit: "u6", num: 3, title: "Perfect with sein", pattern: "sein + Partizip II",
    summary: "Verbs of movement and change use sein in the perfect.",
    formation: ["Ich bin gefahren.", "Sie ist gekommen.", "Wir sind geblieben."],
    examples: [["Ich bin nach Berlin gefahren.", "我去了柏林。"], ["Sie ist nach Hause gekommen.", "她回家了。"]],
    blank: "bin", blank2: "ist", distractors: ["habe", "hat"], forms: ["bin gefahren", "ist gekommen", "sind geblieben"],
    tip: "Bewegung von A nach B and change of state usually take sein.",
    visual: { kind: "contrast", left: { title: "sein", text: "movement / change", examples: ["gefahren", "gekommen", "geworden"] }, right: { title: "haben", text: "most other verbs", examples: ["gelernt", "gegessen", "gemacht"] } }
  },
  {
    id: "u6-4", unit: "u6", num: 4, title: "Word order: verb second", pattern: "Position 1 + Verb + …",
    summary: "In a German main clause, the conjugated verb is always in position two.",
    formation: ["Heute lerne ich Deutsch.", "Ich lerne heute Deutsch.", "Deutsch lerne ich heute."],
    examples: [["Heute lerne ich Deutsch.", "今天我学德语。"], ["Ich fahre morgen mit dem Zug nach Berlin.", "我明天坐火车去柏林。"]],
    blank: "lerne", blank2: "morgen", distractors: ["lernen", "lernt"], forms: ["Heute lerne ich", "Ich fahre morgen"],
    tip: "If you move a time expression to the front, the verb and subject swap.",
    visual: { kind: "sentence", chunks: [["Heute", "position 1"], ["lerne", "verb"], ["ich", "subject"], ["Deutsch", "object"]] }
  },

  {
    id: "u7-1", unit: "u7", num: 1, title: "Subordinate clauses: weil / dass / wenn", pattern: "…, weil + subject + … + verb",
    summary: "After a subordinating conjunction, the conjugated verb moves to the end.",
    formation: ["Ich bleibe zu Hause, weil es regnet.", "Ich weiß, dass du Recht hast.", "Wenn ich Zeit habe, komme ich."],
    examples: [["Ich bleibe zu Hause, weil es regnet.", "我待在家，因为下雨。"], ["Ich weiß, dass du Recht hast.", "我知道你是对的。"]],
    blank: "weil", blank2: "dass", distractors: ["denn", "aber"], forms: ["weil es regnet", "dass du Recht hast"],
    tip: "denn keeps normal word order; weil sends the verb to the end.",
    visual: { kind: "clause", main: "Ich bleibe zu Hause", connector: "weil", sub: ["es", "regnet"], rule: "Verb at the end" }
  },
  {
    id: "u7-2", unit: "u7", num: 2, title: "Relative clauses", pattern: "der / die / das … + verb at the end",
    summary: "Relative clauses describe a noun. The relative pronoun takes the case of its role in the clause.",
    formation: ["Der Mann, der dort steht, ist mein Lehrer.", "Das Buch, das ich lese, ist spannend."],
    examples: [["Der Mann, der dort steht, ist mein Lehrer.", "站在那里的男人是我的老师。"], ["Das Buch, das ich lese, ist spannend.", "我读的这本书很有意思。"]],
    blank: "der", blank2: "das", distractors: ["den", "die"], forms: ["der dort steht", "das ich lese"],
    tip: "The relative pronoun agrees with the noun in gender and number, but its case comes from the relative clause.",
    visual: { kind: "cases", columns: ["Nominativ", "Akkusativ", "Dativ"], rows: [["der", "den", "dem"], ["die", "die", "der"], ["das", "das", "dem"], ["die", "die", "denen"]] }
  },
  {
    id: "u7-3", unit: "u7", num: 3, title: "Comparative & superlative", pattern: "-er / am -sten",
    summary: "Compare two things with the comparative; compare with everything with the superlative.",
    formation: ["schnell → schneller → am schnellsten", "gut → besser → am besten", "gern → lieber → am liebsten"],
    examples: [["Ein Zug ist schneller als ein Bus.", "火车比公交车快。"], ["Das ist der beste Kuchen.", "这是最好的蛋糕。"]],
    blank: "schneller", blank2: "beste", distractors: ["schnell", "am schnellsten"], forms: ["schneller", "besser", "am besten"],
    tip: "Use als after the comparative: schneller als …",
    visual: { kind: "compare", items: [["schnell", "schneller", "am schnellsten", 35, 65, 95], ["gut", "besser", "am besten", 40, 75, 100], ["gern", "lieber", "am liebsten", 30, 60, 90]] }
  },
  {
    id: "u7-4", unit: "u7", num: 4, title: "Future & Konjunktiv II", pattern: "werden + Infinitiv / würde, hätte, wäre",
    summary: "Use werden for future plans. Use Konjunktiv II for wishes, polite requests and unreal situations.",
    formation: ["Ich werde morgen anrufen.", "Wenn ich Zeit hätte, würde ich kommen.", "Das wäre schön."],
    examples: [["Ich werde morgen anrufen.", "我明天会打电话。"], ["Wenn ich Zeit hätte, würde ich kommen.", "如果我有时间，我就会来。"]],
    blank: "werde", blank2: "hätte", distractors: ["wird", "werden"], forms: ["werde anrufen", "hätte", "würde kommen", "wäre"],
    tip: "würde + infinitive is the usual polite or unreal form; hätte and wäre are common by themselves.",
    visual: { kind: "contrast", left: { title: "Future", text: "werden + infinitive", examples: ["Ich werde kommen.", "Es wird regnen."] }, right: { title: "Konjunktiv II", text: "wish / polite / unreal", examples: ["Ich würde kommen.", "Das wäre schön."] } }
  }
];

window.GRAMMAR_UNITS = [
  { id: "u1", num: 1, title: "Fundamentals", subtitle: "Gender, articles, plurals and the present tense.", context: [
    { speaker: "A", text: "Hallo! Ich heiße Lena. [[Der|g:u1-1]] Kurs ist gut.", zh: "你好！我叫Lena。这门课很好。" },
    { speaker: "B", text: "Ich bin Tom. Ich [[wohne|g:u1-3]] in Berlin und [[habe|g:u1-4]] heute Zeit.", zh: "我是Tom。我住在柏林，今天有时间。" },
    { speaker: "A", text: "Die [[Tische|g:u1-2]] dort sind frei. Komm, wir lernen zusammen!", zh: "那边的桌子空着。来，我们一起学习！" }
  ] },
  { id: "u2", num: 2, title: "The Four Cases", subtitle: "Nominative, accusative, negation and questions.", context: [
    { speaker: "A", text: "[[Der|g:u2-1]] Mann dort ist mein Lehrer.", zh: "那边的男人是我的老师。" },
    { speaker: "B", text: "Siehst du [[den|g:u2-2]] Mann? Ich habe [[kein|g:u2-3]] Auto.", zh: "你看见那个男人了吗？我没有车。" },
    { speaker: "A", text: "[[Wo|g:u2-4]] wohnst du? [[Sprichst|g:u2-4]] du Deutsch?", zh: "你住在哪里？你说德语吗？" }
  ] },
  { id: "u3", num: 3, title: "Articles & Possession", subtitle: "ein/eine, possessives, demonstratives and adjective endings.", context: [
    { speaker: "A", text: "Das ist [[ein|g:u3-1]] Tisch. Und das ist [[meine|g:u3-2]] Tasche.", zh: "这是一张桌子。这是我的包。" },
    { speaker: "B", text: "[[Dieser|g:u3-3]] Stuhl ist frei. Der [[neue|g:u3-4]] Stuhl ist bequem.", zh: "这把椅子空着。新椅子很舒服。" }
  ] },
  { id: "u4", num: 4, title: "Verbs in Action", subtitle: "Modals, separable verbs, imperatives and reflexives.", context: [
    { speaker: "A", text: "Ich [[kann|g:u4-1]] heute kommen. Ich [[stehe|g:u4-2]] um sieben Uhr auf.", zh: "我今天能来。我七点起床。" },
    { speaker: "B", text: "[[Komm|g:u4-3]] bitte her! Ich [[freue|g:u4-4]] mich auf den Kurs.", zh: "请过来！我很期待这门课。" }
  ] },
  { id: "u5", num: 5, title: "Dative & Prepositions", subtitle: "Dative objects, pronouns, fixed-case and two-way prepositions.", context: [
    { speaker: "A", text: "Ich helfe [[dem|g:u5-1]] Mann. Das Buch gehört [[mir|g:u5-2]].", zh: "我帮助那个男人。这本书属于我。" },
    { speaker: "B", text: "Ich gehe [[durch|g:u5-3]] den Park. Das Buch liegt [[auf dem|g:u5-4]] Tisch.", zh: "我穿过公园。书在桌上。" }
  ] },
  { id: "u6", num: 6, title: "Time & the Past", subtitle: "Time prepositions, the perfect tense and German word order.", context: [
    { speaker: "A", text: "[[Am|g:u6-1]] Montag habe ich Deutsch. Ich habe gestern [[gelernt|g:u6-2]].", zh: "星期一我有德语课。我昨天学习了。" },
    { speaker: "B", text: "Ich [[bin|g:u6-3]] nach Berlin gefahren. [[Heute|g:u6-4]] lerne ich Deutsch.", zh: "我去了柏林。今天我学德语。" }
  ] },
  { id: "u7", num: 7, title: "Sentences & A2", subtitle: "Subordinate and relative clauses, comparison, future and wishes.", context: [
    { speaker: "A", text: "Ich bleibe zu Hause, [[weil|g:u7-1]] es regnet. Der Mann, [[der|g:u7-2]] dort steht, ist mein Lehrer.", zh: "我待在家，因为下雨。站在那里的男人是我的老师。" },
    { speaker: "B", text: "Ein Zug ist [[schneller|g:u7-3]] als ein Bus. Ich [[werde|g:u7-4]] morgen anrufen.", zh: "火车比公交车快。我明天会打电话。" }
  ] }
];
