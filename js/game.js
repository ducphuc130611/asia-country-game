// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// GAME ENGINE
// ============================================================
//
// REQUIREMENTS:
// country.js
// storage.js
// profile.js
// achievement.js
// shop.js
// ui.js
//
// app.js sẽ khởi động toàn bộ hệ thống.
//
// IMPORTANT:
// countries[] ĐƯỢC LẤY TRỰC TIẾP TỪ country.js
// KHÔNG tạo lại dữ liệu quốc gia ở đây.
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

    locked: false

};


// ============================================================
// RESET GAME
// ============================================================

function resetGame(difficulty) {

    game = {

        active: true,

        difficulty: Number(difficulty),

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

        locked: false

    };

}


// ============================================================
// START GAME
// ============================================================

function startGame(difficulty) {

    const profile = getProfile();

    if (!profile) {

        toast("Create/select a profile first.");

        openProfileMenu();

        return;

    }


    difficulty = Number(difficulty);


    if (difficulty < 1 || difficulty > 3) {

        difficulty = 1;

    }


    resetGame(difficulty);


    // --------------------------------------------------------
    // EXTRA LIFE
    // --------------------------------------------------------

    if (profile.extraLives > 0) {

        const use = confirm(
            `You have ${profile.extraLives} Extra Life(s).\nUse one?`
        );


        if (use) {

            profile.extraLives--;

            game.lives++;

            save();

        }

    }


    showScreen("gameScreen");

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


    if (game.question >= game.totalQuestions) {

        finishGame();

        return;

    }


    if (game.lives <= 0) {

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

    let correct;


    // --------------------------------------------------------
    // FIND UNUSED COUNTRY
    // --------------------------------------------------------

    do {

        correct = Math.floor(
            Math.random() * countries.length
        );

    } while (
        game.usedQuestions.includes(correct)
    );


    game.usedQuestions.push(correct);

    game.currentCountry = correct;


    // --------------------------------------------------------
    // GENERATE OPTIONS
    // --------------------------------------------------------

    const options = [correct];


    while (options.length < 4) {

        const random = Math.floor(
            Math.random() * countries.length
        );


        if (!options.includes(random)) {

            options.push(random);

        }

    }


    shuffle(options);

    game.options = options;


    // --------------------------------------------------------
    // QUESTION TYPE
    // --------------------------------------------------------

    if (game.difficulty === 1) {

        // EASY
        game.questionType = 1;

    }

    else if (game.difficulty === 2) {

        // NORMAL
        game.questionType =
            1 + Math.floor(Math.random() * 2);

    }

    else {

        // HARD
        game.questionType =
            1 + Math.floor(Math.random() * 4);

    }

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

        const j = Math.floor(
            Math.random() * (i + 1)
        );


        [
            array[i],
            array[j]
        ] = [
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
        countries[game.currentCountry];


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
        document.getElementById("questionNumber");

    const lives =
        document.getElementById("lives");

    const combo =
        document.getElementById("combo");

    const score =
        document.getElementById("score");


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
    // QUESTION
    // --------------------------------------------------------

    let title = "";

    let value = "";


    switch (game.questionType) {

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

    }


    const questionType =
        document.getElementById("questionType");

    const questionText =
        document.getElementById("questionText");

    const questionValue =
        document.getElementById("questionValue");


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
        document.getElementById("answers");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    game.options.forEach(
        (countryIndex, position) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-button";


            button.textContent =
                `${position + 1}. ${countries[countryIndex][0]}`;


            button.onclick = () => {

                answerQuestion(position);

            };


            container.appendChild(button);

        }
    );

}


// ============================================================
// UPDATE PROFILE HUD
// ============================================================

function updateGameProfileStats() {

    const profile = getProfile();


    if (!profile) {

        return;

    }


    const xp =
        document.getElementById("gameXP");

    const coins =
        document.getElementById("gameCoins");

    const level =
        document.getElementById("gameLevel");


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


    if (selected === correct) {

        correctAnswer();

        return;

    }


    // --------------------------------------------------------
    // LUCKY ANSWER
    // --------------------------------------------------------

    const profile = getProfile();


    if (
        profile &&
        profile.luckyAnswer > 0
    ) {

        const use = confirm(
            "Wrong answer!\nUse Lucky Answer?"
        );


        if (use) {

            profile.luckyAnswer--;

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

function correctAnswer(lucky = false) {

    if (game.locked) {

        return;

    }


    game.locked = true;


    const profile = getProfile();


    if (!profile) {

        game.locked = false;

        return;

    }


    game.combo++;

    game.correct++;


    if (game.combo > game.bestCombo) {

        game.bestCombo =
            game.combo;

    }


    // --------------------------------------------------------
    // BASE SCORE
    // --------------------------------------------------------

    let baseScore;


    if (game.difficulty === 1) {

        baseScore = 100;

    }

    else if (game.difficulty === 2) {

        baseScore = 150;

    }

    else {

        baseScore = 200;

    }


    // --------------------------------------------------------
    // COMBO BONUS
    // --------------------------------------------------------

    let comboBonus = 0;


    if (game.combo >= 2) {

        comboBonus =
            game.combo * 25;

    }


    let gained =
        baseScore + comboBonus;


    // --------------------------------------------------------
    // SCORE BOOST
    // --------------------------------------------------------

    if (profile.scoreBoost > 0) {

        const use = confirm(
            "Use Score Boost?"
        );


        if (use) {

            profile.scoreBoost--;

            gained =
                Math.floor(gained * 1.25);

        }

    }


    game.score += gained;


    // --------------------------------------------------------
    // XP
    // --------------------------------------------------------

    let gainedXP =
        50 + game.combo * 10;


    if (profile.doubleXP > 0) {

        const use = confirm(
            "Use Double XP?"
        );


        if (use) {

            profile.doubleXP--;

            gainedXP *= 2;

        }

    }


    addXP(gainedXP);


    // --------------------------------------------------------
    // COINS
    // --------------------------------------------------------

    const coinReward =
        20 + game.combo * 5;


    addCoins(coinReward);


    // --------------------------------------------------------
    // STATISTICS
    // --------------------------------------------------------

    profile.totalCorrect++;

    profile.totalQuestions++;


    save();


    updateGameProfileStats();


    // --------------------------------------------------------
    // ACHIEVEMENT CHECK
    // --------------------------------------------------------
    //
    // Achievement system có thể kiểm tra:
    // - correct answers
    // - combo
    // - score
    // - total questions
    //
    // Không cần tự viết lại achievement ở đây.
    //

    if (
        typeof checkAchievements === "function"
    ) {

        checkAchievements();

    }


    // --------------------------------------------------------
    // MESSAGE
    // --------------------------------------------------------

    if (lucky) {

        toast(
            `🍀 Lucky! +${gained} points, +${gainedXP} XP`
        );

    }

    else {

        toast(
            `✅ Correct! +${gained} points, +${gainedXP} XP, +${coinReward} Coins`
        );

    }


    // --------------------------------------------------------
    // NEXT QUESTION
    // --------------------------------------------------------

    setTimeout(
        nextQuestion,
        900
    );

}


// ============================================================
// WRONG ANSWER
// ============================================================

function wrongAnswer() {

    if (game.locked) {

        return;

    }


    game.locked = true;


    const profile = getProfile();


    if (!profile) {

        game.locked = false;

        return;

    }


    // --------------------------------------------------------
    // SECOND CHANCE
    // --------------------------------------------------------

    if (profile.secondChance > 0) {

        const use = confirm(
            "Wrong answer!\nUse Second Chance?"
        );


        if (use) {

            profile.secondChance--;

            game.wrong++;

            game.combo = 0;


            profile.totalWrong++;

            profile.totalQuestions++;


            save();


            if (
                typeof checkAchievements === "function"
            ) {

                checkAchievements();

            }


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


    // --------------------------------------------------------
    // NORMAL WRONG ANSWER
    // --------------------------------------------------------

    game.wrong++;

    game.combo = 0;

    game.lives--;


    profile.totalWrong++;

    profile.totalQuestions++;


    save();


    if (
        typeof checkAchievements === "function"
    ) {

        checkAchievements();

    }


    const correctCountry =
        countries[
            game.currentCountry
        ][0];


    toast(
        `❌ Wrong! Correct answer: ${correctCountry}`
    );


    // Update HUD immediately

    const lives =
        document.getElementById("lives");

    const combo =
        document.getElementById("combo");


    if (lives) {

        lives.textContent =
            game.lives;

    }


    if (combo) {

        combo.textContent =
            game.combo;

    }


    setTimeout(
        nextQuestion,
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


    const profile = getProfile();


    if (!profile) {

        return;

    }


    if (game.hintUsed) {

        toast(
            "Hint already used."
        );

        return;

    }


    if (profile.hints <= 0) {

        toast(
            "You don't have any Hint."
        );

        return;

    }


    profile.hints--;

    game.hintUsed = true;


    game.score -= 25;


    if (game.score < 0) {

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
            (button, index) => {

                return (
                    game.options[index] !==
                    game.currentCountry
                );

            }
        );


    shuffle(wrongButtons);


    wrongButtons
        .slice(0, 2)
        .forEach(button => {

            button.classList.add("removed");

            button.disabled = true;

        });


    save();


    const score =
        document.getElementById("score");


    if (score) {

        score.textContent =
            game.score;

    }


    toast(
        "💡 Hint used! -25 points"
    );


    if (
        typeof checkAchievements === "function"
    ) {

        checkAchievements();

    }

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    if (!game.active) {

        return;

    }


    game.active = false;

    game.locked = true;


    const profile = getProfile();


    if (!profile) {

        return;

    }


    // --------------------------------------------------------
    // COMPLETION REWARD
    // --------------------------------------------------------

    const completionReward =
        100 +

        (
            game.correct === game.totalQuestions
                ? 250
                : 0
        ) +

        (
            game.difficulty === 3
                ? 100
                : 0
        );


    addCoins(completionReward);


    // --------------------------------------------------------
    // STATISTICS
    // --------------------------------------------------------

    profile.totalGames++;


    if (
        game.bestCombo >
        profile.bestCombo
    ) {

        profile.bestCombo =
            game.bestCombo;

    }


    // --------------------------------------------------------
    // SAVE LAST GAME RESULT
    // --------------------------------------------------------
    //
    // Achievement.js dùng các thông tin này
    // để kiểm tra thành tựu sau khi game kết thúc.
    //

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

    let newHighScore = false;


    if (
        game.score >
        profile.highScore
    ) {

        profile.highScore =
            game.score;

        newHighScore = true;

    }


    // --------------------------------------------------------
    // ACHIEVEMENT SYSTEM
    // --------------------------------------------------------

    if (
        typeof checkAchievements === "function"
    ) {

        checkAchievements();

    }


    save();


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

    else {

        message =
            `Game reward: +${completionReward} Coins`;

    }


    // --------------------------------------------------------
    // RESULT UI
    // --------------------------------------------------------

    const result =
        document.getElementById("resultInfo");


    if (!result) {

        return;

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
                (${getRank(profile.level)})
            </strong>
        </div>

    `;


    showScreen("resultScreen");

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


    const quit = confirm(
        "Quit this game?\nYour current game progress will be lost."
    );


    if (!quit) {

        return;

    }


    game.active = false;

    game.locked = true;


    goHome();

}


// ============================================================
// GET CURRENT GAME DATA
// ============================================================

function getGameState() {

    return {

        active: game.active,

        difficulty: game.difficulty,

        question: game.question,

        totalQuestions:
            game.totalQuestions,

        score: game.score,

        lives: game.lives,

        combo: game.combo,

        bestCombo: game.bestCombo,

        correct: game.correct,

        wrong: game.wrong,

        currentCountry:
            game.currentCountry,

        questionType:
            game.questionType

    };

}


// ============================================================
// DEBUG
// ============================================================

function debugGame() {

    console.log(
        "================ GAME STATE ================"
    );

    console.log(game);

    console.log(
        "============================================="
    );

}
