// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION v1.0
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

const CURRENT_KEY =
    "asia_country_game_current_v1";

let profiles = loadProfiles();

let currentProfile =
    Number(
        localStorage.getItem(CURRENT_KEY)
    );

if (
    !Number.isInteger(currentProfile) ||
    currentProfile < 0 ||
    !profiles[currentProfile]
) {

    currentProfile = -1;

}


// ============================================================
// PROFILE
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

        totalCoinsEarned: 500

    };

}


function loadProfiles() {

    try {

        const data =
            localStorage.getItem(STORAGE_KEY);

        if (!data)
            return [];

        const parsed =
            JSON.parse(data);

        if (!Array.isArray(parsed))
            return [];

        return parsed;

    }
    catch (error) {

        console.error(
            "Could not load profiles:",
            error
        );

        return [];

    }

}


function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profiles)
    );

    localStorage.setItem(
        CURRENT_KEY,
        String(currentProfile)
    );

    updateHeader();

    updateHomeProfile();

}


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
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

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


    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateHeader();

}


function goHome() {

    showScreen("homeScreen");

}


function goHomeConfirm() {

    if (
        game.question > 0 &&
        game.question <= game.totalQuestions &&
        game.lives > 0
    ) {

        const answer =
            confirm(
                "Exit the current game?"
            );

        if (!answer)
            return;

    }

    goHome();

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

    element.textContent = message;

    element.classList.add("show");


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

    const p = getProfile();


    if (!p) {

        document.getElementById(
            "topName"
        ).textContent = "Guest";

        document.getElementById(
            "topLevel"
        ).textContent = "1";

        document.getElementById(
            "topCoins"
        ).textContent = "0";

        return;

    }


    document.getElementById(
        "topName"
    ).textContent = p.name;


    document.getElementById(
        "topLevel"
    ).textContent = p.level;


    document.getElementById(
        "topCoins"
    ).textContent = p.coins;

}


// ============================================================
// HOME PROFILE
// ============================================================

function updateHomeProfile() {

    const element =
        document.getElementById(
            "homeProfileInfo"
        );


    const p = getProfile();


    if (!p) {

        element.innerHTML = `

            <p>
                No profile selected.
            </p>

            <button onclick="openProfileMenu()">
                👤 Create Profile
            </button>

        `;

        return;

    }


    const accuracy =
        p.totalQuestions === 0
            ? 0
            : Math.round(
                p.totalCorrect /
                p.totalQuestions *
                100
            );


    element.innerHTML = `

        <p>
            👤 <strong>
                ${escapeHTML(p.name)}
            </strong>
        </p>

        <p>
            🏆 Level:
            <strong>${p.level}</strong>
            (${getRank(p.level)})
        </p>

        <p>
            ⭐ XP:
            <strong>${p.xp}</strong>
        </p>

        <p>
            🪙 Coins:
            <strong>${p.coins}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${p.highScore}</strong>
        </p>

        <p>
            🎯 Accuracy:
            <strong>${accuracy}%</strong>
        </p>

    `;

}


// ============================================================
// PROFILE MENU
// ============================================================

function openProfileMenu() {

    renderProfiles();

    showScreen("profileScreen");

}


function renderProfiles() {

    const container =
        document.getElementById(
            "profileList"
        );


    container.innerHTML = "";


    if (profiles.length === 0) {

        container.innerHTML = `

            <p>
                No profiles yet.
            </p>

        `;

        return;

    }


    profiles.forEach(
        (profile,index) => {

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
                        ${escapeHTML(
                            profile.name
                        )}
                    </strong>

                    <br>

                    Level ${profile.level}

                    |

                    ${profile.xp} XP

                    |

                    🪙 ${profile.coins}

                </div>

                <button
                    onclick="selectProfile(${index})"
                >
                    Select
                </button>

            `;


            container.appendChild(div);

        }
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


    createProfile(name);

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


    const input =
        document.getElementById(
            "profileNameInput"
        );


    if (input)
        input.value = "";


    toast(
        `Welcome, ${name}!`
    );

}


function selectProfile(index) {

    if (!profiles[index])
        return;


    currentProfile = index;

    save();

    renderProfiles();


    toast(
        `Selected: ${profiles[index].name}`
    );

}


function deleteCurrentProfile() {

    const p = getProfile();


    if (!p) {

        toast(
            "No profile selected."
        );

        return;

    }


    const answer =
        confirm(
            `Delete profile "${p.name}"?`
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
        currentProfile >= profiles.length
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


function addXP(amount) {

    const p = getProfile();

    if (!p)
        return;


    const oldLevel =
        p.level;


    p.xp += amount;

    p.level =
        calculateLevel(p.xp);


    if (p.level > oldLevel) {

        const levelUps =
            p.level - oldLevel;


        const reward =
            levelUps * 500;


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

    const p = getProfile();

    if (!p)
        return;


    p.coins += amount;

    p.totalCoinsEarned += amount;

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

    showScreen("shopScreen");

}


function updateShop() {

    const p = getProfile();

    if (!p)
        return;


    document.getElementById(
        "shopCoins"
    ).textContent = p.coins;

}


function buyItem(item, price) {

    const p = getProfile();

    if (!p)
        return;


    if (
        typeof p[item] !== "number"
    ) {

        toast(
            "Item error."
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

    const p = getProfile();

    if (!p) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    if (
        difficulty !== 1 &&
        difficulty !== 2 &&
        difficulty !== 3
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
        game.used.includes(correct)
    );


    game.used.push(correct);

    game.currentCountry =
        correct;


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
            !options.includes(random)
        ) {

            options.push(random);

        }

    }


    for (
        let i = options.length - 1;
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


    const p = getProfile();


    if (p) {

        document.getElementById(
            "gameXP"
        ).textContent =
            p.xp;


        document.getElementById(
            "gameCoins"
        ).textContent =
            p.coins;


        document.getElementById(
            "gameLevel"
        ).textContent =
            p.level;


        document.getElementById(
            "hintCount"
        ).textContent =
            p.hints;

    }


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
        (countryIndex,position) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.textContent =
                `${position + 1}. ${
                    countries[countryIndex][0]
                }`;


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


    if (
        position < 0 ||
        position >= game.options.length
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

        return;

    }


    const p = getProfile();


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


            correctAnswer(true);

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

    if (game.locked)
        return;


    game.locked = true;


    const p = getProfile();

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


    renderQuestionStats();


    if (savedByLucky) {

        toast(
            `🍀 Lucky! +${gained} points, +${gainedXP} XP`
        );

    }
    else {

        toast(
            `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`
        );

    }


    setTimeout(
        nextQuestion,
        900
    );

}


// ============================================================
// WRONG
// ============================================================

function wrongAnswer() {

    if (game.locked)
        return;


    game.locked = true;


    const p = getProfile();


    if (!p)
        return;


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
// GAME STATS
// ============================================================

function renderQuestionStats() {

    const p = getProfile();

    if (!p)
        return;


    document.getElementById(
        "score"
    ).textContent =
        game.score;


    document.getElementById(
        "combo"
    ).textContent =
        game.combo;


    document.getElementById(
        "lives"
    ).textContent =
        game.lives;


    document.getElementById(
        "gameXP"
    ).textContent =
        p.xp;


    document.getElementById(
        "gameCoins"
    ).textContent =
        p.coins;


    document.getElementById(
        "gameLevel"
    ).textContent =
        p.level;


    document.getElementById(
        "hintCount"
    ).textContent =
        p.hints;

}


// ============================================================
// HINT
// ============================================================

function useHint() {

    if (game.locked)
        return;


    const p = getProfile();


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
            ".answer-button"
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


    wrongButtons
        .sort(
            () => Math.random() - .5
        )
        .slice(0,2)
        .forEach(
            button => {

                button.classList.add(
                    "removed"
                );

            }
        );


    save();

    renderQuestionStats();


    toast(
        "💡 Hint used! -25 points"
    );

}


// ============================================================
// INVENTORY
// ============================================================

function openInventoryDuringGame() {

    const p = getProfile();

    if (!p)
        return;


    alert(

        "🎒 INVENTORY\n\n" +

        `💡 Hint: ${p.hints}\n` +

        `❤️ Extra Life: ${p.extraLives}\n` +

        `✨ Double XP: ${p.doubleXP}\n` +

        `🚀 Score Boost: ${p.scoreBoost}\n` +

        `🔄 Second Chance: ${p.secondChance}\n` +

        `🍀 Lucky Answer: ${p.luckyAnswer}`

    );

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    const p = getProfile();

    if (!p)
        return;


    game.locked = true;


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


    let newHighScore = false;


    if (
        game.score >
        p.highScore
    ) {

        p.highScore =
            game.score;

        newHighScore = true;

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

        <h3>
            ${message}
        </h3>

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
// DATABASE
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
// KEYBOARD CONTROL
// ============================================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        // Don't activate shortcuts
        // while typing.

        if (
            event.target.tagName ===
            "INPUT" ||
            event.target.tagName ===
            "TEXTAREA"
        ) {

            if (
                event.key === "Escape"
            ) {

                event.target.blur();

            }

            return;

        }


        const activeScreen =
            document.querySelector(
                ".screen.active"
            );


        if (!activeScreen)
            return;


        // GAME ANSWERS

        if (
            activeScreen.id ===
            "gameScreen"
        ) {

            if (
                ["1","2","3","4"]
                .includes(event.key)
            ) {

                const position =
                    Number(event.key) - 1;


                answerQuestion(
                    position
                );


                return;

            }


            if (key === "h") {

                useHint();

                return;

            }


            if (key === "i") {

                openInventoryDuringGame();

                return;

            }


            if (
                event.key === "Escape"
            ) {

                goHomeConfirm();

                return;

            }


            return;

        }


        // HOME

        if (
            activeScreen.id ===
            "homeScreen"
        ) {

            if (key === "1") {

                startGameMenu();

            }
            else if (key === "2") {

                startGame(2);

            }
            else if (key === "3") {

                startGame(3);

            }
            else if (key === "p") {

                openProfileMenu();

            }
            else if (key === "s") {

                openShop();

            }
            else if (key === "d") {

                openCountries();

            }
            else if (key === "r") {

                openRules();

            }
            else if (key === "u") {

                openUpdateLog();

            }

        }
        else {

            if (
                event.key === "Escape"
            ) {

                goHome();

            }

        }

    }
);


// ============================================================
// OWNER PANEL
// ============================================================
//
// IMPORTANT:
//
// The Owner Panel is intentionally NOT shown
// anywhere in the normal HTML interface.
//
// Layer 1:
// Secret keyboard combination.
//
// Layer 2:
// Owner password.
//
// This is only client-side protection.
// It is NOT real server security.
// Do NOT put sensitive secrets here.
//
// ============================================================

const OWNER_PASSWORD =
    "CHANGE_THIS_OWNER_PASSWORD";


let ownerUnlocked = false;


function openOwnerPanel() {

    // Layer 1

    const code =
        prompt(
            "OWNER ACCESS\n\nEnter owner password:"
        );


    if (
        code !== OWNER_PASSWORD
    ) {

        toast(
            "❌ Access denied."
        );

        return;

    }


    // Layer 2

    const confirmation =
        prompt(
            "SECOND SECURITY LAYER\n\nType OWNER to continue:"
        );


    if (
        confirmation !== "OWNER"
    ) {

        toast(
            "❌ Second security check failed."
        );

        return;

    }


    ownerUnlocked = true;


    ownerMenu();

}


function ownerMenu() {

    if (!ownerUnlocked)
        return;


    const action =
        prompt(

            "OWNER PANEL\n\n" +

            "1 = Give Coins\n" +

            "2 = Give XP\n" +

            "3 = Max Items\n" +

            "4 = Reset Profile\n" +

            "5 = Delete ALL Profiles\n" +

            "0 = Exit"

        );


    if (action === "1") {

        ownerGiveCoins();

    }
    else if (action === "2") {

        ownerGiveXP();

    }
    else if (action === "3") {

        ownerMaxItems();

    }
    else if (action === "4") {

        ownerResetProfile();

    }
    else if (action === "5") {

        ownerDeleteAll();

    }

}


function ownerGiveCoins() {

    const p = getProfile();

    if (!p)
        return;


    const amount =
        Number(
            prompt(
                "Coins to add:"
            )
        );


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        toast(
            "Invalid amount."
        );

        return;

    }


    const value =
        Math.floor(amount);


    p.coins += value;

    p.totalCoinsEarned += value;


    save();


    toast(
        `👑 +${value} Coins`
    );

}


function ownerGiveXP() {

    const p = getProfile();

    if (!p)
        return;


    const amount =
        Number(
            prompt(
                "XP to add:"
            )
        );


    if (
        !Number.isFinite(amount) ||
        amount < 0
    ) {

        toast(
            "Invalid amount."
        );

        return;

    }


    p.xp +=
        Math.floor(amount);


    p.level =
        calculateLevel(
            p.xp
        );


    save();


    toast(
        "👑 XP added."
    );

}


function ownerMaxItems() {

    const p = getProfile();

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
        "👑 All items set to 100."
    );

}


function ownerResetProfile() {

    const p = getProfile();

    if (!p)
        return;


    if (
        !confirm(
            `Reset ${p.name}?`
        )
    )
        return;


    const name =
        p.name;


    profiles[currentProfile] =
        newProfile(name);


    save();


    toast(
        "👑 Profile reset."
    );

}


function ownerDeleteAll() {

    if (
        !confirm(
            "DELETE ALL PROFILES?"
        )
    )
        return;


    profiles = [];

    currentProfile = -1;


    save();


    ownerUnlocked = false;


    goHome();


    toast(
        "All profiles deleted."
    );

}


// ============================================================
// SECRET OWNER KEY
// ============================================================
//
// Ctrl + Shift + O
//
// The panel is not displayed as a button.
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
// INITIALIZATION
// ============================================================

function initialize() {

    updateHeader();

    updateHomeProfile();

}


initialize();
