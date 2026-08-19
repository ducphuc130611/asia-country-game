// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 1.0
// ============================================================


// ============================================================
// COUNTRY DATA
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


if (!Number.isInteger(currentProfile)) {

    currentProfile = -1;

}


// ============================================================
// LOAD PROFILES SAFELY
// ============================================================

function loadProfiles() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    STORAGE_KEY
                )
            );

        if (Array.isArray(data)) {

            return data;

        }

    }
    catch (error) {

        console.error(
            "Could not load profiles:",
            error
        );

    }

    return [];

}


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

        hints: 1,

        extraLives: 0,

        doubleXP: 0,

        scoreBoost: 0,

        secondChance: 0,

        luckyAnswer: 0,

        achievements: 0,

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
// SCREEN
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.add("hidden");

            screen.classList.remove("active");

        });


    const target =
        document.getElementById(id);


    if (!target) {

        console.error(
            "Screen not found:",
            id
        );

        return;

    }


    target.classList.remove("hidden");

    target.classList.add("active");

    window.scrollTo(
        0,
        0
    );


    updateHeader();

}


// ============================================================
// HOME
// ============================================================

function goHome() {

    showScreen("mainMenu");

    updateMainProfile();

}


// ============================================================
// TOAST
// ============================================================

let toastTimer = null;


function toast(message) {

    const element =
        document.getElementById("toast");


    if (!element)
        return;


    element.textContent =
        message;


    element.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            element.classList.remove(
                "show"
            );

        }, 2200);

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
            <p>
                No profile selected.
            </p>

            <p>
                Create a profile to start playing.
            </p>
        `;

        return;

    }


    container.innerHTML = `

        <h3>
            👤 ${escapeHTML(p.name)}
        </h3>

        <p>
            ⭐ Level ${p.level}
            — ${getRank(p.level)}
        </p>

        <p>
            XP:
            <strong>${p.xp}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${p.highScore}</strong>
        </p>

        <div class="profile-stats">

            <div class="profile-stat">
                🎮 Games:
                <strong>${p.totalGames}</strong>
            </div>

            <div class="profile-stat">
                ✅ Correct:
                <strong>${p.totalCorrect}</strong>
            </div>

            <div class="profile-stat">
                ❌ Wrong:
                <strong>${p.totalWrong}</strong>
            </div>

            <div class="profile-stat">
                🔥 Best Combo:
                <strong>${p.bestCombo}</strong>
            </div>

            <div class="profile-stat">
                🪙 Coins:
                <strong>${p.coins}</strong>
            </div>

            <div class="profile-stat">
                📚 Questions:
                <strong>${p.totalQuestions}</strong>
            </div>

        </div>
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


    if (p.level > oldLevel) {

        const levelCount =
            p.level - oldLevel;


        const reward =
            levelCount * 500;


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

    p.totalCoinsEarned += amount;

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
// CREATE PROFILE FROM INPUT
// ============================================================

function createProfileFromInput() {

    const input =
        document.getElementById(
            "profileName"
        );


    const name =
        input.value.trim();


    createProfile(
        name
    );


    input.value = "";

}


// ============================================================
// CREATE PROFILE
// ============================================================

function createProfile(name) {

    if (profiles.length >= 20) {

        toast(
            "Maximum 20 profiles."
        );

        return;

    }


    if (!name) {

        toast(
            "Enter a profile name."
        );

        return;

    }


    const cleanName =
        name.trim();


    if (!cleanName) {

        toast(
            "Invalid profile name."
        );

        return;

    }


    if (
        profiles.some(
            p =>
                p.name.toLowerCase() ===
                cleanName.toLowerCase()
        )
    ) {

        toast(
            "Profile already exists."
        );

        return;

    }


    profiles.push(
        newProfile(
            cleanName
        )
    );


    currentProfile =
        profiles.length - 1;


    save();


    renderProfiles();

    renderProfileInfo();


    toast(
        `Welcome, ${cleanName}!`
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


    const answer =
        confirm(
            `Delete ${p.name}?`
        );


    if (!answer)
        return;


    profiles.splice(
        currentProfile,
        1
    );


    if (profiles.length === 0) {

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


    if (profiles.length === 0) {

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
                    index === currentProfile
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
// PROFILE INFO
// ============================================================

function renderProfileInfo() {

    const container =
        document.getElementById(
            "profileInfo"
        );


    if (!container)
        return;


    const p =
        getProfile();


    if (!p) {

        container.innerHTML =
            "<p>No profile selected.</p>";

        return;

    }


    const accuracy =
        p.totalQuestions > 0
            ? Math.round(
                (
                    p.totalCorrect /
                    p.totalQuestions
                ) * 100
            )
            : 0;


    container.innerHTML = `

        <h3>
            👤 ${escapeHTML(p.name)}
        </h3>

        <p>
            ⭐ Level:
            <strong>${p.level}</strong>
            (${getRank(p.level)})
        </p>

        <p>
            XP:
            <strong>${p.xp}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${p.highScore}</strong>
        </p>

        <p>
            🎮 Total Games:
            <strong>${p.totalGames}</strong>
        </p>

        <p>
            ✅ Correct:
            <strong>${p.totalCorrect}</strong>
        </p>

        <p>
            ❌ Wrong:
            <strong>${p.totalWrong}</strong>
        </p>

        <p>
            🎯 Accuracy:
            <strong>${accuracy}%</strong>
        </p>

        <p>
            🔥 Best Combo:
            <strong>${p.bestCombo}</strong>
        </p>

        <p>
            🪙 Coins:
            <strong>${p.coins}</strong>
        </p>

    `;

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


function buyItem(
    item,
    price
) {

    const p =
        getProfile();


    if (!p)
        return;


    if (!(item in p)) {

        toast(
            "Invalid item."
        );

        return;

    }


    if (p.coins < price) {

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

function openInventory() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

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


    if (!p || !container)
        return;


    container.innerHTML = `

        <div class="inventory-item">
            💡 Hint
            <strong>${p.hints}</strong>
        </div>

        <div class="inventory-item">
            ❤️ Extra Life
            <strong>${p.extraLives}</strong>
        </div>

        <div class="inventory-item">
            ✨ Double XP
            <strong>${p.doubleXP}</strong>
        </div>

        <div class="inventory-item">
            📈 Score Boost
            <strong>${p.scoreBoost}</strong>
        </div>

        <div class="inventory-item">
            🔄 Second Chance
            <strong>${p.secondChance}</strong>
        </div>

        <div class="inventory-item">
            🍀 Lucky Answer
            <strong>${p.luckyAnswer}</strong>
        </div>

    `;

}


function openInventoryDuringGame() {

    const p =
        getProfile();


    if (!p)
        return;


    renderInventory();


    alert(
        "🎒 INVENTORY\n\n" +

        `💡 Hint: ${p.hints}\n` +

        `❤️ Extra Life: ${p.extraLives}\n` +

        `✨ Double XP: ${p.doubleXP}\n` +

        `📈 Score Boost: ${p.scoreBoost}\n` +

        `🔄 Second Chance: ${p.secondChance}\n` +

        `🍀 Lucky Answer: ${p.luckyAnswer}`

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
// SELECT DIFFICULTY
// ============================================================

function selectDifficulty(
    difficulty
) {

    if (
        difficulty < 1 ||
        difficulty > 3
    )
        return;


    startGame(
        difficulty
    );

}


// ============================================================
// START GAME
// ============================================================

function startGame(
    difficulty
) {

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

            difficulty || 1,

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


    // EXTRA LIFE

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


    updateGameStats();


    nextQuestion();

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


    game.locked = false;

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


    // OPTIONS

    const options = [
        correct
    ];


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


    // SHUFFLE

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


    // QUESTION TYPE

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
// UPDATE GAME STATS
// ============================================================

function updateGameStats() {

    const p =
        getProfile();


    if (!p)
        return;


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
        "xp"
    ).textContent =
        p.xp;


    document.getElementById(
        "coins"
    ).textContent =
        p.coins;


    document.getElementById(
        "level"
    ).textContent =
        p.level;

}


// ============================================================
// RENDER QUESTION
// ============================================================

function renderQuestion() {

    const c =
        countries[
            game.currentCountry
        ];


    document.getElementById(
        "questionNumber"
    ).textContent =
        game.question;


    updateGameStats();


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
        "questionInfo"
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
                () => answerQuestion(
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

function answerQuestion(
    position
) {

    if (game.locked)
        return;


    if (
        position < 0 ||
        position >=
        game.options.length
    )
        return;


    const selected =
        game.options[position];


    const correct =
        game.currentCountry;


    if (
        selected === correct
    ) {

        correctAnswer();

    }
    else {

        const p =
            getProfile();


        // LUCKY ANSWER

        if (
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

}


// ============================================================
// CORRECT ANSWER
// ============================================================

function correctAnswer(
    savedByLucky = false
) {

    if (game.locked)
        return;


    game.locked = true;


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


    // SCORE BOOST

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


    // XP

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


    // COINS

    const coinReward =
        20 +
        game.combo * 5;


    addCoins(
        coinReward
    );


    p.totalCorrect++;

    p.totalQuestions++;


    save();


    updateGameStats();


    toast(
        savedByLucky
            ? `🍀 Lucky! +${gained} points, +${gainedXP} XP`
            : `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`
    );


    setTimeout(
        nextQuestion,
        900
    );

}


// ============================================================
// WRONG ANSWER
// ============================================================

function wrongAnswer() {

    if (game.locked)
        return;


    game.locked = true;


    const p =
        getProfile();


    // SECOND CHANCE

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


            updateGameStats();


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


    updateGameStats();


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


    if (game.locked) {

        toast(
            "Please wait..."
        );

        return;

    }


    if (game.hintUsed) {

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


    game.score -= 25;


    if (
        game.score < 0
    )
        game.score = 0;


    const buttons =
        document.querySelectorAll(
            "#answers button"
        );


    const wrongButtons = [];


    buttons.forEach(
        (button,index) => {

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


    wrongButtons.sort(
        () =>
            Math.random() - .5
    );


    wrongButtons
        .slice(0,2)
        .forEach(
            button => {

                button.classList.add(
                    "removed"
                );

            }
        );


    save();


    updateGameStats();


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


    document.getElementById(
        "highScoreMessage"
    ).textContent =
        newHighScore
            ? "🏆 NEW HIGH SCORE!"
            : game.correct === game.totalQuestions
                ? "🎉 PERFECT GAME!"
                : `🎁 Game Reward: +${completionReward} Coins`;


    document.getElementById(
        "resultInfo"
    ).innerHTML = `

        <div class="result-stat">

            <span>
                ⭐ Score
            </span>

            <strong>
                ${game.score}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                ✅ Correct
            </span>

            <strong>
                ${game.correct}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                ❌ Wrong
            </span>

            <strong>
                ${game.wrong}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                🔥 Best Combo
            </span>

            <strong>
                ${game.bestCombo}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                🪙 Coins
            </span>

            <strong>
                ${p.coins}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                ⭐ Level
            </span>

            <strong>
                ${p.level}
                (${getRank(p.level)})
            </strong>

        </div>

    `;


    showScreen(
        "resultScreen"
    );

}


// ============================================================
// QUIT GAME
// ============================================================

function confirmQuitGame() {

    if (
        confirm(
            "Quit this game?\nYour current game progress will be lost."
        )
    ) {

        game.locked = true;

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

function showUpdateLog() {

    showScreen(
        "updateScreen"
    );

}


// ============================================================
// OWNER PANEL
// ============================================================

function openOwnerPanel() {

    if (
        profiles.length === 0
    ) {

        toast(
            "Create a profile first."
        );

        return;

    }


    renderOwnerProfiles();


    showScreen(
        "ownerScreen"
    );

}


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
        currentProfile >= 0
    ) {

        select.value =
            currentProfile;

    }

}


// ============================================================
// OWNER SELECTED
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


    return profiles[index];

}


// ============================================================
// OWNER AMOUNT
// ============================================================

function getOwnerAmount() {

    const input =
        document.getElementById(
            "ownerAmount"
        );


    const value =
        Number(
            input.value
        );


    if (
        !Number.isFinite(value)
    )
        return 0;


    return Math.max(
        0,
        Math.floor(value)
    );

}


// ============================================================
// OWNER GIVE COINS
// ============================================================

function ownerCoins() {

    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    p.coins += amount;

    p.totalCoinsEarned += amount;


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
        (
            amount - 1
        ) * 500;


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
        newProfile(
            name
        );


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


    showScreen(
        "mainMenu"
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

    showScreen(
        "mainMenu"
    );

}


// ============================================================
// START
// ============================================================

initialize();
