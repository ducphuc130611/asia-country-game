// ============================================================
// ASIA COUNTRY GUESSING GAME
// WEB EDITION
// ============================================================


// ============================================================
// OWNER SECURITY
// ============================================================
//
// LỚP 1:
//     Kiểm tra IP public.
//
// LỚP 2:
//     Kiểm tra mật khẩu Owner.
//
// QUAN TRỌNG:
//     JavaScript chạy ở máy người chơi nên đây KHÔNG phải
//     bảo mật server tuyệt đối.
//
// Hãy thay YOUR_PUBLIC_IP bằng IP public của bạn.
//
// ============================================================

const OWNER_IP = "YOUR_PUBLIC_IP";

const OWNER_PASSWORD = "1306owner2011";


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
    "asia_country_game_profiles_v1";

const CURRENT_PROFILE_KEY =
    "asia_current_profile_v1";


let profiles = [];

let currentProfile = -1;


try {

    profiles =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            )
        ) || [];

}
catch (error) {

    profiles = [];

}


const savedCurrentProfile =
    localStorage.getItem(
        CURRENT_PROFILE_KEY
    );


if (savedCurrentProfile !== null) {

    currentProfile =
        Number(savedCurrentProfile);

}


if (
    !Number.isInteger(currentProfile)
) {

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
// SCREEN
// ============================================================

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.add("hidden");

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(id);


    if (!screen) {

        console.error(
            "Screen not found:",
            id
        );

        return;

    }


    screen.classList.remove("hidden");

    screen.classList.add("active");

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


    element.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            element.classList.remove("show");

        }, 2200);

}


// ============================================================
// HEADER
// ============================================================

function updateHeader() {

    const p = getProfile();


    const profileElement =
        document.getElementById(
            "headerProfile"
        );

    const coinsElement =
        document.getElementById(
            "headerCoins"
        );

    const levelElement =
        document.getElementById(
            "headerLevel"
        );


    if (!p) {

        if (profileElement)
            profileElement.textContent =
                "Guest";

        if (coinsElement)
            coinsElement.textContent =
                "0";

        if (levelElement)
            levelElement.textContent =
                "1";

        return;

    }


    if (profileElement)
        profileElement.textContent =
            p.name;


    if (coinsElement)
        coinsElement.textContent =
            p.coins;


    if (levelElement)
        levelElement.textContent =
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


    const p = getProfile();


    if (!p) {

        container.innerHTML = `

            <p>
                No profile selected.
            </p>

            <p>
                Go to Profile and create one.
            </p>

        `;

        return;

    }


    container.innerHTML = `

        <p>
            👤
            <strong>${escapeHTML(p.name)}</strong>
        </p>

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
            🪙 Coins:
            <strong>${p.coins}</strong>
        </p>

        <p>
            🏆 High Score:
            <strong>${p.highScore}</strong>
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

    const p = getProfile();


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

        const levelsGained =
            p.level -
            oldLevel;

        const reward =
            levelsGained *
            500;


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

    const p = getProfile();


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
// PROFILE INFO
// ============================================================

function renderProfileInfo() {

    const container =
        document.getElementById(
            "profileInfo"
        );


    if (!container)
        return;


    const p = getProfile();


    if (!p) {

        container.innerHTML =
            "<p>No profile selected.</p>";

        return;

    }


    container.innerHTML = `

        <p>
            👤
            <strong>${escapeHTML(p.name)}</strong>
        </p>

        <p>
            Level:
            <strong>${p.level}</strong>
        </p>

        <p>
            Rank:
            <strong>${getRank(p.level)}</strong>
        </p>

        <p>
            XP:
            <strong>${p.xp}</strong>
        </p>

        <p>
            High Score:
            <strong>${p.highScore}</strong>
        </p>

        <p>
            Total Games:
            <strong>${p.totalGames}</strong>
        </p>

        <p>
            Correct:
            <strong>${p.totalCorrect}</strong>
        </p>

        <p>
            Wrong:
            <strong>${p.totalWrong}</strong>
        </p>

        <p>
            Best Combo:
            <strong>${p.bestCombo}</strong>
        </p>

        <p>
            Coins:
            <strong>${p.coins}</strong>
        </p>

    `;

}


// ============================================================
// CREATE PROFILE
// ============================================================

function createProfile() {

    if (profiles.length >= 20) {

        toast(
            "Maximum 20 profiles."
        );

        return;

    }


    const input =
        document.getElementById(
            "profileName"
        );


    let name =
        input
        ? input.value.trim()
        : "";


    if (!name) {

        name =
            prompt(
                "Enter profile name:"
            ) || "";

        name =
            name.trim();

    }


    if (!name) {

        toast(
            "Please enter a profile name."
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


    if (input)
        input.value = "";


    save();

    renderProfiles();

    renderProfileInfo();


    toast(
        `Welcome, ${name}!`
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


    const element =
        document.getElementById(
            "shopCoins"
        );


    if (element)
        element.textContent =
            p.coins;

}


function buyItem(item, price) {

    const p =
        getProfile();


    if (!p)
        return;


    if (
        !Object.prototype.hasOwnProperty
            .call(p,item)
    ) {

        toast(
            "Invalid item."
        );

        return;

    }


    if (
        p.coins <
        price
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

function renderInventory() {

    const p =
        getProfile();


    const container =
        document.getElementById(
            "inventoryInfo"
        );


    if (!p || !container)
        return;


    container.innerHTML = `

        <div class="inventory-row">
            <span>💡 Hint</span>
            <strong>${p.hints}</strong>
        </div>

        <div class="inventory-row">
            <span>❤️ Extra Life</span>
            <strong>${p.extraLives}</strong>
        </div>

        <div class="inventory-row">
            <span>✨ Double XP</span>
            <strong>${p.doubleXP}</strong>
        </div>

        <div class="inventory-row">
            <span>📈 Score Boost</span>
            <strong>${p.scoreBoost}</strong>
        </div>

        <div class="inventory-row">
            <span>🔄 Second Chance</span>
            <strong>${p.secondChance}</strong>
        </div>

        <div class="inventory-row">
            <span>🍀 Lucky Answer</span>
            <strong>${p.luckyAnswer}</strong>
        </div>

    `;

}


function showInventoryDuringGame() {

    const p =
        getProfile();


    if (!p)
        return;


    renderInventory();


    const modal =
        document.getElementById(
            "inventoryModal"
        );


    modal.classList.remove(
        "hidden"
    );

}


function closeInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    modal.classList.add(
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


    if (
        difficulty !== 1 &&
        difficulty !== 2 &&
        difficulty !== 3
    ) {

        difficulty = 1;

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
// GAME STATS
// ============================================================

function updateGameStats() {

    const p =
        getProfile();


    if (!p)
        return;


    const q =
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

    const xp =
        document.getElementById(
            "xp"
        );

    const coins =
        document.getElementById(
            "coins"
        );

    const level =
        document.getElementById(
            "level"
        );


    if (q)
        q.textContent =
            `${game.question}/${game.totalQuestions}`;

    if (lives)
        lives.textContent =
            game.lives;

    if (combo)
        combo.textContent =
            game.combo;

    if (score)
        score.textContent =
            game.score;

    if (xp)
        xp.textContent =
            p.xp;

    if (coins)
        coins.textContent =
            p.coins;

    if (level)
        level.textContent =
            p.level;

}


// ============================================================
// NEXT QUESTION
// ============================================================

function nextQuestion() {

    game.locked =
        false;


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

        game.type =
            1;

    }
    else if (
        game.difficulty === 2
    ) {

        game.type =
            1 +
            Math.floor(
                Math.random() *
                3
            );

    }
    else {

        game.type =
            1 +
            Math.floor(
                Math.random() *
                4
            );

    }


    updateGameStats();

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


    const typeElement =
        document.getElementById(
            "questionType"
        );

    const textElement =
        document.getElementById(
            "questionText"
        );

    const infoElement =
        document.getElementById(
            "questionInfo"
        );

    const answers =
        document.getElementById(
            "answers"
        );


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


    typeElement.textContent =
        title;

    textElement.textContent =
        "Choose the correct answer:";

    infoElement.textContent =
        value;


    answers.innerHTML =
        "";


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


            button.dataset.position =
                position;


            button.addEventListener(
                "click",
                () => {

                    answerQuestion(
                        position
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );


    updateGameStats();

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

    if (game.locked)
        return;


    game.locked =
        true;


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


    let comboBonus =
        game.combo >= 2
        ? game.combo * 25
        : 0;


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

    updateGameStats();


    const luckyText =
        savedByLucky
        ? " 🍀"
        : "";


    toast(
        `✅ Correct!${luckyText} +${gained} points, +${gainedXP} XP, +${coinReward} Coins`
    );


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


    game.locked =
        true;


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

    if (game.locked)
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


    game.score -=
        25;


    if (
        game.score < 0
    )
        game.score = 0;


    const buttons =
        document.querySelectorAll(
            "#answers .answer-button"
        );


    const wrongButtons =
        [];


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
            () =>
                Math.random() - 0.5
        )
        .slice(
            0,
            2
        )
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
// CONFIRM EXIT
// ============================================================

function confirmExitGame() {

    if (
        game.question === 0
    ) {

        goHome();

        return;

    }


    if (
        confirm(
            "Exit the current game?"
        )
    ) {

        game.locked =
            true;

        goHome();

    }

}


// ============================================================
// FINISH GAME
// ============================================================

function finishGame() {

    const p =
        getProfile();


    if (!p)
        return;


    game.locked =
        true;


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


    const resultInfo =
        document.getElementById(
            "resultInfo"
        );


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


    resultInfo.innerHTML = `

        <div class="result-highlight">
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
            <span>⭐ Level</span>
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
// COUNTRY DATABASE
// ============================================================

function openCountries() {

    const container =
        document.getElementById(
            "countryList"
        );


    if (!container)
        return;


    container.innerHTML =
        "";


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
// OWNER SECURITY
// ============================================================
//
// KHÔNG CÓ NÚT OWNER TRÊN HTML.
//
// Cách gọi:
//     Ctrl + Shift + O
//
// Sau đó:
//     Lớp 1: kiểm tra IP
//     Lớp 2: nhập password
//
// ============================================================

let ownerAuthenticated =
    false;


let ownerIPChecked =
    false;


let detectedPublicIP =
    "";


async function getPublicIP() {

    try {

        const response =
            await fetch(
                "https://api.ipify.org?format=json",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok)
            throw new Error(
                "IP request failed"
            );


        const data =
            await response.json();


        return data.ip || "";

    }
    catch (error) {

        console.error(
            "Cannot determine public IP:",
            error
        );


        return "";

    }

}


// ============================================================
// OWNER PANEL
// ============================================================

async function openOwnerPanel() {

    // --------------------------------------------------------
    // Layer 1
    // --------------------------------------------------------

    if (
        OWNER_IP ===
        "YOUR_PUBLIC_IP"
    ) {

        alert(
            "Owner IP has not been configured yet."
        );

        return;

    }


    toast(
        "🔐 Checking Owner IP..."
    );


    detectedPublicIP =
        await getPublicIP();


    if (
        !detectedPublicIP
    ) {

        alert(
            "Cannot determine your public IP."
        );

        return;

    }


    if (
        detectedPublicIP !==
        OWNER_IP
    ) {

        console.warn(
            "Unauthorized Owner attempt:",
            detectedPublicIP
        );


        alert(
            "❌ Access denied.\n\nYour IP is not authorized."
        );


        return;

    }


    ownerIPChecked =
        true;


    // --------------------------------------------------------
    // Layer 2
    // --------------------------------------------------------

    const password =
        prompt(
            "🔐 OWNER PANEL\n\nEnter Owner Password:"
        );


    if (
        password !==
        OWNER_PASSWORD
    ) {

        ownerIPChecked =
            false;


        alert(
            "❌ Wrong Owner Password."
        );


        return;

    }


    ownerAuthenticated =
        true;


    renderOwnerProfiles();


    showOwnerPanel();


}


// ============================================================
// HIDDEN OWNER PANEL
// ============================================================
//
// Panel được tạo bằng JavaScript.
// Không xuất hiện trong HTML ban đầu.
// ============================================================

function showOwnerPanel() {

    let panel =
        document.getElementById(
            "ownerPanel"
        );


    if (!panel) {

        panel =
            document.createElement(
                "section"
            );


        panel.id =
            "ownerPanel";


        panel.className =
            "screen";


        panel.innerHTML = `

            <div class="card">

                <h2>
                    👑 Owner Panel
                </h2>

                <p>
                    Authorized Owner
                </p>

                <select
                    id="ownerProfile"
                    class="owner-select"
                >
                </select>


                <input
                    id="ownerAmount"
                    type="number"
                    min="0"
                    placeholder="Amount"
                >


                <button
                    onclick="ownerCoins()"
                >
                    🪙 Give Coins
                </button>


                <button
                    onclick="ownerXP()"
                >
                    ⭐ Give XP
                </button>


                <button
                    onclick="ownerLevel()"
                >
                    📈 Set Level
                </button>


                <button
                    onclick="ownerMaxItems()"
                >
                    🎁 Max Items
                </button>


                <button
                    class="danger"
                    onclick="ownerReset()"
                >
                    🔄 Reset Profile
                </button>


                <button
                    class="danger"
                    onclick="ownerDeleteAll()"
                >
                    ☢️ Delete ALL Profiles
                </button>


                <button
                    class="secondary"
                    onclick="closeOwnerPanel()"
                >
                    🔒 Close Owner Panel
                </button>

            </div>

        `;


        document
            .getElementById("app")
            .appendChild(panel);

    }


    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.add(
                    "hidden"
                );

                screen.classList.remove(
                    "active"
                );

            }
        );


    panel.classList.remove(
        "hidden"
    );


    panel.classList.add(
        "active"
    );


    renderOwnerProfiles();

}


// ============================================================
// CLOSE OWNER PANEL
// ============================================================

function closeOwnerPanel() {

    ownerAuthenticated =
        false;

    ownerIPChecked =
        false;


    goHome();

}


// ============================================================
// OWNER AUTH CHECK
// ============================================================

function isOwnerAuthenticated() {

    return (
        ownerAuthenticated &&
        ownerIPChecked
    );

}


// ============================================================
// OWNER PROFILE LIST
// ============================================================

function renderOwnerProfiles() {

    if (
        !isOwnerAuthenticated()
    )
        return;


    const select =
        document.getElementById(
            "ownerProfile"
        );


    if (!select)
        return;


    select.innerHTML =
        "";


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
        currentProfile <
        profiles.length
    ) {

        select.value =
            currentProfile;

    }

}


// ============================================================
// OWNER SELECTED
// ============================================================

function getOwnerProfile() {

    if (
        !isOwnerAuthenticated()
    )
        return null;


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


    if (
        !profiles[index]
    )
        return null;


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


    if (!input)
        return 0;


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

    if (
        !isOwnerAuthenticated()
    )
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    p.coins +=
        amount;


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

    if (
        !isOwnerAuthenticated()
    )
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    const amount =
        getOwnerAmount();


    const oldLevel =
        p.level;


    p.xp +=
        amount;


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

    if (
        !isOwnerAuthenticated()
    )
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
        (amount - 1) *
        500;


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

    if (
        !isOwnerAuthenticated()
    )
        return;


    const p =
        getOwnerProfile();


    if (!p)
        return;


    p.hints =
        100;

    p.extraLives =
        100;

    p.doubleXP =
        100;

    p.scoreBoost =
        100;

    p.secondChance =
        100;

    p.luckyAnswer =
        100;


    save();


    toast(
        "👑 All items set to 100!"
    );

}


// ============================================================
// OWNER RESET
// ============================================================

function ownerReset() {

    if (
        !isOwnerAuthenticated()
    )
        return;


    const select =
        document.getElementById(
            "ownerProfile"
        );


    if (!select)
        return;


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
        !isOwnerAuthenticated()
    )
        return;


    if (
        !confirm(
            "DELETE ALL PROFILES?\nThis cannot be undone."
        )
    )
        return;


    profiles = [];

    currentProfile =
        -1;


    save();


    toast(
        "All profiles deleted."
    );


    closeOwnerPanel();

}


// ============================================================
// OWNER HOTKEY
// ============================================================
//
// Ctrl + Shift + O
//
// Không có nút Owner trên trang.
// ============================================================

document.addEventListener(
    "keydown",
    event => {

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

    if (
        currentProfile >= 0 &&
        !profiles[currentProfile]
    ) {

        currentProfile =
            -1;

    }


    updateHeader();

    updateMainProfile();

}


// ============================================================
// START
// ============================================================

initialize();
