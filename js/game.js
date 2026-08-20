// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// GAME ENGINE
// ============================================================
//
// IMPORTANT
// ------------------------------------------------------------
// countries.js đã chứa toàn bộ dữ liệu quốc gia.
//
// country object:
// {
//     name: "...",
//     capital: "...",
//     currency: "...",
//     region: "..."
// }
//
// KHÔNG tạo lại country data ở đây.
// KHÔNG ghi đè countries.
// KHÔNG xóa profile.
// KHÔNG reset localStorage.
// ============================================================


// ============================================================
// GAME STATE
// ============================================================

let game = {

    active: false,

    difficulty: 1,

    question: 0,

    totalQuestions: 10,

    score: 0,

    lives: 3,

    combo: 0,

    bestCombo: 0,

    correct: 0,

    wrong: 0,

    usedQuestions: [],

    currentCountry: -1,

    options: [],

    questionType: 1,

    hintUsed: false,

    locked: false,

    finished: false

};


// ============================================================
// PROFILE SAFETY
// ============================================================

function prepareProfile(profile) {

    if (!profile) {
        return null;
    }

    // --------------------------------------------------------
    // Chỉ bổ sung field còn thiếu.
    // KHÔNG reset dữ liệu cũ.
    // --------------------------------------------------------

    const defaults = {

        level: 1,

        xp: 0,

        highScore: 0,

        totalGames: 0,

        totalCorrect: 0,

        totalWrong: 0,

        totalQuestions: 0,

        bestCombo: 0,

        coins: 0,

        totalCoinsEarned: 0,

        hints: 0,

        extraLives: 0,

        doubleXP: 0,

        scoreBoost: 0,

        secondChance: 0,

        luckyAnswer: 0,

        achievements: [],

        mastery: {},

        dailyStreak: 0,

        lastDailyChallenge: null

    };


    Object.keys(defaults).forEach(
        key => {

            if (
                typeof profile[key] ===
                "undefined"
            ) {

                profile[key] =
                    defaults[key];

            }

        }
    );


    return profile;

}


// ============================================================
// COUNTRY HELPERS
// ============================================================

function getCountryName(country) {

    if (!country)
        return "";

    return String(
        country.name || ""
    );

}


function getCountryCapital(country) {

    if (!country)
        return "";

    return String(
        country.capital || ""
    );

}


function getCountryCurrency(country) {

    if (!country)
        return "";

    return String(
        country.currency || ""
    );

}


function getCountryRegion(country) {

    if (!country)
        return "";

    return String(
        country.region || ""
    );

}


// ============================================================
// CHECK COUNTRY DATABASE
// ============================================================

function validateCountries() {

    if (
        typeof countries ===
        "undefined"
    ) {

        console.error(
            "countries.js has not been loaded."
        );

        return false;

    }


    if (
        !Array.isArray(countries)
    ) {

        console.error(
            "countries must be an array."
        );

        return false;

    }


    if (
        countries.length === 0
    ) {

        console.error(
            "Country database is empty."
        );

        return false;

    }


    return true;

}


// ============================================================
// RESET GAME
// ============================================================

function resetGame(difficulty) {

    game = {

        active: true,

        difficulty:
            Number(difficulty),

        question: 0,

        totalQuestions: 10,

        score: 0,

        lives: 3,

        combo: 0,

        bestCombo: 0,

        correct: 0,

        wrong: 0,

        usedQuestions: [],

        currentCountry: -1,

        options: [],

        questionType: 1,

        hintUsed: false,

        locked: false,

        finished: false

    };

}


// ============================================================
// START GAME
// ============================================================

function startGame(difficulty) {

    if (!validateCountries()) {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                "Country database could not be loaded."
            );

        }

        return;

    }


    if (
        typeof getProfile !==
        "function"
    ) {

        console.error(
            "getProfile() is not available."
        );

        return;

    }


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                "Create/select a profile first."
            );

        }


        if (
            typeof openProfileMenu ===
            "function"
        ) {

            openProfileMenu();

        }


        return;

    }


    difficulty =
        Number(difficulty);


    if (
        !Number.isFinite(
            difficulty
        ) ||
        difficulty < 1 ||
        difficulty > 3
    ) {

        difficulty = 1;

    }


    resetGame(
        difficulty
    );


    // --------------------------------------------------------
    // EXTRA LIFE
    // --------------------------------------------------------

    if (
        Number(profile.extraLives) > 0
    ) {

        const use =
            confirm(
                `You have ${profile.extraLives} Extra Life(s).\nUse one?`
            );


        if (use) {

            profile.extraLives--;

            game.lives++;

            safeSave();

        }

    }


    if (
        typeof showScreen ===
        "function"
    ) {

        showScreen(
            "gameScreen"
        );

    }


    updateGameProfileStats();

    nextQuestion();

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    if (!game.active) {
        return;
    }


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


    generateQuestion();

    renderQuestion();

}


// ============================================================
// GENERATE QUESTION
// ============================================================

function generateQuestion() {

    if (!validateCountries()) {
        return;
    }


    // --------------------------------------------------------
    // QUESTION TYPE
    // --------------------------------------------------------

    if (
        game.difficulty === 1
    ) {

        // EASY
        // Capital -> Country

        game.questionType = 1;

    }

    else if (
        game.difficulty === 2
    ) {

        // NORMAL
        // Capital / Country

        game.questionType =
            1 +
            Math.floor(
                Math.random() * 2
            );

    }

    else {

        // HARD
        // Capital / Country / Currency / Region

        game.questionType =
            1 +
            Math.floor(
                Math.random() * 4
            );

    }


    // --------------------------------------------------------
    // FIND CORRECT COUNTRY
    // --------------------------------------------------------

    let correct = -1;


    const available =
        [];


    for (
        let i = 0;
        i < countries.length;
        i++
    ) {

        if (
            !game.usedQuestions
                .includes(i)
        ) {

            available.push(i);

        }

    }


    // Nếu đã dùng hết country
    // thì cho phép dùng lại.

    if (
        available.length === 0
    ) {

        game.usedQuestions = [];

        for (
            let i = 0;
            i < countries.length;
            i++
        ) {

            available.push(i);

        }

    }


    correct =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    game.usedQuestions.push(
        correct
    );


    game.currentCountry =
        correct;


    // --------------------------------------------------------
    // GENERATE OPTIONS
    // --------------------------------------------------------

    game.options =
        generateOptions(
            correct,
            game.questionType
        );

}


// ============================================================
// GENERATE OPTIONS
// ============================================================

function generateOptions(
    correctIndex,
    questionType
) {

    const options = [
        correctIndex
    ];


    // --------------------------------------------------------
    // CAPITAL / COUNTRY
    // --------------------------------------------------------

    if (
        questionType === 1 ||
        questionType === 2
    ) {

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


        shuffle(options);

        return options;

    }


    // --------------------------------------------------------
    // CURRENCY
    // --------------------------------------------------------
    //
    // Đảm bảo 4 country có currency khác nhau.
    // Tránh:
    //
    // India -> Rupee
    // Pakistan -> Rupee
    //
    // khiến có 2 đáp án đúng.
    // --------------------------------------------------------

    if (
        questionType === 3
    ) {

        const usedCurrencies = new Set();

        usedCurrencies.add(
            getCountryCurrency(
                countries[
                    correctIndex
                ]
            )
        );


        const candidates =
            [];


        for (
            let i = 0;
            i < countries.length;
            i++
        ) {

            if (
                i === correctIndex
            ) {

                continue;

            }


            const currency =
                getCountryCurrency(
                    countries[i]
                );


            if (
                !usedCurrencies.has(
                    currency
                )
            ) {

                candidates.push(
                    i
                );

                usedCurrencies.add(
                    currency
                );

            }


            if (
                candidates.length >= 3
            ) {

                break;

            }

        }


        // Fallback
        // nếu database không đủ currency khác nhau.

        if (
            candidates.length < 3
        ) {

            for (
                let i = 0;
                i < countries.length;
                i++
            ) {

                if (
                    i === correctIndex ||
                    options.includes(i)
                ) {

                    continue;

                }


                candidates.push(i);


                if (
                    candidates.length >= 3
                ) {

                    break;

                }

            }

        }


        options.push(
            ...candidates.slice(0, 3)
        );


        shuffle(options);

        return options;

    }


    // --------------------------------------------------------
    // REGION
    // --------------------------------------------------------
    //
    // Đảm bảo 4 country thuộc 4 region khác nhau.
    // --------------------------------------------------------

    if (
        questionType === 4
    ) {

        const usedRegions =
            new Set();


        usedRegions.add(
            getCountryRegion(
                countries[
                    correctIndex
                ]
            )
        );


        const candidates =
            [];


        for (
            let i = 0;
            i < countries.length;
            i++
        ) {

            if (
                i === correctIndex
            ) {

                continue;

            }


            const region =
                getCountryRegion(
                    countries[i]
                );


            if (
                !usedRegions.has(
                    region
                )
            ) {

                candidates.push(
                    i
                );

                usedRegions.add(
                    region
                );

            }


            if (
                candidates.length >= 3
            ) {

                break;

            }

        }


        if (
            candidates.length < 3
        ) {

            for (
                let i = 0;
                i < countries.length;
                i++
            ) {

                if (
                    i === correctIndex ||
                    options.includes(i)
                ) {

                    continue;

                }


                candidates.push(i);


                if (
                    candidates.length >= 3
                ) {

                    break;

                }

            }

        }


        options.push(
            ...candidates.slice(0, 3)
        );


        shuffle(options);

        return options;

    }


    shuffle(options);

    return options;

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

    if (!validateCountries()) {
        return;
    }


    const country =
        countries[
            game.currentCountry
        ];


    if (!country) {

        console.error(
            "Invalid country index:",
            game.currentCountry
        );

        return;

    }


    // --------------------------------------------------------
    // TOP BAR
    // --------------------------------------------------------

    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const lives =
        document.getElementById(
            "lives"
        );


    const combo =
        document.getElementById(
            "combo"
        );


    const score =
        document.getElementById(
            "score"
        );


    if (questionNumber) {

        questionNumber.textContent =
            `${game.question}/${game.totalQuestions}`;

    }


    if (lives) {

        lives.textContent =
            game.lives;

    }


    if (combo) {

        combo.textContent =
            game.combo;

    }


    if (score) {

        score.textContent =
            game.score;

    }


    updateGameProfileStats();


    // --------------------------------------------------------
    // QUESTION DATA
    // --------------------------------------------------------

    let title = "";

    let value = "";


    switch (
        game.questionType
    ) {

        case 1:

            title =
                "Which country has this capital?";

            value =
                getCountryCapital(
                    country
                );

            break;


        case 2:

            title =
                "What is the capital of this country?";

            value =
                getCountryName(
                    country
                );

            break;


        case 3:

            title =
                "Which country uses this currency?";

            value =
                getCountryCurrency(
                    country
                );

            break;


        case 4:

            title =
                "Which country belongs to this region?";

            value =
                getCountryRegion(
                    country
                );

            break;


        default:

            title =
                "Choose the correct answer:";

            value = "";

            break;

    }


    const questionType =
        document.getElementById(
            "questionType"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const questionValue =
        document.getElementById(
            "questionValue"
        );


    if (questionType) {

        questionType.textContent =
            title;

    }


    if (questionText) {

        questionText.textContent =
            "Choose the correct answer:";

    }


    if (questionValue) {

        questionValue.textContent =
            value;

    }


    renderAnswers();

}


// ============================================================
// RENDER ANSWERS
// ============================================================

function renderAnswers() {

    const container =
        document.getElementById(
            "answers"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    game.options.forEach(
        (
            countryIndex,
            position
        ) => {

            const country =
                countries[
                    countryIndex
                ];


            if (!country) {
                return;
            }


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.type =
                "button";


            button.textContent =
                `${position + 1}. ${getCountryName(country)}`;


            button.onclick =
                () => {

                    answerQuestion(
                        position
                    );

                };


            container.appendChild(
                button
            );

        }
    );

}


// ============================================================
// UPDATE GAME PROFILE STATS
// ============================================================

function updateGameProfileStats() {

    if (
        typeof getProfile !==
        "function"
    ) {

        return;

    }


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {
        return;
    }


    const xp =
        document.getElementById(
            "gameXP"
        );


    const coins =
        document.getElementById(
            "gameCoins"
        );


    const level =
        document.getElementById(
            "gameLevel"
        );


    if (xp) {

        xp.textContent =
            profile.xp;

    }


    if (coins) {

        coins.textContent =
            profile.coins;

    }


    if (level) {

        level.textContent =
            profile.level;

    }


    // --------------------------------------------------------
    // Optional HUD
    // --------------------------------------------------------

    const gameScore =
        document.getElementById(
            "score"
        );


    const gameLives =
        document.getElementById(
            "lives"
        );


    const gameCombo =
        document.getElementById(
            "combo"
        );


    if (gameScore) {

        gameScore.textContent =
            game.score;

    }


    if (gameLives) {

        gameLives.textContent =
            game.lives;

    }


    if (gameCombo) {

        gameCombo.textContent =
            game.combo;

    }

}


// ============================================================
// SAFE SAVE
// ============================================================

function safeSave() {

    try {

        if (
            typeof save ===
            "function"
        ) {

            save();

        }

    }
    catch (error) {

        console.error(
            "Game save error:",
            error
        );

    }

}


// ============================================================
// CHECK ACHIEVEMENTS
// ============================================================

function runAchievementCheck() {

    try {

        if (
            typeof checkAchievements ===
            "function"
        ) {

            checkAchievements();

        }

    }
    catch (error) {

        console.error(
            "Achievement check error:",
            error
        );

    }

}


// ============================================================
// ANSWER QUESTION
// ============================================================

function answerQuestion(
    position
) {

    if (
        game.locked ||
        !game.active
    ) {

        return;

    }


    if (
        !Number.isInteger(
            position
        )
    ) {

        return;

    }


    if (
        position < 0 ||
        position >=
        game.options.length
    ) {

        return;

    }


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


    // --------------------------------------------------------
    // LUCKY ANSWER
    // --------------------------------------------------------

    const profile =
        prepareProfile(
            getProfile()
        );


    if (
        profile &&
        profile.luckyAnswer > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Lucky Answer?"
            );


        if (use) {

            profile.luckyAnswer--;

            safeSave();

            correctAnswer(
                true
            );

            return;

        }

    }


    wrongAnswer();

}


// ============================================================
// CORRECT ANSWER
// ============================================================

function correctAnswer(
    lucky = false
) {

    if (
        game.locked ||
        !game.active
    ) {

        return;

    }


    game.locked = true;


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {

        game.locked = false;

        return;

    }


    // --------------------------------------------------------
    // COMBO
    // --------------------------------------------------------

    game.combo++;

    game.correct++;


    if (
        game.combo >
        game.bestCombo
    ) {

        game.bestCombo =
            game.combo;

    }


    // --------------------------------------------------------
    // BASE SCORE
    // --------------------------------------------------------

    let baseScore = 100;


    if (
        game.difficulty === 2
    ) {

        baseScore = 150;

    }


    if (
        game.difficulty === 3
    ) {

        baseScore = 200;

    }


    // --------------------------------------------------------
    // COMBO BONUS
    // --------------------------------------------------------

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
        profile.scoreBoost > 0
    ) {

        const use =
            confirm(
                "Use Score Boost?"
            );


        if (use) {

            profile.scoreBoost--;

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
        profile.doubleXP > 0
    ) {

        const use =
            confirm(
                "Use Double XP?"
            );


        if (use) {

            profile.doubleXP--;

            gainedXP *= 2;

        }

    }


    // --------------------------------------------------------
    // ADD XP
    // --------------------------------------------------------

    try {

        if (
            typeof addXP ===
            "function"
        ) {

            addXP(
                gainedXP
            );

        }
        else {

            // Fallback

            profile.xp +=
                gainedXP;


            profile.level =
                Math.floor(
                    profile.xp / 500
                ) + 1;

        }

    }
    catch (error) {

        console.error(
            "XP error:",
            error
        );

    }


    // --------------------------------------------------------
    // COINS
    // --------------------------------------------------------

    const coinReward =
        20 +
        game.combo * 5;


    try {

        if (
            typeof addCoins ===
            "function"
        ) {

            addCoins(
                coinReward
            );

        }
        else {

            profile.coins +=
                coinReward;

            profile.totalCoinsEarned +=
                coinReward;

        }

    }
    catch (error) {

        console.error(
            "Coin error:",
            error
        );

    }


    // --------------------------------------------------------
    // STATISTICS
    // --------------------------------------------------------

    profile.totalCorrect++;

    profile.totalQuestions++;


    // --------------------------------------------------------
    // COUNTRY MASTERY
    // --------------------------------------------------------

    const country =
        countries[
            game.currentCountry
        ];


    if (
        country
    ) {

        const countryName =
            getCountryName(
                country
            );


        if (
            profile.mastery &&
            typeof profile.mastery ===
            "object"
        ) {

            profile.mastery[
                countryName
            ] =
                Math.min(
                    100,
                    (
                        Number(
                            profile.mastery[
                                countryName
                            ]
                        ) || 0
                    ) + 5
                );

            }

        }

    }


    safeSave();

    updateGameProfileStats();

    runAchievementCheck();


    // --------------------------------------------------------
    // MESSAGE
    // --------------------------------------------------------

    if (lucky) {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                `🍀 Lucky! +${gained} points, +${gainedXP} XP`
            );

        }

    }
    else {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`
            );

        }

    }


    // --------------------------------------------------------
    // NEXT QUESTION
    // --------------------------------------------------------

    setTimeout(
        () => {

            nextQuestion();

        },
        900
    );

}


// ============================================================
// WRONG ANSWER
// ============================================================

function wrongAnswer() {

    if (
        game.locked ||
        !game.active
    ) {

        return;

    }


    game.locked = true;


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {

        game.locked = false;

        return;

    }


    // --------------------------------------------------------
    // SECOND CHANCE
    // --------------------------------------------------------

    if (
        profile.secondChance > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Second Chance?"
            );


        if (use) {

            profile.secondChance--;

            game.wrong++;

            game.combo = 0;


            profile.totalWrong++;

            profile.totalQuestions++;


            safeSave();

            updateGameProfileStats();

            runAchievementCheck();


            if (
                typeof toast ===
                "function"
            ) {

                toast(
                    "🔄 Second Chance activated!"
                );

            }


            setTimeout(
                () => {

                    nextQuestion();

                },
                900
            );


            return;

        }

    }


    // --------------------------------------------------------
    // NORMAL WRONG ANSWER
    // --------------------------------------------------------

    game.wrong++;

    game.combo = 0;

    game.lives--;


    profile.totalWrong++;

    profile.totalQuestions++;


    safeSave();

    updateGameProfileStats();

    runAchievementCheck();


    const correctCountry =
        countries[
            game.currentCountry
        ];


    const correctName =
        getCountryName(
            correctCountry
        );


    if (
        typeof toast ===
        "function"
    ) {

        toast(
            `❌ Wrong! Correct answer: ${correctName}`
        );

    }


    setTimeout(
        () => {

            nextQuestion();

        },
        1200
    );

}


// ============================================================
// HINT
// ============================================================

function useHint() {

    if (
        game.locked ||
        !game.active
    ) {

        return;

    }


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {
        return;
    }


    if (
        game.hintUsed
    ) {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                "Hint already used."
            );

        }

        return;

    }


    if (
        Number(profile.hints) <= 0
    ) {

        if (
            typeof toast ===
            "function"
        ) {

            toast(
                "You don't have any Hint."
            );

        }

        return;

    }


    profile.hints--;

    game.hintUsed = true;


    game.score -= 25;


    if (
        game.score < 0
    ) {

        game.score = 0;

    }


    // --------------------------------------------------------
    // FIND WRONG BUTTONS
    // --------------------------------------------------------

    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers button"
            )
        );


    const wrongButtons =
        buttons.filter(
            (
                button,
                index
            ) => {

                return (
                    game.options[index] !==
                    game.currentCountry
                );

            }
        );


    shuffle(
        wrongButtons
    );


    wrongButtons
        .slice(0, 2)
        .forEach(
            button => {

                button.classList.add(
                    "removed"
                );

                button.disabled =
                    true;

            }
        );


    safeSave();

    updateGameProfileStats();

    runAchievementCheck();


    if (
        typeof toast ===
        "function"
    ) {

        toast(
            "💡 Hint used! -25 points"
        );

    }

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    if (
        !game.active ||
        game.finished
    ) {

        return;

    }


    game.active = false;

    game.locked = true;

    game.finished = true;


    const profile =
        prepareProfile(
            getProfile()
        );


    if (!profile) {
        return;
    }


    // --------------------------------------------------------
    // COMPLETION REWARD
    // --------------------------------------------------------

    let completionReward =
        100;


    if (
        game.correct ===
        game.totalQuestions
    ) {

        completionReward +=
            250;

    }


    if (
        game.difficulty === 3
    ) {

        completionReward +=
            100;

    }


    // --------------------------------------------------------
    // COINS
    // --------------------------------------------------------

    try {

        if (
            typeof addCoins ===
            "function"
        ) {

            addCoins(
                completionReward
            );

        }
        else {

            profile.coins +=
                completionReward;

            profile.totalCoinsEarned +=
                completionReward;

        }

    }
    catch (error) {

        console.error(
            "Completion reward error:",
            error
        );

    }


    // --------------------------------------------------------
    // GAME STATISTICS
    // --------------------------------------------------------

    profile.totalGames++;


    if (
        game.bestCombo >
        Number(profile.bestCombo)
    ) {

        profile.bestCombo =
            game.bestCombo;

    }


    // --------------------------------------------------------
    // LAST GAME DATA
    // --------------------------------------------------------

    profile.lastGameScore =
        game.score;


    profile.lastGameCorrect =
        game.correct;


    profile.lastGameWrong =
        game.wrong;


    profile.lastGameCombo =
        game.bestCombo;


    profile.lastGameDifficulty =
        game.difficulty;


    // --------------------------------------------------------
    // HIGH SCORE
    // --------------------------------------------------------

    let newHighScore =
        false;


    if (
        game.score >
        Number(profile.highScore)
    ) {

        profile.highScore =
            game.score;

        newHighScore =
            true;

    }


    // --------------------------------------------------------
    // ACHIEVEMENTS
    // --------------------------------------------------------

    runAchievementCheck();


    // --------------------------------------------------------
    // SAVE
    // --------------------------------------------------------

    safeSave();


    // --------------------------------------------------------
    // RESULT MESSAGE
    // --------------------------------------------------------

    let message;


    if (
        newHighScore
    ) {

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


    // --------------------------------------------------------
    // RESULT UI
    // --------------------------------------------------------

    const result =
        document.getElementById(
            "resultInfo"
        );


    if (!result) {

        if (
            typeof goHome ===
            "function"
        ) {

            goHome();

        }

        return;

    }


    let rank =
        "Beginner";


    try {

        if (
            typeof getRank ===
            "function"
        ) {

            rank =
                getRank(
                    profile.level
                );

        }

    }
    catch (error) {

        console.error(
            "Rank error:",
            error
        );

    }


    result.innerHTML = `

        <div class="result-message">
            ${message}
        </div>

        <div class="result-stat">
            <span>⭐ Score</span>
            <strong>
                ${game.score}
            </strong>
        </div>

        <div class="result-stat">
            <span>✅ Correct</span>
            <strong>
                ${game.correct}
            </strong>
        </div>

        <div class="result-stat">
            <span>❌ Wrong</span>
            <strong>
                ${game.wrong}
            </strong>
        </div>

        <div class="result-stat">
            <span>🔥 Best Combo</span>
            <strong>
                ${game.bestCombo}
            </strong>
        </div>

        <div class="result-stat">
            <span>🪙 Coins</span>
            <strong>
                ${profile.coins}
            </strong>
        </div>

        <div class="result-stat">
            <span>🏆 Level</span>
            <strong>
                ${profile.level}
                (${rank})
            </strong>
        </div>

    `;


    if (
        typeof showScreen ===
        "function"
    ) {

        showScreen(
            "resultScreen"
        );

    }

}


// ============================================================
// QUIT GAME
// ============================================================

function confirmQuitGame() {

    if (
        !game.active ||
        game.locked
    ) {

        return;

    }


    const quit =
        confirm(
            "Quit this game?\nYour current game progress will be lost."
        );


    if (!quit) {
        return;
    }


    game.active = false;

    game.locked = true;


    if (
        typeof goHome ===
        "function"
    ) {

        goHome();

    }

}


// ============================================================
// GET CURRENT GAME DATA
// ============================================================

function getGameState() {

    return {

        active:
            game.active,

        difficulty:
            game.difficulty,

        question:
            game.question,

        totalQuestions:
            game.totalQuestions,

        score:
            game.score,

        lives:
            game.lives,

        combo:
            game.combo,

        bestCombo:
            game.bestCombo,

        correct:
            game.correct,

        wrong:
            game.wrong,

        currentCountry:
            game.currentCountry,

        questionType:
            game.questionType,

        options:
            [...game.options],

        hintUsed:
            game.hintUsed,

        locked:
            game.locked

    };

}


// ============================================================
// DEBUG
// ============================================================

function debugGame() {

    console.log(
        "================ GAME STATE ================"
    );

    console.log(
        game
    );

    console.log(
        "============================================="
    );

}


// ============================================================
// DEBUG COUNTRY DATABASE
// ============================================================

function debugCountries() {

    if (
        !validateCountries()
    ) {

        return;

    }


    console.log(
        "========== COUNTRY DATABASE =========="
    );


    console.log(
        "Total countries:",
        countries.length
    );


    countries.forEach(
        (
            country,
            index
        ) => {

            console.log(
                index + 1,
                country.name,
                "|",
                country.capital,
                "|",
                country.currency,
                "|",
                country.region
            );

        }
    );


    console.log(
        "======================================"
    );

}
