// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// STORAGE SYSTEM
// ============================================================

const PROFILES_KEY = "asia_country_game_profiles_v2";
const CURRENT_PROFILE_KEY = "asia_current_profile_v2";

// Các key cũ có thể đã được dùng ở phiên bản trước
const OLD_PROFILE_KEYS = [
    "asia_country_game_profiles",
    "asia_profiles",
    "profiles",
    "asiaCountryGameProfiles",
    "asia_country_profiles"
];

const OLD_CURRENT_KEYS = [
    "asia_current_profile",
    "currentProfile",
    "current_profile",
    "asiaCurrentProfile"
];


// ============================================================
// SAFE PARSE
// ============================================================

function safeParse(value, fallback) {

    if (!value) {
        return fallback;
    }

    try {

        const data = JSON.parse(value);

        return data;

    } catch (error) {

        console.error(
            "Storage parse error:",
            error
        );

        return fallback;
    }
}


// ============================================================
// FIND OLD PROFILES
// ============================================================

function findOldProfiles() {

    for (const key of OLD_PROFILE_KEYS) {

        const value =
            localStorage.getItem(key);

        if (!value) {
            continue;
        }

        const parsed =
            safeParse(value, null);

        if (Array.isArray(parsed)) {

            console.log(
                "Migrating old profiles from:",
                key
            );

            return parsed;
        }
    }

    return null;
}


// ============================================================
// NORMALIZE PROFILE
// ============================================================

function normalizeProfile(profile) {

    if (!profile || typeof profile !== "object") {
        return null;
    }

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


    result.name =
        String(result.name || "Player");


    result.level =
        Number(result.level) || 1;

    result.xp =
        Number(result.xp) || 0;

    result.highScore =
        Number(result.highScore) || 0;

    result.totalGames =
        Number(result.totalGames) || 0;

    result.totalCorrect =
        Number(result.totalCorrect) || 0;

    result.totalWrong =
        Number(result.totalWrong) || 0;

    result.totalQuestions =
        Number(result.totalQuestions) || 0;

    result.bestCombo =
        Number(result.bestCombo) || 0;

    result.coins =
        Number(result.coins) || 0;

    result.totalCoinsEarned =
        Number(result.totalCoinsEarned) || 0;


    result.hints =
        Number(result.hints) || 0;

    result.extraLives =
        Number(result.extraLives) || 0;

    result.doubleXP =
        Number(result.doubleXP) || 0;

    result.scoreBoost =
        Number(result.scoreBoost) || 0;

    result.secondChance =
        Number(result.secondChance) || 0;

    result.luckyAnswer =
        Number(result.luckyAnswer) || 0;


    if (!Array.isArray(result.achievements)) {
        result.achievements = [];
    }

    if (
        !result.mastery ||
        typeof result.mastery !== "object"
    ) {
        result.mastery = {};
    }


    return result;
}


// ============================================================
// LOAD PROFILES
// ============================================================

function loadProfiles() {

    try {

        let saved =
            localStorage.getItem(
                PROFILES_KEY
            );


        // Nếu V2 chưa có → tìm dữ liệu cũ
        if (!saved) {

            const oldProfiles =
                findOldProfiles();

            if (oldProfiles) {

                const migrated =
                    oldProfiles
                        .map(normalizeProfile)
                        .filter(Boolean);


                localStorage.setItem(
                    PROFILES_KEY,
                    JSON.stringify(migrated)
                );


                return migrated;
            }


            return [];
        }


        const profiles =
            safeParse(
                saved,
                []
            );


        if (!Array.isArray(profiles)) {
            return [];
        }


        return profiles
            .map(normalizeProfile)
            .filter(Boolean);

    } catch (error) {

        console.error(
            "Could not load profiles:",
            error
        );

        return [];
    }
}


// ============================================================
// SAVE PROFILES
// ============================================================

function saveProfiles(profiles) {

    try {

        const normalized =
            Array.isArray(profiles)
                ? profiles
                    .map(normalizeProfile)
                    .filter(Boolean)
                : [];


        localStorage.setItem(
            PROFILES_KEY,
            JSON.stringify(normalized)
        );


        return true;

    } catch (error) {

        console.error(
            "Could not save profiles:",
            error
        );

        return false;
    }
}


// ============================================================
// LOAD CURRENT PROFILE
// ============================================================

function loadCurrentProfile() {

    try {

        let value =
            localStorage.getItem(
                CURRENT_PROFILE_KEY
            );


        // Tìm key cũ nếu V2 chưa có
        if (value === null) {

            for (const key of OLD_CURRENT_KEYS) {

                value =
                    localStorage.getItem(key);

                if (value !== null) {
                    break;
                }
            }
        }


        if (value === null) {
            return -1;
        }


        const index =
            Number(value);


        if (!Number.isInteger(index)) {
            return -1;
        }


        return index;

    } catch (error) {

        console.error(
            "Could not load current profile:",
            error
        );

        return -1;
    }
}


// ============================================================
// SAVE CURRENT PROFILE
// ============================================================

function saveCurrentProfile(index) {

    try {

        localStorage.setItem(
            CURRENT_PROFILE_KEY,
            String(index)
        );


        return true;

    } catch (error) {

        console.error(
            "Could not save current profile:",
            error
        );

        return false;
    }
}


// ============================================================
// CLEAR V2
// ============================================================

function clearV2Storage() {

    localStorage.removeItem(
        PROFILES_KEY
    );

    localStorage.removeItem(
        CURRENT_PROFILE_KEY
    );

}


// ============================================================
// GLOBAL EXPORTS
// ============================================================

window.loadProfiles =
    loadProfiles;

window.saveProfiles =
    saveProfiles;

window.loadCurrentProfile =
    loadCurrentProfile;

window.saveCurrentProfile =
    saveCurrentProfile;

window.clearV2Storage =
    clearV2Storage;
