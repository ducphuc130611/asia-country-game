// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// ACHIEVEMENT SYSTEM
// ============================================================


// ============================================================
// ACHIEVEMENT DATABASE
// ============================================================

const achievements = [

    {
        id: "first_game",

        icon: "🎮",

        name: "First Adventure",

        description:
            "Complete your first game.",

        rewardCoins: 100,

        rewardXP: 100,

        condition: profile =>
            profile.totalGames >= 1
    },


    {
        id: "five_games",

        icon: "🎯",

        name: "Getting Started",

        description:
            "Complete 5 games.",

        rewardCoins: 250,

        rewardXP: 200,

        condition: profile =>
            profile.totalGames >= 5
    },


    {
        id: "ten_games",

        icon: "🏃",

        name: "Dedicated Player",

        description:
            "Complete 10 games.",

        rewardCoins: 500,

        rewardXP: 300,

        condition: profile =>
            profile.totalGames >= 10
    },


    {
        id: "fifty_games",

        icon: "🔥",

        name: "Veteran",

        description:
            "Complete 50 games.",

        rewardCoins: 1500,

        rewardXP: 1000,

        condition: profile =>
            profile.totalGames >= 50
    },


    {
        id: "first_correct",

        icon: "✅",

        name: "First Correct Answer",

        description:
            "Answer your first question correctly.",

        rewardCoins: 50,

        rewardXP: 50,

        condition: profile =>
            profile.totalCorrect >= 1
    },


    {
        id: "ten_correct",

        icon: "🎯",

        name: "Sharp Mind",

        description:
            "Answer 10 questions correctly.",

        rewardCoins: 200,

        rewardXP: 150,

        condition: profile =>
            profile.totalCorrect >= 10
    },


    {
        id: "fifty_correct",

        icon: "🧠",

        name: "Knowledge Seeker",

        description:
            "Answer 50 questions correctly.",

        rewardCoins: 750,

        rewardXP: 500,

        condition: profile =>
            profile.totalCorrect >= 50
    },


    {
        id: "hundred_correct",

        icon: "🌏",

        name: "Asia Expert",

        description:
            "Answer 100 questions correctly.",

        rewardCoins: 2000,

        rewardXP: 1500,

        condition: profile =>
            profile.totalCorrect >= 100
    },


    {
        id: "perfect_game",

        icon: "💯",

        name: "Perfect Game",

        description:
            "Answer all 10 questions correctly in one game.",

        rewardCoins: 1000,

        rewardXP: 750,

        condition: profile =>
            profile.lastGameCorrect >= 10
    },


    {
        id: "combo_5",

        icon: "🔥",

        name: "Combo Master",

        description:
            "Reach a 5-answer combo.",

        rewardCoins: 500,

        rewardXP: 400,

        condition: profile =>
            profile.bestCombo >= 5
    },


    {
        id: "combo_10",

        icon: "⚡",

        name: "Unstoppable",

        description:
            "Reach a 10-answer combo.",

        rewardCoins: 1500,

        rewardXP: 1000,

        condition: profile =>
            profile.bestCombo >= 10
    },


    {
        id: "score_1000",

        icon: "⭐",

        name: "High Scorer",

        description:
            "Reach a score of 1,000.",

        rewardCoins: 500,

        rewardXP: 300,

        condition: profile =>
            profile.highScore >= 1000
    },


    {
        id: "score_5000",

        icon: "🏆",

        name: "Score Hunter",

        description:
            "Reach a score of 5,000.",

        rewardCoins: 1500,

        rewardXP: 1000,

        condition: profile =>
            profile.highScore >= 5000
    },


    {
        id: "level_5",

        icon: "⭐",

        name: "Explorer",

        description:
            "Reach Level 5.",

        rewardCoins: 500,

        rewardXP: 500,

        condition: profile =>
            profile.level >= 5
    },


    {
        id: "level_10",

        icon: "👑",

        name: "Master",

        description:
            "Reach Level 10.",

        rewardCoins: 1500,

        rewardXP: 1000,

        condition: profile =>
            profile.level >= 10
    },


    {
        id: "level_20",

        icon: "🌟",

        name: "Legend",

        description:
            "Reach Level 20.",

        rewardCoins: 5000,

        rewardXP: 3000,

        condition: profile =>
            profile.level >= 20
    },


    {
        id: "coins_5000",

        icon: "🪙",

        name: "Coin Collector",

        description:
            "Earn 5,000 total Coins.",

        rewardCoins: 500,

        rewardXP: 250,

        condition: profile =>
            profile.totalCoinsEarned >= 5000
    },


    {
        id: "coins_25000",

        icon: "💰",

        name: "Wealthy Traveler",

        description:
            "Earn 25,000 total Coins.",

        rewardCoins: 2500,

        rewardXP: 1000,

        condition: profile =>
            profile.totalCoinsEarned >= 25000
    }

];


// ============================================================
// INITIALIZE ACHIEVEMENTS
// ============================================================

function initializeAchievements(
    profile
) {

    if (!profile)
        return;


    if (
        !Array.isArray(
            profile.achievements
        )
    ) {

        profile.achievements = [];

    }

}


// ============================================================
// CHECK WHETHER ACHIEVEMENT IS UNLOCKED
// ============================================================

function isAchievementUnlocked(
    profile,
    id
) {

    if (!profile)
        return false;


    initializeAchievements(
        profile
    );


    return profile.achievements.includes(
        id
    );

}


// ============================================================
// UNLOCK ACHIEVEMENT
// ============================================================

function unlockAchievement(
    profile,
    achievement
) {

    if (!profile)
        return;


    if (
        isAchievementUnlocked(
            profile,
            achievement.id
        )
    ) {

        return;

    }


    profile.achievements.push(
        achievement.id
    );


    // --------------------------------------------------------
    // REWARDS
    // --------------------------------------------------------

    if (
        achievement.rewardCoins > 0
    ) {

        addCoins(
            achievement.rewardCoins
        );

    }


    if (
        achievement.rewardXP > 0
    ) {

        addXP(
            achievement.rewardXP
        );

    }


    save();


    // --------------------------------------------------------
    // NOTIFICATION
    // --------------------------------------------------------

    toast(
        `🏆 Achievement Unlocked: ${achievement.name}!`
    );


    console.log(
        "Achievement unlocked:",
        achievement.name
    );

}


// ============================================================
// CHECK ALL ACHIEVEMENTS
// ============================================================

function checkAchievements() {

    const profile =
        getProfile();


    if (!profile)
        return;


    initializeAchievements(
        profile
    );


    achievements.forEach(
        achievement => {

            if (
                isAchievementUnlocked(
                    profile,
                    achievement.id
                )
            ) {

                return;

            }


            let completed =
                false;


            try {

                completed =
                    achievement.condition(
                        profile
                    );

            }
            catch (error) {

                console.error(
                    "Achievement condition error:",
                    achievement.id,
                    error
                );

            }


            if (
                completed
            ) {

                unlockAchievement(
                    profile,
                    achievement
                );

            }

        }
    );


    save();

}


// ============================================================
// GET ACHIEVEMENT PROGRESS
// ============================================================

function getAchievementProgress(
    profile
) {

    if (!profile)
        return {

            unlocked: 0,

            total:
                achievements.length

        };


    initializeAchievements(
        profile
    );


    return {

        unlocked:
            profile.achievements.length,

        total:
            achievements.length

    };

}


// ============================================================
// RENDER ACHIEVEMENTS
// ============================================================

function renderAchievements() {

    const container =
        document.getElementById(
            "achievementList"
        );


    if (!container)
        return;


    const profile =
        getProfile();


    if (!profile) {

        container.innerHTML = `

            <p>
                Create/select a profile
                to view achievements.
            </p>

        `;

        return;

    }


    initializeAchievements(
        profile
    );


    container.innerHTML = "";


    achievements.forEach(
        achievement => {

            const unlocked =
                isAchievementUnlocked(
                    profile,
                    achievement.id
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "achievement-card" +
                (
                    unlocked
                    ? " unlocked"
                    : " locked"
                );


            card.innerHTML = `

                <div class="achievement-icon">

                    ${
                        unlocked
                        ? achievement.icon
                        : "🔒"
                    }

                </div>

                <div class="achievement-content">

                    <h3>
                        ${escapeHTML(
                            achievement.name
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            achievement.description
                        )}
                    </p>

                    <div class="achievement-reward">

                        🪙
                        +${achievement.rewardCoins}

                        &nbsp;&nbsp;

                        ✨
                        +${achievement.rewardXP} XP

                    </div>

                </div>

                <div class="achievement-status">

                    ${
                        unlocked
                        ? "✓ UNLOCKED"
                        : "LOCKED"
                    }

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    updateAchievementCounter();

}


// ============================================================
// ACHIEVEMENT COUNTER
// ============================================================

function updateAchievementCounter() {

    const profile =
        getProfile();


    if (!profile)
        return;


    const progress =
        getAchievementProgress(
            profile
        );


    const counter =
        document.getElementById(
            "achievementCount"
        );


    if (counter) {

        counter.textContent =
            `${progress.unlocked}/${progress.total}`;

    }

}


// ============================================================
// OPEN ACHIEVEMENTS
// ============================================================

function openAchievements() {

    const profile =
        getProfile();


    if (!profile) {

        toast(
            "Create/select a profile first."
        );

        openProfileMenu();

        return;

    }


    renderAchievements();


    showScreen(
        "achievementsScreen"
    );

}
