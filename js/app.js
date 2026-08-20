// ============================================================
// ASIA COUNTRY GUESSING GAME
// VERSION 2.0
// APPLICATION BOOT
// ============================================================

(function () {

    "use strict";


    function boot() {

        console.log(
            "=========================================="
        );

        console.log(
            "🌏 ASIA COUNTRY GUESSING GAME v2.0"
        );

        console.log(
            "Booting..."
        );


        // ----------------------------------------------------
        // CHECK COUNTRY DATA
        // ----------------------------------------------------

        if (
            !Array.isArray(window.countries)
        ) {

            console.error(
                "❌ countries.js failed to load."
            );

            return;
        }


        console.log(
            `✅ Countries loaded: ${countries.length}`
        );


        // ----------------------------------------------------
        // CHECK PROFILE
        // ----------------------------------------------------

        if (
            typeof window.getProfile !==
            "function"
        ) {

            console.error(
                "❌ Profile system failed."
            );

            return;
        }


        console.log(
            "✅ Profile system loaded."
        );


        // ----------------------------------------------------
        // CHECK UI
        // ----------------------------------------------------

        if (
            typeof window.showScreen !==
            "function"
        ) {

            console.error(
                "❌ UI system failed."
            );

            return;
        }


        console.log(
            "✅ UI system loaded."
        );


        // ----------------------------------------------------
        // CHECK GAME
        // ----------------------------------------------------

        if (
            typeof window.startGame !==
            "function"
        ) {

            console.error(
                "❌ Game engine failed."
            );

            return;
        }


        console.log(
            "✅ Game engine loaded."
        );


        // ----------------------------------------------------
        // REFRESH UI
        // ----------------------------------------------------

        if (
            typeof window.refreshUI ===
            "function"
        ) {

            window.refreshUI();
        }


        if (
            typeof window.initializeUI ===
            "function"
        ) {

            window.initializeUI();
        }


        console.log(
            "✅ Asia Country Guessing Game v2.0 ready."
        );

        console.log(
            "=========================================="
        );
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            boot
        );

    } else {

        boot();
    }

})();
