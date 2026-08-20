// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// VERSION 1.0
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
    "asia_country_game_profiles_v1";

const CURRENT_PROFILE_KEY =
    "asia_current_profile_v1";


// ============================================================
// LOAD DATA SAFELY
// ============================================================

let profiles = [];

try {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (saved) {

        profiles =
            JSON.parse(saved);

        if (!Array.isArray(profiles)) {

            profiles = [];

        }

    }

}
catch (error) {

    console.error(
        "Could not load profiles:",
        error
    );

    profiles = [];

}


let currentProfile = -1;

try {

    const savedCurrent =
        localStorage.getItem(
            CURRENT_PROFILE_KEY
        );

    if (savedCurrent !== null) {

        currentProfile =
            Number(savedCurrent);

    }

}
catch (error) {

    currentProfile = -1;

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
        totalCoinsEarned: 500,

        hints: 1,
        extraLives: 0,
        doubleXP: 0,
        scoreBoost: 0,
        secondChance: 0,
        luckyAnswer: 0

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
// SCREEN SYSTEM
// ============================================================

function showScreen(id) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );

    screens.forEach(
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

    showScreen("homeScreen");

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

    element.classList.add("show");


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


    const name =
        document.getElementById(
            "topName"
        );

    const level =
        document.getElementById(
            "topLevel"
        );

    const coins =
        document.getElementById(
            "topCoins"
        );


    if (!p) {

        name.textContent =
            "Guest";

        level.textContent =
            "1";

        coins.textContent =
            "0";

        return;

    }


    name.textContent =
        p.name;

    level.textContent =
        p.level;

    coins.textContent =
        p.coins;

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
            (
                p.totalCorrect /
                p.totalQuestions
            ) * 100
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
            <span>⭐ Level</span>
            <strong>${p.level}</strong>
        </div>

        <div class="result-stat">
            <span>✨ XP</span>
            <strong>${p.xp}</strong>
        </div>

        <div class="result-stat">
            <span>💰 Coins</span>
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

        const levels =
            p.level - oldLevel;

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

    p.totalCoinsEarned += amount;

}


// ============================================================
// PROFILE MENU
// ============================================================

function openProfileMenu() {

    renderProfiles();

    showScreen(
        "profileScreen"
    );

}


// ============================================================
// CREATE PROFILE
// ============================================================

function createProfileFromInput() {

    const input =
        document.getElementById(
            "profileNameInput"
        );


    let name =
        input.value.trim();


    if (!name) {

        toast(
            "Enter a profile name."
        );

        input.focus();

        return;

    }


    createProfile(name);


    input.value = "";

}


function createProfile(name) {

    if (profiles.length >= 20) {

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


// ============================================================
// SELECT PROFILE
// ============================================================

function selectProfile(index) {

    index =
        Number(index);


    if (
        index < 0 ||
        index >= profiles.length
    ) {

        return;

    }


    currentProfile =
        index;


    save();

    renderProfiles();


    toast(
        `Selected: ${profiles[index].name}`
    );

}


// ============================================================
// DELETE PROFILE
// ============================================================

function deleteProfile() {

    if (!getProfile()) {

        toast(
            "Select a profile first."
        );

        return;

    }


    const name =
        getProfile().name;


    if (
        !confirm(
            `Delete ${name}?`
        )
    ) {

        return;

    }


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

                    Lv.${p.level}
                    |
                    ${p.xp} XP
                    |
                    🪙 ${p.coins}

                </div>

                <button
                    onclick="selectProfile(${index})">

                    ${index === currentProfile
                        ? "Selected"
                        : "Select"}

                </button>

            `;


            container.appendChild(div);

        }
    );

}


// ============================================================
// ESCAPE HTML
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


function openInventoryDuringGame() {

    if (!getProfile())
        return;


    renderInventory();


    const p =
        getProfile();


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
// GAME STATE
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


    game = {

        difficulty: difficulty,

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


    if (p.extraLives > 0) {

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

    game.locked = false;


    let correct;


    do {

        correct =
            Math.floor(
                Math.random() *
                countries.length
            );

    }
    while (
        game.used.includes(correct)
    );


    game.used.push(correct);

    game.currentCountry =
        correct;


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
            !options.includes(random)
        ) {

            options.push(random);

        }

    }


    shuffle(options);


    game.options =
        options;


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
                Math.random() * (i + 1)
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

    const c =
        countries[
            game.currentCountry
        ];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `${game.question}/10`;


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


    const p =
        getProfile();


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
                function() {

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

function answerQuestion(position) {

    if (game.locked)
        return;


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

            correctAnswer(true);

            return;

        }

    }


    wrongAnswer();

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


    game.score += gained;


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


    addXP(gainedXP);


    const coinReward =
        20 +
        game.combo * 5;


    addCoins(
        coinReward
    );


    p.totalCorrect++;

    p.totalQuestions++;


    save();


    const message =
        savedByLucky
        ? `🍀 Lucky! +${gained} points, +${gainedXP} XP`
        : `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`;


    toast(message);


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
                "🔄 Second Chance activated!"
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

    if (game.locked)
        return;


    const p =
        getProfile();


    if (!p)
        return;


    if (game.hintUsed) {

        toast(
            "Hint already used."
        );

        return;

    }


    if (p.hints <= 0) {

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
    ) {

        game.score = 0;

    }


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
            button => {

                button.classList.add(
                    "removed"
                );

            }
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


    let message;


    if (newHighScore) {

        message =
            "🏆 NEW HIGH SCORE!";

    }
    else if (
        game.correct ===
        game.totalQuestions
    ) {

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

        <div class="result-message">
            ${message}
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
            <span>🏆 Level</span>
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

    if (game.locked)
        return;


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


    document.getElementById(
        "countryCount"
    ).textContent =
        countries.length;


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
// INFO
// ============================================================

function openInfo() {

    showScreen(
        "infoScreen"
    );

}


// ============================================================
// OWNER SECURITY
// ============================================================
//
// Owner Panel is intentionally NOT displayed anywhere.
//
// This version does not pretend that browser JavaScript can
// securely verify a computer's public IP.
//
// If an Owner Panel is added later, authentication should be
// moved to a backend/server.
// ============================================================


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
