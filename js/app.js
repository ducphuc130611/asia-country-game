// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// APPLICATION BOOTSTRAP
// ============================================================

import {
    countries,
    COUNTRY_COUNT,
    regions,
    getCountry,
    findCountry,
    getCountriesByRegion
} from "./countries.js";

import {
    ProfileManager
} from "./profile.js";


// ============================================================
// GLOBAL COUNTRY DATA
// ============================================================

window.countries =
    countries;

window.COUNTRY_COUNT =
    COUNTRY_COUNT;

window.regions =
    regions;

window.getCountry =
    getCountry;

window.findCountry =
    findCountry;

window.getCountriesByRegion =
    getCountriesByRegion;


// ============================================================
// PROFILE MANAGER
// ============================================================

const profileManager =
    new ProfileManager();

window.profileManager =
    profileManager;


// ============================================================
// PROFILE API
// ============================================================

window.getProfile =
    function () {

        return profileManager
            .getCurrentProfile();

    };


window.getProfiles =
    function () {

        return profileManager
            .getProfiles();

    };


window.createProfile =
    function (name) {

        return profileManager
            .createProfile(name);

    };


window.selectProfile =
    function (index) {

        return profileManager
            .selectProfile(index);

    };


window.deleteCurrentProfile =
    function () {

        return profileManager
            .deleteCurrentProfile();

    };


window.addXP =
    function (amount) {

        return profileManager
            .addXP(amount);

    };


window.addCoins =
    function (amount) {

        return profileManager
            .addCoins(amount);

    };


window.spendCoins =
    function (amount) {

        return profileManager
            .spendCoins(amount);

    };


window.getRank =
    function (level) {

        return profileManager
            .getRank(level);

    };


window.save =
    function () {

        return profileManager
            .save();

    };


// ============================================================
// COMPATIBILITY API
// ============================================================

window.loadGame =
    function () {

        return profileManager
            .getCurrentProfile();

    };


// ============================================================
// BOOT
// ============================================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "🌏 Asia Country Guessing Game V2.0"
        );

        console.log(
            "Countries:",
            countries.length
        );

        console.log(
            "Profiles:",
            profileManager
                .getProfiles()
                .length
        );

        if (
            typeof initializeUI ===
            "function"
        ) {

            initializeUI();

        }

        if (
            typeof refreshUI ===
            "function"
        ) {

            refreshUI();

        }

    }
);
