// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// UI SYSTEM
// ============================================================


// ============================================================
// SCREEN SYSTEM
// ============================================================

function showScreen(id) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(screen => {
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

function toast(
    message,
    duration = 2200
) {

    const element =
        document.getElementById("toast");

    if (!element)
        return;

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            element.classList.remove("show");

        }, duration);
}


// ============================================================
// HEADER
// ============================================================

function updateHeader() {

    const profile =
        getProfile();

    const name =
        document.getElementById("topName");

    const level =
        document.getElementById("topLevel");

    const coins =
        document.getElementById("topCoins");

    if (!name || !level || !coins)
        return;

    if (!profile) {

        name.textContent = "Guest";
        level.textContent = "1";
        coins.textContent = "0";

        return;
    }

    name.textContent =
        profile.name;

    level.textContent =
        profile.level;

    coins.textContent =
        profile.coins;
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

    const profile =
        getProfile();

    if (!profile) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    👤
                </div>

                <h3>
                    No Profile Selected
                </h3>

                <p>
                    Create or select a profile
                    to start playing.
                </p>

                <button
                    onclick="openProfileMenu()">

                    👤 Manage Profiles

                </button>

            </div>

        `;

        return;
    }


    const accuracy =
        profile.totalQuestions > 0
        ? Math.round(
            (
                profile.totalCorrect /
                profile.totalQuestions
            ) * 100
        )
        : 0;


    const achievementCount =
        Array.isArray(
            profile.achievements
        )
        ? profile.achievements.length
        : 0;


    const achievementTotal =
        typeof achievements !== "undefined"
        ? achievements.length
        : 0;


    container.innerHTML = `

        <div class="profile-summary">

            <div class="profile-avatar">
                👤
            </div>

            <div class="profile-summary-main">

                <h3>
                    ${escapeHTML(
                        profile.name
                    )}
                </h3>

                <p>
                    ${getRank(
                        profile.level
                    )}
                    · Level ${profile.level}
                </p>

            </div>

        </div>


        <div class="profile-stats-grid">

            <div class="profile-stat">

                <span>⭐ Level</span>

                <strong>
                    ${profile.level}
                </strong>

            </div>


            <div class="profile-stat">

                <span>✨ XP</span>

                <strong>
                    ${profile.xp}
                </strong>

            </div>


            <div class="profile-stat">

                <span>🪙 Coins</span>

                <strong>
                    ${profile.coins}
                </strong>

            </div>


            <div class="profile-stat">

                <span>🎮 Games</span>

                <strong>
                    ${profile.totalGames}
                </strong>

            </div>


            <div class="profile-stat">

                <span>🎯 Accuracy</span>

                <strong>
                    ${accuracy}%
                </strong>

            </div>


            <div class="profile-stat">

                <span>🔥 Best Combo</span>

                <strong>
                    ${profile.bestCombo}
                </strong>

            </div>


            <div class="profile-stat">

                <span>🏆 High Score</span>

                <strong>
                    ${profile.highScore}
                </strong>

            </div>


            <div class="profile-stat">

                <span>🏅 Achievements</span>

                <strong>
                    ${achievementCount}/${achievementTotal}
                </strong>

            </div>

        </div>

    `;
}


// ============================================================
// PROFILE MENU
// ============================================================

function openProfileMenu() {

    if (
        typeof renderProfiles ===
        "function"
    ) {
        renderProfiles();
    }

    showScreen(
        "profileScreen"
    );
}


// ============================================================
// SHOP
// ============================================================

function openShopScreen() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;
    }

    if (
        typeof renderShop ===
        "function"
    ) {
        renderShop();
    }

    showScreen(
        "shopScreen"
    );
}


// Compatibility
function openShop() {

    openShopScreen();

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


// ============================================================
// INVENTORY RENDER
// ============================================================

function renderInventory() {

    const container =
        document.getElementById(
            "inventoryList"
        );

    if (!container)
        return;

    const profile =
        getProfile();

    if (!profile) {

        container.innerHTML =
            "<p>No profile selected.</p>";

        return;
    }


    const items = [

        {
            key: "hints",
            icon: "💡",
            name: "Hint"
        },

        {
            key: "extraLives",
            icon: "❤️",
            name: "Extra Life"
        },

        {
            key: "doubleXP",
            icon: "✨",
            name: "Double XP"
        },

        {
            key: "scoreBoost",
            icon: "📈",
            name: "Score Boost"
        },

        {
            key: "secondChance",
            icon: "🔄",
            name: "Second Chance"
        },

        {
            key: "luckyAnswer",
            icon: "🍀",
            name: "Lucky Answer"
        }

    ];


    container.innerHTML = "";


    items.forEach(item => {

        const amount =
            Number(
                profile[item.key] || 0
            );


        const div =
            document.createElement("div");


        div.className =
            "inventory-item-v2";


        div.innerHTML = `

            <div class="inventory-icon">

                ${item.icon}

            </div>

            <div class="inventory-name">

                <strong>
                    ${item.name}
                </strong>

            </div>

            <div class="inventory-count">

                ${amount}

            </div>

        `;


        container.appendChild(div);

    });

}


// ============================================================
// INVENTORY DURING GAME
// ============================================================

function openInventoryDuringGame() {

    const profile =
        getProfile();

    if (!profile)
        return;


    const message =

        "🎒 INVENTORY\n\n" +

        `💡 Hint: ${profile.hints}\n` +

        `❤️ Extra Life: ${profile.extraLives}\n` +

        `✨ Double XP: ${profile.doubleXP}\n` +

        `📈 Score Boost: ${profile.scoreBoost}\n` +

        `🔄 Second Chance: ${profile.secondChance}\n` +

        `🍀 Lucky Answer: ${profile.luckyAnswer}`;


    alert(message);

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


    const counter =
        document.getElementById(
            "countryCount"
        );


    if (counter) {

        counter.textContent =
            countries.length;

    }


    container.innerHTML = "";


    countries.forEach(
        (country, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "country-card-v2";


            card.innerHTML = `

                <div class="country-number">
                    ${index + 1}
                </div>

                <div class="country-info">

                    <h3>
                        ${escapeHTML(
                            country[0]
                        )}
                    </h3>

                    <p>
                        🏛️
                        <strong>
                            Capital:
                        </strong>

                        ${escapeHTML(
                            country[1]
                        )}
                    </p>

                    <p>
                        💰
                        <strong>
                            Currency:
                        </strong>

                        ${escapeHTML(
                            country[2]
                        )}
                    </p>

                    <p>
                        🌏
                        <strong>
                            Region:
                        </strong>

                        ${escapeHTML(
                            country[3]
                        )}
                    </p>

                </div>

            `;


            container.appendChild(
                card
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
// ABOUT
// ============================================================

function openInfo() {

    showScreen(
        "infoScreen"
    );

}


// ============================================================
// ACHIEVEMENTS
// ============================================================

function openAchievements() {

    if (!getProfile()) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;
    }


    if (
        typeof renderAchievements ===
        "function"
    ) {

        renderAchievements();

    }


    showScreen(
        "achievementsScreen"
    );

}


// ============================================================
// GAME UI
// ============================================================

function updateGameUI() {

    if (
        typeof game ===
        "undefined"
    ) {
        return;
    }


    const question =
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


    if (question) {

        question.textContent =
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


    const profile =
        getProfile();


    if (!profile)
        return;


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


    if (xp)
        xp.textContent =
            profile.xp;

    if (coins)
        coins.textContent =
            profile.coins;

    if (level)
        level.textContent =
            profile.level;

}


// ============================================================
// RESULT
// ============================================================

function renderResultScreen() {

    const container =
        document.getElementById(
            "resultInfo"
        );

    if (!container)
        return;


    const profile =
        getProfile();

    if (!profile)
        return;


    let message =
        "🎮 GAME COMPLETE";


    if (
        game.correct ===
        game.totalQuestions
    ) {

        message =
            "🎉 PERFECT GAME!";

    }


    container.innerHTML = `

        <div class="result-message">

            ${message}

        </div>


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
                ${profile.coins}
            </strong>

        </div>


        <div class="result-stat">

            <span>
                🏆 Level
            </span>

            <strong>
                ${profile.level}
                (${getRank(
                    profile.level
                )})
            </strong>

        </div>

    `;

}


// ============================================================
// REFRESH EVERYTHING
// ============================================================

function refreshUI() {

    updateHeader();

    updateMainProfile();


    if (
        typeof updateGameUI ===
        "function"
    ) {

        updateGameUI();

    }


    if (
        typeof updateShopBalance ===
        "function"
    ) {

        updateShopBalance();

    }


    if (
        typeof updateAchievementCounter ===
        "function"
    ) {

        updateAchievementCounter();

    }

}


// ============================================================
// INITIALIZE UI
// ============================================================

function initializeUI() {

    updateHeader();

    updateMainProfile();

}


// ============================================================
// START UI
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeUI();

    }
);
