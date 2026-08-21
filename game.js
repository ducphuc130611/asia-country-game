// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 2.0 - MEGA EXPANSION UPDATE
// ============================================================

const GAME_VERSION = "2.0";

// ============================================================
// COUNTRY DATABASE (49 Countries)
// [Name, Capital, Currency, Region]
// ============================================================

const countries = [
    ["Vietnam", "Hanoi", "Dong", "Southeast Asia"],
    ["Thailand", "Bangkok", "Baht", "Southeast Asia"],
    ["Laos", "Vientiane", "Kip", "Southeast Asia"],
    ["Cambodia", "Phnom Penh", "Riel", "Southeast Asia"],
    ["Myanmar", "Naypyidaw", "Kyat", "Southeast Asia"],
    ["Malaysia", "Kuala Lumpur", "Ringgit", "Southeast Asia"],
    ["Singapore", "Singapore", "Singapore Dollar", "Southeast Asia"],
    ["Indonesia", "Jakarta", "Rupiah", "Southeast Asia"],
    ["Philippines", "Manila", "Philippine Peso", "Southeast Asia"],
    ["Brunei", "Bandar Seri Begawan", "Brunei Dollar", "Southeast Asia"],
    ["Timor-Leste", "Dili", "US Dollar", "Southeast Asia"],

    ["China", "Beijing", "Yuan", "East Asia"],
    ["Japan", "Tokyo", "Yen", "East Asia"],
    ["South Korea", "Seoul", "South Korean Won", "East Asia"],
    ["North Korea", "Pyongyang", "North Korean Won", "East Asia"],
    ["Mongolia", "Ulaanbaatar", "Tugrik", "East Asia"],
    ["Taiwan", "Taipei", "New Taiwan Dollar", "East Asia"],

    ["India", "New Delhi", "Indian Rupee", "South Asia"],
    ["Pakistan", "Islamabad", "Pakistani Rupee", "South Asia"],
    ["Bangladesh", "Dhaka", "Taka", "South Asia"],
    ["Nepal", "Kathmandu", "Nepalese Rupee", "South Asia"],
    ["Bhutan", "Thimphu", "Ngultrum", "South Asia"],
    ["Sri Lanka", "Sri Jayawardenepura Kotte", "Sri Lankan Rupee", "South Asia"],
    ["Maldives", "Male", "Rufiyaa", "South Asia"],
    ["Afghanistan", "Kabul", "Afghani", "South Asia"],

    ["Iran", "Tehran", "Iranian Rial", "West Asia"],
    ["Iraq", "Baghdad", "Iraqi Dinar", "West Asia"],
    ["Saudi Arabia", "Riyadh", "Saudi Riyal", "West Asia"],
    ["United Arab Emirates", "Abu Dhabi", "UAE Dirham", "West Asia"],
    ["Qatar", "Doha", "Qatari Riyal", "West Asia"],
    ["Kuwait", "Kuwait City", "Kuwaiti Dinar", "West Asia"],
    ["Bahrain", "Manama", "Bahraini Dinar", "West Asia"],
    ["Oman", "Muscat", "Omani Rial", "West Asia"],
    ["Yemen", "Sanaa", "Yemeni Rial", "West Asia"],
    ["Jordan", "Amman", "Jordanian Dinar", "West Asia"],
    ["Lebanon", "Beirut", "Lebanese Pound", "West Asia"],
    ["Syria", "Damascus", "Syrian Pound", "West Asia"],
    ["Israel", "Jerusalem", "Israeli Shekel", "West Asia"],
    ["Turkey", "Ankara", "Turkish Lira", "West Asia"],
    ["Palestine", "Ramallah", "Israeli Shekel", "West Asia"],
    ["Cyprus", "Nicosia", "Euro", "West Asia"],

    ["Kazakhstan", "Astana", "Tenge", "Central Asia"],
    ["Uzbekistan", "Tashkent", "Som", "Central Asia"],
    ["Turkmenistan", "Ashgabat", "Manat", "Central Asia"],
    ["Kyrgyzstan", "Bishkek", "Kyrgyzstani Som", "Central Asia"],
    ["Tajikistan", "Dushanbe", "Somoni", "Central Asia"],

    ["Azerbaijan", "Baku", "Azerbaijani Manat", "Caucasus"],
    ["Armenia", "Yerevan", "Dram", "Caucasus"],
    ["Georgia", "Tbilisi", "Lari", "Caucasus"],

    ["Russia", "Moscow", "Ruble", "North Asia"]
];

// ============================================================
// AUDIO SYSTEM (Native Web Audio API Synth)
// ============================================================

const SoundEngine = {
    ctx: null,
    muted: false,
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    },
    playTone(freq, type = "sine", duration = 0.15, gainVal = 0.1) {
        if (this.muted) return;
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gainNode = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gainNode.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.error("Audio error:", e);
        }
    },
    playCorrect() {
        this.playTone(523.25, "sine", 0.1, 0.15); // C5
        setTimeout(() => this.playTone(659.25, "sine", 0.15, 0.15), 80); // E5
        setTimeout(() => this.playTone(783.99, "sine", 0.2, 0.15), 160); // G5
    },
    playWrong() {
        this.playTone(180, "sawtooth", 0.2, 0.2);
        setTimeout(() => this.playTone(130, "sawtooth", 0.3, 0.2), 150);
    },
    playLevelUp() {
        const freqs = [392, 523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((f, i) => {
            setTimeout(() => this.playTone(f, "triangle", 0.25, 0.2), i * 100);
        });
    },
    playChestOpen() {
        [261.63, 329.63, 392, 523.25].forEach((f, i) => {
            setTimeout(() => this.playTone(f, "sine", 0.3, 0.18), i * 80);
        });
    },
    playClick() {
        this.playTone(400, "square", 0.04, 0.05);
    }
};

// ============================================================
// STORAGE & PROFILE MANAGEMENT
// ============================================================

const STORAGE_KEY = "asia_country_game_profiles_v2";
const CURRENT_PROFILE_KEY = "asia_current_profile_v2";

let profiles = [];
let currentProfile = -1;

try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        profiles = JSON.parse(saved);
        if (!Array.isArray(profiles)) profiles = [];
    }
} catch (e) {
    profiles = [];
}

try {
    const savedCurrent = localStorage.getItem(CURRENT_PROFILE_KEY);
    if (savedCurrent !== null) currentProfile = Number(savedCurrent);
} catch (e) {
    currentProfile = -1;
}

function calculateLevel(xp) {
    return Math.min(100, Math.floor(xp / 500) + 1);
}

function getCurrentLevelXP(xp) {
    const level = calculateLevel(xp);
    if (level >= 100) return 500;
    return xp - ((level - 1) * 500);
}

function getNextLevelXP(xp) {
    return 500;
}

function getLevelProgress(xp) {
    const level = calculateLevel(xp);
    if (level >= 100) return 100;
    const current = getCurrentLevelXP(xp);
    return Math.min(100, Math.max(0, (current / 500) * 100));
}

// 12 Rank Tiers from Lv.1 to Lv.100 with active passive perks
const RANKS = [
    { minLevel: 1, name: "Novice Traveler", coinMultiplier: 1.0, xpMultiplier: 1.0, icon: "🌱" },
    { minLevel: 5, name: "Explorer", coinMultiplier: 1.05, xpMultiplier: 1.05, icon: "🧭" },
    { minLevel: 10, name: "Cartographer", coinMultiplier: 1.1, xpMultiplier: 1.1, icon: "🗺️" },
    { minLevel: 20, name: "Voyager", coinMultiplier: 1.15, xpMultiplier: 1.15, icon: "⛵" },
    { minLevel: 30, name: "Geographer", coinMultiplier: 1.2, xpMultiplier: 1.2, icon: "📚" },
    { minLevel: 40, name: "Continental Scholar", coinMultiplier: 1.3, xpMultiplier: 1.25, icon: "🏛️" },
    { minLevel: 50, name: "Asian Ambassador", coinMultiplier: 1.4, xpMultiplier: 1.3, icon: "🎖️" },
    { minLevel: 60, name: "Silk Road Master", coinMultiplier: 1.5, xpMultiplier: 1.4, icon: "🐪" },
    { minLevel: 70, name: "Grand Master", coinMultiplier: 1.65, xpMultiplier: 1.5, icon: "👑" },
    { minLevel: 80, name: "Asian Sage", coinMultiplier: 1.8, xpMultiplier: 1.6, icon: "🔮" },
    { minLevel: 90, name: "Geography Titan", coinMultiplier: 2.0, xpMultiplier: 1.75, icon: "⚡" },
    { minLevel: 100, name: "Divine Sovereign", coinMultiplier: 2.5, xpMultiplier: 2.0, icon: "🌟" }
];

function getRankObject(level) {
    let current = RANKS[0];
    for (const r of RANKS) {
        if (level >= r.minLevel) current = r;
    }
    return current;
}

function getRank(level) {
    const r = getRankObject(level);
    return `${r.icon} ${r.name}`;
}

function newProfile(name) {
    return {
        name: name,
        level: 1,
        xp: 0,
        highScore: 0,
        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalQuestions: 0,
        bestCombo: 0,
        coins: 500,
        totalCoinsEarned: 500,
        // Consumable inventory
        hints: 2,
        extraLives: 1,
        doubleXP: 0,
        scoreBoost: 0,
        secondChance: 0,
        luckyAnswer: 0,
        timeFreezers: 0,
        fiftyFifty: 0,
        // Chests inventory
        chests: {
            common: 1,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legend: 0,
            mythic: 0,
            divine: 0
        },
        // Progression & tracking
        achievements: [],
        lastDailyDate: "",
        dailyDone: false
    };
}

function migrateProfile(p) {
    if (!p || typeof p !== "object") return newProfile("Player");
    if (typeof p.name !== "string") p.name = "Player";
    if (typeof p.level !== "number") p.level = 1;
    if (typeof p.xp !== "number") p.xp = 0;
    if (typeof p.highScore !== "number") p.highScore = 0;
    if (typeof p.totalGames !== "number") p.totalGames = 0;
    if (typeof p.totalCorrect !== "number") p.totalCorrect = 0;
    if (typeof p.totalWrong !== "number") p.totalWrong = 0;
    if (typeof p.totalQuestions !== "number") p.totalQuestions = 0;
    if (typeof p.bestCombo !== "number") p.bestCombo = 0;
    if (typeof p.coins !== "number") p.coins = 500;
    if (typeof p.totalCoinsEarned !== "number") p.totalCoinsEarned = p.coins;

    if (typeof p.hints !== "number") p.hints = 2;
    if (typeof p.extraLives !== "number") p.extraLives = 1;
    if (typeof p.doubleXP !== "number") p.doubleXP = 0;
    if (typeof p.scoreBoost !== "number") p.scoreBoost = 0;
    if (typeof p.secondChance !== "number") p.secondChance = 0;
    if (typeof p.luckyAnswer !== "number") p.luckyAnswer = 0;
    if (typeof p.timeFreezers !== "number") p.timeFreezers = 0;
    if (typeof p.fiftyFifty !== "number") p.fiftyFifty = 0;

    if (!p.chests || typeof p.chests !== "object") {
        p.chests = { common: 0, uncommon: 0, rare: 0, epic: 0, legend: 0, mythic: 0, divine: 0 };
    }
    ["common", "uncommon", "rare", "epic", "legend", "mythic", "divine"].forEach(tier => {
        if (typeof p.chests[tier] !== "number") p.chests[tier] = 0;
    });

    if (!Array.isArray(p.achievements)) p.achievements = [];
    if (typeof p.lastDailyDate !== "string") p.lastDailyDate = "";
    if (typeof p.dailyDone !== "boolean") p.dailyDone = false;

    p.level = calculateLevel(p.xp);
    return p;
}

profiles = profiles.map(migrateProfile);

function save() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
        localStorage.setItem(CURRENT_PROFILE_KEY, String(currentProfile));
    } catch (e) {
        console.error("Save error:", e);
    }
    updateHeader();
    updateMainProfile();
}

function getProfile() {
    if (currentProfile < 0 || !profiles[currentProfile]) return null;
    return profiles[currentProfile];
}

// ============================================================
// ACHIEVEMENTS CONFIGURATION
// ============================================================

const ACHIEVEMENTS_LIST = [
    { id: "first_win", name: "Novice Cartographer", desc: "Complete your first game", rewardCoins: 150, rewardXP: 100 },
    { id: "combo_5", name: "Sharp Memory", desc: "Reach a 5x Combo streak", rewardCoins: 250, rewardXP: 200 },
    { id: "combo_10", name: "Asian Prodigy", desc: "Reach a perfect 10x Combo streak", rewardCoins: 600, rewardXP: 500 },
    { id: "rich_1000", name: "Silk Merchant", desc: "Accumulate 1,000 Coins in your vault", rewardCoins: 300, rewardXP: 250 },
    { id: "rich_5000", name: "Tycoon of the Orient", desc: "Accumulate 5,000 Coins in your vault", rewardCoins: 1200, rewardXP: 1000 },
    { id: "reach_lv20", name: "Voyager Ascended", desc: "Attain Level 20", rewardCoins: 1000, rewardXP: 800 },
    { id: "reach_lv50", name: "Ambassador of Asia", desc: "Attain Level 50", rewardCoins: 3000, rewardXP: 2500 },
    { id: "reach_lv100", name: "Divine Sovereign", desc: "Reach max Level 100", rewardCoins: 10000, rewardXP: 10000 },
    { id: "open_legend_chest", name: "Fortune Hunter", desc: "Unlock a Legend, Mythic or Divine Chest", rewardCoins: 1500, rewardXP: 1000 },
    { id: "daily_complete", name: "Daily Devotion", desc: "Successfully complete a Daily Challenge", rewardCoins: 400, rewardXP: 300 },
    { id: "time_attack_clear", name: "Thunder Reflexes", desc: "Clear Time Attack mode without running out of time", rewardCoins: 800, rewardXP: 600 },
    { id: "survival_15", name: "Endurance Master", desc: "Answer 15+ questions correctly in Survival Mode", rewardCoins: 1200, rewardXP: 1000 }
];

function checkAchievement(id) {
    const p = getProfile();
    if (!p) return;
    if (!p.achievements.includes(id)) {
        const ach = ACHIEVEMENTS_LIST.find(a => a.id === id);
        if (ach) {
            p.achievements.push(id);
            addCoins(ach.rewardCoins);
            addXP(ach.rewardXP);
            SoundEngine.playLevelUp();
            toast(`🏆 UNLOCKED: ${ach.name}! +${ach.rewardCoins} 🪙 | +${ach.rewardXP} XP`);
            save();
        }
    }
}

// ============================================================
// CHEST SYSTEM & REWARD DROP TABLES
// ============================================================

const CHEST_DATA = {
    common: { name: "Common Chest", cost: 150, color: "#95a5a6", minCoins: 60, maxCoins: 140, minXP: 40, maxXP: 90, itemChance: 0.2 },
    uncommon: { name: "Uncommon Chest", cost: 300, color: "#2ecc71", minCoins: 160, maxCoins: 320, minXP: 100, maxXP: 220, itemChance: 0.35 },
    rare: { name: "Rare Chest", cost: 650, color: "#3498db", minCoins: 380, maxCoins: 750, minXP: 250, maxXP: 500, itemChance: 0.55 },
    epic: { name: "Epic Chest", cost: 1400, color: "#9b59b6", minCoins: 900, maxCoins: 1700, minXP: 600, maxXP: 1200, itemChance: 0.75 },
    legend: { name: "Legend Chest", cost: 3000, color: "#f39c12", minCoins: 2000, maxCoins: 4000, minXP: 1500, maxXP: 3000, itemChance: 0.95 },
    mythic: { name: "Mythic Chest", cost: 6500, color: "#e74c3c", minCoins: 4500, maxCoins: 9000, minXP: 3500, maxXP: 7000, itemChance: 1.0 },
    divine: { name: "Divine Chest", cost: 15000, color: "#00f2fe", minCoins: 12000, maxCoins: 25000, minXP: 10000, maxXP: 20000, itemChance: 1.0 }
};

function getRandomChestReward(tier) {
    const info = CHEST_DATA[tier];
    const coins = Math.floor(Math.random() * (info.maxCoins - info.minCoins + 1)) + info.minCoins;
    const xp = Math.floor(Math.random() * (info.maxXP - info.minXP + 1)) + info.minXP;
    const items = ["hints", "extraLives", "doubleXP", "scoreBoost", "secondChance", "luckyAnswer", "timeFreezers", "fiftyFifty"];
    let gainedItem = null;

    if (Math.random() <= info.itemChance) {
        gainedItem = items[Math.floor(Math.random() * items.length)];
    }
    return { coins, xp, item: gainedItem, tier };
}

function openChest(tier) {
    const p = getProfile();
    if (!p) return;
    if ((p.chests[tier] || 0) <= 0) {
        toast(`You don't have any ${CHEST_DATA[tier].name}!`);
        return;
    }

    p.chests[tier]--;
    const reward = getRandomChestReward(tier);
    addCoins(reward.coins);
    addXP(reward.xp);
    if (reward.item) {
        p[reward.item] = (p[reward.item] || 0) + (["legend", "mythic", "divine"].includes(tier) ? 2 : 1);
    }
    SoundEngine.playChestOpen();

    if (["legend", "mythic", "divine"].includes(tier)) {
        checkAchievement("open_legend_chest");
    }

    let msg = `🎁 Opened ${CHEST_DATA[tier].name}!\n+${reward.coins} Coins 🪙\n+${reward.xp} XP ✨`;
    if (reward.item) msg += `\n+Bonus Item: ${reward.item}!`;
    alert(msg);
    save();
    renderInventory();
}

function rollMatchChestDrop(mode, score) {
    const p = getProfile();
    if (!p) return;
    const rand = Math.random();
    let wonTier = null;

    if (mode === "daily") {
        wonTier = "epic";
    } else if (rand < 0.01) {
        wonTier = "divine";
    } else if (rand < 0.03) {
        wonTier = "mythic";
    } else if (rand < 0.08) {
        wonTier = "legend";
    } else if (rand < 0.18) {
        wonTier = "epic";
    } else if (rand < 0.35) {
        wonTier = "rare";
    } else if (rand < 0.60) {
        wonTier = "uncommon";
    } else {
        wonTier = "common";
    }

    p.chests[wonTier] = (p.chests[wonTier] || 0) + 1;
    toast(`📦 Victory Loot: You found a ${CHEST_DATA[wonTier].name}!`);
}

// ============================================================
// GAME MODES & ENGINE STATE
// ============================================================
// Modes:
// 1. "classic"    - 10 Questions, Standard Timer (15s), 3 Lives
// 2. "timeAttack" - Rapid Fire 8s per Question, Double Coins, High pressure
// 3. "survival"   - Endless mode until 0 lives, escalating difficulty
// 4. "hardcore"   - 1 Life only, No hints permitted, 2.5x Rewards
// 5. "daily"      - 10 fixed questions with guaranteed Epic Chest reward

let game = {
    mode: "classic",
    difficulty: 1,
    question: 0,
    totalQuestions: 10,
    score: 0,
    lives: 3,
    combo: 0,
    bestCombo: 0,
    correct: 0,
    wrong: 0,
    used: [],
    currentCountry: -1,
    options: [],
    type: 1,
    hintUsed: false,
    fiftyFiftyUsed: false,
    locked: false,
    secondChanceUsed: false,
    timer: null,
    timeLeft: 15,
    timerDuration: 15,
    isFrozen: false
};

// ============================================================
// TIMER LOGIC
// ============================================================

function startTimer() {
    stopTimer();
    game.isFrozen = false;
    if (game.mode === "timeAttack") {
        game.timerDuration = 8;
    } else if (game.mode === "hardcore") {
        game.timerDuration = 10;
    } else {
        game.timerDuration = 15;
    }
    game.timeLeft = game.timerDuration;
    renderTimerUI();

    game.timer = setInterval(() => {
        if (game.isFrozen) return;
        game.timeLeft--;
        renderTimerUI();
        if (game.timeLeft <= 0) {
            stopTimer();
            onTimeOut();
        }
    }, 1000);
}

function stopTimer() {
    if (game.timer) {
        clearInterval(game.timer);
        game.timer = null;
    }
}

function renderTimerUI() {
    const el = document.getElementById("gameTimer");
    if (el) {
        el.textContent = `⏱️ ${game.timeLeft}s`;
        el.style.color = game.timeLeft <= 3 ? "#e74c3c" : "#f1c40f";
    }
}

function onTimeOut() {
    if (game.locked) return;
    toast("⏰ Time's Up!");
    SoundEngine.playWrong();
    wrongAnswer(true);
}

// ============================================================
// QUESTION GENERATOR WITH CURRENCY & REGION BUG FIXES
// ============================================================
// Fixed duplicate correct options for shared currencies/regions

function getUniqueCurrencyCountries() {
    // Groups countries by unique currency name so distractors NEVER share the same currency
    return countries;
}

function generateQuestionOptions(correctIndex, questionType) {
    const correctCountry = countries[correctIndex];
    const options = [correctIndex];
    const pool = [...countries.keys()].filter(i => i !== correctIndex);

    while (options.length < 4 && pool.length > 0) {
        const randIndex = Math.floor(Math.random() * pool.length);
        const candidateIndex = pool[randIndex];
        const candidateCountry = countries[candidateIndex];

        let isConflicting = false;
        // Bugfix for Type 3 (Currency): Ensure distractors do not share the target currency
        if (questionType === 3) {
            if (candidateCountry[2].toLowerCase() === correctCountry[2].toLowerCase()) {
                isConflicting = true;
            }
        }
        // Bugfix for Type 4 (Region): Ensure distractors do not belong to the target region
        if (questionType === 4) {
            if (candidateCountry[3].toLowerCase() === correctCountry[3].toLowerCase()) {
                isConflicting = true;
            }
        }

        if (!isConflicting && !options.includes(candidateIndex)) {
            options.push(candidateIndex);
        }
        pool.splice(randIndex, 1);
    }
    return shuffle(options);
}

function nextQuestion() {
    if (game.mode !== "survival" && game.question >= game.totalQuestions) {
        finishGame();
        return;
    }
    if (game.lives <= 0) {
        finishGame();
        return;
    }

    game.question++;
    game.hintUsed = false;
    game.fiftyFiftyUsed = false;
    game.locked = false;
    game.secondChanceUsed = false;

    // Pick a country
    let correct;
    if (game.used.length >= countries.length) game.used = [];
    do {
        correct = Math.floor(Math.random() * countries.length);
    } while (game.used.includes(correct));

    game.used.push(correct);
    game.currentCountry = correct;

    // Determine question type based on difficulty and mode
    if (game.difficulty === 1) {
        game.type = 1; // Capital -> Country
    } else if (game.difficulty === 2) {
        game.type = 1 + Math.floor(Math.random() * 2); // 1 or 2
    } else {
        game.type = 1 + Math.floor(Math.random() * 4); // 1 to 4
    }

    game.options = generateQuestionOptions(game.currentCountry, game.type);
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    const c = countries[game.currentCountry];

    const qNum = document.getElementById("questionNumber");
    if (qNum) qNum.textContent = game.mode === "survival" ? `${game.question}` : `${game.question}/${game.totalQuestions}`;

    const livesEl = document.getElementById("lives");
    if (livesEl) livesEl.textContent = "❤️".repeat(Math.max(0, game.lives));

    const comboEl = document.getElementById("combo");
    if (comboEl) comboEl.textContent = `🔥 x${game.combo}`;

    const scoreEl = document.getElementById("score");
    if (scoreEl) scoreEl.textContent = game.score;

    const p = getProfile();
    const rankObj = p ? getRankObject(p.level) : RANKS[0];

    const xpEl = document.getElementById("gameXP");
    if (xpEl) xpEl.textContent = p ? p.xp : 0;
    const coinsEl = document.getElementById("gameCoins");
    if (coinsEl) coinsEl.textContent = p ? p.coins : 0;
    const levelEl = document.getElementById("gameLevel");
    if (levelEl) levelEl.textContent = p ? `Lv.${p.level} (${rankObj.name})` : "Lv.1";

    let title = "";
    let value = "";

    if (game.type === 1) {
        title = "Which country has this capital?";
        value = `🏛️ ${c[1]}`;
    } else if (game.type === 2) {
        title = "What country does this belong to?";
        value = `📍 Capital: ${c[1]} | Region: ${c[3]}`;
    } else if (game.type === 3) {
        title = "Which country exclusively uses this currency?";
        value = `💵 ${c[2]}`;
    } else {
        title = "Which of these countries is located in this region?";
        value = `🌏 ${c[3]}`;
    }

    const qType = document.getElementById("questionType");
    if (qType) qType.textContent = title;

    const qVal = document.getElementById("questionValue");
    if (qVal) qVal.textContent = value;

    const answersContainer = document.getElementById("answers");
    if (!answersContainer) return;
    answersContainer.innerHTML = "";

    game.options.forEach((cIndex, pos) => {
        const btn = document.createElement("button");
        btn.className = "answer-button";
        btn.id = `btn-option-${pos}`;
        btn.textContent = `${pos + 1}. ${countries[cIndex][0]}`;
        btn.onclick = () => answerQuestion(pos);
        answersContainer.appendChild(btn);
    });
}

// ============================================================
// ANSWER HANDLING & REWARDS
// ============================================================

function answerQuestion(position) {
    if (game.locked) return;
    stopTimer();
    SoundEngine.playClick();

    if (position < 0 || position >= game.options.length) return;
    const selected = game.options[position];
    const correct = game.currentCountry;

    if (selected === correct) {
        correctAnswer();
    } else {
        const p = getProfile();
        if (p && p.luckyAnswer > 0 && !game.secondChanceUsed) {
            if (confirm("❌ Incorrect! Would you like to consume 🍀 Lucky Answer to make it correct?")) {
                p.luckyAnswer--;
                save();
                correctAnswer(true);
                return;
            }
        }
        wrongAnswer();
    }
}

function correctAnswer(savedByLucky = false) {
    if (game.locked) return;
    game.locked = true;

    const p = getProfile();
    if (!p) return;

    SoundEngine.playCorrect();
    game.combo++;
    game.correct++;
    if (game.combo > game.bestCombo) game.bestCombo = game.combo;
    if (game.combo > p.bestCombo) p.bestCombo = game.combo;

    // Achievement triggers
    if (game.combo >= 5) checkAchievement("combo_5");
    if (game.combo >= 10) checkAchievement("combo_10");
    if (game.mode === "survival" && game.correct >= 15) checkAchievement("survival_15");

    const rankObj = getRankObject(p.level);

    let baseScore = game.difficulty === 1 ? 100 : game.difficulty === 2 ? 160 : 220;
    if (game.mode === "hardcore") baseScore *= 2.5;
    if (game.mode === "timeAttack") baseScore *= 1.5;

    let comboBonus = game.combo >= 2 ? game.combo * 30 : 0;
    let gainedScore = Math.floor(baseScore + comboBonus);

    if (p.scoreBoost > 0) {
        if (confirm("Use 📈 Score Boost (+25%)?")) {
            p.scoreBoost--;
            gainedScore = Math.floor(gainedScore * 1.25);
        }
    }
    game.score += gainedScore;

    // XP calculation with Rank Perk
    let gainedXP = Math.floor((60 + game.combo * 15) * rankObj.xpMultiplier);
    if (p.doubleXP > 0) {
        if (confirm("Use ✨ Double XP?")) {
            p.doubleXP--;
            gainedXP *= 2;
        }
    }
    addXP(gainedXP);

    // Coin calculation with Rank Perk
    let gainedCoins = Math.floor((25 + game.combo * 8) * rankObj.coinMultiplier);
    if (game.mode === "timeAttack") gainedCoins = Math.floor(gainedCoins * 2.0);
    addCoins(gainedCoins);

    p.totalCorrect++;
    p.totalQuestions++;
    save();

    toast(savedByLucky ? `🍀 Lucky! +${gainedScore} pts | +${gainedXP} XP` : `✅ Correct! +${gainedScore} pts | +${gainedXP} XP | +${gainedCoins} 🪙`);

    setTimeout(nextQuestion, 800);
}

function wrongAnswer(isTimeOut = false) {
    if (game.locked) return;
    game.locked = true;

    const p = getProfile();
    SoundEngine.playWrong();

    if (p && p.secondChance > 0 && !game.secondChanceUsed) {
        if (confirm("💔 Fatal error! Would you like to use 🔄 Second Chance to protect your life and combo?")) {
            p.secondChance--;
            game.secondChanceUsed = true;
            save();
            game.locked = false;
            toast("🔄 Second Chance activated! Try again.");
            startTimer();
            return;
        }
    }

    game.combo = 0;
    game.wrong++;
    game.lives--;
    if (p) {
        p.totalWrong++;
        p.totalQuestions++;
        save();
    }

    const correctCountry = countries[game.currentCountry][0];
    toast(`❌ Wrong! Correct answer: ${correctCountry}`);

    if (game.lives <= 0) {
        setTimeout(finishGame, 1000);
    } else {
        setTimeout(nextQuestion, 1100);
    }
}

// ============================================================
// CONSUMABLE IN-GAME POWERS
// ============================================================

function useFiftyFifty() {
    const p = getProfile();
    if (!p) return;
    if (game.fiftyFiftyUsed) return toast("Already used in this turn!");
    if (p.fiftyFifty <= 0) return toast("You don't have any 50/50 Jokers! Buy them in Shop.");

    p.fiftyFifty--;
    game.fiftyFiftyUsed = true;
    save();

    let eliminated = 0;
    for (let i = 0; i < game.options.length; i++) {
        if (game.options[i] !== game.currentCountry && eliminated < 2) {
            const btn = document.getElementById(`btn-option-${i}`);
            if (btn) {
                btn.style.opacity = "0.2";
                btn.disabled = true;
            }
            eliminated++;
        }
    }
    toast("🎭 50/50: Two wrong answers eliminated!");
}

function useTimeFreeze() {
    const p = getProfile();
    if (!p) return;
    if (game.isFrozen) return toast("Timer already frozen!");
    if (p.timeFreezers <= 0) return toast("No Hourglasses left! Buy in Shop.");

    p.timeFreezers--;
    game.isFrozen = true;
    save();
    toast("⏳ Hourglass: Time is frozen for this turn!");
}

// ============================================================
// GAME INITIALIZATION & MODES
// ============================================================

function startSelectedGame(mode, difficulty = 1) {
    const p = getProfile();
    if (!p) {
        toast("Please create or select a profile first!");
        openProfileMenu();
        return;
    }

    if (mode === "daily") {
        const today = new Date().toISOString().slice(0, 10);
        if (p.lastDailyDate === today && p.dailyDone) {
            alert("📅 You have already completed today's Daily Challenge! Come back tomorrow.");
            return;
        }
    }

    game = {
        mode: mode,
        difficulty: Number(difficulty),
        question: 0,
        totalQuestions: mode === "survival" ? 999 : 10,
        score: 0,
        lives: mode === "hardcore" ? 1 : 3,
        combo: 0,
        bestCombo: 0,
        correct: 0,
        wrong: 0,
        used: [],
        currentCountry: -1,
        options: [],
        type: 1,
        hintUsed: false,
        fiftyFiftyUsed: false,
        locked: false,
        secondChanceUsed: false,
        timer: null,
        timeLeft: 15,
        timerDuration: 15,
        isFrozen: false
    };

    if (p.extraLives > 0 && mode !== "hardcore") {
        if (confirm(`You possess ${p.extraLives} Extra Life(s). Equip +1 extra life for this game?`)) {
            p.extraLives--;
            game.lives++;
            save();
        }
    }

    showScreen("gameScreen");
    nextQuestion();
}

function finishGame() {
    stopTimer();
    const p = getProfile();
    if (!p) return;

    p.totalGames++;
    if (game.score > p.highScore) p.highScore = game.score;

    // Check game-specific achievements
    checkAchievement("first_win");
    if (p.coins >= 1000) checkAchievement("rich_1000");
    if (p.coins >= 5000) checkAchievement("rich_5000");
    if (p.level >= 20) checkAchievement("reach_lv20");
    if (p.level >= 50) checkAchievement("reach_lv50");
    if (p.level >= 100) checkAchievement("reach_lv100");
    if (game.mode === "timeAttack" && game.lives > 0) checkAchievement("time_attack_clear");

    if (game.mode === "daily") {
        p.dailyDone = true;
        p.lastDailyDate = new Date().toISOString().slice(0, 10);
        checkAchievement("daily_complete");
    }

    // Roll Loot Drop
    rollMatchChestDrop(game.mode, game.score);

    save();

    // Render Game Over Screen
    const overContainer = document.getElementById("gameOverStats");
    if (overContainer) {
        overContainer.innerHTML = `
            <div class="result-stat"><span>Mode</span><strong>${game.mode.toUpperCase()}</strong></div>
            <div class="result-stat"><span>Final Score</span><strong>${game.score}</strong></div>
            <div class="result-stat"><span>Accuracy</span><strong>${game.correct}/${game.question}</strong></div>
            <div class="result-stat"><span>Max Combo</span><strong>🔥 ${game.bestCombo}</strong></div>
            <div class="result-stat"><span>High Score</span><strong>${p.highScore}</strong></div>
        `;
    }
    showScreen("gameOverScreen");
}

// ============================================================
// SHOP & INVENTORY
// ============================================================

const SHOP_ITEMS = [
    { key: "hints", name: "💡 Hint", cost: 100, desc: "Removes 2 incorrect options." },
    { key: "fiftyFifty", name: "🎭 50/50 Joker", cost: 180, desc: "Eliminates half the wrong answers instantly." },
    { key: "timeFreezers", name: "⏳ Hourglass", cost: 200, desc: "Freezes countdown timer for the turn." },
    { key: "extraLives", name: "❤️ Extra Life", cost: 300, desc: "Start a match with +1 Heart." },
    { key: "doubleXP", name: "✨ Double XP", cost: 450, desc: "Doubles XP earned from correct answers." },
    { key: "scoreBoost", name: "📈 Score Boost", cost: 500, desc: "Boosts score by +25% on demand." },
    { key: "secondChance", name: "🔄 Second Chance", cost: 800, desc: "Saves you from a fatal wrong answer." },
    { key: "luckyAnswer", name: "🍀 Lucky Answer", cost: 1400, desc: "Converts a wrong answer into a correct one." }
];

function buyItem(itemKey, price) {
    const p = getProfile();
    if (!p) return;
    if (p.coins < price) {
        toast("❌ Not enough Coins!");
        return;
    }
    p.coins -= price;
    p[itemKey] = (p[itemKey] || 0) + 1;
    SoundEngine.playClick();
    save();
    toast(`🛒 Purchased: ${itemKey}!`);
    renderShop();
}

function buyChest(tier) {
    const p = getProfile();
    if (!p) return;
    const info = CHEST_DATA[tier];
    if (p.coins < info.cost) {
        toast(`❌ Not enough Coins for ${info.name}!`);
        return;
    }
    p.coins -= info.cost;
    p.chests[tier] = (p.chests[tier] || 0) + 1;
    SoundEngine.playClick();
    save();
    toast(`📦 Purchased ${info.name}! Check Inventory.`);
    renderShop();
}

function renderShop() {
    const container = document.getElementById("shopItemsContainer");
    if (!container) return;
    const p = getProfile();

    let html = `<h3>⚡ Consumables & Powerups</h3><div class="shop-grid">`;
    SHOP_ITEMS.forEach(item => {
        html += `
            <div class="shop-card">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <button onclick="buyItem('${item.key}', ${item.cost})">🪙 ${item.cost}</button>
            </div>
        `;
    });
    html += `</div><h3>📦 Treasure Chests</h3><div class="shop-grid">`;

    Object.keys(CHEST_DATA).forEach(tier => {
        const c = CHEST_DATA[tier];
        html += `
            <div class="shop-card chest-card" style="border-top: 4px solid ${c.color}">
                <h4 style="color:${c.color}">📦 ${c.name}</h4>
                <p>Rewards: ${c.minCoins}-${c.maxCoins} Coins | ${c.minXP}-${c.maxXP} XP</p>
                <button onclick="buyChest('${tier}')">🪙 ${c.cost}</button>
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}

function renderInventory() {
    const p = getProfile();
    const container = document.getElementById("inventoryList");
    if (!p || !container) return;

    let html = `<h3>🎒 Items</h3><div class="inv-grid">`;
    SHOP_ITEMS.forEach(item => {
        html += `<div class="inventory-item"><span>${item.name}</span><strong>${p[item.key] || 0}</strong></div>`;
    });
    html += `</div><h3>📦 Vault Chests</h3><div class="inv-grid">`;

    Object.keys(CHEST_DATA).forEach(tier => {
        const count = p.chests[tier] || 0;
        html += `
            <div class="inventory-item">
                <span>📦 ${CHEST_DATA[tier].name}</span>
                <strong>${count}</strong>
                ${count > 0 ? `<button onclick="openChest('${tier}')">Open</button>` : ""}
            </div>
        `;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ============================================================
// ACHIEVEMENTS UI RENDER
// ============================================================

function renderAchievements() {
    const p = getProfile();
    const container = document.getElementById("achievementsContainer");
    if (!container || !p) return;

    container.innerHTML = "";
    ACHIEVEMENTS_LIST.forEach(ach => {
        const isUnlocked = p.achievements.includes(ach.id);
        const card = document.createElement("div");
        card.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;
        card.innerHTML = `
            <div>
                <h4>${isUnlocked ? "🏆" : "🔒"} ${ach.name}</h4>
                <p>${ach.desc}</p>
                <small>Reward: ${ach.rewardCoins} 🪙 | ${ach.rewardXP} XP</small>
            </div>
            <span>${isUnlocked ? "COMPLETED" : "LOCKED"}</span>
        `;
        container.appendChild(card);
    });
}

// ============================================================
// XP & LEVEL PROGRESSION
// ============================================================

function addXP(amount) {
    const p = getProfile();
    if (!p) return;
    const oldLevel = p.level;
    p.xp += amount;
    p.level = calculateLevel(p.xp);

    if (p.level > oldLevel) {
        const levels = p.level - oldLevel;
        const reward = levels * 600;
        p.coins += reward;
        p.totalCoinsEarned += reward;
        SoundEngine.playLevelUp();
        toast(`🎉 LEVEL UP! You reached Level ${p.level}! +${reward} Coins 🪙`);
    }
}

function addCoins(amount) {
    const p = getProfile();
    if (!p) return;
    p.coins += amount;
    p.totalCoinsEarned += amount;
}

// ============================================================
// UTILITIES & NAVIGATION
// ============================================================

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[tag] || tag));
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateHeader();
}

function goHome() {
    stopTimer();
    showScreen("homeScreen");
    updateMainProfile();
}

function updateHeader() {
    const p = getProfile();
    const nameEl = document.getElementById("topName");
    const levelEl = document.getElementById("topLevel");
    const coinsEl = document.getElementById("topCoins");

    if (!nameEl || !levelEl || !coinsEl) return;
    if (!p) {
        nameEl.textContent = "Guest";
        levelEl.textContent = "1";
        coinsEl.textContent = "0";
        return;
    }
    nameEl.textContent = p.name;
    levelEl.textContent = `${p.level} (${getRankObject(p.level).icon})`;
    coinsEl.textContent = p.coins;
}

function updateMainProfile() {
    const container = document.getElementById("mainProfileInfo");
    if (!container) return;
    const p = getProfile();
    if (!p) {
        container.innerHTML = "<p>No profile selected. Create or select a profile to play!</p>";
        return;
    }

    const accuracy = p.totalQuestions > 0 ? Math.round((p.totalCorrect / p.totalQuestions) * 100) : 0;
    const currentLevelXP = getCurrentLevelXP(p.xp);
    const nextLevelXP = getNextLevelXP(p.xp);
    const progress = getLevelProgress(p.xp);
    const rankObj = getRankObject(p.level);

    container.innerHTML = `
        <div class="result-stat"><span>👤 Name</span><strong>${escapeHTML(p.name)}</strong></div>
        <div class="result-stat"><span>🏆 Rank</span><strong>${rankObj.icon} ${rankObj.name}</strong></div>
        <div class="result-stat"><span>⚡ Passive Bonus</span><strong>+${Math.round((rankObj.coinMultiplier - 1) * 100)}% Coins | +${Math.round((rankObj.xpMultiplier - 1) * 100)}% XP</strong></div>
        <div class="result-stat"><span>⭐ Level</span><strong>${p.level} / 100</strong></div>
        <div class="result-stat"><span>✨ XP</span><strong>${p.xp}</strong></div>
        <div class="profile-progress">
            <div class="profile-progress-bar"><div class="profile-progress-fill" style="width:${progress}%"></div></div>
            <small>${currentLevelXP}/${nextLevelXP} XP (${Math.round(progress)}%)</small>
        </div>
        <div class="result-stat"><span>💰 Coins</span><strong>${p.coins} 🪙</strong></div>
        <div class="result-stat"><span>🎯 Accuracy</span><strong>${accuracy}% (${p.totalCorrect}/${p.totalQuestions})</strong></div>
        <div class="result-stat"><span>🔥 Best Streak</span><strong>${p.bestCombo}</strong></div>
        <div class="result-stat"><span>🏅 High Score</span><strong>${p.highScore}</strong></div>
    `;
}

let toastTimer = null;
function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

// Profile list modal render
function renderProfiles() {
    const container = document.getElementById("profileList");
    if (!container) return;
    container.innerHTML = "";
    if (profiles.length === 0) {
        container.innerHTML = "<p>No profiles found.</p>";
        return;
    }
    profiles.forEach((p, idx) => {
        const div = document.createElement("div");
        div.className = `profile-item ${idx === currentProfile ? "selected" : ""}`;
        div.innerHTML = `
            <div><strong>${escapeHTML(p.name)}</strong><br>Lv.${p.level} | ${p.xp} XP | 🪙 ${p.coins}</div>
            <button onclick="selectProfile(${idx})">${idx === currentProfile ? "Selected" : "Select"}</button>
        `;
        container.appendChild(div);
    });
}

function selectProfile(idx) {
    currentProfile = Number(idx);
    save();
    renderProfiles();
    toast(`Active Profile: ${profiles[idx].name}`);
}

function createProfile(name) {
    if (profiles.length >= 20) return toast("Maximum 20 profiles allowed.");
    if (profiles.some(p => p.name.toLowerCase() === name.toLowerCase())) return toast("Profile name exists.");
    profiles.push(newProfile(name));
    currentProfile = profiles.length - 1;
    save();
    renderProfiles();
    toast(`Welcome, ${name}!`);
}

function openProfileMenu() {
    renderProfiles();
    showScreen("profileScreen");
}
