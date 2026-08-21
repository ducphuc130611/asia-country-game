/* ============================================================
   ASIA COUNTRY GUESSING GAME
   VERSION 3.5
   ============================================================ */

"use strict";

/* ============================================================
   CONSTANTS
============================================================ */

const VERSION = 35;
const SAVE_KEY = "asiaCountryGuessingGame_v35";
const OLD_SAVE_KEYS = [
    "asiaCountryGuessingGame",
    "asia-country-game",
    "asiaCountryGame"
];

const OWNER_NAME = "OWNER";

const QUESTION_COUNT = 10;
const CLASSIC_TIME = 15;
const BOSS_TIME = 15;


/* ============================================================
   COUNTRY DATABASE
============================================================ */

const countries = [

/* =========================
   ASIA
========================= */

["Afghanistan","Kabul","Afghani","South Asia",42500000,652230,"Dari, Pashto","Asia"],
["Armenia","Yerevan","Dram","West Asia",2770000,29743,"Armenian","Asia"],
["Azerbaijan","Baku","Manat","West Asia",10300000,86600,"Azerbaijani","Asia"],
["Bahrain","Manama","Bahraini Dinar","West Asia",1500000,778,"Arabic","Asia"],
["Bangladesh","Dhaka","Taka","South Asia",174700000,148460,"Bengali","Asia"],
["Bhutan","Thimphu","Ngultrum","South Asia",790000,38394,"Dzongkha","Asia"],
["Brunei","Bandar Seri Begawan","Brunei Dollar","Southeast Asia",460000,5765,"Malay","Asia"],
["Cambodia","Phnom Penh","Riel","Southeast Asia",17500000,181035,"Khmer","Asia"],
["China","Beijing","Yuan","East Asia",1410000000,9596961,"Mandarin","Asia"],
["Cyprus","Nicosia","Euro","West Asia",1350000,9251,"Greek, Turkish","Asia"],
["Georgia","Tbilisi","Lari","West Asia",3700000,69700,"Georgian","Asia"],
["India","New Delhi","Rupee","South Asia",1430000000,3287263,"Hindi, English","Asia"],
["Indonesia","Jakarta","Rupiah","Southeast Asia",281000000,1904569,"Indonesian","Asia"],
["Iran","Tehran","Rial","West Asia",91000000,1648195,"Persian","Asia"],
["Iraq","Baghdad","Iraqi Dinar","West Asia",46000000,438317,"Arabic, Kurdish","Asia"],
["Israel","Jerusalem","Israeli New Shekel","West Asia",9800000,20770,"Hebrew, Arabic","Asia"],
["Japan","Tokyo","Yen","East Asia",123000000,377975,"Japanese","Asia"],
["Jordan","Amman","Jordanian Dinar","West Asia",11500000,89342,"Arabic","Asia"],
["Kazakhstan","Astana","Tenge","Central Asia",20000000,2724900,"Kazakh, Russian","Asia"],
["Kuwait","Kuwait City","Kuwaiti Dinar","West Asia",4300000,17818,"Arabic","Asia"],
["Kyrgyzstan","Bishkek","Som","Central Asia",7100000,199951,"Kyrgyz, Russian","Asia"],
["Laos","Vientiane","Kip","Southeast Asia",7800000,236800,"Lao","Asia"],
["Lebanon","Beirut","Lebanese Pound","West Asia",5800000,10452,"Arabic","Asia"],
["Malaysia","Kuala Lumpur","Ringgit","Southeast Asia",35000000,330803,"Malay","Asia"],
["Maldives","Male","Rufiyaa","South Asia",520000,298,"Dhivehi","Asia"],
["Mongolia","Ulaanbaatar","Tugrik","East Asia",3500000,1564110,"Mongolian","Asia"],
["Myanmar","Naypyidaw","Kyat","Southeast Asia",55000000,676578,"Burmese","Asia"],
["Nepal","Kathmandu","Nepalese Rupee","South Asia",30000000,147516,"Nepali","Asia"],
["North Korea","Pyongyang","North Korean Won","East Asia",26000000,120538,"Korean","Asia"],
["Oman","Muscat","Omani Rial","West Asia",4700000,309500,"Arabic","Asia"],
["Pakistan","Islamabad","Pakistani Rupee","South Asia",250000000,881913,"Urdu, English","Asia"],
["Palestine","Ramallah","Israeli New Shekel","West Asia",5500000,6020,"Arabic","Asia"],
["Philippines","Manila","Philippine Peso","Southeast Asia",117000000,300000,"Filipino, English","Asia"],
["Qatar","Doha","Qatari Riyal","West Asia",3100000,11586,"Arabic","Asia"],
["Russia","Moscow","Ruble","North Asia",144000000,17098242,"Russian","Asia"],
["Saudi Arabia","Riyadh","Saudi Riyal","West Asia",34000000,2149690,"Arabic","Asia"],
["Singapore","Singapore","Singapore Dollar","Southeast Asia",5900000,728,"English, Malay, Chinese, Tamil","Asia"],
["South Korea","Seoul","Won","East Asia",51000000,100210,"Korean","Asia"],
["Sri Lanka","Sri Jayawardenepura Kotte","Sri Lankan Rupee","South Asia",22000000,65610,"Sinhala, Tamil","Asia"],
["Syria","Damascus","Syrian Pound","West Asia",24000000,185180,"Arabic","Asia"],
["Taiwan","Taipei","New Taiwan Dollar","East Asia",23000000,36197,"Mandarin","Asia"],
["Tajikistan","Dushanbe","Somoni","Central Asia",10300000,143100,"Tajik","Asia"],
["Thailand","Bangkok","Baht","Southeast Asia",72000000,513120,"Thai","Asia"],
["Timor-Leste","Dili","US Dollar","Southeast Asia",1400000,14919,"Tetum, Portuguese","Asia"],
["Turkey","Ankara","Lira","West Asia",86000000,783562,"Turkish","Asia"],
["Turkmenistan","Ashgabat","Manat","Central Asia",7000000,488100,"Turkmen","Asia"],
["United Arab Emirates","Abu Dhabi","UAE Dirham","West Asia",10000000,83600,"Arabic","Asia"],
["Uzbekistan","Tashkent","Som","Central Asia",37000000,448978,"Uzbek","Asia"],
["Vietnam","Hanoi","Dong","Southeast Asia",101000000,331212,"Vietnamese","Asia"],
["Yemen","Sana'a","Yemeni Rial","West Asia",34000000,527968,"Arabic","Asia"],

/* =========================
   EUROPE
========================= */

["Albania","Tirana","Lek","Southeast Europe",2800000,28748,"Albanian","Europe"],
["Andorra","Andorra la Vella","Euro","Southern Europe",80000,468,"Catalan","Europe"],
["Austria","Vienna","Euro","Central Europe",9200000,83879,"German","Europe"],
["Belarus","Minsk","Belarusian Ruble","Eastern Europe",9100000,207600,"Belarusian, Russian","Europe"],
["Belgium","Brussels","Euro","Western Europe",11700000,30528,"Dutch, French, German","Europe"],
["Bosnia and Herzegovina","Sarajevo","Convertible Mark","Southeast Europe",3200000,51197,"Bosnian, Croatian, Serbian","Europe"],
["Bulgaria","Sofia","Lev","Eastern Europe",6400000,110994,"Bulgarian","Europe"],
["Croatia","Zagreb","Euro","Southeast Europe",3800000,56594,"Croatian","Europe"],
["Czechia","Prague","Czech Koruna","Central Europe",10900000,78867,"Czech","Europe"],
["Denmark","Copenhagen","Danish Krone","Northern Europe",6000000,43094,"Danish","Europe"],
["Estonia","Tallinn","Euro","Northern Europe",1400000,45227,"Estonian","Europe"],
["Finland","Helsinki","Euro","Northern Europe",5600000,338455,"Finnish, Swedish","Europe"],
["France","Paris","Euro","Western Europe",68000000,551695,"French","Europe"],
["Germany","Berlin","Euro","Central Europe",84000000,357022,"German","Europe"],
["Greece","Athens","Euro","Southern Europe",10300000,131957,"Greek","Europe"],
["Hungary","Budapest","Forint","Central Europe",9600000,93028,"Hungarian","Europe"],
["Iceland","Reykjavik","Icelandic Krona","Northern Europe",400000,103000,"Icelandic","Europe"],
["Ireland","Dublin","Euro","Western Europe",5300000,70273,"Irish, English","Europe"],
["Italy","Rome","Euro","Southern Europe",59000000,301340,"Italian","Europe"],
["Latvia","Riga","Euro","Northern Europe",1800000,64589,"Latvian","Europe"],
["Liechtenstein","Vaduz","Swiss Franc","Central Europe",40000,160,"German","Europe"],
["Lithuania","Vilnius","Euro","Northern Europe",2900000,65300,"Lithuanian","Europe"],
["Luxembourg","Luxembourg","Euro","Western Europe",680000,2586,"Luxembourgish, French, German","Europe"],
["Malta","Valletta","Euro","Southern Europe",560000,316,"Maltese, English","Europe"],
["Moldova","Chisinau","Moldovan Leu","Eastern Europe",2500000,33846,"Romanian","Europe"],
["Monaco","Monaco","Euro","Western Europe",39000,2,"French","Europe"],
["Montenegro","Podgorica","Euro","Southeast Europe",620000,13812,"Montenegrin","Europe"],
["Netherlands","Amsterdam","Euro","Western Europe",18000000,41850,"Dutch","Europe"],
["North Macedonia","Skopje","Denar","Southeast Europe",1800000,25713,"Macedonian","Europe"],
["Norway","Oslo","Norwegian Krone","Northern Europe",5600000,385207,"Norwegian","Europe"],
["Poland","Warsaw","Zloty","Central Europe",38000000,312696,"Polish","Europe"],
["Portugal","Lisbon","Euro","Southern Europe",10600000,92212,"Portuguese","Europe"],
["Romania","Bucharest","Romanian Leu","Eastern Europe",19000000,238397,"Romanian","Europe"],
["San Marino","San Marino","Euro","Southern Europe",34000,61,"Italian","Europe"],
["Serbia","Belgrade","Serbian Dinar","Southeast Europe",6600000,77474,"Serbian","Europe"],
["Slovakia","Bratislava","Euro","Central Europe",5400000,49035,"Slovak","Europe"],
["Slovenia","Ljubljana","Euro","Central Europe",2100000,20273,"Slovenian","Europe"],
["Spain","Madrid","Euro","Southern Europe",49000000,505370,"Spanish","Europe"],
["Sweden","Stockholm","Swedish Krona","Northern Europe",10600000,450295,"Swedish","Europe"],
["Switzerland","Bern","Swiss Franc","Central Europe",9000000,41285,"German, French, Italian, Romansh","Europe"],
["Ukraine","Kyiv","Hryvnia","Eastern Europe",37000000,603500,"Ukrainian","Europe"],
["United Kingdom","London","Pound Sterling","Western Europe",69000000,243610,"English","Europe"],
["Vatican City","Vatican City","Euro","Southern Europe",800,0.49,"Italian, Latin","Europe"],

/* =========================
   AFRICA
========================= */

["Algeria","Algiers","Algerian Dinar","North Africa",47000000,2381741,"Arabic, Berber","Africa"],
["Angola","Luanda","Kwanza","Central Africa",38000000,1246700,"Portuguese","Africa"],
["Benin","Porto-Novo","West African CFA Franc","West Africa",14500000,114763,"French","Africa"],
["Botswana","Gaborone","Pula","Southern Africa",2500000,581730,"English, Tswana","Africa"],
["Burkina Faso","Ouagadougou","West African CFA Franc","West Africa",24000000,274200,"French","Africa"],
["Burundi","Gitega","Burundian Franc","East Africa",14000000,27834,"Kirundi, French, English","Africa"],
["Cabo Verde","Praia","Cape Verdean Escudo","West Africa",520000,4033,"Portuguese","Africa"],
["Cameroon","Yaounde","Central African CFA Franc","Central Africa",29000000,475442,"French, English","Africa"],
["Central African Republic","Bangui","Central African CFA Franc","Central Africa",5700000,622984,"French, Sango","Africa"],
["Chad","N'Djamena","Central African CFA Franc","Central Africa",19000000,1284000,"French, Arabic","Africa"],
["Comoros","Moroni","Comorian Franc","East Africa",870000,1862,"Comorian, Arabic, French","Africa"],
["Democratic Republic of the Congo","Kinshasa","Congolese Franc","Central Africa",110000000,2344858,"French","Africa"],
["Republic of the Congo","Brazzaville","Central African CFA Franc","Central Africa",6200000,342000,"French","Africa"],
["Djibouti","Djibouti","Djiboutian Franc","East Africa",1100000,23200,"French, Arabic","Africa"],
["Egypt","Cairo","Egyptian Pound","North Africa",114000000,1002450,"Arabic","Africa"],
["Equatorial Guinea","Malabo","Central African CFA Franc","Central Africa",1800000,28051,"Spanish, French","Africa"],
["Eritrea","Asmara","Nakfa","East Africa",3600000,117600,"Tigrinya, Arabic, English","Africa"],
["Eswatini","Mbabane","Lilangeni","Southern Africa",1200000,17364,"Swazi, English","Africa"],
["Ethiopia","Addis Ababa","Birr","East Africa",130000000,1104300,"Amharic","Africa"],
["Gabon","Libreville","Central African CFA Franc","Central Africa",2400000,267668,"French","Africa"],
["Gambia","Banjul","Dalasi","West Africa",2800000,11295,"English","Africa"],
["Ghana","Accra","Cedi","West Africa",35000000,238533,"English","Africa"],
["Guinea","Conakry","Guinean Franc","West Africa",15000000,245857,"French","Africa"],
["Guinea-Bissau","Bissau","West African CFA Franc","West Africa",2200000,36125,"Portuguese","Africa"],
["Ivory Coast","Yamoussoukro","West African CFA Franc","West Africa",32000000,322463,"French","Africa"],
["Kenya","Nairobi","Kenyan Shilling","East Africa",56000000,580367,"English, Swahili","Africa"],
["Lesotho","Maseru","Loti","Southern Africa",2300000,30355,"Sesotho, English","Africa"],
["Liberia","Monrovia","Liberian Dollar","West Africa",5500000,111369,"English","Africa"],
["Libya","Tripoli","Libyan Dinar","North Africa",7400000,1759540,"Arabic","Africa"],
["Madagascar","Antananarivo","Ariary","East Africa",32000000,587041,"Malagasy, French","Africa"],
["Malawi","Lilongwe","Kwacha","East Africa",21000000,118484,"English, Chichewa","Africa"],
["Mali","Bamako","West African CFA Franc","West Africa",24000000,1240192,"French","Africa"],
["Mauritania","Nouakchott","Ouguiya","West Africa",5000000,1030700,"Arabic","Africa"],
["Mauritius","Port Louis","Mauritian Rupee","East Africa",1300000,2040,"English, French, Mauritian Creole","Africa"],
["Morocco","Rabat","Moroccan Dirham","North Africa",38000000,446550,"Arabic, Berber","Africa"],
["Mozambique","Maputo","Metical","East Africa",35000000,801590,"Portuguese","Africa"],
["Namibia","Windhoek","Namibian Dollar","Southern Africa",3100000,825615,"English","Africa"],
["Niger","Niamey","West African CFA Franc","West Africa",28000000,1267000,"French","Africa"],
["Nigeria","Abuja","Naira","West Africa",230000000,923768,"English","Africa"],
["Rwanda","Kigali","Rwandan Franc","East Africa",14000000,26338,"Kinyarwanda, English, French","Africa"],
["Sao Tome and Principe","Sao Tome","Dobra","Central Africa",240000,964,"Portuguese","Africa"],
["Senegal","Dakar","West African CFA Franc","West Africa",19000000,196722,"French","Africa"],
["Seychelles","Victoria","Seychellois Rupee","East Africa",120000,459,"Seychellois Creole, English, French","Africa"],
["Sierra Leone","Freetown","Leone","West Africa",8500000,71740,"English","Africa"],
["Somalia","Mogadishu","Somali Shilling","East Africa",19000000,637657,"Somali, Arabic","Africa"],
["South Africa","Pretoria","Rand","Southern Africa",63000000,1221037,"Zulu, Xhosa, Afrikaans, English","Africa"],
["South Sudan","Juba","South Sudanese Pound","East Africa",12000000,619745,"English","Africa"],
["Sudan","Khartoum","Sudanese Pound","North Africa",51000000,1861484,"Arabic, English","Africa"],
["Tanzania","Dodoma","Tanzanian Shilling","East Africa",70000000,945087,"Swahili, English","Africa"],
["Togo","Lome","West African CFA Franc","West Africa",9300000,56785,"French","Africa"],
["Tunisia","Tunis","Tunisian Dinar","North Africa",12000000,163610,"Arabic","Africa"],
["Uganda","Kampala","Ugandan Shilling","East Africa",51000000,241038,"English, Swahili","Africa"],
["Zambia","Lusaka","Zambian Kwacha","Southern Africa",21000000,752618,"English","Africa"],
["Zimbabwe","Harare","Zimbabwean Dollar","Southern Africa",17000000,390757,"English, Shona, Ndebele","Africa"]

];


/* ============================================================
   NORMALIZE COUNTRIES
============================================================ */

const countryDB = countries.map((c, index) => ({
    id: index + 1,
    name: c[0],
    capital: c[1],
    currency: c[2],
    region: c[3],
    population: c[4],
    area: c[5],
    languages: c[6],
    continent: c[7]
}));


/* ============================================================
   ITEMS
============================================================ */

const ITEM_DEFS = {

    hint: {
        name: "Hint",
        icon: "💡",
        price: 250,
        desc: "Remove two wrong answers."
    },

    megaHint: {
        name: "Mega Hint",
        icon: "🧠",
        price: 800,
        desc: "Reveal the correct answer."
    },

    luckyAnswer: {
        name: "Lucky Answer",
        icon: "🍀",
        price: 1200,
        desc: "Automatically choose a likely answer."
    },

    doubleXP: {
        name: "Double XP",
        icon: "✨",
        price: 1500,
        desc: "Double XP from the next correct answer."
    },

    scoreBoost: {
        name: "Score Boost",
        icon: "⭐",
        price: 1600,
        desc: "Double score from the next correct answer."
    },

    secondChance: {
        name: "Second Chance",
        icon: "🔄",
        price: 1800,
        desc: "Recover after one wrong answer."
    },

    extraLives: {
        name: "Extra Lives",
        icon: "❤️",
        price: 2000,
        desc: "+1 Life."
    },

    answerShield: {
        name: "Answer Shield",
        icon: "🛡️",
        price: 2400,
        desc: "Protect against one wrong answer."
    },

    timeFreeze: {
        name: "Time Freeze",
        icon: "❄️",
        price: 2800,
        desc: "Freeze the timer for 5 seconds."
    },

    phoenixSave: {
        name: "Phoenix Save",
        icon: "🔥",
        price: 3500,
        desc: "Revive after losing all lives."
    },

    coinMagnet: {
        name: "Coin Magnet",
        icon: "🪙",
        price: 4000,
        desc: "+50% Coins for one answer."
    }

};


/* ============================================================
   SKINS
============================================================ */

const SKINS = {

    default: {
        name: "Default Explorer",
        icon: "🌏",
        price: 0,
        coin: 0,
        xp: 0,
        drop: 0,
        time: 0,
        hp: 0
    },

    bronze: {
        name: "Bronze Explorer",
        icon: "🥉",
        price: 5000,
        coin: 10,
        xp: 5,
        drop: 2,
        time: 0,
        hp: 0
    },

    silver: {
        name: "Silver Explorer",
        icon: "🥈",
        price: 12000,
        coin: 20,
        xp: 15,
        drop: 5,
        time: 0,
        hp: 0
    },

    gold: {
        name: "Golden Explorer",
        icon: "🥇",
        price: 30000,
        coin: 40,
        xp: 30,
        drop: 10,
        time: 1,
        hp: 0
    },

    diamond: {
        name: "Diamond Explorer",
        icon: "💎",
        price: 75000,
        coin: 75,
        xp: 60,
        drop: 20,
        time: 2,
        hp: 0
    },

    cosmic: {
        name: "Cosmic Explorer",
        icon: "🌌",
        price: 200000,
        coin: 150,
        xp: 120,
        drop: 35,
        time: 3,
        hp: 500
    },

    transcendent: {
        name: "Transcendent Explorer",
        icon: "✨",
        price: 1000000,
        coin: 300,
        xp: 300,
        drop: 60,
        time: 5,
        hp: 1500
    },

    owner: {
        name: "👑 OWNER",
        icon: "👑",
        price: 0,
        coin: 1000000,
        xp: 1000000,
        drop: 1000,
        time: 999,
        hp: 9999,
        owner: true
    }

};


/* ============================================================
   CHESTS
============================================================ */

const CHESTS = {

    common: {
        name: "Common Chest",
        icon: "📦",
        price: 1500,
        rarity: "Common",
        weight: 60
    },

    rare: {
        name: "Rare Chest",
        icon: "💙",
        price: 5000,
        rarity: "Rare",
        weight: 25
    },

    epic: {
        name: "Epic Chest",
        icon: "💜",
        price: 15000,
        rarity: "Epic",
        weight: 10
    },

    legend: {
        name: "Legendary Chest",
        icon: "🧡",
        price: 40000,
        rarity: "Legendary",
        weight: 4
    },

    mythic: {
        name: "Mythic Chest",
        icon: "❤️",
        price: 100000,
        rarity: "Mythic",
        weight: 1
    },

    divine: {
        name: "Divine Chest",
        icon: "🌟",
        price: 300000,
        rarity: "Divine",
        weight: .2
    },

    transcendent: {
        name: "Transcendent Chest",
        icon: "🌌",
        price: 2500000,
        rarity: "Transcendent",
        weight: .03
    }

};


/* ============================================================
   ACHIEVEMENTS
============================================================ */

const ACHIEVEMENTS = [

    ["first", "🌱 First Steps", "Answer your first question.", p => p.stats.questions >= 1],
    ["ten", "📚 Getting Started", "Answer 10 questions.", p => p.stats.questions >= 10],
    ["hundred", "🧠 Knowledge Seeker", "Answer 100 questions.", p => p.stats.questions >= 100],
    ["correct50", "🎯 Sharpshooter", "Get 50 correct answers.", p => p.stats.correct >= 50],
    ["correct500", "🏹 Master", "Get 500 correct answers.", p => p.stats.correct >= 500],
    ["combo10", "🔥 Combo Starter", "Reach combo 10.", p => p.stats.bestCombo >= 10],
    ["combo50", "🔥 Combo Master", "Reach combo 50.", p => p.stats.bestCombo >= 50],
    ["coins10k", "🪙 Collector", "Own 10,000 coins.", p => p.coins >= 10000],
    ["coins1m", "💰 Millionaire", "Own 1,000,000 coins.", p => p.coins >= 1000000],
    ["boss1", "👹 Boss Hunter", "Defeat a Boss.", p => p.stats.bosses >= 1],
    ["boss10", "⚔️ Boss Slayer", "Defeat 10 Bosses.", p => p.stats.bosses >= 10],
    ["chest", "🎁 Treasure", "Open your first Chest.", p => p.stats.chests >= 1],
    ["rare", "💙 Rare Find", "Obtain a Rare+ reward.", p => p.stats.rareDrops >= 1],
    ["legend", "🧡 Legendary", "Obtain a Legendary reward.", p => p.stats.legendaryDrops >= 1],
    ["divine", "🌟 Divine", "Obtain a Divine reward.", p => p.stats.divineDrops >= 1],
    ["transcendent", "🌌 Beyond", "Obtain a Transcendent reward.", p => p.stats.transcendentDrops >= 1],
    ["asia", "🌏 Asian Explorer", "Answer an Asia question.", p => p.stats.continents.Asia >= 1],
    ["europe", "🇪🇺 European Explorer", "Answer a Europe question.", p => p.stats.continents.Europe >= 1],
    ["africa", "🌍 African Explorer", "Answer an Africa question.", p => p.stats.continents.Africa >= 1],
    ["extreme", "🔥 Extreme", "Complete an Extreme round.", p => p.stats.extreme >= 1],
    ["nightmare", "☠️ Nightmare", "Complete a Nightmare round.", p => p.stats.nightmare >= 1],
    ["daily7", "🎯 Dedicated", "Complete 7 Daily Challenges.", p => p.stats.daily >= 7],
    ["level25", "🏆 Rising Star", "Reach Level 25.", p => getLevel(p.xp) >= 25],
    ["level50", "👑 Elite", "Reach Level 50.", p => getLevel(p.xp) >= 50],
    ["level100", "💎 Legend", "Reach Level 100.", p => getLevel(p.xp) >= 100]

];


/* ============================================================
   PROFILE
============================================================ */

function defaultProfile(name) {

    return {

        name: name,

        xp: 0,

        coins: 1000,

        selectedSkin: "default",

        ownedSkins: ["default"],

        items: {
            hint: 2,
            megaHint: 1,
            luckyAnswer: 1,
            doubleXP: 1,
            scoreBoost: 1,
            secondChance: 1,
            extraLives: 1,
            answerShield: 0,
            timeFreeze: 1,
            phoenixSave: 0,
            coinMagnet: 0
        },

        chests: {
            common: 0,
            rare: 0,
            epic: 0,
            legend: 0,
            mythic: 0,
            divine: 0,
            transcendent: 0
        },

        achievements: {},

        stats: {
            questions: 0,
            correct: 0,
            wrong: 0,
            bestCombo: 0,
            bosses: 0,
            chests: 0,
            rareDrops: 0,
            legendaryDrops: 0,
            divineDrops: 0,
            transcendentDrops: 0,
            extreme: 0,
            nightmare: 0,
            daily: 0,
            continents: {
                Asia: 0,
                Europe: 0,
                Africa: 0
            }
        },

        daily: {
            date: "",
            completed: false
        },

        created: Date.now()

    };

}


let profiles = [];
let currentProfileIndex = -1;


/* ============================================================
   GAME STATE
============================================================ */

let game = {

    difficulty: 1,

    mode: "classic",

    questions: [],

    current: 0,

    score: 0,

    xp: 0,

    coins: 0,

    lives: 3,

    combo: 0,

    timer: CLASSIC_TIME,

    timerId: null,

    timerFrozen: false,

    timerFreezeId: null,

    answered: false,

    secondChanceUsed: false,

    shieldActive: false,

    phoenixUsed: false,

    doubleXPActive: false,

    scoreBoostActive: false,

    coinMagnetActive: false,

    infiniteLives: false,

    infiniteCombo: false,

    godMode: false,

    allKnowledge: false,

    blessing: false,

    timeFreezeUltra: false,

    boss: null

};


/* ============================================================
   AUDIO ENGINE
============================================================ */

const audio = {

    ctx: null,

    ensure() {

        if (!this.ctx) {

            const AC =
                window.AudioContext ||
                window.webkitAudioContext;

            if (AC) {
                this.ctx = new AC();
            }

        }

        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }

    },

    tone(freq, duration, type = "sine", volume = .04) {

        this.ensure();

        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(
            volume,
            this.ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            this.ctx.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(
            this.ctx.currentTime + duration
        );

    },

    click() {
        this.tone(650,.06,"square",.025);
    },

    hover() {
        this.tone(900,.035,"sine",.012);
    },

    open() {
        this.tone(500,.08,"sine",.03);
        setTimeout(() => this.tone(750,.12,"sine",.03),70);
    },

    close() {
        this.tone(750,.08,"sine",.025);
        setTimeout(() => this.tone(500,.1,"sine",.025),70);
    },

    correct() {
        this.tone(650,.08,"sine",.04);
        setTimeout(() => this.tone(900,.12,"sine",.04),80);
    },

    wrong() {
        this.tone(180,.18,"sawtooth",.035);
    },

    warning() {
        this.tone(700,.08,"square",.025);
    },

    freeze() {
        this.tone(300,.12,"sine",.035);
        setTimeout(() => this.tone(800,.18,"sine",.04),120);
    },

    combo() {
        this.tone(700,.06,"triangle",.035);
        setTimeout(() => this.tone(1000,.08,"triangle",.035),70);
    },

    xp() {
        this.tone(800,.08,"sine",.025);
    },

    coin() {
        this.tone(1100,.06,"sine",.025);
        setTimeout(() => this.tone(1400,.08,"sine",.025),60);
    },

    chest() {
        this.tone(400,.1,"sine",.04);
        setTimeout(() => this.tone(600,.1,"sine",.04),100);
        setTimeout(() => this.tone(900,.2,"sine",.04),200);
    },

    rarity(rarity) {

        const map = {

            Rare: [700,900],

            Epic: [600,800,1100],

            Legendary: [500,700,900,1300],

            Divine: [400,700,1000,1400,1800],

            Transcendent: [300,600,900,1300,1800,2300]

        };

        const notes = map[rarity];

        if (!notes) return;

        notes.forEach((n,i) => {

            setTimeout(
                () => this.tone(n,.12,"sine",.04),
                i * 90
            );

        });

    },

    bossAppear() {
        this.tone(90,.3,"sawtooth",.06);
        setTimeout(() => this.tone(130,.3,"sawtooth",.06),250);
    },

    damage() {
        this.tone(180,.08,"square",.04);
    },

    bossDefeated() {
        [300,500,700,1000,1400].forEach((n,i) => {
            setTimeout(
                () => this.tone(n,.16,"triangle",.05),
                i * 100
            );
        });
    },

    achievement() {
        [600,800,1000,1300].forEach((n,i) => {
            setTimeout(
                () => this.tone(n,.12,"sine",.04),
                i * 100
            );
        });
    }

};


/* ============================================================
   SAVE / MIGRATION
============================================================ */

function saveGame() {

    const data = {

        version: VERSION,

        profiles: profiles,

        currentProfileIndex: currentProfileIndex

    };

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(data)
    );

}


function loadGame() {

    let raw =
        localStorage.getItem(SAVE_KEY);

    if (!raw) {

        for (const key of OLD_SAVE_KEYS) {

            const old =
                localStorage.getItem(key);

            if (old) {
                raw = old;
                break;
            }

        }

    }

    if (!raw) {

        profiles = [
            defaultProfile("Player")
        ];

        currentProfileIndex = 0;

        saveGame();

        return;

    }

    try {

        const data = JSON.parse(raw);

        profiles =
            Array.isArray(data.profiles)
                ? data.profiles
                : [];

        currentProfileIndex =
            Number.isInteger(data.currentProfileIndex)
                ? data.currentProfileIndex
                : 0;

        profiles.forEach(migrateProfile);

        if (!profiles.length) {

            profiles.push(
                defaultProfile("Player")
            );

            currentProfileIndex = 0;

        }

        if (
            currentProfileIndex < 0 ||
            currentProfileIndex >= profiles.length
        ) {
            currentProfileIndex = 0;
        }

        saveGame();

    } catch (e) {

        console.error(e);

        profiles = [
            defaultProfile("Player")
        ];

        currentProfileIndex = 0;

        saveGame();

    }

}


function migrateProfile(p) {

    const d = defaultProfile(
        p.name || "Player"
    );

    for (const key in d) {

        if (p[key] === undefined) {

            p[key] =
                JSON.parse(
                    JSON.stringify(d[key])
                );

        }

    }

    for (const key in d.items) {

        if (p.items[key] === undefined) {
            p.items[key] = d.items[key];
        }

    }

    for (const key in d.chests) {

        if (p.chests[key] === undefined) {
            p.chests[key] = 0;
        }

    }

    for (const key in d.stats) {

        if (p.stats[key] === undefined) {

            p.stats[key] =
                JSON.parse(
                    JSON.stringify(d.stats[key])
                );

        }

    }

    if (!p.stats.continents) {

        p.stats.continents =
            JSON.parse(
                JSON.stringify(
                    d.stats.continents
                )
            );

    }

    if (!Array.isArray(p.ownedSkins)) {
        p.ownedSkins = ["default"];
    }

    if (!p.ownedSkins.includes("default")) {
        p.ownedSkins.push("default");
    }

}


/* ============================================================
   PROFILE HELPERS
============================================================ */

function getProfile() {

    if (
        currentProfileIndex < 0 ||
        !profiles[currentProfileIndex]
    ) {
        return null;
    }

    return profiles[currentProfileIndex];

}


function getLevel(xp) {

    return Math.max(
        1,
        Math.floor(
            Math.sqrt(Math.max(0,xp) / 100)
        ) + 1
    );

}


function getLevelXP(level) {

    return Math.pow(
        Math.max(0,level - 1),
        2
    ) * 100;

}


function getNextLevelXP(level) {

    return Math.pow(
        level,
        2
    ) * 100;

}


function getXPPercent(xp) {

    const level = getLevel(xp);

    const current =
        xp - getLevelXP(level);

    const required =
        getNextLevelXP(level) -
        getLevelXP(level);

    return Math.max(
        0,
        Math.min(
            100,
            Math.floor(
                current / required * 100
            )
        )
    );

}


function getRank(level) {

    if (level >= 200) return "🌌 Transcendent";
    if (level >= 150) return "👑 Divine";
    if (level >= 120) return "🔥 Mythic";
    if (level >= 100) return "💎 Legend";
    if (level >= 80) return "🟣 Grandmaster";
    if (level >= 60) return "🔵 Master";
    if (level >= 50) return "🟢 Diamond";
    if (level >= 40) return "🥇 Platinum";
    if (level >= 30) return "🥈 Gold";
    if (level >= 20) return "🥉 Silver";

    return "Beginner";

}


/* ============================================================
   UI
============================================================ */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(s =>
            s.classList.remove("active")
        );

    const screen =
        document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function goHome() {

    stopTimer();

    showScreen("homeScreen");

    updateAllUI();

    audio.close();

}


function toast(message) {

    const el =
        document.getElementById("toast");

    el.textContent = message;

    el.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer =
        setTimeout(
            () => el.classList.remove("show"),
            2500
        );

}


/* ============================================================
   PROFILE UI
============================================================ */

function updateAllUI() {

    const p = getProfile();

    if (!p) return;

    const level = getLevel(p.xp);
    const percent = getXPPercent(p.xp);

    const ids = {

        topName: p.name,
        topLevel: level,
        topCoins: formatNumber(p.coins),

        homeName: p.name,
        homeLevel: level,
        homeCoins: formatNumber(p.coins),

        gameLevel: level,
        gameCoins: formatNumber(p.coins),

        shopCoins: formatNumber(p.coins)

    };

    for (const id in ids) {

        const el =
            document.getElementById(id);

        if (el) {
            el.textContent = ids[id];
        }

    }

    const rank =
        document.getElementById("homeRank");

    if (rank) {
        rank.textContent =
            getRank(level);
    }

    const xpFill =
        document.getElementById("homeXPFill");

    if (xpFill) {
        xpFill.style.width =
            percent + "%";
    }

    const xpText =
        document.getElementById("homeXPText");

    if (xpText) {
        xpText.textContent =
            percent + "%";
    }

    const mini =
        document.getElementById("topXPBar");

    if (mini) {
        mini.style.width =
            percent + "%";
    }

    updateMainProfile();

}


function updateMainProfile() {

    const p = getProfile();

    if (!p) return;

    const el =
        document.getElementById(
            "mainProfileInfo"
        );

    if (!el) return;

    const level =
        getLevel(p.xp);

    el.innerHTML = `

        <div class="profile-summary">

            <div>
                👤
                <span>Name</span>
                <strong>${escapeHTML(p.name)}</strong>
            </div>

            <div>
                🏆
                <span>Level</span>
                <strong>${level}</strong>
            </div>

            <div>
                👑
                <span>Rank</span>
                <strong>${getRank(level)}</strong>
            </div>

            <div>
                🪙
                <span>Coins</span>
                <strong>${formatNumber(p.coins)}</strong>
            </div>

            <div>
                ⭐
                <span>XP</span>
                <strong>${formatNumber(p.xp)}</strong>
            </div>

            <div>
                🎯
                <span>Correct</span>
                <strong>${p.stats.correct}</strong>
            </div>

        </div>

    `;

}


function openProfileMenu() {

    audio.open();

    renderProfiles();

    showScreen("profileScreen");

}


function renderProfiles() {

    const el =
        document.getElementById(
            "profileList"
        );

    el.innerHTML = "";

    profiles.forEach((p,i) => {

        const div =
            document.createElement("div");

        div.className =
            "profile-item" +
            (
                i === currentProfileIndex
                    ? " selected"
                    : ""
            );

        div.innerHTML = `

            <div>
                👤 <strong>${escapeHTML(p.name)}</strong>
                <br>
                Lv.${getLevel(p.xp)}
                • ${formatNumber(p.coins)} 🪙
            </div>

            <div class="profile-actions">

                <button onclick="selectProfile(${i})">
                    ${i === currentProfileIndex ? "✓ Selected" : "Select"}
                </button>

                <button onclick="viewProfile(${i})">
                    View
                </button>

            </div>

        `;

        el.appendChild(div);

    });

}


function selectProfile(i) {

    if (!profiles[i]) return;

    currentProfileIndex = i;

    saveGame();

    updateAllUI();

    renderProfiles();

    toast(
        "👤 Profile switched to " +
        profiles[i].name
    );

}


function createProfileFromInput() {

    const input =
        document.getElementById(
            "profileNameInput"
        );

    const name =
        input.value.trim();

    if (!name) {

        toast("Enter a profile name.");

        return;

    }

    if (
        profiles.some(
            p =>
                p.name.toLowerCase() ===
                name.toLowerCase()
        )
    ) {

        toast("Profile already exists.");

        return;

    }

    profiles.push(
        defaultProfile(name)
    );

    currentProfileIndex =
        profiles.length - 1;

    input.value = "";

    saveGame();

    renderProfiles();

    updateAllUI();

    toast("👤 Profile created.");

}


function deleteProfile() {

    if (profiles.length <= 1) {

        toast("You must keep at least one profile.");

        return;

    }

    if (
        !confirm(
            "Delete the selected profile?"
        )
    ) return;

    profiles.splice(
        currentProfileIndex,
        1
    );

    currentProfileIndex =
        Math.max(
            0,
            currentProfileIndex - 1
        );

    saveGame();

    renderProfiles();

    updateAllUI();

    toast("Profile deleted.");

}


function viewProfile(i) {

    const p = profiles[i];

    if (!p) return;

    const level =
        getLevel(p.xp);

    const el =
        document.getElementById(
            "profileDetails"
        );

    el.innerHTML = `

        <div class="profile-summary">

            <div>
                👤 Name
                <strong>${escapeHTML(p.name)}</strong>
            </div>

            <div>
                🏆 Level
                <strong>${level}</strong>
            </div>

            <div>
                👑 Rank
                <strong>${getRank(level)}</strong>
            </div>

            <div>
                ⭐ XP
                <strong>${formatNumber(p.xp)}</strong>
            </div>

            <div>
                🪙 Coins
                <strong>${formatNumber(p.coins)}</strong>
            </div>

            <div>
                🎯 Correct
                <strong>${p.stats.correct}</strong>
            </div>

            <div>
                ❓ Questions
                <strong>${p.stats.questions}</strong>
            </div>

            <div>
                🔥 Best Combo
                <strong>${p.stats.bestCombo}</strong>
            </div>

            <div>
                👹 Bosses
                <strong>${p.stats.bosses}</strong>
            </div>

            <div>
                🎁 Chests
                <strong>${p.stats.chests}</strong>
            </div>

            <div>
                🎨 Skin
                <strong>${SKINS[p.selectedSkin]?.name || "Default"}</strong>
            </div>

        </div>

    `;

    showScreen("profileViewScreen");

}


/* ============================================================
   START GAME
============================================================ */

function openStartGame() {

    audio.open();

    showScreen(
        "startGameScreen"
    );

}


function openDifficulty(difficulty) {

    game.mode = "classic";
    game.difficulty = difficulty;

    const names = {

        1: "🎯 Classic — Easy",
        2: "🎯 Classic — Normal",
        3: "🎯 Classic — Hard",
        4: "🔥 Classic — Extreme",
        5: "☠️ Classic — Nightmare"

    };

    document.getElementById(
        "difficultyTitle"
    ).textContent =
        names[difficulty];

    showScreen(
        "difficultyScreen"
    );

}


/* ============================================================
   QUESTION SYSTEM
============================================================ */

function randomCountry() {

    return countryDB[
        Math.floor(
            Math.random() *
            countryDB.length
        )
    ];

}


function shuffle(array) {

    const a = [...array];

    for (
        let i = a.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [a[i],a[j]] =
            [a[j],a[i]];

    }

    return a;

}


function uniqueValues(field) {

    return [
        ...new Set(
            countryDB.map(
                c => c[field]
            )
        )
    ];

}


/*
    Important:
    Currency and Region questions use a country clue.
    This prevents "Won", "Rupee", "Southeast Asia"
    from having multiple correct answers.
*/

function createQuestion(difficulty) {

    const country =
        randomCountry();

    let types;

    if (difficulty === 1) {

        types = ["capital"];

    } else if (difficulty === 2) {

        types = [
            "capital",
            "country"
        ];

    } else if (difficulty === 3) {

        types = [
            "capital",
            "country",
            "currencyUnique",
            "regionUnique"
        ];

    } else if (difficulty === 4) {

        types = [
            "capital",
            "country",
            "currencyUnique",
            "regionUnique",
            "population",
            "area"
        ];

    } else {

        types = [
            "capital",
            "country",
            "currencyUnique",
            "regionUnique",
            "population",
            "area",
            "language",
            "continent"
        ];

    }

    const type =
        types[
            Math.floor(
                Math.random() *
                types.length
            )
        ];

    let value;
    let correct;

    switch(type) {

        case "capital":

            value =
                `Which country has the capital "${country.capital}"?`;

            correct =
                country.name;

            break;


        case "country":

            value =
                `What is the capital of ${country.name}?`;

            correct =
                country.capital;

            break;


        case "currencyUnique":

            value =
                `Which country uses ${country.currency}?`;

            correct =
                country.name;

            break;


        case "regionUnique":

            value =
                `Which country is located in ${country.region}?`;

            correct =
                country.name;

            break;


        case "population":

            value =
                `Which country has approximately ${formatPopulation(country.population)} people?`;

            correct =
                country.name;

            break;


        case "area":

            value =
                `Which country has an area of approximately ${formatNumber(country.area)} km²?`;

            correct =
                country.name;

            break;


        case "language":

            value =
                `Which country uses ${country.languages} as an official/common language?`;

            correct =
                country.name;

            break;


        case "continent":

            value =
                `Which continent does ${country.name} belong to?`;

            correct =
                country.continent;

            break;

    }

    let pool;

    if (
        type === "country" ||
        type === "capital"
    ) {

        pool =
            countryDB
                .filter(
                    c =>
                        c.name !== country.name &&
                        c.capital !== correct
                )
                .map(
                    c =>
                        type === "country"
                            ? c.capital
                            : c.name
                );

    } else if (type === "continent") {

        pool = [
            "Asia",
            "Europe",
            "Africa"
        ].filter(
            x => x !== correct
        );

    } else {

        /*
            For potentially duplicated fields,
            answer choices are ALWAYS country names.
            The clue itself identifies the target country.
        */

        pool =
            countryDB
                .filter(
                    c =>
                        c.name !== country.name
                )
                .map(
                    c => c.name
                );

    }

    const wrong =
        shuffle(
            pool.filter(
                x => x !== correct
            )
        ).slice(0,3);

    const answers =
        shuffle([
            correct,
            ...wrong
        ]);

    return {

        country,
        type,
        value,
        correct,
        answers

    };

}


function createRound(difficulty) {

    const result = [];

    const used = new Set();

    while (
        result.length <
        QUESTION_COUNT
    ) {

        const q =
            createQuestion(
                difficulty
            );

        const key =
            q.country.name +
            "|" +
            q.type;

        if (!used.has(key)) {

            used.add(key);

            result.push(q);

        }

    }

    return result;

}


/* ============================================================
   START CLASSIC
============================================================ */

function startGame(difficulty) {

    const p = getProfile();

    if (!p) return;

    audio.click();

    stopTimer();

    game = {

        difficulty,

        mode: "classic",

        questions:
            createRound(difficulty),

        current: 0,

        score: 0,

        xp: 0,

        coins: 0,

        lives: 3,

        combo: 0,

        timer: CLASSIC_TIME,

        timerId: null,

        timerFrozen: false,

        timerFreezeId: null,

        answered: false,

        secondChanceUsed: false,

        shieldActive: false,

        phoenixUsed: false,

        doubleXPActive: false,

        scoreBoostActive: false,

        coinMagnetActive: false,

        infiniteLives: false,

        infiniteCombo: false,

        godMode: false,

        allKnowledge: false,

        blessing: false,

        timeFreezeUltra: false,

        boss: null

    };

    const skin =
        SKINS[p.selectedSkin];

    if (skin) {

        if (skin.time >= 999) {
            game.timeFreezeUltra = true;
        }

        if (skin.hp >= 9999) {
            game.infiniteLives = true;
        }

    }

    showScreen("gameScreen");

    renderGame();

    startTimer();

}


/* ============================================================
   TIMER
============================================================ */

function startTimer() {

    stopTimer();

    if (game.timeFreezeUltra) {

        game.timer = Infinity;

        updateTimerUI();

        return;

    }

    game.timer =
        game.mode === "boss"
            ? BOSS_TIME
            : CLASSIC_TIME;

    updateTimerUI();

    game.timerId =
        setInterval(() => {

            if (
                game.answered ||
                game.timerFrozen
            ) return;

            if (
                game.godMode ||
                game.timeFreezeUltra
            ) {

                game.timer = Infinity;

                updateTimerUI();

                return;

            }

            game.timer -= .1;

            if (
                game.timer <= 5 &&
                game.timer > 4.9
            ) {

                audio.warning();

            }

            if (game.timer <= 0) {

                game.timer = 0;

                updateTimerUI();

                handleTimeout();

                return;

            }

            updateTimerUI();

        },100);

}


function stopTimer() {

    if (game.timerId) {

        clearInterval(
            game.timerId
        );

        game.timerId = null;

    }

}


function updateTimerUI() {

    const timer =
        game.timer === Infinity
            ? "∞"
            : Math.ceil(game.timer);

    const id =
        game.mode === "boss"
            ? "bossTimer"
            : "timer";

    const el =
        document.getElementById(id);

    if (el) {
        el.textContent = timer;
    }

    const fill =
        document.getElementById(
            "timerFill"
        );

    if (fill) {

        const percent =
            game.timer === Infinity
                ? 100
                : Math.max(
                    0,
                    game.timer /
                    CLASSIC_TIME *
                    100
                );

        fill.style.width =
            percent + "%";

    }

}


function handleTimeout() {

    if (game.answered) return;

    toast("⏱️ Time's up!");

    audio.wrong();

    answerQuestion(null);

}


/* ============================================================
   TIME FREEZE
============================================================ */

function useTimeFreeze() {

    if (game.timerFrozen) {

        toast(
            "❄️ Time Freeze is already active."
        );

        return;

    }

    if (game.mode !== "classic" &&
        game.mode !== "boss") {

        toast(
            "❄️ Cannot use Time Freeze here."
        );

        return;

    }

    const p = getProfile();

    if (
        !p.items.timeFreeze ||
        p.items.timeFreeze <= 0
    ) {

        toast(
            "You don't have Time Freeze."
        );

        return;

    }

    if (
        game.timeFreezeUltra ||
        game.godMode
    ) {

        toast(
            "⏱️ Timer is already frozen."
        );

        return;

    }

    p.items.timeFreeze--;

    game.timerFrozen = true;

    audio.freeze();

    toast(
        "❄️ Timer frozen for 5 seconds!"
    );

    clearTimeout(
        game.timerFreezeId
    );

    game.timerFreezeId =
        setTimeout(() => {

            game.timerFrozen = false;

            toast(
                "▶️ Timer resumed."
            );

            startTimer();

        },5000);

    saveGame();

    renderItemBar();

}


/* ============================================================
   RENDER GAME
============================================================ */

function renderGame() {

    if (game.mode === "boss") {

        renderBoss();

        return;

    }

    const q =
        game.questions[
            game.current
        ];

    if (!q) return;

    game.answered = false;

    document.getElementById(
        "questionNumber"
    ).textContent =
        `${game.current + 1}/${game.questions.length}`;

    document.getElementById(
        "questionType"
    ).textContent =
        q.type.toUpperCase();

    document.getElementById(
        "questionText"
    ).textContent =
        getQuestionText(q);

    document.getElementById(
        "questionValue"
    ).textContent =
        getQuestionValue(q);

    renderAnswers(
        "answers",
        q
    );

    updateGameStats();

    renderItemBar();

    if (game.allKnowledge) {

        toast(
            "🧠 Answer: " +
            q.correct
        );

    }

}


function getQuestionText(q) {

    switch(q.type) {

        case "capital":
            return "Which country is this?";

        case "country":
            return "What is the capital?";

        case "currencyUnique":
            return "Identify the country.";

        case "regionUnique":
            return "Identify the country.";

        case "population":
            return "Which country matches this population?";

        case "area":
            return "Which country matches this area?";

        case "language":
            return "Identify the country.";

        case "continent":
            return "Which continent?";

        default:
            return "Choose the correct answer.";

    }

}


function getQuestionValue(q) {

    if (
        q.type === "currencyUnique" ||
        q.type === "regionUnique" ||
        q.type === "population" ||
        q.type === "area" ||
        q.type === "language"
    ) {

        return q.value;

    }

    return q.value;

}


function renderAnswers(containerId,q) {

    const container =
        document.getElementById(
            containerId
        );

    container.innerHTML = "";

    q.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className =
            "answer-button";

        button.textContent =
            answer;

        button.onclick =
            () => answerQuestion(answer);

        container.appendChild(button);

    });

}


/* ============================================================
   ANSWER
============================================================ */

function answerQuestion(answer) {

    if (game.answered) return;

    game.answered = true;

    stopTimer();

    const q =
        game.mode === "boss"
            ? game.boss.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (!q) return;

    const correct =
        answer === q.correct;

    if (correct) {

        handleCorrect(q);

    } else {

        handleWrong(q);

    }

}


function handleCorrect(q) {

    audio.correct();

    const p = getProfile();

    game.combo++;

    if (
        game.combo >
        p.stats.bestCombo
    ) {

        p.stats.bestCombo =
            game.combo;

    }

    const skin =
        SKINS[p.selectedSkin] ||
        SKINS.default;

    let scoreGain = 100;
    let xpGain = 100;
    let coinGain = 50;

    if (game.difficulty === 2) {
        scoreGain = 125;
        xpGain = 125;
        coinGain = 60;
    }

    if (game.difficulty === 3) {
        scoreGain = 175;
        xpGain = 175;
        coinGain = 80;
    }

    if (game.difficulty === 4) {
        scoreGain = 250;
        xpGain = 250;
        coinGain = 120;
    }

    if (game.difficulty === 5) {
        scoreGain = 350;
        xpGain = 350;
        coinGain = 175;
    }

    scoreGain +=
        game.combo * 10;

    if (game.scoreBoostActive) {

        scoreGain *= 2;

        game.scoreBoostActive =
            false;

    }

    if (game.doubleXPActive) {

        xpGain *= 2;

        game.doubleXPActive =
            false;

    }

    xpGain =
        Math.floor(
            xpGain *
            (1 + skin.xp / 100)
        );

    coinGain =
        Math.floor(
            coinGain *
            (1 + skin.coin / 100)
        );

    if (game.coinMagnetActive) {

        coinGain *= 1.5;

        game.coinMagnetActive =
            false;

    }

    if (game.blessing) {

        xpGain *= 10;
        coinGain *= 10;

    }

    if (game.infiniteCombo) {

        game.combo++;

    }

    game.score +=
        Math.floor(scoreGain);

    game.xp +=
        Math.floor(xpGain);

    game.coins +=
        Math.floor(coinGain);

    p.xp +=
        Math.floor(xpGain);

    p.coins +=
        Math.floor(coinGain);

    p.stats.questions++;

    p.stats.correct++;

    p.stats.continents[
        q.country.continent
    ]++;

    audio.xp();

    audio.coin();

    if (game.combo >= 3) {
        audio.combo();
    }

    toast(
        `✅ Correct! +${xpGain} XP +${coinGain} 🪙`
    );

    if (game.mode === "boss") {

        bossDamage();

    } else {

        animateAnswer(true);

        setTimeout(
            nextQuestion,
            700
        );

    }

    checkAchievements();

    saveGame();

    updateAllUI();

}


function handleWrong(q) {

    audio.wrong();

    const p = getProfile();

    if (game.godMode) {

        toast(
            "🛡️ God Mode protected you."
        );

        game.answered = false;

        setTimeout(
            nextQuestion,
            500
        );

        return;

    }

    if (game.shieldActive) {

        game.shieldActive = false;

        toast(
            "🛡️ Answer Shield blocked the damage!"
        );

        if (game.mode === "boss") {

            setTimeout(
                nextBossQuestion,
                500
            );

        } else {

            setTimeout(
                nextQuestion,
                500
            );

        }

        return;

    }

    if (
        !game.secondChanceUsed &&
        p.items.secondChance > 0
    ) {

        game.secondChanceUsed = true;

        p.items.secondChance--;

        game.answered = false;

        toast(
            "🔄 Second Chance activated!"
        );

        renderGame();

        saveGame();

        return;

    }

    if (game.infiniteLives) {

        toast(
            "❤️ Infinite Lives protected you."
        );

        setTimeout(
            game.mode === "boss"
                ? nextBossQuestion
                : nextQuestion,
            500
        );

        return;

    }

    game.lives--;

    p.stats.questions++;
    p.stats.wrong++;

    game.combo = 0;

    if (
        game.lives <= 0 &&
        p.items.phoenixSave > 0 &&
        !game.phoenixUsed
    ) {

        p.items.phoenixSave--;

        game.phoenixUsed = true;

        game.lives = 1;

        toast(
            "🔥 Phoenix Save revived you!"
        );

    }

    revealAnswer(q);

    if (
        game.lives <= 0 &&
        !game.infiniteLives
    ) {

        setTimeout(
            () => finishGame(false),
            900
        );

        return;

    }

    setTimeout(

        game.mode === "boss"
            ? nextBossQuestion
            : nextQuestion,

        900

    );

    saveGame();

    updateAllUI();

}


function revealAnswer(q) {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(button => {

        if (
            button.textContent ===
            q.correct
        ) {

            button.classList.add(
                "correct"
            );

        }

        button.classList.add(
            "disabled"
        );

    });

}


function animateAnswer(correct) {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(b =>
        b.classList.add(
            correct
                ? "correct"
                : "wrong"
        )
    );

}


/* ============================================================
   NEXT QUESTION
============================================================ */

function nextQuestion() {

    game.current++;

    if (
        game.current >=
        game.questions.length
    ) {

        finishGame(true);

        return;

    }

    renderGame();

    startTimer();

}


function finishGame(completed) {

    stopTimer();

    const p = getProfile();

    if (completed) {

        if (game.difficulty === 4) {
            p.stats.extreme++;
        }

        if (game.difficulty === 5) {
            p.stats.nightmare++;
        }

        checkAchievements();

    }

    p.xp += game.xp;
    p.coins += game.coins;

    const level =
        getLevel(p.xp);

    document.getElementById(
        "resultInfo"
    ).innerHTML = `

        <div class="result-stat">
            <span>⭐ Score</span>
            <strong>${formatNumber(game.score)}</strong>
        </div>

        <div class="result-stat">
            <span>✨ XP</span>
            <strong>+${formatNumber(game.xp)}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>+${formatNumber(game.coins)}</strong>
        </div>

        <div class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>${p.stats.bestCombo}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Level</span>
            <strong>${level}</strong>
        </div>

        <div class="result-stat">
            <span>👑 Rank</span>
            <strong>${getRank(level)}</strong>
        </div>

        <p class="result-message">
            ${
                completed
                    ? "🎉 Round completed!"
                    : "💀 Game Over!"
            }
        </p>

    `;

    saveGame();

    updateAllUI();

    showScreen(
        "resultScreen"
    );

}


/* ============================================================
   ITEM SYSTEM
============================================================ */

function useItem(item) {

    const p = getProfile();

    if (!p.items[item]) {

        toast(
            `${ITEM_DEFS[item]?.icon || "❌"} No ${ITEM_DEFS[item]?.name || item} left.`
        );

        return;

    }

    if (game.mode === "boss") {

        if (
            [
                "hint",
                "megaHint",
                "luckyAnswer",
                "secondChance",
                "answerShield",
                "timeFreeze",
                "doubleXP",
                "scoreBoost",
                "extraLives",
                "phoenixSave"
            ].includes(item)
        ) {

            /* allowed */

        }

    }

    switch(item) {

        case "hint":
            useHint();
            break;

        case "megaHint":
            useMegaHint();
            break;

        case "luckyAnswer":
            useLuckyAnswer();
            break;

        case "doubleXP":

            p.items.doubleXP--;

            game.doubleXPActive = true;

            toast(
                "✨ Double XP activated!"
            );

            break;

        case "scoreBoost":

            p.items.scoreBoost--;

            game.scoreBoostActive = true;

            toast(
                "⭐ Score Boost activated!"
            );

            break;

        case "secondChance":

            toast(
                "🔄 Second Chance is automatically triggered after a wrong answer."
            );

            return;

        case "extraLives":

            p.items.extraLives--;

            game.lives++;

            toast(
                "❤️ +1 Life!"
            );

            break;

        case "answerShield":

            p.items.answerShield--;

            game.shieldActive = true;

            toast(
                "🛡️ Answer Shield activated!"
            );

            break;

        case "timeFreeze":

            useTimeFreeze();

            return;

        case "phoenixSave":

            toast(
                "🔥 Phoenix Save activates automatically when needed."
            );

            return;

        case "coinMagnet":

            p.items.coinMagnet--;

            game.coinMagnetActive = true;

            toast(
                "🪙 Coin Magnet activated!"
            );

            break;

        default:

            toast("Unknown item.");

            return;

    }

    saveGame();

    renderItemBar();

    updateGameStats();

}


function useHint() {

    const p = getProfile();

    if (
        !p.items.hint ||
        p.items.hint <= 0
    ) {

        toast("No Hint left.");

        return;

    }

    const q =
        game.mode === "boss"
            ? game.boss.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (!q) return;

    p.items.hint--;

    const buttons =
        game.mode === "boss"
            ? document.querySelectorAll(
                "#bossAnswers .answer-button"
            )
            : document.querySelectorAll(
                "#answers .answer-button"
            );

    const wrong =
        [...buttons].filter(
            b =>
                b.textContent !==
                q.correct
        );

    shuffle(wrong)
        .slice(0,2)
        .forEach(
            b =>
                b.classList.add(
                    "disabled"
                )
        );

    toast(
        "💡 Two wrong answers removed."
    );

    saveGame();

    renderItemBar();

}


function useMegaHint() {

    const p = getProfile();

    if (
        !p.items.megaHint ||
        p.items.megaHint <= 0
    ) {

        toast("No Mega Hint left.");

        return;

    }

    const q =
        game.mode === "boss"
            ? game.boss.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (!q) return;

    p.items.megaHint--;

    const buttons =
        game.mode === "boss"
            ? document.querySelectorAll(
                "#bossAnswers .answer-button"
            )
            : document.querySelectorAll(
                "#answers .answer-button"
            );

    buttons.forEach(b => {

        if (
            b.textContent ===
            q.correct
        ) {

            b.classList.add(
                "correct"
            );

        }

    });

    toast(
        "🧠 Mega Hint revealed the answer!"
    );

    saveGame();

    renderItemBar();

}


function useLuckyAnswer() {

    const p = getProfile();

    if (
        !p.items.luckyAnswer ||
        p.items.luckyAnswer <= 0
    ) {

        toast(
            "No Lucky Answer left."
        );

        return;

    }

    const q =
        game.mode === "boss"
            ? game.boss.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (!q) return;

    p.items.luckyAnswer--;

    toast(
        "🍀 Lucky Answer!"
    );

    answerQuestion(
        q.correct
    );

}


function renderItemBar() {

    const ids = [
        "gameItemBar",
        "bossItemBar"
    ];

    ids.forEach(id => {

        const bar =
            document.getElementById(id);

        if (!bar) return;

        bar.innerHTML = "";

        const p = getProfile();

        if (!p) return;

        Object.keys(
            ITEM_DEFS
        ).forEach(item => {

            const count =
                p.items[item] || 0;

            if (
                count <= 0 &&
                ![
                    "hint",
                    "megaHint",
                    "luckyAnswer"
                ].includes(item)
            ) {
                return;
            }

            const def =
                ITEM_DEFS[item];

            const div =
                document.createElement("button");

            div.className =
                "item-slot";

            div.title =
                def.desc;

            div.innerHTML = `

                <span class="icon">
                    ${def.icon}
                </span>

                <small>
                    ${def.name}
                </small>

                <span class="count">
                    x${count}
                </span>

            `;

            div.onclick =
                () => useItem(item);

            bar.appendChild(div);

        });

    });

}


/* ============================================================
   BOSS SYSTEM
============================================================ */

const BOSSES = [

    {
        name: "Goblin Scholar",
        icon: "👹",
        rarity: "Common",
        hp: 500,
        questions: 8,
        reward: 1000
    },

    {
        name: "Dragon of Knowledge",
        icon: "🐉",
        rarity: "Rare",
        hp: 1500,
        questions: 12,
        reward: 3500
    },

    {
        name: "Ancient Guardian",
        icon: "🗿",
        rarity: "Epic",
        hp: 4000,
        questions: 16,
        reward: 10000
    },

    {
        name: "World Devourer",
        icon: "👺",
        rarity: "Legendary",
        hp: 10000,
        questions: 22,
        reward: 30000
    },

    {
        name: "Mythic Overlord",
        icon: "🐲",
        rarity: "Mythic",
        hp: 25000,
        questions: 30,
        reward: 100000
    },

    {
        name: "Divine World King",
        icon: "👑",
        rarity: "Divine",
        hp: 60000,
        questions: 40,
        reward: 300000
    }

];


function startBossMode() {

    const p = getProfile();

    if (!p) return;

    stopTimer();

    const def =
        BOSSES[
            Math.floor(
                Math.random() *
                BOSSES.length
            )
        ];

    const questionCount =
        def.questions;

    game = {

        difficulty: 5,

        mode: "boss",

        questions: [],

        current: 0,

        score: 0,

        xp: 0,

        coins: 0,

        lives: 3,

        combo: 0,

        timer: BOSS_TIME,

        timerId: null,

        timerFrozen: false,

        timerFreezeId: null,

        answered: false,

        secondChanceUsed: false,

        shieldActive: false,

        phoenixUsed: false,

        doubleXPActive: false,

        scoreBoostActive: false,

        coinMagnetActive: false,

        infiniteLives: false,

        infiniteCombo: false,

        godMode: false,

        allKnowledge: false,

        blessing: false,

        timeFreezeUltra: false,

        boss: {

            ...def,

            maxHP: def.hp,

            currentHP: def.hp,

            current: 0,

            questions:
                Array.from(
                    {
                        length: questionCount
                    },
                    () =>
                        createQuestion(5)
                )

        }

    };

    const skin =
        SKINS[p.selectedSkin];

    if (skin) {

        if (skin.hp >= 9999) {
            game.infiniteLives = true;
        }

        if (skin.time >= 999) {
            game.timeFreezeUltra = true;
        }

    }

    audio.bossAppear();

    showScreen("bossScreen");

    renderBoss();

    startTimer();

}


function renderBoss() {

    const b =
        game.boss;

    if (!b) return;

    document.getElementById(
        "bossName"
    ).textContent =
        `${b.icon} ${b.name}`;

    document.getElementById(
        "bossRarity"
    ).textContent =
        b.rarity.toUpperCase();

    document.getElementById(
        "bossHP"
    ).textContent =
        `${formatNumber(b.currentHP)} / ${formatNumber(b.maxHP)}`;

    document.getElementById(
        "bossQuestion"
    ).textContent =
        `${b.current + 1}/${b.questions.length}`;

    document.getElementById(
        "bossDamage"
    ).textContent =
        calculateBossDamage();

    const percent =
        Math.max(
            0,
            b.currentHP /
            b.maxHP *
            100
        );

    document.getElementById(
        "bossHPBar"
    ).style.width =
        percent + "%";

    const q =
        b.questions[b.current];

    if (!q) return;

    document.getElementById(
        "bossQuestionType"
    ).textContent =
        q.type.toUpperCase();

    document.getElementById(
        "bossValue"
    ).textContent =
        q.value;

    renderAnswers(
        "bossAnswers",
        q
    );

    renderItemBar();

    if (game.allKnowledge) {

        toast(
            "🧠 Answer: " +
            q.correct
        );

    }

}


function calculateBossDamage() {

    let damage = 250;

    const p = getProfile();

    const level =
        getLevel(p.xp);

    damage +=
        Math.floor(
            level * 10
        );

    if (game.difficulty === 5) {
        damage += 250;
    }

    if (game.scoreBoostActive) {
        damage *= 2;
    }

    return Math.floor(damage);

}


function bossDamage() {

    const b =
        game.boss;

    if (!b) return;

    let damage =
        calculateBossDamage();

    const p = getProfile();

    const skin =
        SKINS[p.selectedSkin];

    if (skin) {

        damage *=
            1 +
            skin.xp / 100;

    }

    b.currentHP -=
        Math.floor(damage);

    if (game.scoreBoostActive) {
        game.scoreBoostActive = false;
    }

    audio.damage();

    toast(
        `⚔️ Boss took ${formatNumber(damage)} damage!`
    );

    if (b.currentHP <= 0) {

        b.currentHP = 0;

        audio.bossDefeated();

        setTimeout(
            defeatBoss,
            500
        );

        return;

    }

    setTimeout(
        nextBossQuestion,
        700
    );

}


function nextBossQuestion() {

    const b =
        game.boss;

    if (!b) return;

    b.current++;

    if (
        b.current >=
        b.questions.length
    ) {

        /*
            Boss survives after all questions.
            The player gets another sequence.
            This makes high-rarity bosses possible
            without being mathematically impossible.
        */

        b.current = 0;

        b.questions =
            Array.from(
                {
                    length:
                        b.questions.length
                },
                () =>
                    createQuestion(5)
            );

    }

    game.answered = false;

    renderBoss();

    startTimer();

}


function defeatBoss() {

    stopTimer();

    const p = getProfile();
    const b = game.boss;

    let coins =
        b.reward;

    let xp =
        b.reward;

    const skin =
        SKINS[p.selectedSkin];

    if (skin) {

        coins *=
            1 +
            skin.coin / 100;

        xp *=
            1 +
            skin.xp / 100;

    }

    if (game.blessing) {

        coins *= 10;
        xp *= 10;

    }

    coins = Math.floor(coins);
    xp = Math.floor(xp);

    p.coins += coins;
    p.xp += xp;

    game.coins = coins;
    game.xp = xp;

    p.stats.bosses++;

    const chest =
        rollBossChest(
            b.rarity,
            skin
        );

    p.chests[chest]++;

    const exclusive =
        giveBossExclusive(
            b.rarity
        );

    document.getElementById(
        "bossResult"
    ).innerHTML = `

        <div class="result-stat">
            <span>👹 Boss</span>
            <strong>${b.name}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>+${formatNumber(coins)}</strong>
        </div>

        <div class="result-stat">
            <span>✨ XP</span>
            <strong>+${formatNumber(xp)}</strong>
        </div>

        <div class="result-stat">
            <span>🎁 Chest</span>
            <strong>${CHESTS[chest].icon} ${CHESTS[chest].name}</strong>
        </div>

        <div class="result-stat">
            <span>👹 Exclusive Item</span>
            <strong>${exclusive || "None"}</strong>
        </div>

        <p class="result-message">
            🏆 BOSS DEFEATED!
        </p>

    `;

    checkAchievements();

    saveGame();

    updateAllUI();

    showScreen(
        "bossResultScreen"
    );

}


function rollBossChest(rarity, skin) {

    const base = {

        Common: "common",
        Rare: "rare",
        Epic: "epic",
        Legendary: "legend",
        Mythic: "mythic",
        Divine: "divine"

    };

    const guaranteed =
        base[rarity] || "common";

    const roll =
        Math.random() *
        100;

    const bonus =
        skin
            ? skin.drop
            : 0;

    if (
        rarity === "Divine" &&
        Math.random() < .02 + bonus / 10000
    ) {

        return "transcendent";

    }

    if (roll < 2 + bonus / 100) {
        return "divine";
    }

    if (roll < 7 + bonus / 100) {
        return "mythic";
    }

    return guaranteed;

}


function giveBossExclusive(rarity) {

    const p = getProfile();

    const itemMap = {

        Common: "extraLives",
        Rare: "answerShield",
        Epic: "scoreBoost",
        Legendary: "doubleXP",
        Mythic: "phoenixSave",
        Divine: "coinMagnet"

    };

    const item =
        itemMap[rarity];

    if (!item) return null;

    p.items[item]++;

    return ITEM_DEFS[item].name;

}


/* ============================================================
   DAILY CHALLENGE
============================================================ */

function todayKey() {

    return new Date()
        .toISOString()
        .slice(0,10);

}


function openDailyChallenge() {

    audio.open();

    const p = getProfile();

    const today =
        todayKey();

    const done =
        p.daily.date === today &&
        p.daily.completed;

    document.getElementById(
        "dailyInfo"
    ).innerHTML = `

        <p>
            Date:
            <strong>${today}</strong>
        </p>

        <p>
            Status:
            <strong>
                ${
                    done
                        ? "✅ Completed"
                        : "🟢 Available"
                }
            </strong>
        </p>

        <p>
            Reward:
            🪙 2,500 +
            ✨ 2,500 XP
        </p>

    `;

    showScreen(
        "dailyScreen"
    );

}


function startDailyChallenge() {

    const p = getProfile();

    const today =
        todayKey();

    if (
        p.daily.date === today &&
        p.daily.completed
    ) {

        toast(
            "🎯 Daily Challenge already completed."
        );

        return;

    }

    game.mode = "daily";
    game.difficulty = 5;

    game.questions =
        createRound(5);

    game.current = 0;
    game.score = 0;
    game.xp = 0;
    game.coins = 0;
    game.lives = 3;
    game.combo = 0;
    game.timer = CLASSIC_TIME;
    game.timerFrozen = false;
    game.answered = false;
    game.infiniteLives = false;
    game.infiniteCombo = false;
    game.godMode = false;

    showScreen(
        "gameScreen"
    );

    renderGame();

    startTimer();

}


/* ============================================================
   SHOP
============================================================ */

function openShop() {

    audio.open();

    showScreen("shopScreen");

    showShopTab("items");

}


function showShopTab(tab) {

    const ids = [
        "shopItems",
        "skinShop",
        "chestShop"
    ];

    ids.forEach(id => {

        document.getElementById(
            id
        ).style.display = "none";

    });

    const target = {

        items: "shopItems",
        skins: "skinShop",
        chests: "chestShop"

    }[tab];

    document.getElementById(
        target
    ).style.display = "grid";

    if (tab === "items") {
        renderItemShop();
    }

    if (tab === "skins") {
        renderSkinShop();
    }

    if (tab === "chests") {
        renderChestShop();
    }

}


function renderItemShop() {

    const el =
        document.getElementById(
            "shopItems"
        );

    el.innerHTML = "";

    Object.keys(
        ITEM_DEFS
    ).forEach(item => {

        const d =
            ITEM_DEFS[item];

        const div =
            document.createElement("div");

        div.className =
            "shop-item";

        div.innerHTML = `

            <h3>
                ${d.icon}
                ${d.name}
            </h3>

            <p>
                ${d.desc}
            </p>

            <div>
                Owned:
                <strong>
                    ${getProfile().items[item] || 0}
                </strong>
            </div>

            <p class="price">
                🪙 ${formatNumber(d.price)}
            </p>

            <button onclick="buyItem('${item}')">
                Buy
            </button>

        `;

        el.appendChild(div);

    });

}


function buyItem(item) {

    const p = getProfile();
    const d = ITEM_DEFS[item];

    if (p.coins < d.price) {

        toast("Not enough coins.");

        return;

    }

    p.coins -= d.price;
    p.items[item]++;

    audio.coin();

    toast(
        `${d.icon} ${d.name} purchased!`
    );

    saveGame();

    updateAllUI();

    renderItemShop();

}


function renderSkinShop() {

    const el =
        document.getElementById(
            "skinShop"
        );

    el.innerHTML = "";

    Object.keys(
        SKINS
    ).forEach(id => {

        const s =
            SKINS[id];

        if (s.owner) return;

        const owned =
            getProfile()
                .ownedSkins
                .includes(id);

        const equipped =
            getProfile()
                .selectedSkin === id;

        const div =
            document.createElement("div");

        div.className =
            "shop-item";

        div.innerHTML = `

            <h3>
                ${s.icon}
                ${s.name}
            </h3>

            <p>
                🪙 +${s.coin}%<br>
                ✨ +${s.xp}% XP<br>
                🎁 +${s.drop}% Drop<br>
                ⏱️ +${s.time}s<br>
                ❤️ +${s.hp} HP
            </p>

            <p class="price">
                🪙 ${formatNumber(s.price)}
            </p>

            ${
                equipped
                    ? `<button disabled>✓ Equipped</button>`
                    : owned
                        ? `<button onclick="equipSkin('${id}')">Equip</button>`
                        : `<button onclick="buySkin('${id}')">Buy</button>`
            }

        `;

        el.appendChild(div);

    });

}


function buySkin(id) {

    const p = getProfile();
    const s = SKINS[id];

    if (p.ownedSkins.includes(id)) {

        equipSkin(id);

        return;

    }

    if (p.coins < s.price) {

        toast("Not enough coins.");

        return;

    }

    p.coins -= s.price;

    p.ownedSkins.push(id);

    p.selectedSkin = id;

    audio.rarity(
        id === "transcendent"
            ? "Transcendent"
            : id === "cosmic"
                ? "Legendary"
                : "Rare"
    );

    toast(
        `${s.icon} ${s.name} unlocked!`
    );

    saveGame();

    updateAllUI();

    renderSkinShop();

}


function equipSkin(id) {

    const p = getProfile();

    if (
        !p.ownedSkins.includes(id)
    ) return;

    p.selectedSkin = id;

    saveGame();

    updateAllUI();

    renderSkinShop();

    toast(
        `${SKINS[id].icon} Skin equipped!`
    );

}


function renderChestShop() {

    const el =
        document.getElementById(
            "chestShop"
        );

    el.innerHTML = "";

    Object.keys(
        CHESTS
    ).forEach(id => {

        const c =
            CHESTS[id];

        const div =
            document.createElement("div");

        div.className =
            "shop-item";

        div.innerHTML = `

            <h3>
                ${c.icon}
                ${c.name}
            </h3>

            <p>
                Rarity:
                <strong>
                    ${c.rarity}
                </strong>
            </p>

            <p>
                Owned:
                <strong>
                    ${getProfile().chests[id] || 0}
                </strong>
            </p>

            <p class="price">
                🪙 ${formatNumber(c.price)}
            </p>

            <button onclick="buyChest('${id}')">
                Buy
            </button>

            <button
                class="secondary"
                onclick="openChest('${id}')">

                Open

            </button>

        `;

        el.appendChild(div);

    });

}


function buyChest(id) {

    const p = getProfile();
    const c = CHESTS[id];

    if (p.coins < c.price) {

        toast("Not enough coins.");

        return;

    }

    p.coins -= c.price;

    p.chests[id]++;

    audio.chest();

    toast(
        `${c.icon} ${c.name} purchased!`
    );

    saveGame();

    updateAllUI();

    renderChestShop();

}


function openChest(id) {

    const p = getProfile();

    if (
        !p.chests[id] ||
        p.chests[id] <= 0
    ) {

        toast(
            "You don't have this Chest."
        );

        return;

    }

    p.chests[id]--;

    const rarity =
        CHESTS[id].rarity;

    const reward =
        chestReward(rarity);

    p.stats.chests++;

    audio.chest();

    if (
        [
            "Rare",
            "Epic",
            "Legendary",
            "Divine",
            "Transcendent"
        ].includes(rarity)
    ) {

        audio.rarity(rarity);

    }

    toast(
        `${CHESTS[id].icon} ${rarity} Chest: ${reward}`
    );

    checkAchievements();

    saveGame();

    updateAllUI();

    renderChestShop();

}


function chestReward(rarity) {

    const p = getProfile();

    let reward;

    const keys =
        Object.keys(
            ITEM_DEFS
        );

    const roll =
        Math.random();

    if (rarity === "Common") {

        reward =
            randomChoice([
                "hint",
                "extraLives"
            ]);

    }

    else if (rarity === "Rare") {

        reward =
            randomChoice([
                "megaHint",
                "luckyAnswer",
                "answerShield",
                "scoreBoost"
            ]);

        p.stats.rareDrops++;

    }

    else if (rarity === "Epic") {

        reward =
            randomChoice([
                "doubleXP",
                "scoreBoost",
                "timeFreeze",
                "secondChance"
            ]);

        p.stats.rareDrops++;

    }

    else if (rarity === "Legendary") {

        reward =
            randomChoice([
                "phoenixSave",
                "coinMagnet",
                "doubleXP",
                "megaHint"
            ]);

        p.stats.legendaryDrops++;

    }

    else if (rarity === "Mythic") {

        reward =
            randomChoice([
                "phoenixSave",
                "coinMagnet",
                "luckyAnswer"
            ]);

        p.stats.legendaryDrops++;

    }

    else if (rarity === "Divine") {

        reward =
            randomChoice([
                "phoenixSave",
                "coinMagnet",
                "megaHint"
            ]);

        p.stats.divineDrops++;

    }

    else {

        const skins =
            Object.keys(SKINS)
                .filter(
                    id =>
                        id !== "default" &&
                        !p.ownedSkins.includes(id)
                );

        if (skins.length) {

            const skin =
                randomChoice(
                    skins
                );

            p.ownedSkins.push(
                skin
            );

            p.stats.transcendentDrops++;

            return `
                ${SKINS[skin].icon}
                ${SKINS[skin].name}
            `;

        }

        reward =
            "coins";

    }

    if (reward === "coins") {

        const amount =
            1000000;

        p.coins += amount;

        return `
            🪙 +${formatNumber(amount)} Coins
        `;

    }

    p.items[reward]++;

    return `
        ${ITEM_DEFS[reward].icon}
        ${ITEM_DEFS[reward].name} x1
    `;

}


/* ============================================================
   INVENTORY
============================================================ */

function openInventory() {

    audio.open();

    renderInventory();

    showScreen(
        "inventoryScreen"
    );

}


function renderInventory() {

    const el =
        document.getElementById(
            "inventoryList"
        );

    el.innerHTML = "";

    const p = getProfile();

    Object.keys(
        ITEM_DEFS
    ).forEach(item => {

        const d =
            ITEM_DEFS[item];

        const count =
            p.items[item] || 0;

        const div =
            document.createElement("div");

        div.className =
            "inventory-card";

        div.innerHTML = `

            <div class="icon">
                ${d.icon}
            </div>

            <h3>
                ${d.name}
            </h3>

            <small>
                x${count}
            </small>

            <button
                onclick="useInventoryItem('${item}')">

                Use

            </button>

        `;

        el.appendChild(div);

    });

}


function useInventoryItem(item) {

    if (
        game.mode !== "classic" &&
        game.mode !== "boss"
    ) {

        toast(
            "This item can only be used during a game."
        );

        return;

    }

    useItem(item);

    renderInventory();

}


/* ============================================================
   ACHIEVEMENTS
============================================================ */

function checkAchievements() {

    const p = getProfile();

    ACHIEVEMENTS.forEach(a => {

        const id = a[0];

        if (p.achievements[id]) {
            return;
        }

        let unlocked = false;

        try {
            unlocked = a[3](p);
        } catch(e) {
            unlocked = false;
        }

        if (unlocked) {

            p.achievements[id] = true;

            audio.achievement();

            toast(
                `🏆 Achievement: ${a[1]}`
            );

        }

    });

    saveGame();

}


function openAchievements() {

    audio.open();

    const el =
        document.getElementById(
            "achievementList"
        );

    const p = getProfile();

    el.innerHTML = "";

    ACHIEVEMENTS.forEach(a => {

        const unlocked =
            !!p.achievements[a[0]];

        const div =
            document.createElement("div");

        div.className =
            "achievement-item" +
            (
                unlocked
                    ? " unlocked"
                    : ""
            );

        div.innerHTML = `

            <div>

                <h3>
                    ${unlocked ? "🏆" : "🔒"}
                    ${a[1]}
                </h3>

                <p>
                    ${a[2]}
                </p>

            </div>

        `;

        el.appendChild(div);

    });

    showScreen(
        "achievementScreen"
    );

}


/* ============================================================
   COUNTRY DATABASE
============================================================ */

let countryFilter = "ALL";


function openCountries() {

    audio.open();

    renderCountries();

    showScreen(
        "countriesScreen"
    );

}


function filterCountries(filter) {

    countryFilter = filter;

    renderCountries();

}


function searchCountries() {

    renderCountries();

}


function renderCountries() {

    const el =
        document.getElementById(
            "countryList"
        );

    const input =
        document.getElementById(
            "countrySearch"
        );

    const query =
        input
            ? input.value
                .trim()
                .toLowerCase()
            : "";

    let list =
        countryDB.filter(c => {

            const filterOK =
                countryFilter === "ALL" ||
                c.continent === countryFilter;

            if (!filterOK) {
                return false;
            }

            if (!query) {
                return true;
            }

            return [

                c.name,
                c.capital,
                c.currency,
                c.region,
                c.languages,
                c.continent,
                String(c.population),
                String(c.area)

            ].some(
                value =>
                    value
                        .toLowerCase()
                        .includes(query)
            );

        });

    document.getElementById(
        "countryCount"
    ).textContent =
        list.length;

    el.innerHTML = "";

    list.forEach(c => {

        const div =
            document.createElement("div");

        div.className =
            "country-card";

        div.innerHTML = `

            <h3>
                ${c.name}
            </h3>

            <p>🏛️ Capital:
                <strong>${c.capital}</strong>
            </p>

            <p>💰 Currency:
                <strong>${c.currency}</strong>
            </p>

            <p>🗺️ Region:
                <strong>${c.region}</strong>
            </p>

            <p>👥 Population:
                <strong>${formatPopulation(c.population)}</strong>
            </p>

            <p>📏 Area:
                <strong>${formatNumber(c.area)} km²</strong>
            </p>

            <p>🌐 Languages:
                <strong>${c.languages}</strong>
            </p>

            <p>🌍 Continent:
                <strong>${c.continent}</strong>
            </p>

        `;

        el.appendChild(div);

    });

}


/* ============================================================
   OWNER PANEL
============================================================ */

function isOwner() {

    const p = getProfile();

    return (
        p &&
        (
            p.name === OWNER_NAME ||
            p.name.toLowerCase() === "owner"
        )
    );

}


document.addEventListener(
    "keydown",
    e => {

        if (
            e.key.toLowerCase() === "o" &&
            !["INPUT","TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            if (isOwner()) {

                openOwnerPanel();

            } else {

                toast(
                    "🔒 Owner Panel unavailable."
                );

            }

        }

    }
);


function openOwnerPanel() {

    if (!isOwner()) {

        toast(
            "🔒 Owner only."
        );

        return;

    }

    audio.open();

    renderOwnerPanel();

    showScreen(
        "ownerScreen"
    );

}


function renderOwnerPanel() {

    const el =
        document.getElementById(
            "ownerControls"
        );

    el.innerHTML = "";

    const tools = [

        [
            "⏱️ Time Freeze Ultra",
            "ownerTimeFreezeUltra"
        ],

        [
            "⏭️ Question Skip",
            "ownerQuestionSkip"
        ],

        [
            "🎯 Perfect Answer",
            "ownerPerfectAnswer"
        ],

        [
            "💀 Instant Boss Kill",
            "ownerInstantBossKill"
        ],

        [
            "❤️ Infinite Lives",
            "ownerInfiniteLives"
        ],

        [
            "💰 Coin Storm",
            "ownerCoinStorm"
        ],

        [
            "⭐ XP Storm",
            "ownerXPStorm"
        ],

        [
            "🔥 Infinite Combo",
            "ownerInfiniteCombo"
        ],

        [
            "🧠 All Knowledge",
            "ownerAllKnowledge"
        ],

        [
            "🛡️ God Mode",
            "ownerGodMode"
        ],

        [
            "🌍 World Reset",
            "ownerWorldReset"
        ],

        [
            "👑 Owner Blessing",
            "ownerBlessing"
        ],

        [
            "👑 Give Owner Skin",
            "ownerGiveSkin"
        ],

        [
            "🎁 Give Transcendent Chest",
            "ownerGiveTranscendent"
        ],

        [
            "🧰 Give All Items",
            "ownerGiveAllItems"
        ],

        [
            "🎁 Give All Chests",
            "ownerGiveAllChests"
        ],

        [
            "⬆️ +10 Levels",
            "ownerLevel10"
        ],

        [
            "💾 Force Save",
            "ownerForceSave"
        ]

    ];

    tools.forEach(t => {

        const button =
            document.createElement("button");

        button.className =
            "owner-tool";

        button.textContent =
            t[0];

        button.onclick =
            () => window[t[1]]();

        el.appendChild(button);

    });

}


function ownerTimeFreezeUltra() {

    game.timeFreezeUltra = true;

    game.timer = Infinity;

    updateTimerUI();

    toast(
        "⏱️ Time Freeze Ultra activated!"
    );

}


function ownerQuestionSkip() {

    if (
        game.mode !== "classic" &&
        game.mode !== "daily" &&
        game.mode !== "boss"
    ) {

        toast("No active round.");

        return;

    }

    game.answered = true;

    toast(
        "⏭️ Question skipped as correct!"
    );

    handleCorrect(
        game.mode === "boss"
            ? game.boss.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ]
    );

}


function ownerPerfectAnswer() {

    const q =
        game.mode === "boss"
            ? game.boss?.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (!q) {

        toast(
            "No active question."
        );

        return;

    }

    toast(
        "🎯 Perfect Answer!"
    );

    answerQuestion(
        q.correct
    );

}


function ownerInstantBossKill() {

    if (
        game.mode !== "boss" ||
        !game.boss
    ) {

        toast(
            "Start Boss Mode first."
        );

        return;

    }

    game.boss.currentHP = 0;

    audio.bossDefeated();

    defeatBoss();

}


function ownerInfiniteLives() {

    game.infiniteLives = true;

    game.lives = Infinity;

    updateGameStats();

    toast(
        "❤️ Infinite Lives enabled!"
    );

}


function ownerCoinStorm() {

    const p = getProfile();

    p.coins += 1000000;

    game.coins += 1000000;

    audio.coin();

    saveGame();

    updateAllUI();

    toast(
        "💰 +1,000,000 Coins!"
    );

}


function ownerXPStorm() {

    const p = getProfile();

    p.xp += 1000000;

    game.xp += 1000000;

    audio.xp();

    saveGame();

    updateAllUI();

    toast(
        "⭐ +1,000,000 XP!"
    );

}


function ownerInfiniteCombo() {

    game.infiniteCombo = true;

    game.combo = 999999;

    updateGameStats();

    toast(
        "🔥 Infinite Combo!"
    );

}


function ownerAllKnowledge() {

    game.allKnowledge =
        !game.allKnowledge;

    const q =
        game.mode === "boss"
            ? game.boss?.questions[
                game.boss.current
            ]
            : game.questions[
                game.current
            ];

    if (q) {

        toast(
            "🧠 Answer: " +
            q.correct
        );

    } else {

        toast(
            game.allKnowledge
                ? "🧠 All Knowledge ON"
                : "🧠 All Knowledge OFF"
        );

    }

}


function ownerGodMode() {

    game.godMode =
        !game.godMode;

    toast(
        game.godMode
            ? "🛡️ God Mode ON"
            : "🛡️ God Mode OFF"
    );

}


function ownerWorldReset() {

    if (game.mode === "boss") {

        game.boss.current = 0;

        game.boss.currentHP =
            game.boss.maxHP;

        game.boss.questions =
            Array.from(
                {
                    length:
                        game.boss.questions.length
                },
                () =>
                    createQuestion(5)
            );

        renderBoss();

        startTimer();

        toast(
            "🌍 Boss world reset!"
        );

        return;

    }

    if (
        game.mode === "classic" ||
        game.mode === "daily"
    ) {

        game.questions =
            createRound(
                game.difficulty
            );

        game.current = 0;

        renderGame();

        startTimer();

        toast(
            "🌍 New question set generated!"
        );

        return;

    }

    toast(
        "No active round."
    );

}


function ownerBlessing() {

    game.blessing =
        !game.blessing;

    toast(
        game.blessing
            ? "👑 Owner Blessing ON: +1000% rewards/drop."
            : "👑 Owner Blessing OFF"
    );

}


function ownerGiveSkin() {

    const p = getProfile();

    if (
        !p.ownedSkins.includes(
            "owner"
        )
    ) {

        p.ownedSkins.push(
            "owner"
        );

    }

    p.selectedSkin =
        "owner";

    saveGame();

    updateAllUI();

    toast(
        "👑 Owner Skin equipped!"
    );

}


function ownerGiveTranscendent() {

    const p = getProfile();

    p.chests.transcendent++;

    saveGame();

    toast(
        "🌌 Transcendent Chest added!"
    );

}


function ownerGiveAllItems() {

    const p = getProfile();

    Object.keys(
        ITEM_DEFS
    ).forEach(
        item =>
            p.items[item] += 10
    );

    saveGame();

    toast(
        "🧰 All items +10!"
    );

}


function ownerGiveAllChests() {

    const p = getProfile();

    Object.keys(
        CHESTS
    ).forEach(
        chest =>
            p.chests[chest]++
    );

    saveGame();

    toast(
        "🎁 All chests +1!"
    );

}


function ownerLevel10() {

    const p = getProfile();

    const current =
        getLevel(p.xp);

    const target =
        current + 10;

    p.xp =
        getNextLevelXP(
            target
        );

    saveGame();

    updateAllUI();

    toast(
        "⬆️ +10 Levels!"
    );

}


function ownerForceSave() {

    saveGame();

    toast(
        "💾 Game saved."
    );

}


/* ============================================================
   OTHER MENUS
============================================================ */

function openRules() {

    audio.open();

    showScreen(
        "rulesScreen"
    );

}


function openUpdateLog() {

    audio.open();

    showScreen(
        "updateScreen"
    );

}


function openInfo() {

    audio.open();

    showScreen(
        "infoScreen"
    );

}


/* ============================================================
   GAME STATS
============================================================ */

function updateGameStats() {

    const ids = {

        score: formatNumber(game.score),

        gameXP:
            formatNumber(game.xp),

        gameCoins:
            formatNumber(game.coins),

        combo:
            game.infiniteCombo
                ? "999999"
                : game.combo,

        lives:
            game.infiniteLives
                ? "∞"
                : game.lives

    };

    for (const id in ids) {

        const el =
            document.getElementById(id);

        if (el) {
            el.textContent =
                ids[id];
        }

    }

    updateTimerUI();

}


/* ============================================================
   QUIT
============================================================ */

function confirmQuitGame() {

    if (
        confirm(
            "Quit this round?"
        )
    ) {

        stopTimer();

        goHome();

    }

}


/* ============================================================
   UTILS
============================================================ */

function randomChoice(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


function formatNumber(value) {

    if (!Number.isFinite(value)) {
        return "∞";
    }

    return Math.floor(
        value
    ).toLocaleString(
        "en-US"
    );

}


function formatPopulation(value) {

    if (value >= 1000000000) {

        return (
            value / 1000000000
        ).toFixed(1) + " billion";

    }

    if (value >= 1000000) {

        return (
            value / 1000000
        ).toFixed(1) + " million";

    }

    if (value >= 1000) {

        return (
            value / 1000
        ).toFixed(1) + " thousand";

    }

    return String(value);

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* ============================================================
   INIT
============================================================ */

function init() {

    loadGame();

    updateAllUI();

    renderOwnerPanel();

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "mouseenter",
                () => audio.hover()
            );

        });

    document.addEventListener(
        "click",
        e => {

            if (
                e.target.closest("button")
            ) {

                audio.click();

            }

        }
    );

    console.log(
        "Asia Country Guessing Game v3.5 loaded."
    );

    console.log(
        "Profiles:",
        profiles.length
    );

    console.log(
        "Countries:",
        countryDB.length
    );

}


window.addEventListener(
    "load",
    init
);


/* ============================================================
   EXPOSE FUNCTIONS
============================================================ */

window.openProfileMenu = openProfileMenu;
window.openShop = openShop;
window.openInventory = openInventory;
window.openAchievements = openAchievements;
window.openCountries = openCountries;
window.openRules = openRules;
window.openUpdateLog = openUpdateLog;
window.openInfo = openInfo;

window.openStartGame = openStartGame;
window.openDifficulty = openDifficulty;

window.startGame = startGame;
window.startBossMode = startBossMode;
window.startDailyChallenge = startDailyChallenge;
window.openDailyChallenge = openDailyChallenge;

window.createProfileFromInput =
    createProfileFromInput;

window.deleteProfile =
    deleteProfile;

window.selectProfile =
    selectProfile;

window.viewProfile =
    viewProfile;

window.buyItem =
    buyItem;

window.buySkin =
    buySkin;

window.equipSkin =
    equipSkin;

window.buyChest =
    buyChest;

window.openChest =
    openChest;

window.useItem =
    useItem;

window.useHint =
    useHint;

window.useMegaHint =
    useMegaHint;

window.useLuckyAnswer =
    useLuckyAnswer;

window.useTimeFreeze =
    useTimeFreeze;

window.useInventoryItem =
    useInventoryItem;

window.filterCountries =
    filterCountries;

window.searchCountries =
    searchCountries;

window.showShopTab =
    showShopTab;

window.confirmQuitGame =
    confirmQuitGame;

window.goHome =
    goHome;


/* OWNER */
window.openOwnerPanel =
    openOwnerPanel;

window.ownerTimeFreezeUltra =
    ownerTimeFreezeUltra;

window.ownerQuestionSkip =
    ownerQuestionSkip;

window.ownerPerfectAnswer =
    ownerPerfectAnswer;

window.ownerInstantBossKill =
    ownerInstantBossKill;

window.ownerInfiniteLives =
    ownerInfiniteLives;

window.ownerCoinStorm =
    ownerCoinStorm;

window.ownerXPStorm =
    ownerXPStorm;

window.ownerInfiniteCombo =
    ownerInfiniteCombo;

window.ownerAllKnowledge =
    ownerAllKnowledge;

window.ownerGodMode =
    ownerGodMode;

window.ownerWorldReset =
    ownerWorldReset;

window.ownerBlessing =
    ownerBlessing;

window.ownerGiveSkin =
    ownerGiveSkin;

window.ownerGiveTranscendent =
    ownerGiveTranscendent;

window.ownerGiveAllItems =
    ownerGiveAllItems;

window.ownerGiveAllChests =
    ownerGiveAllChests;

window.ownerLevel10 =
    ownerLevel10;

window.ownerForceSave =
    ownerForceSave;
