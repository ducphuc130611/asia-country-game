/* =========================================================
   ASIA COUNTRY GUESSING GAME
   VERSION 1.0
========================================================= */


/* =========================================================
   COUNTRY DATABASE
========================================================= */

const countries = [

    {
        name: "Vietnam",
        capital: "Hanoi",
        currency: "Dong",
        region: "Southeast Asia"
    },

    {
        name: "Thailand",
        capital: "Bangkok",
        currency: "Baht",
        region: "Southeast Asia"
    },

    {
        name: "Laos",
        capital: "Vientiane",
        currency: "Kip",
        region: "Southeast Asia"
    },

    {
        name: "Cambodia",
        capital: "Phnom Penh",
        currency: "Riel",
        region: "Southeast Asia"
    },

    {
        name: "Myanmar",
        capital: "Naypyidaw",
        currency: "Kyat",
        region: "Southeast Asia"
    },

    {
        name: "Malaysia",
        capital: "Kuala Lumpur",
        currency: "Ringgit",
        region: "Southeast Asia"
    },

    {
        name: "Singapore",
        capital: "Singapore",
        currency: "Dollar",
        region: "Southeast Asia"
    },

    {
        name: "Indonesia",
        capital: "Jakarta",
        currency: "Rupiah",
        region: "Southeast Asia"
    },

    {
        name: "Philippines",
        capital: "Manila",
        currency: "Peso",
        region: "Southeast Asia"
    },

    {
        name: "Brunei",
        capital: "Bandar Seri Begawan",
        currency: "Dollar",
        region: "Southeast Asia"
    },


    {
        name: "China",
        capital: "Beijing",
        currency: "Yuan",
        region: "East Asia"
    },

    {
        name: "Japan",
        capital: "Tokyo",
        currency: "Yen",
        region: "East Asia"
    },

    {
        name: "South Korea",
        capital: "Seoul",
        currency: "Won",
        region: "East Asia"
    },

    {
        name: "North Korea",
        capital: "Pyongyang",
        currency: "Won",
        region: "East Asia"
    },

    {
        name: "Mongolia",
        capital: "Ulaanbaatar",
        currency: "Tugrik",
        region: "East Asia"
    },


    {
        name: "India",
        capital: "New Delhi",
        currency: "Rupee",
        region: "South Asia"
    },

    {
        name: "Pakistan",
        capital: "Islamabad",
        currency: "Rupee",
        region: "South Asia"
    },

    {
        name: "Bangladesh",
        capital: "Dhaka",
        currency: "Taka",
        region: "South Asia"
    },

    {
        name: "Nepal",
        capital: "Kathmandu",
        currency: "Rupee",
        region: "South Asia"
    },

    {
        name: "Bhutan",
        capital: "Thimphu",
        currency: "Ngultrum",
        region: "South Asia"
    },

    {
        name: "Sri Lanka",
        capital: "Sri Jayawardenepura Kotte",
        currency: "Rupee",
        region: "South Asia"
    },

    {
        name: "Maldives",
        capital: "Male",
        currency: "Rufiyaa",
        region: "South Asia"
    },

    {
        name: "Afghanistan",
        capital: "Kabul",
        currency: "Afghani",
        region: "South Asia"
    },


    {
        name: "Iran",
        capital: "Tehran",
        currency: "Rial",
        region: "West Asia"
    },

    {
        name: "Iraq",
        capital: "Baghdad",
        currency: "Dinar",
        region: "West Asia"
    },

    {
        name: "Saudi Arabia",
        capital: "Riyadh",
        currency: "Riyal",
        region: "West Asia"
    },

    {
        name: "United Arab Emirates",
        capital: "Abu Dhabi",
        currency: "Dirham",
        region: "West Asia"
    },

    {
        name: "Qatar",
        capital: "Doha",
        currency: "Riyal",
        region: "West Asia"
    },

    {
        name: "Kuwait",
        capital: "Kuwait City",
        currency: "Dinar",
        region: "West Asia"
    },

    {
        name: "Bahrain",
        capital: "Manama",
        currency: "Dinar",
        region: "West Asia"
    },

    {
        name: "Oman",
        capital: "Muscat",
        currency: "Rial",
        region: "West Asia"
    },

    {
        name: "Yemen",
        capital: "Sanaa",
        currency: "Rial",
        region: "West Asia"
    },

    {
        name: "Jordan",
        capital: "Amman",
        currency: "Dinar",
        region: "West Asia"
    },

    {
        name: "Lebanon",
        capital: "Beirut",
        currency: "Pound",
        region: "West Asia"
    },

    {
        name: "Syria",
        capital: "Damascus",
        currency: "Pound",
        region: "West Asia"
    },

    {
        name: "Israel",
        capital: "Jerusalem",
        currency: "Shekel",
        region: "West Asia"
    },

    {
        name: "Turkey",
        capital: "Ankara",
        currency: "Lira",
        region: "West Asia"
    },


    {
        name: "Kazakhstan",
        capital: "Astana",
        currency: "Tenge",
        region: "Central Asia"
    },

    {
        name: "Uzbekistan",
        capital: "Tashkent",
        currency: "Som",
        region: "Central Asia"
    },

    {
        name: "Turkmenistan",
        capital: "Ashgabat",
        currency: "Manat",
        region: "Central Asia"
    },

    {
        name: "Kyrgyzstan",
        capital: "Bishkek",
        currency: "Som",
        region: "Central Asia"
    },

    {
        name: "Tajikistan",
        capital: "Dushanbe",
        currency: "Somoni",
        region: "Central Asia"
    },


    {
        name: "Azerbaijan",
        capital: "Baku",
        currency: "Manat",
        region: "Caucasus"
    },

    {
        name: "Armenia",
        capital: "Yerevan",
        currency: "Dram",
        region: "Caucasus"
    },

    {
        name: "Georgia",
        capital: "Tbilisi",
        currency: "Lari",
        region: "Caucasus"
    },


    {
        name: "Russia",
        capital: "Moscow",
        currency: "Ruble",
        region: "North Asia"
    },

    {
        name: "Cyprus",
        capital: "Nicosia",
        currency: "Euro",
        region: "West Asia"
    },

    {
        name: "Timor-Leste",
        capital: "Dili",
        currency: "Dollar",
        region: "Southeast Asia"
    },

    {
        name: "Palestine",
        capital: "Ramallah",
        currency: "Shekel",
        region: "West Asia"
    },

    {
        name: "Taiwan",
        capital: "Taipei",
        currency: "Dollar",
        region: "East Asia"
    }

];


/* =========================================================
   PROFILE
========================================================= */

let profile = {

    name: "Player",

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

    luckyAnswer: 0

};


/* =========================================================
   GAME STATE
========================================================= */

let difficulty = 1;

let questionNumber = 0;

let score = 0;

let lives = 3;

let combo = 0;

let bestCombo = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let usedCountries = [];

let currentQuestion = null;

let answerLocked = false;


/* =========================================================
   STORAGE
========================================================= */

function saveProfile() {

    localStorage.setItem(
        "asiaCountryProfile",
        JSON.stringify(profile)
    );

}


function loadProfile() {

    const saved =
        localStorage.getItem(
            "asiaCountryProfile"
        );

    if (saved) {

        try {

            profile =
                JSON.parse(saved);

        }
        catch {

            saveProfile();

        }

    }

}


/* =========================================================
   INITIALIZATION
========================================================= */

window.onload = function() {

    loadProfile();

    updateHeader();

    updateMainProfile();

    showScreen("mainMenu");

};


/* =========================================================
   SCREEN SYSTEM
========================================================= */

function showScreen(id) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(
        screen => screen.classList.add("hidden")
    );

    document
        .getElementById(id)
        .classList.remove("hidden");

}


function goHome() {

    updateHeader();

    updateMainProfile();

    showScreen("mainMenu");

}


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {

    document
        .getElementById("headerProfile")
        .textContent =
        profile.name;

    document
        .getElementById("headerCoins")
        .textContent =
        "🪙 " + profile.coins;

}


function updateMainProfile() {

    const accuracy =
        profile.totalQuestions > 0
        ? (
            profile.totalCorrect /
            profile.totalQuestions *
            100
        ).toFixed(1)
        : 0;


    document
        .getElementById("mainProfileInfo")
        .innerHTML = `

        <p>
            👤 <strong>${profile.name}</strong>
        </p>

        <p>
            ⭐ Level:
            <strong>${profile.level}</strong>
        </p>

        <p>
            🏅 Rank:
            <strong>${getRank(profile.level)}</strong>
        </p>

        <p>
            XP:
            <strong>${profile.xp}</strong>
        </p>

        <p>
            🪙 Coins:
            <strong>${profile.coins}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${profile.highScore}</strong>
        </p>

        <p>
            🎯 Accuracy:
            <strong>${accuracy}%</strong>
        </p>

    `;

}


/* =========================================================
   LEVEL
========================================================= */

function calculateLevel(xp) {

    return Math.floor(xp / 500) + 1;

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


/* =========================================================
   XP
========================================================= */

function addXP(amount) {

    const oldLevel =
        profile.level;

    profile.xp += amount;

    profile.level =
        calculateLevel(profile.xp);


    if (profile.level > oldLevel) {

        profile.coins += 500;

        showMessage(
            "🎉 LEVEL UP! Level " +
            profile.level +
            "! +500 Coins"
        );

    }

}


/* =========================================================
   COINS
========================================================= */

function addCoins(amount) {

    profile.coins += amount;

}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    if (!profile.name) {

        alert(
            "Please create a profile first."
        );

        return;

    }

    showScreen(
        "difficultyScreen"
    );

}


/* =========================================================
   DIFFICULTY
========================================================= */

function selectDifficulty(value) {

    difficulty = value;

    questionNumber = 0;

    score = 0;

    lives = 3;

    combo = 0;

    bestCombo = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    usedCountries = [];

    answerLocked = false;


    if (profile.extraLives > 0) {

        const use =
            confirm(
                "You have " +
                profile.extraLives +
                " Extra Life(s).\n\n" +
                "Use one for this game?"
            );

        if (use) {

            profile.extraLives--;

            lives++;

        }

    }


    showScreen("gameScreen");

    nextQuestion();

}


/* =========================================================
   RANDOM
========================================================= */

function randomCountryIndex() {

    return Math.floor(
        Math.random() *
        countries.length
    );

}


function randomDifferent(excluded) {

    let index;

    do {

        index =
            randomCountryIndex();

    }
    while (
        excluded.includes(index)
    );

    return index;

}


/* =========================================================
   QUESTION TYPE
========================================================= */

function chooseQuestionType() {

    if (difficulty === 1)
        return 1;

    if (difficulty === 2)
        return 1 + Math.floor(Math.random() * 2);

    return 1 + Math.floor(Math.random() * 4);

}


/* =========================================================
   CREATE OPTIONS
========================================================= */

function createOptions(correct) {

    const options = [
        correct
    ];


    while (options.length < 4) {

        const index =
            randomDifferent(options);

        options.push(index);

    }


    for (
        let i = options.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
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


    return options;

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (questionNumber >= 10) {

        endGame();

        return;

    }


    questionNumber++;

    answerLocked = false;


    let correct;

    do {

        correct =
            randomCountryIndex();

    }
    while (
        usedCountries.includes(correct)
    );


    usedCountries.push(correct);


    const type =
        chooseQuestionType();


    const options =
        createOptions(correct);


    currentQuestion = {

        correct,

        type,

        options

    };


    renderQuestion();

}


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const q =
        currentQuestion;

    const country =
        countries[q.correct];


    document
        .getElementById("questionNumber")
        .textContent =
        questionNumber;


    document
        .getElementById("lives")
        .textContent =
        lives;


    document
        .getElementById("combo")
        .textContent =
        combo;


    document
        .getElementById("score")
        .textContent =
        score;


    document
        .getElementById("xp")
        .textContent =
        profile.xp;


    document
        .getElementById("coins")
        .textContent =
        profile.coins;


    document
        .getElementById("level")
        .textContent =
        profile.level;


    let title = "";

    let info = "";


    if (q.type === 1) {

        title =
            "Capital → Country";

        info =
            `<strong>Capital:</strong><br>
             ${country.capital}`;

    }


    else if (q.type === 2) {

        title =
            "Country → Capital";

        info =
            `<strong>Country:</strong><br>
             ${country.name}`;

    }


    else if (q.type === 3) {

        title =
            "Currency → Country";

        info =
            `<strong>Currency:</strong><br>
             ${country.currency}`;

    }


    else {

        title =
            "Region → Country";

        info =
            `<strong>Region:</strong><br>
             ${country.region}`;

    }


    document
        .getElementById("questionType")
        .textContent =
        title;


    document
        .getElementById("questionText")
        .textContent =
        "Choose the correct country";


    document
        .getElementById("questionInfo")
        .innerHTML =
        info;


    const answers =
        document.getElementById("answers");


    answers.innerHTML = "";


    q.options.forEach(
        (index, position) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-button";


            button.textContent =
                (position + 1) +
                ". " +
                countries[index].name;


            button.onclick =
                () =>
                answerQuestion(
                    index,
                    button
                );


            answers.appendChild(button);

        }
    );

}


/* =========================================================
   ANSWER
========================================================= */

function answerQuestion(
    selected,
    button
) {

    if (answerLocked)
        return;


    answerLocked = true;


    const q =
        currentQuestion;


    const correct =
        q.correct;


    if (
        selected !== correct &&
        profile.luckyAnswer > 0
    ) {

        const useLucky =
            confirm(
                "Wrong answer!\n\n" +
                "Use Lucky Answer?"
            );


        if (useLucky) {

            profile.luckyAnswer--;

            selected = correct;

            showMessage(
                "🍀 Lucky Answer activated!"
            );

        }

    }


    if (selected === correct) {

        handleCorrect();

    }

    else {

        handleWrong();

    }

}


/* =========================================================
   CORRECT
========================================================= */

function handleCorrect() {

    combo++;

    correctAnswers++;


    if (combo > bestCombo)
        bestCombo = combo;


    let baseScore;


    if (difficulty === 1)
        baseScore = 100;

    else if (difficulty === 2)
        baseScore = 150;

    else
        baseScore = 200;


    let comboBonus = 0;


    if (combo >= 2)
        comboBonus =
            combo * 25;


    let gained =
        baseScore +
        comboBonus;


    if (profile.scoreBoost > 0) {

        profile.scoreBoost--;

        gained =
            Math.floor(
                gained * 1.25
            );

    }


    score += gained;


    let gainedXP =
        50 +
        combo * 10;


    if (profile.doubleXP > 0) {

        profile.doubleXP--;

        gainedXP *= 2;

    }


    addXP(gainedXP);


    const coinReward =
        20 +
        combo * 5;


    addCoins(coinReward);


    saveProfile();


    showMessage(
        "✅ CORRECT! +" +
        gained +
        " points | +" +
        gainedXP +
        " XP | +" +
        coinReward +
        " Coins"
    );


    setTimeout(
        () => {

            if (lives > 0)
                nextQuestion();

        },
        1000
    );

}


/* =========================================================
   WRONG
========================================================= */

function handleWrong() {

    wrongAnswers++;

    combo = 0;


    if (profile.secondChance > 0) {

        const use =
            confirm(
                "❌ Wrong answer!\n\n" +
                "Use Second Chance?"
            );


        if (use) {

            profile.secondChance--;

            showMessage(
                "🔄 Second Chance activated!"
            );


            saveProfile();


            setTimeout(
                () => {

                    answerLocked =
                        false;

                    renderQuestion();

                },
                1000
            );


            return;

        }

    }


    lives--;


    showMessage(
        "❌ WRONG! Correct answer: " +
        countries[
            currentQuestion.correct
        ].name
    );


    saveProfile();


    setTimeout(
        () => {

            if (lives <= 0) {

                endGame();

            }

            else {

                nextQuestion();

            }

        },
        1200
    );

}


/* =========================================================
   HINT
========================================================= */

function useHint() {

    if (answerLocked)
        return;


    if (profile.hints <= 0) {

        showMessage(
            "You don't have any Hint."
        );

        return;

    }


    profile.hints--;


    const correct =
        currentQuestion.correct;


    const wrongButtons =
        [];


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    currentQuestion.options.forEach(
        (index, position) => {

            if (
                index !== correct &&
                wrongButtons.length < 2
            ) {

                wrongButtons.push(
                    position
                );

            }

        }
    );


    wrongButtons.forEach(
        position => {

            buttons[position]
                .classList
                .add("removed");

        }
    );


    score =
        Math.max(
            0,
            score - 25
        );


    saveProfile();


    showMessage(
        "💡 Hint used! -25 points"
    );

}


/* =========================================================
   INVENTORY
========================================================= */

function showInventoryDuringGame() {

    showInventory();

}


function showInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    document
        .getElementById("inventoryInfo")
        .innerHTML = `

        <div class="inventory-row">
            <span>💡 Hints</span>
            <strong>${profile.hints}</strong>
        </div>

        <div class="inventory-row">
            <span>❤️ Extra Lives</span>
            <strong>${profile.extraLives}</strong>
        </div>

        <div class="inventory-row">
            <span>✨ Double XP</span>
            <strong>${profile.doubleXP}</strong>
        </div>

        <div class="inventory-row">
            <span>📈 Score Boost</span>
            <strong>${profile.scoreBoost}</strong>
        </div>

        <div class="inventory-row">
            <span>🔄 Second Chance</span>
            <strong>${profile.secondChance}</strong>
        </div>

        <div class="inventory-row">
            <span>🍀 Lucky Answer</span>
            <strong>${profile.luckyAnswer}</strong>
        </div>

    `;


    modal.classList.remove("hidden");

}


function closeInventory() {

    document
        .getElementById("inventoryModal")
        .classList.add("hidden");

}


/* =========================================================
   SHOP
========================================================= */

function openShop() {

    updateShop();

    showScreen("shopScreen");

}


function updateShop() {

    document
        .getElementById("shopCoins")
        .textContent =
        profile.coins;

}


function buyItem(item, price) {

    if (profile.coins < price) {

        showMessage(
            "❌ Not enough Coins!"
        );

        return;

    }


    profile.coins -= price;

    profile[item]++;


    saveProfile();

    updateShop();

    updateHeader();


    showMessage(
        "✅ Purchased successfully!"
    );

}


/* =========================================================
   PROFILE MENU
========================================================= */

function openProfileMenu() {

    updateProfileScreen();

    showScreen("profileScreen");

}


function updateProfileScreen() {

    const accuracy =
        profile.totalQuestions > 0
        ? (
            profile.totalCorrect /
            profile.totalQuestions *
            100
        ).toFixed(1)
        : 0;


    document
        .getElementById("profileInfo")
        .innerHTML = `

        <p>
            👤 Name:
            <strong>${profile.name}</strong>
        </p>

        <p>
            ⭐ Level:
            <strong>${profile.level}</strong>
        </p>

        <p>
            🏅 Rank:
            <strong>${getRank(profile.level)}</strong>
        </p>

        <p>
            XP:
            <strong>${profile.xp}</strong>
        </p>

        <p>
            🪙 Coins:
            <strong>${profile.coins}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${profile.highScore}</strong>
        </p>

        <p>
            🎮 Total Games:
            <strong>${profile.totalGames}</strong>
        </p>

        <p>
            ❓ Questions:
            <strong>${profile.totalQuestions}</strong>
        </p>

        <p>
            ✅ Correct:
            <strong>${profile.totalCorrect}</strong>
        </p>

        <p>
            ❌ Wrong:
            <strong>${profile.totalWrong}</strong>
        </p>

        <p>
            🔥 Best Combo:
            <strong>${profile.bestCombo}</strong>
        </p>

        <p>
            🎯 Accuracy:
            <strong>${accuracy}%</strong>
        </p>

    `;

}


/* =========================================================
   CREATE PROFILE
========================================================= */

function createProfile() {

    const input =
        document.getElementById(
            "profileName"
        );


    const name =
        input.value.trim();


    if (!name) {

        showMessage(
            "Please enter a profile name."
        );

        return;

    }


    profile.name =
        name;


    saveProfile();

    updateProfileScreen();

    updateHeader();

    updateMainProfile();


    input.value = "";


    showMessage(
        "👤 Profile created!"
    );

}


/* =========================================================
   RESET PROFILE
========================================================= */

function resetProfile() {

    const confirmReset =
        confirm(
            "Are you sure?\n\n" +
            "All progress will be deleted."
        );


    if (!confirmReset)
        return;


    profile = {

        name: "Player",

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

        luckyAnswer: 0

    };


    saveProfile();

    updateProfileScreen();

    updateHeader();

    updateMainProfile();


    showMessage(
        "Profile reset."
    );

}


/* =========================================================
   COUNTRY DATABASE
========================================================= */

function openDatabase() {

    const container =
        document.getElementById(
            "countryDatabase"
        );


    container.innerHTML = "";


    countries.forEach(
        (country, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "country-card";


            div.innerHTML = `

                <h3>
                    ${index + 1}.
                    ${country.name}
                </h3>

                <p>
                    🏛️ Capital:
                    ${country.capital}
                </p>

                <p>
                    💰 Currency:
                    ${country.currency}
                </p>

                <p>
                    🌍 Region:
                    ${country.region}
                </p>

            `;


            container.appendChild(div);

        }
    );


    showScreen(
        "databaseScreen"
    );

}


/* =========================================================
   RULES
========================================================= */

function showRules() {

    showScreen(
        "rulesScreen"
    );

}


/* =========================================================
   UPDATE LOG
========================================================= */

function showUpdateLog() {

    showScreen(
        "updateScreen"
    );

}


/* =========================================================
   END GAME
========================================================= */

function endGame() {

    answerLocked = true;


    profile.totalGames++;

    profile.totalCorrect +=
        correctAnswers;

    profile.totalWrong +=
        wrongAnswers;

    profile.totalQuestions +=
        correctAnswers +
        wrongAnswers;


    if (
        bestCombo >
        profile.bestCombo
    ) {

        profile.bestCombo =
            bestCombo;

    }


    let completionReward = 100;


    if (
        correctAnswers === 10
    ) {

        completionReward += 250;

    }


    if (
        difficulty === 3
    ) {

        completionReward += 100;

    }


    addCoins(
        completionReward
    );


    let newHighScore = false;


    if (
        score >
        profile.highScore
    ) {

        profile.highScore =
            score;

        newHighScore = true;

    }


    saveProfile();


    const accuracy =
        (
            correctAnswers /
            Math.max(
                1,
                correctAnswers +
                wrongAnswers
            ) *
            100
        ).toFixed(1);


    document
        .getElementById("resultInfo")
        .innerHTML = `

        <div class="result-stat">
            <span>⭐ Final Score</span>
            <strong>${score}</strong>
        </div>

        <div class="result-stat">
            <span>✅ Correct</span>
            <strong>${correctAnswers}</strong>
        </div>

        <div class="result-stat">
            <span>❌ Wrong</span>
            <strong>${wrongAnswers}</strong>
        </div>

        <div class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>${bestCombo}</strong>
        </div>

        <div class="result-stat">
            <span>🎯 Accuracy</span>
            <strong>${accuracy}%</strong>
        </div>

        <div class="result-stat">
            <span>🪙 Game Reward</span>
            <strong>+${completionReward}</strong>
        </div>

        <div class="result-stat">
            <span>⭐ Level</span>
            <strong>${profile.level}</strong>
        </div>

        <div class="result-stat">
            <span>🏅 Rank</span>
            <strong>${getRank(profile.level)}</strong>
        </div>

        <div class="result-stat">
            <span>🏆 High Score</span>
            <strong>${profile.highScore}</strong>
        </div>

        ${
            newHighScore
            ? `
            <h2>
                🏆 NEW HIGH SCORE!
            </h2>
            `
            : ""
        }

        ${
            correctAnswers === 10
            ? `
            <h2>
                🌟 PERFECT GAME!
            </h2>
            `
            : ""
        }

    `;


    updateHeader();


    showScreen(
        "resultScreen"
    );

}


/* =========================================================
   MESSAGE
========================================================= */

let messageTimeout;


function showMessage(text) {

    const box =
        document.getElementById(
            "messageBox"
        );


    box.textContent =
        text;


    box.classList.remove(
        "hidden"
    );


    clearTimeout(
        messageTimeout
    );


    messageTimeout =
        setTimeout(
            () => {

                box.classList.add(
                    "hidden"
                );

            },
            2500
        );

}
