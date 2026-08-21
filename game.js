// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 2.0
// ============================================================


// ============================================================
// COUNTRY DATABASE
// ============================================================

const countries = [

    ["Vietnam","Hanoi","Dong","Southeast Asia"],
    ["Thailand","Bangkok","Baht","Southeast Asia"],
    ["Laos","Vientiane","Kip","Southeast Asia"],
    ["Cambodia","Phnom Penh","Riel","Southeast Asia"],
    ["Myanmar","Naypyidaw","Kyat","Southeast Asia"],
    ["Malaysia","Kuala Lumpur","Ringgit","Southeast Asia"],
    ["Singapore","Singapore","Dollar","Southeast Asia"],
    ["Indonesia","Jakarta","Rupiah","Southeast Asia"],
    ["Philippines","Manila","Peso","Southeast Asia"],
    ["Brunei","Bandar Seri Begawan","Dollar","Southeast Asia"],
    ["Timor-Leste","Dili","Dollar","Southeast Asia"],

    ["China","Beijing","Yuan","East Asia"],
    ["Japan","Tokyo","Yen","East Asia"],
    ["South Korea","Seoul","Won","East Asia"],
    ["North Korea","Pyongyang","Won","East Asia"],
    ["Mongolia","Ulaanbaatar","Tugrik","East Asia"],
    ["Taiwan","Taipei","Dollar","East Asia"],

    ["India","New Delhi","Rupee","South Asia"],
    ["Pakistan","Islamabad","Rupee","South Asia"],
    ["Bangladesh","Dhaka","Taka","South Asia"],
    ["Nepal","Kathmandu","Rupee","South Asia"],
    ["Bhutan","Thimphu","Ngultrum","South Asia"],
    ["Sri Lanka","Sri Jayawardenepura Kotte","Rupee","South Asia"],
    ["Maldives","Male","Rufiyaa","South Asia"],
    ["Afghanistan","Kabul","Afghani","South Asia"],

    ["Iran","Tehran","Rial","West Asia"],
    ["Iraq","Baghdad","Dinar","West Asia"],
    ["Saudi Arabia","Riyadh","Riyal","West Asia"],
    ["United Arab Emirates","Abu Dhabi","Dirham","West Asia"],
    ["Qatar","Doha","Riyal","West Asia"],
    ["Kuwait","Kuwait City","Dinar","West Asia"],
    ["Bahrain","Manama","Dinar","West Asia"],
    ["Oman","Muscat","Rial","West Asia"],
    ["Yemen","Sanaa","Rial","West Asia"],
    ["Jordan","Amman","Dinar","West Asia"],
    ["Lebanon","Beirut","Pound","West Asia"],
    ["Syria","Damascus","Pound","West Asia"],
    ["Israel","Jerusalem","Shekel","West Asia"],
    ["Turkey","Ankara","Lira","West Asia"],
    ["Palestine","Ramallah","Shekel","West Asia"],
    ["Cyprus","Nicosia","Euro","West Asia"],

    ["Kazakhstan","Astana","Tenge","Central Asia"],
    ["Uzbekistan","Tashkent","Som","Central Asia"],
    ["Turkmenistan","Ashgabat","Manat","Central Asia"],
    ["Kyrgyzstan","Bishkek","Som","Central Asia"],
    ["Tajikistan","Dushanbe","Somoni","Central Asia"],

    ["Azerbaijan","Baku","Manat","Caucasus"],
    ["Armenia","Yerevan","Dram","Caucasus"],
    ["Georgia","Tbilisi","Lari","Caucasus"],

    ["Russia","Moscow","Ruble","North Asia"]

];


// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
    "asia_country_game_profiles_v2";

const CURRENT_PROFILE_KEY =
    "asia_current_profile_v2";

const DAILY_KEY =
    "asia_daily_v2";


// ============================================================
// GLOBAL STATE
// ============================================================

let profiles = [];

let currentProfile = -1;

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

    locked: false,

    timeLeft: 0,

    timer: null,

    daily: false

};

let dailyData = {};

let toastTimer = null;


// ============================================================
// LOAD
// ============================================================

function loadJSON(key, fallback) {

    try {

        const saved =
            localStorage.getItem(key);

        if (saved === null)
            return fallback;

        return JSON.parse(saved);

    }
    catch (error) {

        console.error(
            "Load error:",
            error
        );

        return fallback;

    }

}


profiles =
    loadJSON(
        STORAGE_KEY,
        []
    );


if (!Array.isArray(profiles)) {

    profiles = [];

}


try {

    const savedCurrent =
        localStorage.getItem(
            CURRENT_PROFILE_KEY
        );

    currentProfile =
        Number(savedCurrent);

    if (
        !Number.isInteger(
            currentProfile
        )
    ) {

        currentProfile = -1;

    }

}
catch (error) {

    currentProfile = -1;

}


dailyData =
    loadJSON(
        DAILY_KEY,
        {}
    );


// ============================================================
// PROFILE DEFAULT
// ============================================================

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

        hints: 1,

        extraLives: 0,

        doubleXP: 0,

        scoreBoost: 0,

        secondChance: 0,

        luckyAnswer: 0,

        achievements: [],

        chests: [],

        chestStats: {

            common: 0,

            rare: 0,

            epic: 0,

            legend: 0,

            mythic: 0,

            divine: 0

        },

        dailyCompleted: [],

        modesPlayed: {

            classic: 0,

            survival: 0,

            timeattack: 0,

            daily: 0

        },

        perfectGames: 0,

        highestDailyScore: 0

    };

}


// ============================================================
// SAVE
// ============================================================

function save() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(profiles)
        );

        localStorage.setItem(
            CURRENT_PROFILE_KEY,
            String(currentProfile)
        );

        localStorage.setItem(
            DAILY_KEY,
            JSON.stringify(dailyData)
        );

    }
    catch (error) {

        console.error(
            "Save error:",
            error
        );

    }

    updateHeader();

    updateMainProfile();

}


// ============================================================
// CURRENT PROFILE
// ============================================================

function getProfile() {

    if (
        currentProfile < 0 ||
        !profiles[currentProfile]
    ) {

        return null;

    }

    return profiles[currentProfile];

}


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHTML(text) {

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


// ============================================================
// SCREEN
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            screen =>
                screen.classList.remove(
                    "active"
                )
        );


    const target =
        document.getElementById(id);


    if (!target) {

        console.error(
            "Screen not found:",
            id
        );

        return;

    }


    target.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    updateHeader();

}


// ============================================================
// HOME
// ============================================================

function goHome() {

    clearInterval(game.timer);

    showScreen(
        "homeScreen"
    );

    updateMainProfile();

}


// ============================================================
// TOAST
// ============================================================

function toast(message) {

    const element =
        document.getElementById(
            "toast"
        );


    if (!element)
        return;


    element.textContent =
        message;


    element.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            2300
        );

}


// ============================================================
// HEADER
// ============================================================

function updateHeader() {

    const p =
        getProfile();


    document.getElementById(
        "topName"
    ).textContent =
        p
        ? p.name
        : "Guest";


    document.getElementById(
        "topLevel"
    ).textContent =
        p
        ? p.level
        : "1";


    document.getElementById(
        "topCoins"
    ).textContent =
        p
        ? p.coins
        : "0";

}


// ============================================================
// LEVEL
// ============================================================

function calculateLevel(xp) {

    return Math.floor(
        xp / 500
    ) + 1;

}


// ============================================================
// RANK
// ============================================================

function getRank(level) {

    if (level < 3)
        return "Beginner";

    if (level < 5)
        return "Explorer";

    if (level < 8)
        return "Traveler";

    if (level < 12)
        return "Expert";

    if (level < 20)
        return "Master";

    if (level < 30)
        return "Grand Master";

    if (level < 40)
        return "Champion";

    if (level < 50)
        return "Elite";

    if (level < 60)
        return "Legendary";

    if (level < 70)
        return "Mythic";

    if (level < 80)
        return "Divine";

    if (level < 90)
        return "Celestial";

    if (level < 100)
        return "Immortal";

    return "Transcendent";

}


// ============================================================
// RANK EFFECT
// ============================================================

function getRankMultiplier(level) {

    if (level >= 100)
        return 1.30;

    if (level >= 90)
        return 1.25;

    if (level >= 80)
        return 1.20;

    if (level >= 70)
        return 1.15;

    if (level >= 60)
        return 1.15;

    if (level >= 50)
        return 1.10;

    if (level >= 40)
        return 1.10;

    if (level >= 30)
        return 1.05;

    if (level >= 20)
        return 1.05;

    return 1;

}


function rankEffect(level) {

    if (level < 20)
        return "No special bonus";

    const bonus =
        Math.round(
            (
                getRankMultiplier(level) - 1
            ) * 100
        );

    return `+${bonus}% XP / Coins`;

}


// ============================================================
// XP
// ============================================================

function addXP(amount) {

    const p =
        getProfile();


    if (!p)
        return;


    const multiplier =
        getRankMultiplier(
            p.level
        );


    const gained =
        Math.floor(
            amount *
            multiplier
        );


    const oldLevel =
        p.level;


    p.xp += gained;


    p.level =
        calculateLevel(
            p.xp
        );


    if (
        p.level >
        oldLevel
    ) {

        const reward =
            (
                p.level -
                oldLevel
            ) * 500;


        p.coins += reward;

        p.totalCoinsEarned +=
            reward;


        toast(
            `🎉 LEVEL UP! Level ${p.level}! +${reward} Coins`
        );

    }

}


// ============================================================
// COINS
// ============================================================

function addCoins(amount) {

    const p =
        getProfile();


    if (!p)
        return;


    const multiplier =
        getRankMultiplier(
            p.level
        );


    const gained =
        Math.floor(
            amount *
            multiplier
        );


    p.coins += gained;

    p.totalCoinsEarned +=
        gained;

}


// ============================================================
// MAIN PROFILE
// ============================================================

function updateMainProfile() {

    const container =
        document.getElementById(
            "mainProfileInfo"
        );


    if (!container)
        return;


    const p =
        getProfile();


    if (!p) {

        container.innerHTML = `
            <p>No profile selected.</p>
            <p>Create a profile to start playing.</p>
        `;

        return;

    }


    const accuracy =
        p.totalQuestions > 0
        ? Math.round(
            p.totalCorrect /
            p.totalQuestions *
            100
        )
        : 0;


    container.innerHTML = `

        <div class="result-stat">
            <span>👤 Name</span>
            <strong>${escapeHTML(p.name)}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Rank</span>
            <strong>${getRank(p.level)}</strong>
        </div>

        <div class="result-stat">
            <span>⚡ Rank Effect</span>
            <strong>${rankEffect(p.level)}</strong>
        </div>

        <div class="result-stat">
            <span>⭐ Level</span>
            <strong>${p.level}</strong>
        </div>

        <div class="result-stat">
            <span>✨ XP</span>
            <strong>${p.xp}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>${p.coins}</strong>
        </div>

        <div class="result-stat">
            <span>🎮 Games</span>
            <strong>${p.totalGames}</strong>
        </div>

        <div class="result-stat">
            <span>🎯 Accuracy</span>
            <strong>${accuracy}%</strong>
        </div>

        <div class="result-stat">
            <span>🏅 High Score</span>
            <strong>${p.highScore}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Achievements</span>
            <strong>
                ${p.achievements.length}/${ACHIEVEMENTS.length}
            </strong>
        </div>

    `;

}


// ============================================================
// PROFILE
// ============================================================

function openProfileMenu() {

    renderProfiles();

    showScreen(
        "profileScreen"
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

        toast(
            "Enter a profile name."
        );

        return;

    }


    createProfile(
        name
    );


    input.value = "";

}


function createProfile(name) {

    if (
        profiles.length >= 20
    ) {

        toast(
            "Maximum 20 profiles."
        );

        return;

    }


    if (
        profiles.some(
            p =>
                p.name.toLowerCase() ===
                name.toLowerCase()
        )
    ) {

        toast(
            "Profile already exists."
        );

        return;

    }


    profiles.push(
        newProfile(name)
    );


    currentProfile =
        profiles.length - 1;


    save();

    renderProfiles();


    toast(
        `Welcome, ${name}!`
    );

}


function selectProfile(index) {

    index =
        Number(index);


    if (
        !profiles[index]
    )
        return;


    currentProfile =
        index;


    save();

    renderProfiles();


    toast(
        `Selected: ${profiles[index].name}`
    );

}


function deleteProfile() {

    const p =
        getProfile();


    if (!p) {

        toast(
            "Select a profile first."
        );

        return;

    }


    if (
        !confirm(
            `Delete ${p.name}?`
        )
    )
        return;


    profiles.splice(
        currentProfile,
        1
    );


    if (
        profiles.length === 0
    ) {

        currentProfile =
            -1;

    }
    else if (
        currentProfile >=
        profiles.length
    ) {

        currentProfile =
            profiles.length - 1;

    }


    save();

    renderProfiles();

}


function renderProfiles() {

    const container =
        document.getElementById(
            "profileList"
        );


    if (!container)
        return;


    if (
        profiles.length === 0
    ) {

        container.innerHTML =
            "<p>No profiles yet.</p>";

        return;

    }


    container.innerHTML =
        profiles
            .map(
                (p,index) => `

                <div class="profile-item
                    ${index === currentProfile
                        ? "selected"
                        : ""}">

                    <div>

                        <strong>
                            ${escapeHTML(p.name)}
                        </strong>

                        <br>

                        Lv.${p.level}
                        |
                        ${p.xp} XP
                        |
                        🪙 ${p.coins}

                    </div>

                    <button
                        onclick="selectProfile(${index})">

                        ${
                            index === currentProfile
                            ? "Selected"
                            : "Select"
                        }

                    </button>

                </div>

            `
            )
            .join("");

}


// ============================================================
// GAME MODES
// ============================================================

const MODES = {

    classic: {

        name: "Classic Mode",

        questions: 10,

        lives: 3

    },

    survival: {

        name: "Survival Mode",

        questions: 20,

        lives: 5

    },

    timeattack: {

        name: "Time Attack",

        questions: 10,

        lives: 3

    },

    daily: {

        name: "Daily Challenge",

        questions: 10,

        lives: 3

    }

};


// ============================================================
// MODE MENU
// ============================================================

function openModeMenu() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    showScreen(
        "modeScreen"
    );

}


// ============================================================
// DIFFICULTY
// ============================================================

function openDifficulty(mode) {

    const modeInput =
        document.getElementById(
            "selectedMode"
        );


    modeInput.value =
        mode;


    const title =
        document.getElementById(
            "difficultyTitle"
        );


    title.textContent =
        `🎯 ${MODES[mode].name} — Difficulty`;


    showScreen(
        "difficultyScreen"
    );

}


function startSelectedMode() {

    const mode =
        document.getElementById(
            "selectedMode"
        ).value;


    const difficulty =
        Number(
            document.getElementById(
                "difficultySelect"
            ).value
        );


    startGame(
        difficulty,
        mode
    );

}


// ============================================================
// START GAME
// ============================================================

function startGame(
    difficulty,
    mode
) {

    const p =
        getProfile();


    if (!p) {

        openProfileMenu();

        return;

    }


    difficulty =
        Number(difficulty);


    if (
        difficulty < 1 ||
        difficulty > 3
    ) {

        difficulty = 1;

    }


    const settings =
        MODES[mode] ||
        MODES.classic;


    game = {

        mode: mode,

        difficulty: difficulty,

        question: 0,

        totalQuestions:
            settings.questions,

        score: 0,

        lives:
            settings.lives,

        combo: 0,

        bestCombo: 0,

        correct: 0,

        wrong: 0,

        used: [],

        currentCountry: -1,

        options: [],

        type: 1,

        hintUsed: false,

        locked: false,

        timeLeft:
            mode === "timeattack"
            ? 60
            : 0,

        timer: null,

        daily:
            mode === "daily"

    };


    if (
        p.extraLives > 0 &&
        mode !== "survival"
    ) {

        if (
            confirm(
                `You have ${p.extraLives} Extra Life(s). Use one?`
            )
        ) {

            p.extraLives--;

            game.lives++;

            save();

        }

    }


    showScreen(
        "gameScreen"
    );


    nextQuestion();


    if (
        mode === "timeattack"
    ) {

        startTimer();

    }

}


// ============================================================
// TIMER
// ============================================================

function startTimer() {

    clearInterval(
        game.timer
    );


    game.timer =
        setInterval(
            () => {

                if (
                    game.locked
                )
                    return;


                game.timeLeft--;


                const timer =
                    document.getElementById(
                        "timer"
                    );


                if (timer) {

                    timer.textContent =
                        game.timeLeft;

                }


                if (
                    game.timeLeft <= 0
                ) {

                    clearInterval(
                        game.timer
                    );


                    game.locked =
                        true;


                    toast(
                        "⏱️ Time's up!"
                    );


                    setTimeout(
                        finishGame,
                        500
                    );

                }

            },
            1000
        );

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    if (
        game.question >=
        game.totalQuestions
    ) {

        finishGame();

        return;

    }


    if (
        game.lives <= 0
    ) {

        finishGame();

        return;

    }


    game.question++;

    game.hintUsed =
        false;

    game.locked =
        false;


    let correct;


    do {

        correct =
            Math.floor(
                Math.random() *
                countries.length
            );

    }
    while (
        game.used.includes(
            correct
        )
    );


    game.used.push(
        correct
    );


    game.currentCountry =
        correct;


    game.options =
        [correct];


    while (
        game.options.length < 4
    ) {

        const random =
            Math.floor(
                Math.random() *
                countries.length
            );


        if (
            !game.options.includes(
                random
            )
        ) {

            game.options.push(
                random
            );

        }

    }


    shuffle(
        game.options
    );


    /*
        IMPORTANT FIX:

        Hard Mode no longer uses
        Currency or Region questions.

        This guarantees one correct
        answer because Capital and
        Country questions map uniquely.
    */

    if (
        game.difficulty === 1
    ) {

        game.type = 1;

    }
    else {

        game.type =
            1 +
            Math.floor(
                Math.random() * 2
            );

    }


    renderQuestion();

}


// ============================================================
// SHUFFLE
// ============================================================

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQuestion() {

    const country =
        countries[
            game.currentCountry
        ];


    const p =
        getProfile();


    document.getElementById(
        "questionNumber"
    ).textContent =
        `${game.question}/${game.totalQuestions}`;


    document.getElementById(
        "lives"
    ).textContent =
        game.lives;


    document.getElementById(
        "combo"
    ).textContent =
        game.combo;


    document.getElementById(
        "score"
    ).textContent =
        game.score;


    document.getElementById(
        "gameXP"
    ).textContent =
        p
        ? p.xp
        : 0;


    document.getElementById(
        "gameCoins"
    ).textContent =
        p
        ? p.coins
        : 0;


    document.getElementById(
        "gameLevel"
    ).textContent =
        p
        ? p.level
        : 1;


    const timerBox =
        document.getElementById(
            "timerBox"
        );


    if (
        game.mode ===
        "timeattack"
    ) {

        timerBox.style.display =
            "block";

        document.getElementById(
            "timer"
        ).textContent =
            game.timeLeft;

    }
    else {

        timerBox.style.display =
            "none";

    }


    let title;

    let value;


    if (
        game.type === 1
    ) {

        title =
            "Which country has this capital?";

        value =
            country[1];

    }
    else {

        title =
            "What is the capital of this country?";

        value =
            country[0];

    }


    document.getElementById(
        "questionType"
    ).textContent =
        title;


    document.getElementById(
        "questionText"
    ).textContent =
        "Choose the correct answer:";


    document.getElementById(
        "questionValue"
    ).textContent =
        value;


    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML =
        "";


    game.options.forEach(
        (countryIndex, position) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                `${position + 1}. ${countries[countryIndex][0]}`;


            button.onclick =
                () => {

                    answerQuestion(
                        position
                    );

                };


            answers.appendChild(
                button
            );

        }
    );

}


// ============================================================
// ANSWER
// ============================================================

function answerQuestion(
    position
) {

    if (
        game.locked
    )
        return;


    const selected =
        game.options[
            position
        ];


    if (
        selected ===
        game.currentCountry
    ) {

        correctAnswer();

        return;

    }


    const p =
        getProfile();


    if (
        p &&
        p.luckyAnswer > 0
    ) {

        if (
            confirm(
                "Wrong answer!\nUse Lucky Answer?"
            )
        ) {

            p.luckyAnswer--;

            save();

            correctAnswer(
                true
            );

            return;

        }

    }


    wrongAnswer();

}


// ============================================================
// CORRECT
// ============================================================

function correctAnswer(
    lucky = false
) {

    if (
        game.locked
    )
        return;


    game.locked =
        true;


    const p =
        getProfile();


    game.combo++;

    game.correct++;


    if (
        game.combo >
        game.bestCombo
    ) {

        game.bestCombo =
            game.combo;

    }


    let baseScore;


    if (
        game.difficulty === 1
    ) {

        baseScore = 100;

    }
    else if (
        game.difficulty === 2
    ) {

        baseScore = 150;

    }
    else {

        baseScore = 200;

    }


    if (
        game.mode ===
        "survival"
    ) {

        baseScore =
            Math.floor(
                baseScore * 1.25
            );

    }


    if (
        game.mode ===
        "timeattack"
    ) {

        baseScore +=
            Math.max(
                0,
                game.timeLeft
            );

    }


    let gained =
        baseScore +
        (
            game.combo >= 2
            ? game.combo * 25
            : 0
        );


    if (
        p.scoreBoost > 0
    ) {

        if (
            confirm(
                "Use Score Boost?"
            )
        ) {

            p.scoreBoost--;

            gained =
                Math.floor(
                    gained * 1.25
                );

        }

    }


    game.score +=
        gained;


    let xp =
        50 +
        game.combo * 10;


    if (
        p.doubleXP > 0
    ) {

        if (
            confirm(
                "Use Double XP?"
            )
        ) {

            p.doubleXP--;

            xp *= 2;

        }

    }


    addXP(
        xp
    );


    addCoins(
        20 +
        game.combo * 5
    );


    p.totalCorrect++;

    p.totalQuestions++;


    save();


    toast(
        lucky
        ? `🍀 Lucky! +${gained} points`
        : `✅ Correct! +${gained} points`
    );


    setTimeout(
        nextQuestion,
        650
    );

}


// ============================================================
// WRONG
// ============================================================

function wrongAnswer() {

    if (
        game.locked
    )
        return;


    game.locked =
        true;


    const p =
        getProfile();


    if (
        p.secondChance > 0
    ) {

        if (
            confirm(
                "Wrong answer!\nUse Second Chance?"
            )
        ) {

            p.secondChance--;

            game.wrong++;

            game.combo = 0;

            p.totalWrong++;

            p.totalQuestions++;

            save();


            toast(
                "🔄 Second Chance activated!"
            );


            setTimeout(
                nextQuestion,
                650
            );


            return;

        }

    }


    game.wrong++;

    game.combo = 0;

    game.lives--;


    p.totalWrong++;

    p.totalQuestions++;


    save();


    toast(
        `❌ Wrong! Correct answer: ${countries[game.currentCountry][0]}`
    );


    setTimeout(
        nextQuestion,
        850
    );

}


// ============================================================
// HINT
// ============================================================

function useHint() {

    if (
        game.locked
    )
        return;


    const p =
        getProfile();


    if (!p)
        return;


    if (
        game.hintUsed
    ) {

        toast(
            "Hint already used."
        );

        return;

    }


    if (
        p.hints <= 0
    ) {

        toast(
            "You don't have any Hint."
        );

        return;

    }


    p.hints--;

    game.hintUsed =
        true;


    game.score =
        Math.max(
            0,
            game.score - 25
        );


    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers button"
            )
        );


    const wrongButtons =
        buttons.filter(
            (button,index) =>
                game.options[index] !==
                game.currentCountry
        );


    shuffle(
        wrongButtons
    );


    wrongButtons
        .slice(0,2)
        .forEach(
            button =>
                button.classList.add(
                    "removed"
                )
        );


    save();


    document.getElementById(
        "score"
    ).textContent =
        game.score;


    toast(
        "💡 Hint used! -25 points"
    );

}


// ============================================================
// SHOP
// ============================================================

function openShop() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    updateShop();

    showScreen(
        "shopScreen"
    );

}


function updateShop() {

    const p =
        getProfile();


    if (!p)
        return;


    document.getElementById(
        "shopCoins"
    ).textContent =
        p.coins;

}


function buyItem(
    item,
    price
) {

    const p =
        getProfile();


    if (!p)
        return;


    if (
        p.coins < price
    ) {

        toast(
            "Not enough Coins."
        );

        return;

    }


    p.coins -=
        price;


    p[item]++;


    save();

    updateShop();


    toast(
        "🛒 Item purchased!"
    );

}


// ============================================================
// INVENTORY
// ============================================================

function openInventory() {

    const p =
        getProfile();


    if (!p) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    renderInventory();

    showScreen(
        "inventoryScreen"
    );

}


function renderInventory() {

    const p =
        getProfile();


    const container =
        document.getElementById(
            "inventoryList"
        );


    container.innerHTML = `

        <div class="inventory-item">
            <span>💡 Hint</span>
            <strong>${p.hints}</strong>
        </div>

        <div class="inventory-item">
            <span>❤️ Extra Life</span>
            <strong>${p.extraLives}</strong>
        </div>

        <div class="inventory-item">
            <span>✨ Double XP</span>
            <strong>${p.doubleXP}</strong>
        </div>

        <div class="inventory-item">
            <span>📈 Score Boost</span>
            <strong>${p.scoreBoost}</strong>
        </div>

        <div class="inventory-item">
            <span>🔄 Second Chance</span>
            <strong>${p.secondChance}</strong>
        </div>

        <div class="inventory-item">
            <span>🍀 Lucky Answer</span>
            <strong>${p.luckyAnswer}</strong>
        </div>

    `;

}


// ============================================================
// ACHIEVEMENTS
// ============================================================

const ACHIEVEMENTS = [

    [
        "first_game",
        "First Steps",
        "Complete your first game.",
        1,
        200
    ],

    [
        "perfect",
        "Perfect",
        "Get 10/10 in one game.",
        1,
        500
    ],

    [
        "games10",
        "Dedicated",
        "Complete 10 games.",
        10,
        500
    ],

    [
        "correct50",
        "Knowledge Seeker",
        "Answer 50 questions correctly.",
        50,
        750
    ],

    [
        "combo10",
        "Combo Master",
        "Reach a 10 combo.",
        10,
        1000
    ],

    [
        "coins5000",
        "Rich Explorer",
        "Earn 5,000 total coins.",
        5000,
        1000
    ],

    [
        "level20",
        "Master",
        "Reach Level 20.",
        20,
        1000
    ],

    [
        "level50",
        "Elite",
        "Reach Level 50.",
        50,
        2500
    ],

    [
        "level100",
        "Transcendent",
        "Reach Level 100.",
        100,
        10000
    ],

    [
        "daily7",
        "Daily Hero",
        "Complete 7 Daily Challenges.",
        7,
        1500
    ],

    [
        "chest10",
        "Treasure Hunter",
        "Open 10 Chests.",
        10,
        1200
    ],

    [
        "hard10",
        "Hardcore",
        "Complete 10 Hard games.",
        10,
        1500
    ]

];


function achievementProgress(
    id,
    p
) {

    switch (id) {

        case "first_game":
            return p.totalGames;

        case "perfect":
            return p.perfectGames;

        case "games10":
            return p.totalGames;

        case "correct50":
            return p.totalCorrect;

        case "combo10":
            return p.bestCombo;

        case "coins5000":
            return p.totalCoinsEarned;

        case "level20":
        case "level50":
        case "level100":
            return p.level;

        case "daily7":
            return p.dailyCompleted.length;

        case "chest10":

            return Object.values(
                p.chestStats
            )
            .reduce(
                (a,b) =>
                    a + b,
                0
            );

        case "hard10":
            return p.modesPlayed.hard || 0;

        default:
            return 0;

    }

}


function checkAchievements() {

    const p =
        getProfile();


    if (!p)
        return;


    ACHIEVEMENTS.forEach(
        achievement => {

            const id =
                achievement[0];

            const reward =
                achievement[4];

            if (
                p.achievements.includes(
                    id
                )
            )
                return;


            if (
                achievementProgress(
                    id,
                    p
                ) >= achievement[3]
            ) {

                p.achievements.push(
                    id
                );


                p.coins +=
                    reward;


                p.totalCoinsEarned +=
                    reward;


                toast(
                    `🏆 Achievement unlocked: ${achievement[1]}! +${reward} Coins`
                );

            }

        }
    );


    save();

}


function openAchievements() {

    const p =
        getProfile();


    if (!p) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    const container =
        document.getElementById(
            "achievementList"
        );


    container.innerHTML =
        ACHIEVEMENTS
            .map(
                achievement => {

                    const done =
                        p.achievements.includes(
                            achievement[0]
                        );


                    const progress =
                        Math.min(
                            achievementProgress(
                                achievement[0],
                                p
                            ),
                            achievement[3]
                        );


                    return `

                        <div class="achievement
                            ${done ? "done" : ""}">

                            <h3>
                                ${done ? "🏆" : "🔒"}
                                ${achievement[1]}
                            </h3>

                            <p>
                                ${achievement[2]}
                            </p>

                            <small>
                                Progress:
                                ${progress}/${achievement[3]}
                                · Reward:
                                ${achievement[4]} 🪙
                            </small>

                        </div>

                    `;

                }
            )
            .join("");


    showScreen(
        "achievementScreen"
    );

}


// ============================================================
// CHESTS
// ============================================================

const CHESTS = {

    common: {

        name: "Common",

        cost: 500,

        weight: 55

    },

    rare: {

        name: "Rare",

        cost: 1000,

        weight: 25

    },

    epic: {

        name: "Epic",

        cost: 2000,

        weight: 12

    },

    legend: {

        name: "Legend",

        cost: 4000,

        weight: 5

    },

    mythic: {

        name: "Mythic",

        cost: 8000,

        weight: 2.5

    },

    divine: {

        name: "Divine",

        cost: 15000,

        weight: 0.5

    }

};


function randomChest() {

    const random =
        Math.random() * 100;


    let total = 0;


    for (
        const type of Object.keys(
            CHESTS
        )
    ) {

        total +=
            CHESTS[type].weight;


        if (
            random < total
        ) {

            return type;

        }

    }


    return "common";

}


function chestReward(
    type
) {

    const p =
        getProfile();


    const rewards = {

        common: [
            ["coins",250,600],
            ["hints",1,2],
            ["extraLives",1,1]
        ],

        rare: [
            ["coins",700,1500],
            ["doubleXP",1,2],
            ["scoreBoost",1,2],
            ["hints",2,4]
        ],

        epic: [
            ["coins",1500,3500],
            ["secondChance",1,2],
            ["luckyAnswer",1,2],
            ["doubleXP",2,3]
        ],

        legend: [
            ["coins",4000,8000],
            ["luckyAnswer",2,4],
            ["secondChance",2,4]
        ],

        mythic: [
            ["coins",8000,15000],
            ["luckyAnswer",3,6],
            ["doubleXP",3,6]
        ],

        divine: [
            ["coins",20000,40000],
            ["luckyAnswer",5,10],
            ["secondChance",5,10]
        ]

    };


    const pool =
        rewards[type];


    const reward =
        pool[
            Math.floor(
                Math.random() *
                pool.length
            )
        ];


    const amount =
        reward[1] +
        Math.floor(
            Math.random() *
            (
                reward[2] -
                reward[1] +
                1
            )
        );


    if (
        reward[0] ===
        "coins"
    ) {

        addCoins(
            amount
        );

    }
    else {

        p[
            reward[0]
        ] += amount;

    }


    p.chestStats[type]++;


    save();


    return reward[0] ===
        "coins"
        ? `🪙 ${amount} Coins`
        : `${amount} × ${reward[0]}`;

}


function earnChest() {

    const p =
        getProfile();


    if (!p)
        return;


    const type =
        randomChest();


    p.chests.push(
        type
    );


    save();


    toast(
        `🎁 You earned a ${CHESTS[type].name} Chest!`
    );

}


function openChest(
    type
) {

    const p =
        getProfile();


    if (!p)
        return;


    const index =
        p.chests.indexOf(
            type
        );


    if (
        index === -1
    ) {

        toast(
            `You don't have a ${CHESTS[type].name} Chest.`
        );

        return;

    }


    p.chests.splice(
        index,
        1
    );


    const reward =
        chestReward(
            type
        );


    toast(
        `🎁 ${CHESTS[type].name} Chest: ${reward}`
    );


    openChests();

}


function buyChest(
    type
) {

    const p =
        getProfile();


    if (!p)
        return;


    const price =
        CHESTS[type].cost;


    if (
        p.coins < price
    ) {

        toast(
            "Not enough Coins."
        );

        return;

    }


    p.coins -=
        price;


    p.chests.push(
        type
    );


    save();


    toast(
        `🎁 Purchased ${CHESTS[type].name} Chest!`
    );


    openChests();

}


function openChests() {

    const p =
        getProfile();


    if (!p) {

        openProfileMenu();

        return;

    }


    const inventory =
        document.getElementById(
            "chestList"
        );


    inventory.innerHTML =
        Object.entries(
            CHESTS
        )
        .map(
            ([type,data]) => `

                <div class="
                    chest-item
                    rarity-${type}">

                    <h3>
                        🎁 ${data.name} Chest
                    </h3>

                    <p>
                        Owned:
                        <strong>
                            ${
                                p.chests.filter(
                                    c => c === type
                                ).length
                            }
                        </strong>
                    </p>

                    <button
                        onclick="openChest('${type}')">

                        Open

                    </button>

                </div>

            `
        )
        .join("");


    const shop =
        document.getElementById(
            "chestShop"
        );


    shop.innerHTML =
        Object.entries(
            CHESTS
        )
        .map(
            ([type,data]) => `

                <div class="
                    shop-item
                    rarity-${type}">

                    <h3>
                        🎁 ${data.name}
                    </h3>

                    <p>
                        Price:
                        ${data.cost} 🪙
                    </p>

                    <button
                        onclick="buyChest('${type}')">

                        Buy Chest

                    </button>

                </div>

            `
        )
        .join("");


    showScreen(
        "chestScreen"
    );

}


// ============================================================
// DAILY CHALLENGE
// ============================================================

function todayKey() {

    const date =
        new Date();


    return [

        date.getFullYear(),

        String(
            date.getMonth() + 1
        ).padStart(2,"0"),

        String(
            date.getDate()
        ).padStart(2,"0")

    ].join("-");

}


function dailyConfig() {

    const key =
        todayKey();


    let seed = 0;


    for (
        let i = 0;
        i < key.length;
        i++
    ) {

        seed =
            (
                seed * 31 +
                key.charCodeAt(i)
            ) >>> 0;

    }


    return {

        difficulty:
            1 +
            (
                seed % 3
            ),

        bonus:
            500 +
            (
                seed % 6
            ) * 250

    };

}


function openDaily() {

    const p =
        getProfile();


    if (!p) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    const key =
        todayKey();


    const config =
        dailyConfig();


    const completed =
        p.dailyCompleted.includes(
            key
        );


    document.getElementById(
        "dailyInfo"
    ).innerHTML = `

        <h3>📅 ${key}</h3>

        <p>
            Difficulty:
            <strong>
                ${
                    ["","Easy","Normal","Hard"]
                    [config.difficulty]
                }
            </strong>
        </p>

        <p>
            Completion Bonus:
            <strong>
                ${config.bonus} 🪙
            </strong>
        </p>

        <p>
            ${
                completed
                ? "✅ Completed today."
                : "🔥 Challenge available!"
            }
        </p>

    `;


    showScreen(
        "dailyScreen"
    );

}


function startDaily() {

    const p =
        getProfile();


    if (!p)
        return;


    const key =
        todayKey();


    if (
        p.dailyCompleted.includes(
            key
        )
    ) {

        toast(
            "Today's challenge is already completed."
        );

        return;

    }


    const config =
        dailyConfig();


    game = {

        mode: "daily",

        difficulty:
            config.difficulty,

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

        locked: false,

        timeLeft: 0,

        timer: null,

        daily: true

    };


    showScreen(
        "gameScreen"
    );


    nextQuestion();

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    clearInterval(
        game.timer
    );


    const p =
        getProfile();


    if (!p)
        return;


    const completionReward =
        100 +
        (
            game.correct ===
            game.totalQuestions
            ? 250
            : 0
        ) +
        (
            game.difficulty === 3
            ? 100
            : 0
        ) +
        (
            game.mode === "survival"
            ? 150
            : 0
        ) +
        (
            game.mode === "timeattack"
            ? 150
            : 0
        );


    addCoins(
        completionReward
    );


    p.totalGames++;


    if (
        !p.modesPlayed[
            game.mode
        ]
    ) {

        p.modesPlayed[
            game.mode
        ] = 0;

    }


    p.modesPlayed[
        game.mode
    ]++;


    if (
        game.correct ===
        game.totalQuestions
    ) {

        p.perfectGames++;

    }


    if (
        game.score >
        p.highScore
    ) {

        p.highScore =
            game.score;

    }


    if (
        game.mode ===
        "daily"
    ) {

        const key =
            todayKey();


        if (
            !p.dailyCompleted.includes(
                key
            )
        ) {

            p.dailyCompleted.push(
                key
            );


            const config =
                dailyConfig();


            addCoins(
                config.bonus
            );

        }

    }


    /*
        Chest earning:
        Every completed non-daily game
        has a 35% chance to award a Chest.
    */

    let chestAward = null;


    if (
        game.mode !== "daily" &&
        Math.random() < 0.35
    ) {

        chestAward =
            randomChest();


        p.chests.push(
            chestAward
        );

    }


    save();


    checkAchievements();


    document.getElementById(
        "resultInfo"
    ).innerHTML = `

        <div class="result-message">

            ${
                game.correct ===
                game.totalQuestions
                ? "🎉 PERFECT GAME!"
                : "🏁 RUN COMPLETE"
            }

        </div>

        <div class="result-stat">
            <span>🎮 Mode</span>
            <strong>
                ${MODES[game.mode].name}
            </strong>
        </div>

        <div class="result-stat">
            <span>⭐ Score</span>
            <strong>${game.score}</strong>
        </div>

        <div class="result-stat">
            <span>✅ Correct</span>
            <strong>${game.correct}</strong>
        </div>

        <div class="result-stat">
            <span>❌ Wrong</span>
            <strong>${game.wrong}</strong>
        </div>

        <div class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>${game.bestCombo}</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>${p.coins}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 Rank</span>
            <strong>${getRank(p.level)}</strong>
        </div>

        ${
            chestAward
            ? `
                <div class="result-message">
                    🎁 You earned a
                    ${CHESTS[chestAward].name}
                    Chest!
                </div>
            `
            : ""
        }

    `;


    showScreen(
        "resultScreen"
    );

}


// ============================================================
// QUIT
// ============================================================

function confirmQuitGame() {

    if (
        game.locked
    )
        return;


    if (
        confirm(
            "Quit this game?\nCurrent progress will be lost."
        )
    ) {

        clearInterval(
            game.timer
        );


        game.locked =
            true;


        goHome();

    }

}


// ============================================================
// COUNTRY DATABASE
// ============================================================

function openCountries() {

    const container =
        document.getElementById(
            "countryList"
        );


    document.getElementById(
        "countryCount"
    ).textContent =
        countries.length;


    container.innerHTML =
        countries
            .map(
                (country,index) => `

                    <div class="country-card">

                        <h3>
                            ${index + 1}.
                            ${escapeHTML(country[0])}
                        </h3>

                        <p>
                            🏛️ Capital:
                            ${escapeHTML(country[1])}
                        </p>

                        <p>
                            💰 Currency:
                            ${escapeHTML(country[2])}
                        </p>

                        <p>
                            🌏 Region:
                            ${escapeHTML(country[3])}
                        </p>

                    </div>

                `
            )
            .join("");


    showScreen(
        "countriesScreen"
    );

}


// ============================================================
// RULES / UPDATE / INFO
// ============================================================

function openRules() {

    showScreen(
        "rulesScreen"
    );

}


function openUpdateLog() {

    showScreen(
        "updateScreen"
    );

}


function openInfo() {

    showScreen(
        "infoScreen"
    );

}


// ============================================================
// OWNER PANEL
// ============================================================
//
// NOT included in Update Log.
// Shortcut: SHIFT + A
//
// Browser-only local owner tools.
// This is NOT real server security.
// ============================================================

function openOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    panel.classList.add(
        "owner-visible"
    );

}


function ownerClose() {

    document
        .getElementById(
            "ownerPanel"
        )
        .classList.remove(
            "owner-visible"
        );

}


function ownerGiveCoins() {

    const p =
        getProfile();


    if (!p)
        return;


    const amount =
        Math.max(
            0,
            Number(
                document.getElementById(
                    "ownerCoins"
                ).value
            ) || 0
        );


    addCoins(
        amount
    );


    save();


    toast(
        `Owner: +${amount} Coins`
    );

}


function ownerGiveXP() {

    const p =
        getProfile();


    if (!p)
        return;


    const amount =
        Math.max(
            0,
            Number(
                document.getElementById(
                    "ownerXP"
                ).value
            ) || 0
        );


    addXP(
        amount
    );


    save();


    toast(
        `Owner: +${amount} XP`
    );

}


function ownerAddChest() {

    const p =
        getProfile();


    if (!p)
        return;


    const type =
        document.getElementById(
            "ownerChest"
        ).value;


    if (
        !CHESTS[type]
    )
        return;


    p.chests.push(
        type
    );


    save();


    toast(
        `Owner: ${CHESTS[type].name} Chest added`
    );

}


function ownerResetDaily() {

    const p =
        getProfile();


    if (!p)
        return;


    const key =
        todayKey();


    p.dailyCompleted =
        p.dailyCompleted.filter(
            item =>
                item !== key
        );


    save();


    toast(
        "Owner: Daily Challenge reset."
    );

}


function ownerClearAchievements() {

    const p =
        getProfile();


    if (!p)
        return;


    p.achievements = [];


    save();


    toast(
        "Owner: Achievements reset."
    );

}


window.addEventListener(
    "keydown",
    event => {

        if (
            event.shiftKey &&
            event.key.toLowerCase() ===
            "a"
        ) {

            event.preventDefault();

            openOwnerPanel();

        }

    }
);


// ============================================================
// INITIALIZATION
// ============================================================

function initialize() {

    if (
        currentProfile >=
        profiles.length
    ) {

        currentProfile = -1;

    }


    updateHeader();

    updateMainProfile();

}


initialize();
