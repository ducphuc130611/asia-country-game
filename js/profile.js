// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// PROFILE SYSTEM
// ============================================================

const MAX_PROFILES = 20;


// ============================================================
// PROFILE MANAGER
// ============================================================

class ProfileManager {

    constructor() {

        this.profiles =
            loadProfiles();

        this.currentProfile =
            loadCurrentProfile();


        this.validateCurrentProfile();

        this.migrateProfiles();
    }


    // ========================================================
    // VALIDATE
    // ========================================================

    validateCurrentProfile() {

        if (
            this.currentProfile < 0 ||
            this.currentProfile >=
                this.profiles.length
        ) {

            this.currentProfile = -1;

            saveCurrentProfile(-1);
        }
    }


    // ========================================================
    // MIGRATE PROFILES
    // ========================================================

    migrateProfiles() {

        this.profiles =
            this.profiles.map(profile => {

                const defaults = {

                    name: "Player",

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
                    lastDailyChallenge: null,

                    lastGameCorrect: 0
                };


                const result = {
                    ...defaults,
                    ...profile
                };


                if (
                    !Array.isArray(
                        result.achievements
                    )
                ) {
                    result.achievements = [];
                }


                if (
                    !result.mastery ||
                    typeof result.mastery !==
                        "object"
                ) {
                    result.mastery = {};
                }


                return result;
            });


        this.save();
    }


    // ========================================================
    // DEFAULT PROFILE
    // ========================================================

    createDefaultProfile(name) {

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
            luckyAnswer: 0,

            achievements: [],
            mastery: {},

            dailyStreak: 0,
            lastDailyChallenge: null,

            lastGameCorrect: 0
        };
    }


    // ========================================================
    // CURRENT PROFILE
    // ========================================================

    getCurrentProfile() {

        if (
            this.currentProfile < 0 ||
            !this.profiles[
                this.currentProfile
            ]
        ) {

            return null;
        }


        return this.profiles[
            this.currentProfile
        ];
    }


    // ========================================================
    // ALL PROFILES
    // ========================================================

    getProfiles() {

        return this.profiles;
    }


    // ========================================================
    // CREATE
    // ========================================================

    createProfile(name) {

        name =
            String(name || "")
                .trim();


        if (!name) {

            return {
                success: false,
                message:
                    "Enter a profile name."
            };
        }


        if (
            this.profiles.length >=
            MAX_PROFILES
        ) {

            return {
                success: false,
                message:
                    "Maximum 20 profiles."
            };
        }


        const duplicate =
            this.profiles.some(
                profile =>
                    profile.name
                        .toLowerCase() ===
                    name.toLowerCase()
            );


        if (duplicate) {

            return {
                success: false,
                message:
                    "Profile already exists."
            };
        }


        const profile =
            this.createDefaultProfile(
                name
            );


        this.profiles.push(profile);


        this.currentProfile =
            this.profiles.length - 1;


        this.save();


        return {
            success: true,
            profile
        };
    }


    // ========================================================
    // SELECT
    // ========================================================

    selectProfile(index) {

        index =
            Number(index);


        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= this.profiles.length
        ) {

            return false;
        }


        this.currentProfile =
            index;


        this.save();


        return true;
    }


    // ========================================================
    // DELETE
    // ========================================================

    deleteProfile(index) {

        if (
            typeof index ===
            "undefined"
        ) {

            index =
                this.currentProfile;
        }


        index =
            Number(index);


        if (
            index < 0 ||
            index >= this.profiles.length
        ) {

            return false;
        }


        this.profiles.splice(
            index,
            1
        );


        if (
            this.profiles.length === 0
        ) {

            this.currentProfile = -1;

        } else if (
            this.currentProfile === index
        ) {

            this.currentProfile =
                Math.min(
                    index,
                    this.profiles.length - 1
                );

        } else if (
            this.currentProfile > index
        ) {

            this.currentProfile--;
        }


        this.save();


        return true;
    }


    // ========================================================
    // ADD XP
    // ========================================================

    addXP(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        amount =
            Number(amount) || 0;


        profile.xp += amount;


        profile.level =
            Math.floor(
                profile.xp / 500
            ) + 1;


        this.save();


        return true;
    }


    // ========================================================
    // ADD COINS
    // ========================================================

    addCoins(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        amount =
            Number(amount) || 0;


        profile.coins += amount;


        if (amount > 0) {

            profile.totalCoinsEarned +=
                amount;
        }


        this.save();


        return true;
    }


    // ========================================================
    // REMOVE COINS
    // ========================================================

    removeCoins(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        amount =
            Number(amount) || 0;


        if (
            profile.coins < amount
        ) {

            return false;
        }


        profile.coins -= amount;


        this.save();


        return true;
    }


    // ========================================================
    // USE ITEM
    // ========================================================

    useItem(item) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        if (
            typeof profile[item] !==
            "number"
        ) {

            return false;
        }


        if (
            profile[item] <= 0
        ) {

            return false;
        }


        profile[item]--;


        this.save();


        return true;
    }


    // ========================================================
    // HIGH SCORE
    // ========================================================

    updateHighScore(score) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        if (
            score >
            profile.highScore
        ) {

            profile.highScore =
                score;


            this.save();


            return true;
        }


        return false;
    }


    // ========================================================
    // GAME STATS
    // ========================================================

    recordGame(
        correct,
        wrong,
        totalQuestions,
        bestCombo
    ) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return;


        profile.totalGames++;

        profile.totalCorrect +=
            correct;

        profile.totalWrong +=
            wrong;

        profile.totalQuestions +=
            totalQuestions;


        profile.lastGameCorrect =
            correct;


        if (
            bestCombo >
            profile.bestCombo
        ) {

            profile.bestCombo =
                bestCombo;
        }


        this.save();
    }


    // ========================================================
    // ACCURACY
    // ========================================================

    getAccuracy() {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return 0;


        if (
            profile.totalQuestions <= 0
        ) {

            return 0;
        }


        return Math.round(
            (
                profile.totalCorrect /
                profile.totalQuestions
            ) * 100
        );
    }


    // ========================================================
    // MASTERY
    // ========================================================

    getCountryMastery(countryName) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return 0;


        if (!profile.mastery) {

            profile.mastery = {};
        }


        return (
            profile.mastery[
                countryName
            ] || 0
        );
    }


    increaseCountryMastery(
        countryName,
        amount = 5
    ) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return 0;


        if (!profile.mastery) {

            profile.mastery = {};
        }


        const current =
            profile.mastery[
                countryName
            ] || 0;


        profile.mastery[
            countryName
        ] =
            Math.min(
                100,
                current + amount
            );


        this.save();


        return profile.mastery[
            countryName
        ];
    }


    // ========================================================
    // ACHIEVEMENTS
    // ========================================================

    hasAchievement(id) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        if (
            !Array.isArray(
                profile.achievements
            )
        ) {

            profile.achievements = [];
        }


        return profile.achievements
            .includes(id);
    }


    unlockAchievement(id) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        if (
            !Array.isArray(
                profile.achievements
            )
        ) {

            profile.achievements = [];
        }


        if (
            profile.achievements
                .includes(id)
        ) {

            return false;
        }


        profile.achievements.push(id);


        this.save();


        return true;
    }


    // ========================================================
    // SAVE
    // ========================================================

    save() {

        saveProfiles(
            this.profiles
        );

        saveCurrentProfile(
            this.currentProfile
        );
    }
}


// ============================================================
// GLOBAL INSTANCE
// ============================================================

const profileManager =
    new ProfileManager();


// ============================================================
// GLOBAL API
// ============================================================

function getProfile() {

    return profileManager
        .getCurrentProfile();
}


function getProfiles() {

    return profileManager
        .getProfiles();
}


function createProfile(name) {

    return profileManager
        .createProfile(name);
}


function selectProfile(index) {

    return profileManager
        .selectProfile(index);
}


function deleteProfile(index) {

    return profileManager
        .deleteProfile(index);
}


function addXP(amount) {

    return profileManager
        .addXP(amount);
}


function addCoins(amount) {

    return profileManager
        .addCoins(amount);
}


function removeCoins(amount) {

    return profileManager
        .removeCoins(amount);
}


function useProfileItem(item) {

    return profileManager
        .useItem(item);
}


function getRank(level) {

    level =
        Number(level) || 1;


    if (level >= 20)
        return "Master";

    if (level >= 10)
        return "Expert";

    if (level >= 5)
        return "Traveler";

    if (level >= 2)
        return "Explorer";

    return "Beginner";
}


function save() {

    profileManager.save();
}


// ============================================================
// GLOBAL
// ============================================================

window.profileManager =
    profileManager;

window.getProfile =
    getProfile;

window.getProfiles =
    getProfiles;

window.createProfile =
    createProfile;

window.selectProfile =
    selectProfile;

window.deleteProfile =
    deleteProfile;

window.addXP =
    addXP;

window.addCoins =
    addCoins;

window.removeCoins =
    removeCoins;

window.useProfileItem =
    useProfileItem;

window.getRank =
    getRank;

window.save =
    save;
