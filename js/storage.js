// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// STORAGE SYSTEM
// ============================================================


// ============================================================
// STORAGE KEYS
// ============================================================

const PROFILES_KEY =
    "asia_country_game_profiles_v2";

const CURRENT_PROFILE_KEY =
    "asia_current_profile_v2";


// ============================================================
// SAFE JSON PARSE
// ============================================================

function safeParse(
    value,
    fallback
) {

    if (!value) {

        return fallback;

    }


    try {

        const parsed =
            JSON.parse(value);

        return parsed;

    }
    catch (error) {

        console.error(
            "Storage JSON parse error:",
            error
        );

        return fallback;

    }

}


// ============================================================
// LOAD PROFILES
// ============================================================

export function loadProfiles() {

    try {

        const saved =
            localStorage.getItem(
                PROFILES_KEY
            );


        if (!saved) {

            return [];

        }


        const profiles =
            safeParse(
                saved,
                []
            );


        if (
            !Array.isArray(profiles)
        ) {

            return [];

        }


        return profiles;

    }
    catch (error) {

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

export function saveProfiles(
    profiles
) {

    try {

        localStorage.setItem(
            PROFILES_KEY,
            JSON.stringify(
                profiles
            )
        );


        return true;

    }
    catch (error) {

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

export function loadCurrentProfile() {

    try {

        const saved =
            localStorage.getItem(
                CURRENT_PROFILE_KEY
            );


        if (
            saved === null
        ) {

            return -1;

        }


        const index =
            Number(saved);


        if (
            !Number.isInteger(index)
        ) {

            return -1;

        }


        return index;

    }
    catch (error) {

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

export function saveCurrentProfile(
    index
) {

    try {

        localStorage.setItem(
            CURRENT_PROFILE_KEY,
            String(index)
        );


        return true;

    }
    catch (error) {

        console.error(
            "Could not save current profile:",
            error
        );


        return false;

    }

}


// ============================================================
// CLEAR V2 DATA
// ============================================================

export function clearV2Storage() {

    try {

        localStorage.removeItem(
            PROFILES_KEY
        );

        localStorage.removeItem(
            CURRENT_PROFILE_KEY
        );


        return true;

    }
    catch (error) {

        console.error(
            "Could not clear V2 storage:",
            error
        );


        return false;

    }

}


// ============================================================
// STORAGE INFORMATION
// ============================================================

export function getStorageInfo() {

    let profilesSize = 0;
    let currentSize = 0;


    try {

        const profiles =
            localStorage.getItem(
                PROFILES_KEY
            );


        const current =
            localStorage.getItem(
                CURRENT_PROFILE_KEY
            );


        profilesSize =
            profiles
            ? profiles.length
            : 0;


        currentSize =
            current
            ? current.length
            : 0;

    }
    catch (error) {

        console.error(
            "Could not read storage information:",
            error
        );

    }


    return {

        profilesSize:
            profilesSize,

        currentProfileSize:
            currentSize,

        totalSize:
            profilesSize +
            currentSize

    };

}
