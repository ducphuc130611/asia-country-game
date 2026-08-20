// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// GAME ENGINE
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

    startTime: 0,

    questionStartTime: 0,

    timeLimit: 0,

    streak: 0,

    perfect: true

};


// ============================================================
// DIFFICULTY CONFIG
// ============================================================

const GAME_DIFFICULTY = {

    1: {

        name: "Easy",

        baseScore: 100,

        time: 30,

        lives: 3,

        questionTypes: [1],

        coinMultiplier: 1,

        xpMultiplier: 1

    },

    2: {

        name: "Normal",

        baseScore: 150,

        time: 20,

        lives: 3,

        questionTypes: [1, 2],

        coinMultiplier: 1.25,

        xpMultiplier: 1.25

    },

    3: {

        name: "Hard",

        baseScore: 200,

        time: 15,

        lives: 3,

        questionTypes: [1, 2, 3, 4],

        coinMultiplier: 1.5,

        xpMultiplier: 1.5

    }

};


// ============================================================
// RESET GAME
// ============================================================

function resetGame(difficulty = 1) {

    difficulty = Number(difficulty);

    if (!GAME_DIFFICULTY[difficulty]) {

        difficulty = 1;

    }

    const config =
        GAME_DIFFICULTY[difficulty];

    game = {

        active: true,

        difficulty: difficulty,

        question: 0,

        totalQuestions: 10,

        score: 0,

        lives: config.lives,

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

        startTime: Date.now(),

        questionStartTime: Date.now(),

        timeLimit: config.time,

        streak: 0,

        perfect: true

    };

}


// ============================================================
// START GAME
// ============================================================

function startGame(difficulty = 1) {

    const profile =
        typeof getProfile === "function"
            ? getProfile()
            : null;

    if (!profile) {

        if (typeof toast === "function") {

            toast(
                "Create or select a profile first."
            );

        }

        if (
            typeof openProfileMenu === "function"
        ) {

            openProfileMenu();

        }

        return;

    }


    difficulty = Number(difficulty);


    if (!GAME_DIFFICULTY[difficulty]) {

        difficulty = 1;

    }


    resetGame(difficulty);


    // --------------------------------------------------------
    // EXTRA LIFE
    // --------------------------------------------------------

    if (
        Number(profile.extraLives || 0) > 0
    ) {

        const use =
            confirm(
                `You have ${profile.extraLives} Extra Life(s).\nUse one?`
            );

        if (use) {

            profile.extraLives--;

            game.lives++;

            if (typeof save === "function") {

                save();

            }

        }

    }


    game.timeLimit =
        GAME_DIFFICULTY[difficulty].time;


    if (
        typeof showScreen === "function"
    ) {

        showScreen("gameScreen");

    }


    if (
        typeof updateGameUI === "function"
    ) {

        updateGameUI();

    }


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

    game.questionStartTime =
        Date.now();


    generateQuestion();

    renderQuestion();

}


// ============================================================
// GENERATE QUESTION
// ============================================================

function generateQuestion() {

    if (
        typeof countries === "undefined" ||
        !Array.isArray(countries) ||
        countries.length === 0
    ) {

        console.error(
            "countries was not found. Check country.js."
        );

        return;

    }


    let correct;

    let attempts = 0;


    do {

        correct =
            Math.floor(
                Math.random() *
                countries.length
            );

        attempts++;

    }
    while (
        game.usedQuestions.includes(correct) &&
        attempts < 100
    );


    game.usedQuestions.push(correct);

    game.currentCountry =
        correct;


    // --------------------------------------------------------
    // ANSWER OPTIONS
    // --------------------------------------------------------

    const options = [correct];


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

    game.options = options;


    // --------------------------------------------------------
    // QUESTION TYPE
    // --------------------------------------------------------

    const config =
        GAME_DIFFICULTY[
            game.difficulty
        ];


    const types =
        config.questionTypes;


    game.questionType =
        types[
            Math.floor(
                Math.random() *
                types.length
            )
        ];

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


    if (!country) {

        console.error(
            "Invalid country index."
        );

        return;

    }


    // --------------------------------------------------------
    // TOP BAR
    // --------------------------------------------------------

    setText(
        "questionNumber",
        `${game.question}/${game.totalQuestions}`
    );

    setText(
        "lives",
        game.lives
    );

    setText(
        "combo",
        game.combo
    );

    setText(
        "score",
        game.score
    );


    updateGameProfileStats();


    // --------------------------------------------------------
    // QUESTION
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
                country[1];

            break;


        case 2:

            title =
                "What is the capital of this country?";

            value =
                country[0];

            break;


        case 3:

            title =
                "Which country uses this currency?";

            value =
                country[2];

            break;


        case 4:

            title =
                "Which country belongs to this region?";

            value =
                country[3];

            break;


        default:

            title =
                "Which country has this capital?";

            value =
                country[1];

    }


    setText(
        "questionType",
        title
    );

    setText(
        "questionText",
        "Choose the correct answer:"
    );

    setText(
        "questionValue",
        value
    );


    renderAnswers();


    // --------------------------------------------------------
    // OPTIONAL UI UPDATE
    // --------------------------------------------------------

    if (
        typeof updateGameUI === "function"
    ) {

        updateGameUI();

    }

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
        (countryIndex, position) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-button";


            button.dataset.index =
                position;


            button.textContent =
                `${position + 1}. ${countries[countryIndex][0]}`;


            button.onclick =
                function () {

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
// ANSWER QUESTION
// ============================================================

function answerQuestion(position) {

    if (
        game.locked ||
        !game.active
    ) {

        return;

    }


    if (
        position < 0 ||
        position >= game.options.length
    ) {

        return;

    }


    const selected =
        game.options[position];


    const correct =
        game.currentCountry;


    // --------------------------------------------------------
    // VISUAL FEEDBACK
    // --------------------------------------------------------

    highlightAnswer(
        position,
        selected === correct
    );


    // --------------------------------------------------------
    // CORRECT
    // --------------------------------------------------------

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
        getProfileSafe();


    if (
        profile &&
        Number(profile.luckyAnswer || 0) > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Lucky Answer?"
            );


        if (use) {

            profile.luckyAnswer--;

            if (
                typeof save === "function"
            ) {

                save();

            }

            correctAnswer(true);

            return;

        }

    }


    wrongAnswer();

}


// ============================================================
// HIGHLIGHT ANSWER
// ============================================================

function highlightAnswer(
    selectedPosition,
    isCorrect
) {

    const buttons =
        document.querySelectorAll(
            "#answers button"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index === selectedPosition
            ) {

                button.classList.add(
                    isCorrect
                        ? "correct"
                        : "wrong"
                );

            }


            if (
                game.options[index] ===
                game.currentCountry
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );

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
        getProfileSafe();


    if (!profile) {

        return;

    }


    game.combo++;

    game.correct++;

    game.streak++;


    if (
        game.combo >
        game.bestCombo
    ) {

        game.bestCombo =
            game.combo;

    }


    // --------------------------------------------------------
    // DIFFICULTY
    // --------------------------------------------------------

    const config =
        GAME_DIFFICULTY[
            game.difficulty
        ];


    // --------------------------------------------------------
    // BASE SCORE
    // --------------------------------------------------------

    let gained =
        config.baseScore;


    // --------------------------------------------------------
    // COMBO
    // --------------------------------------------------------

    if (
        game.combo >= 2
    ) {

        gained +=
            game.combo * 25;

    }


    // --------------------------------------------------------
    // SPEED BONUS
    // --------------------------------------------------------

    const elapsed =
        (
            Date.now() -
            game.questionStartTime
        ) / 1000;


    if (
        elapsed <=
        config.time * 0.35
    ) {

        gained += 50;

    }

    else if (
        elapsed <=
        config.time * 0.60
    ) {

        gained += 25;

    }


    // --------------------------------------------------------
    // SCORE BOOST
    // --------------------------------------------------------

    if (
        Number(profile.scoreBoost || 0) > 0
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


    // --------------------------------------------------------
    // LUCKY BONUS
    // --------------------------------------------------------

    if (lucky) {

        gained += 50;

    }


    game.score +=
        gained;


    // --------------------------------------------------------
    // XP
    // --------------------------------------------------------

    let gainedXP =
        50 +
        game.combo * 10;


    gainedXP =
        Math.floor(
            gainedXP *
            config.xpMultiplier
        );


    // --------------------------------------------------------
    // DOUBLE XP
    // --------------------------------------------------------

    if (
        Number(profile.doubleXP || 0) > 0
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


    if (
        typeof addXP === "function"
    ) {

        addXP(gainedXP);

    }


    // --------------------------------------------------------
    // COINS
    // --------------------------------------------------------

    let coinReward =
        20 +
        game.combo * 5;


    coinReward =
        Math.floor(
            coinReward *
            config.coinMultiplier
        );


    if (
        typeof addCoins === "function"
    ) {

        addCoins(
            coinReward
        );

    }


    // --------------------------------------------------------
    // STATISTICS
    // --------------------------------------------------------

    profile.totalCorrect =
        Number(
            profile.totalCorrect || 0
        ) + 1;


    profile.totalQuestions =
        Number(
            profile.totalQuestions || 0
        ) + 1;


    if (
        typeof save === "function"
    ) {

        save();

    }


    updateGameProfileStats();


    // --------------------------------------------------------
    // MESSAGE
    // --------------------------------------------------------

    let message;


    if (lucky) {

        message =
            `🍀 Lucky! +${gained} points`;

    }

    else {

        message =
            `✅ Correct! +${gained} points`;

    }


    message +=
        ` | +${gainedXP} XP | +${coinReward} Coins`;


    if (
        typeof toast === "function"
    ) {

        toast(message);

    }


    // --------------------------------------------------------
    // NEXT
    // --------------------------------------------------------

    setTimeout(
        function () {

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
        getProfileSafe();


    if (!profile) {

        return;

    }


    game.perfect = false;


    // --------------------------------------------------------
    // SECOND CHANCE
    // --------------------------------------------------------

    if (
        Number(profile.secondChance || 0) > 0
    ) {

        const use =
            confirm(
                "Wrong answer!\nUse Second Chance?"
            );


        if (use) {

            profile.secondChance--;

            game.wrong++;

            game.combo = 0;

            profile.totalWrong =
                Number(
                    profile.totalWrong || 0
                ) + 1;


            profile.totalQuestions =
                Number(
                    profile.totalQuestions || 0
                ) + 1;


            if (
                typeof save === "function"
            ) {

                save();

            }


            if (
                typeof toast === "function"
            ) {

                toast(
                    "🔄 Second Chance activated!"
                );

            }


            setTimeout(
                function () {

                    nextQuestion();

                },
                900
            );


            return;

        }

    }


    // --------------------------------------------------------
    // NORMAL WRONG
    // --------------------------------------------------------

    game.wrong++;

    game.combo = 0;

    game.streak = 0;

    game.lives--;


    profile.totalWrong =
        Number(
            profile.totalWrong || 0
        ) + 1;


    profile.totalQuestions =
        Number(
            profile.totalQuestions || 0
        ) + 1;


    if (
        typeof save === "function"
    ) {

        save();

    }


    updateGameProfileStats();


    const correctCountry =
        countries[
            game.currentCountry
        ][0];


    if (
        typeof toast === "function"
    ) {

        toast(
            `❌ Wrong! Correct answer: ${correctCountry}`
        );

    }


    setTimeout(
        function () {

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
        getProfileSafe();


    if (!profile) {

        return;

    }


    if (
        game.hintUsed
    ) {

        toastSafe(
            "Hint already used."
        );

        return;

    }


    if (
        Number(profile.hints || 0) <= 0
    ) {

        toastSafe(
            "You don't have any Hint."
        );

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


    const buttons =
        Array.from(
            document.querySelectorAll(
                "#answers button"
            )
        );


    const wrongButtons =
        buttons.filter(
            function (button, index) {

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
            function (button) {

                button.disabled = true;

                button.classList.add(
                    "removed"
                );

                button.style.opacity =
                    "0.25";

            }
        );


    if (
        typeof save === "function"
    ) {

        save();

    }


    setText(
        "score",
        game.score
    );


    toastSafe(
        "💡 Hint used! -25 points"
    );

}


// ============================================================
// UPDATE GAME PROFILE STATS
// ============================================================

function updateGameProfileStats() {

    const profile =
        getProfileSafe();


    if (!profile)
        return;


    setText(
        "gameXP",
        profile.xp
    );

    setText(
        "gameCoins",
        profile.coins
    );

    setText(
        "gameLevel",
        profile.level
    );


    // Optional shop/game stats

    setText(
        "gameHints",
        profile.hints
    );

    setText(
        "gameLives",
        game.lives
    );

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    if (
        !game.active
    ) {

        return;

    }


    game.active = false;

    game.locked = true;


    const profile =
        getProfileSafe();


    if (!profile) {

        return;

    }


    const config =
        GAME_DIFFICULTY[
            game.difficulty
        ];


    // --------------------------------------------------------
    // COMPLETION REWARD
    // --------------------------------------------------------

    let completionReward =
        100;


    if (
        game.correct ===
        game.totalQuestions
    ) {

        completionReward += 250;

    }


    if (
        game.difficulty === 3
    ) {

        completionReward += 100;

    }


    completionReward =
        Math.floor(
            completionReward *
            config.coinMultiplier
        );


    if (
        typeof addCoins === "function"
    ) {

        addCoins(
            completionReward
        );

    }


    // --------------------------------------------------------
    // STATISTICS
    // --------------------------------------------------------

    profile.totalGames =
        Number(
            profile.totalGames || 0
        ) + 1;


    if (
        game.bestCombo >
        Number(profile.bestCombo || 0)
    ) {

        profile.bestCombo =
            game.bestCombo;

    }


    // --------------------------------------------------------
    // HIGH SCORE
    // --------------------------------------------------------

    let newHighScore =
        false;


    if (
        game.score >
        Number(profile.highScore || 0)
    ) {

        profile.highScore =
            game.score;

        newHighScore = true;

    }


    // --------------------------------------------------------
    // PERFECT GAME
    // --------------------------------------------------------

    if (
        game.correct ===
        game.totalQuestions
    ) {

        profile.perfectGames =
            Number(
                profile.perfectGames || 0
            ) + 1;

    }


    if (
        typeof save === "function"
    ) {

        save();

    }


    // --------------------------------------------------------
    // RESULT MESSAGE
    // --------------------------------------------------------

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

    else if (
        game.lives <= 0
    ) {

        message =
            "💀 GAME OVER";

    }

    else {

        message =
            `Game Complete! +${completionReward} Coins`;

    }


    // --------------------------------------------------------
    // RESULT UI
    // --------------------------------------------------------

    const result =
        document.getElementById(
            "resultInfo"
        );


    if (result) {

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
                <span>🪙 Coins Earned</span>
                <strong>
                    +${completionReward}
                </strong>
            </div>

            <div class="result-stat">
                <span>🪙 Total Coins</span>
                <strong>
                    ${profile.coins}
                </strong>
            </div>

            <div class="result-stat">
                <span>🏆 Level</span>
                <strong>
                    ${profile.level}
                    ${
                        typeof getRank === "function"
                            ? ` (${getRank(profile.level)})`
                            : ""
                    }
                </strong>
            </div>

            <div class="result-stat">
                <span>🎯 Difficulty</span>
                <strong>
                    ${config.name}
                </strong>
            </div>

        `;

    }


    if (
        typeof updateGameUI === "function"
    ) {

        updateGameUI();

    }


    if (
        typeof showScreen === "function"
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
        !game.active
    ) {

        return;

    }


    if (
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
        typeof goHome === "function"
    ) {

        goHome();

    }

}


// ============================================================
// RESTART GAME
// ============================================================

function restartGame() {

    const difficulty =
        game.difficulty || 1;


    startGame(
        difficulty
    );

}


// ============================================================
// RETURN HOME
// ============================================================

function exitGame() {

    if (game.active) {

        const confirmExit =
            confirm(
                "Exit the current game?"
            );

        if (!confirmExit) {

            return;

        }

    }


    game.active = false;

    game.locked = true;


    if (
        typeof goHome === "function"
    ) {

        goHome();

    }

}


// ============================================================
// UTILITY: SET TEXT
// ============================================================

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


// ============================================================
// UTILITY: PROFILE
// ============================================================

function getProfileSafe() {

    if (
        typeof getProfile === "function"
    ) {

        return getProfile();

    }


    console.warn(
        "getProfile() is not available."
    );


    return null;

}


// ============================================================
// UTILITY: TOAST
// ============================================================

function toastSafe(
    message
) {

    if (
        typeof toast === "function"
    ) {

        toast(message);

    }

    else {

        console.log(message);

    }

}


// ============================================================
// OPTIONAL UI BRIDGE
// ============================================================

function updateGameUI() {

    setText(
        "questionNumber",
        `${game.question}/${game.totalQuestions}`
    );

    setText(
        "score",
        game.score
    );

    setText(
        "lives",
        game.lives
    );

    setText(
        "combo",
        game.combo
    );


    updateGameProfileStats();

}


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (!game.active)
            return;


        if (game.locked)
            return;


        // 1 - 4 answer

        if (
            ["1", "2", "3", "4"]
                .includes(event.key)
        ) {

            const position =
                Number(event.key) - 1;


            if (
                position <
                game.options.length
            ) {

                answerQuestion(
                    position
                );

            }

        }


        // H = hint

        if (
            event.key.toLowerCase() === "h"
        ) {

            useHint();

        }


        // ESC = quit

        if (
            event.key === "Escape"
        ) {

            confirmQuitGame();

        }

    }
);


// ============================================================
// PREVENT DOUBLE CLICK / ACCIDENTAL SUBMIT
// ============================================================

document.addEventListener(
    "click",
    function (event) {

        if (!game.active)
            return;


        const button =
            event.target.closest(
                "#answers button"
            );


        if (!button)
            return;


        if (game.locked) {

            event.preventDefault();

        }

    }
);


// ============================================================
// DEBUG
// ============================================================

function getGameState() {

    return {
        ...game
    };

}
