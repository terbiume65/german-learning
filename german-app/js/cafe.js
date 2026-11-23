/* Weihnachtsmarkt catalog + SVG scene. */
(function (root) {
  "use strict";

  var ITEMS = [
    { id: "stall", name: "Wooden stall", cost: 40, level: 1, icon: "🏪", desc: "A warm wooden stall for the market." },
    { id: "lights", name: "Fairy lights", cost: 60, level: 2, icon: "✨", desc: "A string of warm lights above the market." },
    { id: "gluhwein", name: "Glühwein stand", cost: 90, level: 2, icon: "🍷", desc: "Mulled wine, steam and cheerful cups." },
    { id: "gingerbread", name: "Gingerbread hearts", cost: 120, level: 2, icon: "🍪", desc: "Sweet hearts with icing messages." },
    { id: "tree", name: "Christmas tree", cost: 160, level: 3, icon: "🎄", desc: "The tall tree in the middle of the market." },
    { id: "nutcracker", name: "Nutcracker", cost: 200, level: 3, icon: "🪆", desc: "A serious soldier guarding the stall." },
    { id: "snowman", name: "Snowman", cost: 220, level: 3, icon: "⛄", desc: "Carrot nose, warm scarf, cold hands." },
    { id: "carousel", name: "Carousel", cost: 260, level: 4, icon: "🎠", desc: "A little carousel turning in the snow." },
    { id: "wreath", name: "Advent wreath", cost: 300, level: 4, icon: "🕯️", desc: "Four candles for the four Advent Sundays." },
    { id: "gifts", name: "Gift stall", cost: 340, level: 4, icon: "🎁", desc: "Presents wrapped in red and gold." },
    { id: "reindeer", name: "Reindeer", cost: 380, level: 5, icon: "🦌", desc: "A quiet reindeer at the edge of the market." },
    { id: "starnight", name: "Starry night", cost: 420, level: 5, icon: "🌟", desc: "A sky full of winter stars." },
  ];

  var CHARMS = [
    { id: "case", name: "Case Star", glyph: "K", color: "#4c7a72", stars: 2, beans: 90, desc: "A star for nominative, accusative and dative." },
    { id: "verb", name: "Verb Bell", glyph: "V", color: "#c26d4a", stars: 3, beans: 140, desc: "A bell for strong and regular verbs." },
    { id: "order", name: "Sentence Star", glyph: "S", color: "#b57a45", stars: 4, beans: 200, desc: "A star for verb-second word order." },
    { id: "prep", name: "Preposition Lantern", glyph: "P", color: "#7a5b8c", stars: 5, beans: 260, desc: "A lantern for cases and prepositions." },
    { id: "sound", name: "Sound Angel", glyph: "A", color: "#c9a96b", stars: 7, beans: 340, desc: "An angel for listening and speaking." },
  ];

  function ownedClass(owned, id) {
    return owned && owned[id] ? "cafe-item owned" : "cafe-item";
  }

  function customerClass(words, threshold) {
    return words >= threshold ? "cafe-customer show" : "cafe-customer";
  }

  function scene(owned, words, level, charms) {
    owned = owned || {};
    words = words || 0;
    charms = charms || {};
    var ownedCharms = CHARMS.filter(function (charm) { return charms[charm.id]; });
    var charmWall = ownedCharms.length
      ? '<g class="cafe-grammar-wall">' +
        '<rect x="320" y="168" width="190" height="112" rx="10" fill="#4a2b1d" opacity=".94"/>' +
        '<rect x="328" y="176" width="174" height="96" rx="6" fill="#f5e3c2"/>' +
        '<text x="415" y="193" text-anchor="middle" font-family="Pretendard, Noto Sans KR, sans-serif" font-size="9" font-weight="700" letter-spacing="2" fill="#8a5b34">GRAMMATIK</text>' +
        ownedCharms.map(function (charm, i) {
          var x = 341 + (i % 3) * 56;
          var y = 202 + Math.floor(i / 3) * 34;
          return '<g><rect x="' + x + '" y="' + y + '" width="34" height="28" rx="6" fill="' + charm.color + '"/><text x="' + (x + 17) + '" y="' + (y + 19) + '" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="14" font-weight="800" fill="#fff8f2">' + charm.glyph + '</text></g>';
        }).join("") + '</g>'
      : "";

    return (
      '<div class="cafe-scene winter-scene" role="img" aria-label="Illustration of a German Christmas market">' +
      '<svg viewBox="0 0 900 520" aria-hidden="true" focusable="false">' +
      '<defs>' +
      '<linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#111a36"/><stop offset=".65" stop-color="#26365c"/><stop offset="1" stop-color="#4a5c78"/></linearGradient>' +
      '<linearGradient id="snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f7fb"/><stop offset="1" stop-color="#d8e2ee"/></linearGradient>' +
      '<linearGradient id="woodw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b97843"/><stop offset="1" stop-color="#7d4b2d"/></linearGradient>' +
      '<radialGradient id="warmglow"><stop offset="0" stop-color="#ffd88c" stop-opacity=".9"/><stop offset="1" stop-color="#ffd88c" stop-opacity="0"/></radialGradient>' +
      '<filter id="snowblur"><feGaussianBlur stdDeviation="7"/></filter>' +
      '</defs>' +
      '<rect width="900" height="520" fill="url(#wsky)"/>' +
      // stars
      '<g opacity=".85">' +
      '<circle cx="90" cy="54" r="2" fill="#fff"/><circle cx="180" cy="88" r="1.4" fill="#fff"/><circle cx="280" cy="42" r="1.8" fill="#fff"/><circle cx="400" cy="70" r="1.2" fill="#fff"/><circle cx="520" cy="38" r="1.8" fill="#fff"/><circle cx="640" cy="66" r="1.3" fill="#fff"/><circle cx="760" cy="46" r="2" fill="#fff"/><circle cx="830" cy="96" r="1.2" fill="#fff"/>' +
      '</g>' +
      '<circle cx="750" cy="95" r="34" fill="#ffe9b0" opacity=".9"/><circle cx="762" cy="86" r="30" fill="#26365c" opacity=".9"/>' +
      // snow ground
      '<path d="M0 390c110-35 220 15 330-6s210-44 330-14 170 8 240-6v156H0Z" fill="url(#snow)"/>' +
      '<ellipse cx="450" cy="480" rx="500" ry="70" fill="#ffffff" opacity=".28" filter="url(#snowblur)"/>' +
      // static winter scenery: distant firs, lamp posts and snow drifts
      '<g class="cafe-base" opacity=".96">' +
      '<path d="M52 338l28-72 28 72z" fill="#173f33"/><path d="M64 318l16-42 16 42z" fill="#225846"/><rect x="76" y="338" width="8" height="20" fill="#3a2a1d"/>' +
      '<path d="M108 348l22-58 22 58z" fill="#1d4a3b"/><path d="M118 330l12-34 12 34z" fill="#2a6550"/><rect x="127" y="348" width="6" height="16" fill="#3a2a1d"/>' +
      '<path d="M836 340l28-72 28 72z" fill="#173f33"/><path d="M848 320l16-42 16 42z" fill="#225846"/><rect x="860" y="340" width="8" height="20" fill="#3a2a1d"/>' +
      '<path d="M784 348l22-58 22 58z" fill="#1d4a3b"/><path d="M794 330l12-34 12 34z" fill="#2a6550"/><rect x="803" y="348" width="6" height="16" fill="#3a2a1d"/>' +
      '<circle cx="310" cy="324" r="48" fill="url(#warmglow)"/><rect x="307" y="328" width="6" height="74" rx="3" fill="#3a2a1d"/><rect x="298" y="318" width="24" height="18" rx="5" fill="#2f2a24"/><circle cx="310" cy="327" r="6" fill="#ffe6a3"/>' +
      '<circle cx="590" cy="324" r="48" fill="url(#warmglow)"/><rect x="587" y="328" width="6" height="74" rx="3" fill="#3a2a1d"/><rect x="578" y="318" width="24" height="18" rx="5" fill="#2f2a24"/><circle cx="590" cy="327" r="6" fill="#ffe6a3"/>' +
      '<path d="M0 414c90-18 170 8 260-4s180-12 270 2 180 16 370-4v112H0Z" fill="#ffffff" opacity=".22"/>' +
      '<ellipse cx="160" cy="400" rx="95" ry="11" fill="#ffffff" opacity=".35"/>' +
      '<ellipse cx="740" cy="404" rx="105" ry="12" fill="#ffffff" opacity=".32"/>' +
      '</g>' +
      // market sign
      '<g class="cafe-base">' +
      '<path d="M326 22h248l14 70H312z" fill="#3a1f16"/><path d="M326 22h248l14 70H312z" fill="none" stroke="#c9a96b" stroke-width="2"/>' +
      '<text x="450" y="57" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="25" font-weight="800" fill="#ffe5b0">WEIHNACHTSMARKT</text>' +
      '<text x="450" y="76" text-anchor="middle" font-family="Pretendard, sans-serif" font-size="9" letter-spacing="3" fill="#c9a96b">FROHE WEIHNACHTEN</text>' +
      '</g>' +
      // base stalls
      '<g class="cafe-base">' +
      '<rect x="58" y="250" width="240" height="150" rx="8" fill="url(#woodw)"/>' +
      '<path d="M48 250h260l20-42H68z" fill="#b23a32"/><path d="M48 250h260l20-42H68z" fill="none" stroke="#7d2822" stroke-width="2"/>' +
      '<path d="M82 250l-8-42M122 250l-4-42M162 250v-42M202 250l4-42M242 250l8-42" stroke="#f4dfb8" stroke-width="7" opacity=".75"/>' +
      '<path d="M68 208h240l10 8H58z" fill="#f4f7fb" opacity=".9"/>' +
      '<rect x="78" y="286" width="200" height="14" rx="4" fill="#6f4628"/><rect x="92" y="300" width="12" height="70" fill="#4e321f"/><rect x="252" y="300" width="12" height="70" fill="#4e321f"/>' +
      '<rect x="594" y="260" width="250" height="140" rx="8" fill="url(#woodw)"/>' +
      '<path d="M584 260h270l18-40H602z" fill="#2f6b5a"/><path d="M584 260h270l18-40H602z" fill="none" stroke="#1e4a3e" stroke-width="2"/>' +
      '<path d="M618 260l-6-40M658 260l-2-40M698 260v-40M738 260l4-40M778 260l8-40" stroke="#f4dfb8" stroke-width="7" opacity=".7"/>' +
      '<path d="M602 220h250l12 8H590z" fill="#f4f7fb" opacity=".9"/>' +
      '<rect x="612" y="294" width="214" height="14" rx="4" fill="#6f4628"/><rect x="628" y="308" width="12" height="66" fill="#4e321f"/><rect x="800" y="308" width="12" height="66" fill="#4e321f"/>' +
      '</g>' +
      // warm lantern glows
      '<circle cx="178" cy="330" r="58" fill="url(#warmglow)"/><circle cx="718" cy="330" r="58" fill="url(#warmglow)"/>' +
      // visitors
      '<g class="' + customerClass(words, 25) + ' cafe-customer-1"><circle cx="365" cy="350" r="15" fill="#5b4636"/><rect x="345" y="364" width="40" height="50" rx="10" fill="#b23a32"/><rect x="351" y="410" width="10" height="35" rx="4" fill="#2f2a24"/><rect x="369" y="410" width="10" height="35" rx="4" fill="#2f2a24"/></g>' +
      '<g class="' + customerClass(words, 120) + ' cafe-customer-2"><circle cx="535" cy="356" r="14" fill="#6b4c3a"/><rect x="517" y="369" width="36" height="44" rx="9" fill="#2f6b5a"/><rect x="523" y="410" width="9" height="30" rx="4" fill="#2f2a24"/><rect x="539" y="410" width="9" height="30" rx="4" fill="#2f2a24"/></g>' +
      '<g class="' + customerClass(words, 300) + ' cafe-customer-3"><circle cx="90" cy="320" r="13" fill="#8a5b34"/><rect x="74" y="332" width="32" height="40" rx="8" fill="#7a5b8c"/><rect x="79" y="369" width="8" height="28" rx="4" fill="#2f2a24"/><rect x="93" y="369" width="8" height="28" rx="4" fill="#2f2a24"/></g>' +
      '<g class="' + customerClass(words, 600) + ' cafe-customer-4"><circle cx="815" cy="320" r="13" fill="#5b4636"/><rect x="799" y="332" width="32" height="38" rx="8" fill="#c26d4a"/><rect x="804" y="367" width="8" height="26" rx="4" fill="#2f2a24"/><rect x="818" y="367" width="8" height="26" rx="4" fill="#2f2a24"/></g>' +
      // wooden stall item (extra decoration)
      '<g class="' + ownedClass(owned, "stall") + '" data-item="stall"><rect x="354" y="286" width="192" height="95" rx="7" fill="url(#woodw)"/><path d="M344 286h212l14-34H330z" fill="#c26d4a"/><path d="M344 286h212l14-34H330z" fill="none" stroke="#8f3f2c" stroke-width="2"/><rect x="380" y="312" width="52" height="30" rx="4" fill="#f5e3c2"/><rect x="452" y="312" width="52" height="30" rx="4" fill="#f5e3c2"/></g>' +
      // fairy lights
      '<g class="' + ownedClass(owned, "lights") + '" data-item="lights"><path d="M40 110c120 38 250 38 370 0s250-38 390 0" stroke="#3a2a1d" stroke-width="2" fill="none"/>' +
      '<g fill="#ffe6a3">' + [80,130,180,230,280,330,380,430,480,530,580,630,680,730,780,830].map(function (x, i) { return '<circle cx="' + x + '" cy="' + (116 + Math.sin(i * 0.8) * 10) + '" r="4"/>'; }).join("") + '</g></g>' +
      // gluhwein stand
      '<g class="' + ownedClass(owned, "gluhwein") + '" data-item="gluhwein"><rect x="100" y="300" width="66" height="46" rx="5" fill="#2f2a24"/><text x="133" y="320" text-anchor="middle" font-size="7" fill="#ffe5b0" font-family="sans-serif">GLÜHWEIN</text><rect x="112" y="330" width="14" height="16" rx="2" fill="#b23a32"/><rect x="132" y="330" width="14" height="16" rx="2" fill="#b23a32"/><path class="steam" d="M118 326c-5-8 5-10 0-18M138 326c-5-8 5-10 0-18" stroke="#fff" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/></g>' +
      // gingerbread hearts
      '<g class="' + ownedClass(owned, "gingerbread") + '" data-item="gingerbread"><path d="M210 304c-10-12-30-2-24 12 5 10 24 22 24 22s19-12 24-22c6-14-14-24-24-12Z" fill="#b97843"/><path d="M210 304c-10-12-30-2-24 12 5 10 24 22 24 22s19-12 24-22c6-14-14-24-24-12Z" fill="none" stroke="#6f4628" stroke-width="2"/><text x="210" y="324" text-anchor="middle" font-size="7" fill="#fff6e5" font-family="sans-serif">ICH LIEBE DICH</text></g>' +
      // tree
      '<g class="' + ownedClass(owned, "tree") + '" data-item="tree"><rect x="434" y="350" width="14" height="44" fill="#6f4628"/>' +
      '<path d="M440 210l62 72h-124z" fill="#1f5d46"/><path d="M440 250l70 78H370z" fill="#2d7a5a"/><path d="M440 292l78 84H362z" fill="#3b916c"/>' +
      '<circle cx="410" cy="282" r="4" fill="#ffd56b"/><circle cx="466" cy="300" r="4" fill="#b23a32"/><circle cx="432" cy="340" r="4" fill="#ffd56b"/><circle cx="480" cy="354" r="4" fill="#7a5b8c"/><circle cx="392" cy="350" r="4" fill="#b23a32"/><path d="M440 198l7 12h-14z" fill="#ffe6a3"/></g>' +
      // nutcracker
      '<g class="' + ownedClass(owned, "nutcracker") + '" data-item="nutcracker"><rect x="742" y="330" width="30" height="54" rx="8" fill="#2f6b5a"/><circle cx="757" cy="318" r="15" fill="#f0c9a0"/><path d="M742 310h30l-3-18h-24z" fill="#b23a32"/><circle cx="752" cy="316" r="2" fill="#2f2a24"/><circle cx="762" cy="316" r="2" fill="#2f2a24"/><rect x="749" y="326" width="16" height="5" rx="2" fill="#fff"/><rect x="748" y="384" width="8" height="28" fill="#2f2a24"/><rect x="758" y="384" width="8" height="28" fill="#2f2a24"/></g>' +
      // snowman
      '<g class="' + ownedClass(owned, "snowman") + '" data-item="snowman"><circle cx="300" cy="376" r="27" fill="#f8fbff"/><circle cx="300" cy="338" r="20" fill="#f8fbff"/><circle cx="300" cy="312" r="13" fill="#f8fbff"/><circle cx="296" cy="309" r="2" fill="#2f2a24"/><circle cx="304" cy="309" r="2" fill="#2f2a24"/><path d="M300 313l10 5-10 4z" fill="#e58b3a"/><path d="M282 330c12 6 24 6 36 0" stroke="#b23a32" stroke-width="7" fill="none"/><path d="M289 338l-3 22M311 338l3 22" stroke="#3a2a1d" stroke-width="3"/></g>' +
      // carousel
      '<g class="' + ownedClass(owned, "carousel") + '" data-item="carousel"><rect x="642" y="330" width="86" height="12" rx="4" fill="#b23a32"/><path d="M648 330l-14-40h94l-14 40z" fill="#2f6b5a"/><path d="M660 290l-10-28h50l-10 28z" fill="#c26d4a"/><rect x="682" y="262" width="4" height="44" fill="#f5e3c2"/><circle cx="684" cy="258" r="6" fill="#ffd56b"/><rect x="650" y="342" width="70" height="8" rx="3" fill="#6f4628"/></g>' +
      // wreath
      '<g class="' + ownedClass(owned, "wreath") + '" data-item="wreath"><circle cx="672" cy="314" r="22" fill="none" stroke="#1f5d46" stroke-width="10"/><circle cx="672" cy="314" r="22" fill="none" stroke="#3b916c" stroke-width="4" stroke-dasharray="5 5"/><circle cx="656" cy="300" r="3" fill="#b23a32"/><circle cx="688" cy="306" r="3" fill="#b23a32"/><circle cx="662" cy="330" r="3" fill="#b23a32"/></g>' +
      // gifts
      '<g class="' + ownedClass(owned, "gifts") + '" data-item="gifts"><rect x="350" y="352" width="34" height="28" rx="3" fill="#b23a32"/><rect x="384" y="360" width="28" height="20" rx="3" fill="#2f6b5a"/><path d="M350 362h34M367 352v28M384 368h28M398 360v20" stroke="#ffe6a3" stroke-width="3"/></g>' +
      // reindeer
      '<g class="' + ownedClass(owned, "reindeer") + '" data-item="reindeer"><ellipse cx="90" cy="380" rx="32" ry="16" fill="#6f4628"/><circle cx="122" cy="364" r="12" fill="#6f4628"/><path d="M116 355l-8-14 12 6M128 355l9-14-13 6" fill="none" stroke="#6f4628" stroke-width="3"/><path d="M72 390v20M98 390v20" stroke="#4e321f" stroke-width="4"/></g>' +
      // starry night extra
      '<g class="' + ownedClass(owned, "starnight") + '" data-item="starnight"><g fill="#ffe6a3">' + [120,220,320,420,520,620,720,820].map(function (x, i) { return '<path d="M' + x + ' ' + (130 + (i % 3) * 18) + 'l3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z"/>'; }).join("") + '</g></g>' +
      charmWall +
      // level badge
      '<g class="cafe-base"><rect x="760" y="24" width="82" height="34" rx="8" fill="#2f2a24"/><text x="801" y="46" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="#ffe5b0">Lv ' + level + '</text></g>' +
      '</svg><div class="cafe-vignette"></div></div>'
    );
  }

  root.Cafe = { items: ITEMS, charms: CHARMS, scene: scene };
})(typeof self !== "undefined" ? self : this);
