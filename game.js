// ============================================================
// ASIA COUNTRY GUESSING GAME
// Web Edition
// game.js
// ============================================================


// ============================================================
// OWNER SECURITY
// ============================================================

// ĐỔI MẬT KHẨU NÀY
const OWNER_PASSWORD = "AsiaOwner2026!";

// Tên của thiết bị Owner
const OWNER_DEVICE_KEY =
    "ASIA_OWNER_DEVICE_2026";

// Key lưu trạng thái Owner
const OWNER_AUTH_KEY =
    "asia_owner_authorized";


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

    ["China","Beijing","Yuan","East Asia"],
    ["Japan","Tokyo","Yen","East Asia"],
    ["South Korea","Seoul","Won","East Asia"],
    ["North Korea","Pyongyang","Won","East Asia"],
    ["Mongolia","Ulaanbaatar","Tugrik","East Asia"],

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

    ["Kazakhstan","Astana","Tenge","Central Asia"],
    ["Uzbekistan","Tashkent","Som","Central Asia"],
    ["Turkmenistan","Ashgabat","Manat","Central Asia"],
    ["Kyrgyzstan","Bishkek","Som","Central Asia"],
    ["Tajikistan","Dushanbe","Somoni","Central Asia"],

    ["Azerbaijan","Baku","Manat","Caucasus"],
    ["Armenia","Yerevan","Dram","Caucasus"],
    ["Georgia","Tbilisi","Lari","Caucasus"],

    ["Russia","Moscow","Ruble","North Asia"],
    ["Cyprus","Nicosia","Euro","West Asia"],
    ["Timor-Leste","Dili","Dollar","Southeast Asia"],
    ["Palestine","Ramallah","Shekel","West Asia"],
    ["Taiwan","Taipei","Dollar","East Asia"]

];


// ============================================================
// STORAGE
// ============================================================

const STORAGE_KEY =
    "asia_country_game_profiles";

const CURRENT_PROFILE_KEY =
    "asia_current_profile";


let profiles =
    loadProfiles();


let currentProfile =
    Number(
        localStorage.getItem(
            CURRENT_PROFILE_KEY
        )
    );


if (
    !Number.isInteger(currentProfile) ||
    currentProfile < 0 ||
    !profiles[currentProfile]
) {

    currentProfile = -1;

}


// ============================================================
// LOAD PROFILES
// ============================================================

function loadProfiles() {

    try {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!data)
            return [];

        const parsed =
            JSON.parse(data);

        return Array.isArray(parsed)
            ? parsed
            : [];

    }
    catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

        return [];

    }

}


// ============================================================
// DEFAULT PROFILE
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

        bestCombo: 0,

        totalQuestions: 0,

        coins: 500,

        hints: 1,

        extraLives: 0,

        doubleXP: 0,

        scoreBoost: 0,

        secondChance: 0,

        luckyAnswer: 0,

        dailyStreak: 0,

        dailyBest: 0,

        totalCoinsEarned: 500

    };

}


// ============================================================
// SAVE
// ============================================================

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profiles)
    );

    localStorage.setItem(
        CURRENT_PROFILE_KEY,
        String(currentProfile)
    );

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
// SCREEN SYSTEM
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
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


    target.classList.add("active");

    updateHeader();

}


// ============================================================
// HOME
// ============================================================

function goHome() {

    showScreen("homeScreen");

    updateMainProfile();

}


// ============================================================
// TOAST
// ============================================================

let toastTimer = null;


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


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            2200
        );

}


// ============================================================
// HEADER
// ============================================================

function updateHeader() {

    const p =
        getProfile();


    if (!p) {

        document.getElementById(
            "headerProfile"
        ).textContent =
            "Guest";


        document.getElementById(
            "headerCoins"
        ).textContent =
            "0";


        document.getElementById(
            "headerLevel"
        ).textContent =
            "1";


        return;

    }


    document.getElementById(
        "headerProfile"
    ).textContent =
        p.name;


    document.getElementById(
        "headerCoins"
    ).textContent =
        p.coins;


    document.getElementById(
        "headerLevel"
    ).textContent =
        p.level;

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


    container.innerHTML = `

        <p>
            👤 <strong>${escapeHTML(p.name)}</strong>
        </p>

        <p>
            🏆 Level:
            <strong>${p.level}</strong>
            (${getRank(p.level)})
        </p>

        <p>
            ✨ XP:
            <strong>${p.xp}</strong>
        </p>

        <p>
            🪙 Coins:
            <strong>${p.coins}</strong>
        </p>

        <p>
            🎮 Games:
            <strong>${p.totalGames}</strong>
        </p>

        <p>
            🎯 Correct:
            <strong>${p.totalCorrect}</strong>
        </p>

        <p>
            ❌ Wrong:
            <strong>${p.totalWrong}</strong>
        </p>

        <p>
            🔥 Best Combo:
            <strong>${p.bestCombo}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${p.highScore}</strong>
        </p>

    `;

}


// ============================================================
// LEVEL
// ============================================================

function calculateLevel(xp) {

    return Math.floor(
        xp / 500
    ) + 1;

}


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

    return "Legend";

}


// ============================================================
// XP
// ============================================================

function addXP(amount) {

    const p =
        getProfile();


    if (!p)
        return;


    const oldLevel =
        p.level;


    p.xp += amount;


    p.level =
        calculateLevel(
            p.xp
        );


    if (
        p.level >
        oldLevel
    ) {

        const levels =
            p.level -
            oldLevel;


        const reward =
            levels * 500;


        p.coins += reward;

        p.totalCoinsEarned += reward;


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


    p.coins += amount;


    if (amount > 0) {

        p.totalCoinsEarned +=
            amount;

    }

}


// ============================================================
// PROFILE MENU
// ============================================================

function openProfileMenu() {

    renderProfiles();

    renderProfileInfo();

    showScreen(
        "profileScreen"
    );

}


// ============================================================
// RENDER PROFILE INFO
// ============================================================

function renderProfileInfo() {

    const container =
        document.getElementById(
            "profileInfo"
        );


    const p =
        getProfile();


    if (!p) {

        container.innerHTML =
            "<p>No profile selected.</p>";

        return;

    }


    container.innerHTML = `

        <p>
            👤 <strong>${escapeHTML(p.name)}</strong>
        </p>

        <p>
            🏆 Level ${p.level}
            - ${getRank(p.level)}
        </p>

        <p>
            ✨ ${p.xp} XP
        </p>

        <p>
            🪙 ${p.coins} Coins
        </p>

        <p>
            🏆 High Score:
            ${p.highScore}
        </p>

        <p>
            🎮 Total Games:
            ${p.totalGames}
        </p>

        <p>
            🎯 Correct:
            ${p.totalCorrect}
        </p>

        <p>
            ❌ Wrong:
            ${p.totalWrong}
        </p>

        <p>
            🔥 Best Combo:
            ${p.bestCombo}
        </p>

    `;

}


// ============================================================
// CREATE PROFILE FROM INPUT
// ============================================================

function createProfileFromInput() {

    const input =
        document.getElementById(
            "profileName"
        );


    const name =
        input.value.trim();


    if (!name) {

        toast(
            "Enter a profile name."
        );

        return;

    }


    createProfile(name);


    input.value = "";

}


// ============================================================
// CREATE PROFILE
// ============================================================

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

    renderProfileInfo();


    toast(
        `Welcome, ${name}!`
    );

}


// ============================================================
// RENDER PROFILES
// ============================================================

function renderProfiles() {

    const container =
        document.getElementById(
            "profileList"
        );


    if (!container)
        return;


    container.innerHTML = "";


    if (
        profiles.length === 0
    ) {

        container.innerHTML =
            "<p>No profiles yet.</p>";

        return;

    }


    profiles.forEach(
        (p,index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "profile-item" +
                (
                    index ===
                    currentProfile
                        ? " selected"
                        : ""
                );


            div.innerHTML = `

                <div>

                    <strong>
                        ${escapeHTML(p.name)}
                    </strong>

                    <br>

                    Level ${p.level}

                    |

                    ${p.xp} XP

                    |

                    🪙 ${p.coins}

                </div>

                <button
                    onclick="selectProfile(${index})"
                >
                    Select
                </button>

            `;


            container.appendChild(
                div
            );

        }
    );

}


// ============================================================
// SELECT PROFILE
// ============================================================

function selectProfile(index) {

    if (
        !profiles[index]
    )
        return;


    currentProfile =
        index;


    save();

    renderProfiles();

    renderProfileInfo();


    toast(
        `Selected: ${profiles[index].name}`
    );

}


// ============================================================
// DELETE PROFILE
// ============================================================

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

        currentProfile = -1;

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

    renderProfileInfo();


    toast(
        "Profile deleted."
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(text) {

    return String(text)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
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


// ============================================================
// BUY ITEM
// ============================================================

function buyItem(
    item,
    price
) {

    const p =
        getProfile();


    if (!p)
        return;


    if (
        typeof p[item] !==
        "number"
    ) {

        toast(
            "Invalid item."
        );

        return;

    }


    if (
        p.coins < price
    ) {

        toast(
            "Not enough Coins."
        );

        return;

    }


    p.coins -= price;

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

function getInventoryHTML() {

    const p =
        getProfile();


    if (!p)
        return "";


    return `

        <div class="result-stat">
            <span>💡 Hint</span>
            <strong>${p.hints}</strong>
        </div>

        <div class="result-stat">
            <span>❤️ Extra Life</span>
            <strong>${p.extraLives}</strong>
        </div>

        <div class="result-stat">
            <span>✨ Double XP</span>
            <strong>${p.doubleXP}</strong>
        </div>

        <div class="result-stat">
            <span>📈 Score Boost</span>
            <strong>${p.scoreBoost}</strong>
        </div>

        <div class="result-stat">
            <span>🔄 Second Chance</span>
            <strong>${p.secondChance}</strong>
        </div>

        <div class="result-stat">
            <span>🍀 Lucky Answer</span>
            <strong>${p.luckyAnswer}</strong>
        </div>

    `;

}


function openInventoryDuringGame() {

    const p =
        getProfile();


    if (!p)
        return;


    document.getElementById(
        "inventoryInfo"
    ).innerHTML =
        getInventoryHTML();


    document.getElementById(
        "inventoryModal"
    ).classList.remove(
        "hidden"
    );

}


function closeInventory() {

    document.getElementById(
        "inventoryModal"
    ).classList.add(
        "hidden"
    );

}


// ============================================================
// GAME VARIABLES
// ============================================================

let game = {

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

    locked: false

};


// ============================================================
// START GAME MENU
// ============================================================

function startGameMenu() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    showScreen(
        "difficultyScreen"
    );

}


// ============================================================
// START GAME
// ============================================================

function startGame(difficulty) {

    const p =
        getProfile();


    if (!p) {

        toast(
            "Create/select a profile first."
        );

        return;

    }


    game = {

        difficulty:
            difficulty,

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

        locked: false

    };


    // Extra Life

    if (
        p.extraLives > 0
    ) {

        const use =
            confirm(
                `You have ${p.extraLives} Extra Life(s).\nUse one?`
            );


        if (use) {

            p.extraLives--;

            game.lives++;

            save();

        }

    }


    showScreen(
        "gameScreen"
    );


    nextQuestion();

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    game.locked = false;


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

    game.hintUsed = false;


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


    // --------------------------------------------------------
    // OPTIONS
    // --------------------------------------------------------

    const options =
        [correct];


    while (
        options.length < 4
    ) {

        const random =
            Math.floor(
                Math.random() *
                countries.length
            );


        if (
            !options.includes(
                random
            )
        ) {

            options.push(
                random
            );

        }

    }


    // Shuffle

    for (
        let i =
            options.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            options[i],
            options[j]
        ] =
        [
            options[j],
            options[i]
        ];

    }


    game.options =
        options;


    // --------------------------------------------------------
    // QUESTION TYPE
    // --------------------------------------------------------

    if (
        game.difficulty === 1
    ) {

        game.type = 1;

    }
    else if (
        game.difficulty === 2
    ) {

        game.type =
            1 +
            Math.floor(
                Math.random() * 2
            );

    }
    else {

        game.type =
            1 +
            Math.floor(
                Math.random() * 4
            );

    }


    renderQuestion();

}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQuestion() {

    const c =
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
        p ? p.xp : 0;


    document.getElementById(
        "gameCoins"
    ).textContent =
        p ? p.coins : 0;


    document.getElementById(
        "gameLevel"
    ).textContent =
        p ? p.level : 1;


    let title = "";

    let value = "";


    if (
        game.type === 1
    ) {

        title =
            "Which country has this capital?";

        value =
            c[1];

    }
    else if (
        game.type === 2
    ) {

        title =
            "What is the capital of this country?";

        value =
            c[0];

    }
    else if (
        game.type === 3
    ) {

        title =
            "Which country uses this currency?";

        value =
            c[2];

    }
    else {

        title =
            "Which country belongs to this region?";

        value =
            c[3];

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


    answers.innerHTML = "";


    game.options.forEach(
        (index, position) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                `${position + 1}. ${countries[index][0]}`;


            button.onclick =
                () =>
                    answerQuestion(
                        position
                    );


            button.dataset.position =
                position;


            answers.appendChild(
                button
            );

        }
    );

}


// ============================================================
// ANSWER
// ============================================================

function answerQuestion(position) {

    if (game.locked)
        return;


    if (
        position < 0 ||
        position >=
        game.options.length
    )
        return;


    game.locked = true;


    const selected =
        game.options[position];


    const correct =
        game.currentCountry;


    if (
        selected === correct
    ) {

        correctAnswer();

        return;

    }


    const p =
        getProfile();


    // --------------------------------------------------------
    // LUCKY ANSWER
    // --------------------------------------------------------

    if (
        p &&
        p.luckyAnswer > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Lucky Answer?"
            );


        if (use) {

            p.luckyAnswer--;

            save();


            toast(
                "🍀 Lucky Answer activated!"
            );


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
    savedByLucky = false
) {

    const p =
        getProfile();


    if (!p)
        return;


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
    )
        baseScore = 100;

    else if (
        game.difficulty === 2
    )
        baseScore = 150;

    else
        baseScore = 200;


    let comboBonus = 0;


    if (
        game.combo >= 2
    ) {

        comboBonus =
            game.combo * 25;

    }


    let gained =
        baseScore +
        comboBonus;


    // --------------------------------------------------------
    // SCORE BOOST
    // --------------------------------------------------------

    if (
        p.scoreBoost > 0
    ) {

        const use =
            confirm(
                "Use Score Boost?"
            );


        if (use) {

            p.scoreBoost--;

            gained =
                Math.floor(
                    gained * 1.25
                );

        }

    }


    game.score +=
        gained;


    // --------------------------------------------------------
    // XP
    // --------------------------------------------------------

    let gainedXP =
        50 +
        game.combo * 10;


    if (
        p.doubleXP > 0
    ) {

        const use =
            confirm(
                "Use Double XP?"
            );


        if (use) {

            p.doubleXP--;

            gainedXP *= 2;

        }

    }


    addXP(
        gainedXP
    );


    // --------------------------------------------------------
    // COINS
    // --------------------------------------------------------

    const coinReward =
        20 +
        game.combo * 5;


    addCoins(
        coinReward
    );


    p.totalCorrect++;

    p.totalQuestions++;


    save();


    let message =
        `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`;


    if (savedByLucky) {

        message =
            `🍀 Lucky Answer! +${gained} points`;

    }


    toast(message);


    setTimeout(
        nextQuestion,
        900
    );

}


// ============================================================
// WRONG
// ============================================================

function wrongAnswer() {

    const p =
        getProfile();


    if (!p)
        return;


    // --------------------------------------------------------
    // SECOND CHANCE
    // --------------------------------------------------------

    if (
        p.secondChance > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Second Chance?"
            );


        if (use) {

            p.secondChance--;

            game.wrong++;

            game.combo = 0;

            p.totalWrong++;

            p.totalQuestions++;

            save();


            toast(
                "🔄 Second Chance activated! No life lost."
            );


            setTimeout(
                nextQuestion,
                900
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


    const correctCountry =
        countries[
            game.currentCountry
        ][0];


    toast(
        `❌ Wrong! Correct answer: ${correctCountry}`
    );


    setTimeout(
        nextQuestion,
        1200
    );

}


// ============================================================
// HINT
// ============================================================

function useHint() {

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

    game.hintUsed = true;


    game.score -= 25;


    if (
        game.score < 0
    )
        game.score = 0;


    const buttons =
        document.querySelectorAll(
            "#answers .answer-button"
        );


    const wrongButtons = [];


    buttons.forEach(
        (button, index) => {

            if (
                game.options[index] !==
                game.currentCountry
            ) {

                wrongButtons.push(
                    button
                );

            }

        }
    );


    // Shuffle wrong answers

    wrongButtons.sort(
        () =>
            Math.random() - 0.5
    );


    wrongButtons
        .slice(0, 2)
        .forEach(
            button => {

                button.classList.add(
                    "removed"
                );

            }
        );


    save();


    toast(
        "💡 Hint used! -25 points"
    );

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    const p =
        getProfile();


    if (!p)
        return;


    const perfect =
        game.correct ===
        game.totalQuestions;


    const completionReward =
        100 +
        (
            perfect
                ? 250
                : 0
        ) +
        (
            game.difficulty === 3
                ? 100
                : 0
        );


    addCoins(
        completionReward
    );


    p.totalGames++;


    if (
        game.bestCombo >
        p.bestCombo
    ) {

        p.bestCombo =
            game.bestCombo;

    }


    let newHighScore =
        false;


    if (
        game.score >
        p.highScore
    ) {

        p.highScore =
            game.score;

        newHighScore =
            true;

    }


    save();


    let message;


    if (newHighScore) {

        message =
            "🏆 NEW HIGH SCORE!";

    }
    else if (perfect) {

        message =
            "🎉 PERFECT GAME!";

    }
    else {

        message =
            `Game reward: +${completionReward} Coins`;

    }


    document.getElementById(
        "resultInfo"
    ).innerHTML = `

        <p class="result-stat">
            <span>⭐ Score</span>
            <strong>${game.score}</strong>
        </p>

        <p class="result-stat">
            <span>🎯 Correct</span>
            <strong>${game.correct}</strong>
        </p>

        <p class="result-stat">
            <span>❌ Wrong</span>
            <strong>${game.wrong}</strong>
        </p>

        <p class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>${game.bestCombo}</strong>
        </p>

        <p class="result-stat">
            <span>🪙 Coins</span>
            <strong>${p.coins}</strong>
        </p>

        <p class="result-stat">
            <span>🏆 Level</span>
            <strong>
                ${p.level}
                (${getRank(p.level)})
            </strong>
        </p>

        <h3>
            ${message}
        </h3>

    `;


    showScreen(
        "resultScreen"
    );

}


// ============================================================
// COUNTRY DATABASE
// ============================================================

function openCountries() {

    const container =
        document.getElementById(
            "countryList"
        );


    container.innerHTML = "";


    countries.forEach(
        (c,index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "country-card";


            div.innerHTML = `

                <h3>
                    ${index + 1}.
                    ${escapeHTML(c[0])}
                </h3>

                <p>
                    🏛️ Capital:
                    ${escapeHTML(c[1])}
                </p>

                <p>
                    💰 Currency:
                    ${escapeHTML(c[2])}
                </p>

                <p>
                    🌏 Region:
                    ${escapeHTML(c[3])}
                </p>

            `;


            container.appendChild(
                div
            );

        }
    );


    showScreen(
        "countriesScreen"
    );

}


// ============================================================
// RULES
// ============================================================

function openRules() {

    showScreen(
        "rulesScreen"
    );

}


// ============================================================
// UPDATE LOG
// ============================================================

function openUpdateLog() {

    showScreen(
        "updateScreen"
    );

}


// ============================================================
// OWNER SECURITY
// ============================================================

function getOwnerDeviceKey() {

    return localStorage.getItem(
        "asia_owner_device_key"
    );

}


function isOwnerDeviceAuthorized() {

    const key =
        getOwnerDeviceKey();


    return (
        key ===
        OWNER_DEVICE_KEY
    );

}


// ============================================================
// OWNER AUTHENTICATION
// ============================================================

function openOwnerPanel() {

    // --------------------------------------------------------
    // LAYER 1
    // --------------------------------------------------------

    if (
        !isOwnerDeviceAuthorized()
    ) {

        toast(
            "🚫 Owner access denied."
        );

        return;

    }


    // --------------------------------------------------------
    // LAYER 2
    // --------------------------------------------------------

    const password =
        prompt(
            "🔐 Enter Owner Password:"
        );


    if (
        password !==
        OWNER_PASSWORD
    ) {

        toast(
            "❌ Incorrect Owner Password."
        );

        return;

    }


    localStorage.setItem(
        OWNER_AUTH_KEY,
        "true"
    );


    renderOwnerProfiles();


    showScreen(
        "ownerScreen"
    );


    toast(
        "👑 Owner Mode activated."
    );

}


// ============================================================
// OWNER SHORTCUT
// ============================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "o"
        ) {

            event.preventDefault();

            openOwnerPanel();

        }

    }
);


// ============================================================
// OWNER PROFILE LIST
// ============================================================

function renderOwnerProfiles() {

    const select =
        document.getElementById(
            "ownerProfile"
        );


    if (!select)
        return;


    select.innerHTML = "";


    profiles.forEach(
        (p,index) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                `${p.name} - Lv.${p.level}`;


            select.appendChild(
                option
            );

        }
    );


    if (
        currentProfile >= 0 &&
        profiles[currentProfile]
    ) {

        select.value =
            currentProfile;

    }

}


// ============================================================
// OWNER SELECTED PROFILE
// ============================================================

function getOwnerProfile() {

    const select =
        document.getElementById(
            "ownerProfile"
        );


    if (!select)
        return null;


    const index =
        Number(
            select.value
        );


    return profiles[index]
        || null;

}


// ============================================================
// OWNER AMOUNT
// ============================================================

function getOwnerAmount() {

    const input =
        document.getElementById(
            "ownerAmount"
        );


    if (!input)
        return 0;


    const value =
        Number(
            input.value
        );


    if (
        !Number.isFinite(
            value
        )
    )
        return 0;


    return Math.max(
        0,
        Math.floor(value)
    );

}


// ============================================================
// OWNER CHECK
// ============================================================

function ownerSecurityCheck() {

    if (
        !isOwnerDeviceAuthorized()
    ) {

        toast(
            "🚫 Owner authorization required."
        );

        goHome();

        return false;

    }


    if (
        localStorage.getItem(
            OWNER_AUTH_KEY
        ) !== "true"
    ) {

        toast(
            "🔐 Owner authentication required."
        );

        goHome();

        return false;

    }


    return true;

}


// ============================================================
// OWNER GIVE COINS
// ============================================================

function ownerCoins() {

    if (!ownerSecurityCheck())
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    p.coins += amount;

    p.totalCoinsEarned +=
        amount;


    save();

    renderOwnerProfiles();


    toast(
        `👑 +${amount} Coins`
    );

}


// ============================================================
// OWNER GIVE XP
// ============================================================

function ownerXP() {

    if (!ownerSecurityCheck())
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    const oldLevel =
        p.level;


    p.xp += amount;


    p.level =
        calculateLevel(
            p.xp
        );


    save();

    renderOwnerProfiles();


    toast(
        `👑 +${amount} XP | Level ${oldLevel} → ${p.level}`
    );

}


// ============================================================
// OWNER SET LEVEL
// ============================================================

function ownerLevel() {

    if (!ownerSecurityCheck())
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    if (
        amount < 1
    ) {

        toast(
            "Level must be at least 1."
        );

        return;

    }


    p.level =
        amount;


    p.xp =
        (amount - 1) * 500;


    save();

    renderOwnerProfiles();


    toast(
        `👑 Level set to ${amount}`
    );

}


// ============================================================
// OWNER MAX ITEMS
// ============================================================

function ownerMaxItems() {

    if (!ownerSecurityCheck())
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    p.hints = 100;

    p.extraLives = 100;

    p.doubleXP = 100;

    p.scoreBoost = 100;

    p.secondChance = 100;

    p.luckyAnswer = 100;


    save();


    toast(
        "👑 All items set to 100!"
    );

}


// ============================================================
// OWNER RESET
// ============================================================

function ownerReset() {

    if (!ownerSecurityCheck())
        return;


    const select =
        document.getElementById(
            "ownerProfile"
        );


    const index =
        Number(
            select.value
        );


    if (
        !profiles[index]
    )
        return;


    const name =
        profiles[index].name;


    if (
        !confirm(
            `Reset ${name} completely?`
        )
    )
        return;


    profiles[index] =
        newProfile(name);


    save();

    renderOwnerProfiles();


    toast(
        "Profile reset."
    );

}


// ============================================================
// OWNER DELETE ALL
// ============================================================

function ownerDeleteAll() {

    if (!ownerSecurityCheck())
        return;


    if (
        !confirm(
            "DELETE ALL PROFILES?\nThis cannot be undone."
        )
    )
        return;


    profiles = [];

    currentProfile = -1;


    save();


    toast(
        "All profiles deleted."
    );


    goHome();

}


// ============================================================
// OWNER DEVICE SETUP
// ============================================================

/*
    CHỈ DÙNG TRÊN MÁY CỦA BẠN.

    Mở Console của trình duyệt và chạy:

    enableOwnerDevice()

    Sau đó reload trang.

    Người chơi bình thường không có key này.
*/

function enableOwnerDevice() {

    localStorage.setItem(
        "asia_owner_device_key",
        OWNER_DEVICE_KEY
    );


    toast(
        "🖥️ This browser is now authorized as Owner."
    );

}


// ============================================================
// DISABLE OWNER DEVICE
// ============================================================

function disableOwnerDevice() {

    localStorage.removeItem(
        "asia_owner_device_key"
    );


    localStorage.removeItem(
        OWNER_AUTH_KEY
    );


    toast(
        "🔒 Owner device authorization removed."
    );

}


// ============================================================
// INITIALIZATION
// ============================================================

function initialize() {

    if (
        currentProfile >= 0 &&
        !profiles[currentProfile]
    ) {

        currentProfile = -1;

        save();

    }


    updateHeader();

    updateMainProfile();

}


// ============================================================
// START
// ============================================================

initialize();
