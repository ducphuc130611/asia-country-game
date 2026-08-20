// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// PROFILE SYSTEM
// ============================================================

import {
    saveProfiles,
    loadProfiles,
    saveCurrentProfile,
    loadCurrentProfile
} from "./storage.js";


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PROFILES = 20;


// ============================================================
// PROFILE MANAGER
// ============================================================

export class ProfileManager {

    constructor() {

        this.profiles = loadProfiles();

        this.currentProfile =
            loadCurrentProfile();

        this.validateCurrentProfile();

    }


    // ========================================================
    // VALIDATE CURRENT PROFILE
    // ========================================================

    validateCurrentProfile() {

        if (
            this.currentProfile < 0 ||
            this.currentProfile >= this.profiles.length
        ) {

            this.currentProfile = -1;

            saveCurrentProfile(
                this.currentProfile
            );

        }

    }


    // ========================================================
    // CREATE DEFAULT PROFILE
    // ========================================================

    createDefaultProfile(name) {

        return {

            // -----------------------------------------------
            // BASIC
            // -----------------------------------------------

            name: name,

            // -----------------------------------------------
            // PROGRESSION
            // -----------------------------------------------

            level: 1,

            xp: 0,

            // -----------------------------------------------
            // SCORE
            // -----------------------------------------------

            highScore: 0,

            // -----------------------------------------------
            // STATISTICS
            // -----------------------------------------------

            totalGames: 0,

            totalCorrect: 0,

            totalWrong: 0,

            totalQuestions: 0,

            bestCombo: 0,

            // -----------------------------------------------
            // ECONOMY
            // -----------------------------------------------

            coins: 500,

            totalCoinsEarned: 500,

            // -----------------------------------------------
            // INVENTORY
            // -----------------------------------------------

            hints: 1,

            extraLives: 0,

            doubleXP: 0,

            scoreBoost: 0,

            secondChance: 0,

            luckyAnswer: 0,

            // -----------------------------------------------
            // V2.0 PROGRESSION
            // -----------------------------------------------

            achievements: [],

            mastery: {},

            dailyStreak: 0,

            lastDailyChallenge: null

        };

    }


    // ========================================================
    // GET CURRENT PROFILE
    // ========================================================

    getCurrentProfile() {

        if (
            this.currentProfile < 0 ||
            !this.profiles[this.currentProfile]
        ) {

            return null;

        }

        return this.profiles[
            this.currentProfile
        ];

    }


    // ========================================================
    // GET ALL PROFILES
    // ========================================================

    getProfiles() {

        return this.profiles;

    }


    // ========================================================
    // CREATE PROFILE
    // ========================================================

    createProfile(name) {

        name =
            String(name)
                .trim();


        if (!name) {

            return {
                success: false,
                message: "Enter a profile name."
            };

        }


        if (
            this.profiles.length >=
            MAX_PROFILES
        ) {

            return {
                success: false,
                message: "Maximum 20 profiles."
            };

        }


        const exists =
            this.profiles.some(
                profile =>
                    profile.name.toLowerCase() ===
                    name.toLowerCase()
            );


        if (exists) {

            return {
                success: false,
                message: "Profile already exists."
            };

        }


        const profile =
            this.createDefaultProfile(
                name
            );


        this.profiles.push(
            profile
        );


        this.currentProfile =
            this.profiles.length - 1;


        this.save();


        return {
            success: true,
            profile: profile
        };

    }


    // ========================================================
    // SELECT PROFILE
    // ========================================================

    selectProfile(index) {

        index =
            Number(index);


        if (
            index < 0 ||
            index >= this.profiles.length
        ) {

            return {
                success: false,
                message: "Invalid profile."
            };

        }


        this.currentProfile =
            index;


        this.save();


        return {
            success: true,
            profile:
                this.profiles[index]
        };

    }


    // ========================================================
    // DELETE CURRENT PROFILE
    // ========================================================

    deleteCurrentProfile() {

        if (!this.getCurrentProfile()) {

            return {
                success: false,
                message: "No profile selected."
            };

        }


        this.profiles.splice(
            this.currentProfile,
            1
        );


        if (
            this.profiles.length === 0
        ) {

            this.currentProfile = -1;

        }
        else if (
            this.currentProfile >=
            this.profiles.length
        ) {

            this.currentProfile =
                this.profiles.length - 1;

        }


        this.save();


        return {
            success: true
        };

    }


    // ========================================================
    // XP / LEVEL
    // ========================================================

    calculateLevel(xp) {

        return Math.floor(
            xp / 500
        ) + 1;

    }


    addXP(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return null;


        amount =
            Number(amount);


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return null;

        }


        const oldLevel =
            profile.level;


        profile.xp += amount;


        profile.level =
            this.calculateLevel(
                profile.xp
            );


        const levelsGained =
            profile.level -
            oldLevel;


        let levelUpReward = 0;


        if (levelsGained > 0) {

            levelUpReward =
                levelsGained * 500;


            profile.coins +=
                levelUpReward;


            profile.totalCoinsEarned +=
                levelUpReward;

        }


        this.save();


        return {

            xpGained: amount,

            oldLevel: oldLevel,

            newLevel:
                profile.level,

            levelsGained:
                levelsGained,

            levelUpReward:
                levelUpReward

        };

    }


    // ========================================================
    // RANK
    // ========================================================

    getRank(level = null) {

        if (level === null) {

            const profile =
                this.getCurrentProfile();

            if (!profile)
                return "Beginner";

            level =
                profile.level;

        }


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


    // ========================================================
    // COINS
    // ========================================================

    addCoins(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        amount =
            Number(amount);


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return false;

        }


        profile.coins += amount;

        profile.totalCoinsEarned +=
            amount;


        this.save();


        return true;

    }


    // ========================================================
    // SPEND COINS
    // ========================================================

    spendCoins(amount) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return false;


        amount =
            Number(amount);


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return false;

        }


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
    // INVENTORY
    // ========================================================

    addItem(item, amount = 1) {

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


        amount =
            Number(amount);


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return false;

        }


        profile[item] +=
            amount;


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
    // GAME STATISTICS
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
    // COUNTRY MASTERY
    // ========================================================

    getCountryMastery(countryName) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return 0;


        if (
            !profile.mastery
        ) {

            profile.mastery = {};

        }


        return profile.mastery[
            countryName
        ] || 0;

    }


    // ========================================================
    // INCREASE COUNTRY MASTERY
    // ========================================================

    increaseCountryMastery(
        countryName,
        amount = 5
    ) {

        const profile =
            this.getCurrentProfile();


        if (!profile)
            return 0;


        if (
            !profile.mastery
        ) {

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
    // ACHIEVEMENT
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


        profile.achievements.push(
            id
        );


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
