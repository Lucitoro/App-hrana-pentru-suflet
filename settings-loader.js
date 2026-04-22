// ===============================
// SETTINGS-LOADER.JS FINAL PREMIUM
// Aplică automat toate setările pe toate paginile
// ===============================

(function () {

    // -------------------------------
    // 1. Citește setările din localStorage
    // -------------------------------
    const theme     = localStorage.getItem("theme")     || "light";
    const textSize  = localStorage.getItem("textSize")  || "normal";
    const language  = localStorage.getItem("language")  || "ro";
    const voice     = localStorage.getItem("voice")     || "female";
    const rate      = localStorage.getItem("rate")      || "1";
    const readMode  = localStorage.getItem("readMode")  || "full";

    // -------------------------------
    // 2. Aplică tema global
    // -------------------------------
    function applyTheme() {
        document.documentElement.setAttribute("data-theme", theme);
    }

    // -------------------------------
    // 3. Aplică mărimea textului global
    // -------------------------------
    function applyTextSize() {
        let value = "16px";

        if (textSize === "small")  value = "14px";
        if (textSize === "normal") value = "16px";
        if (textSize === "large")  value = "20px";
        if (textSize === "xlarge") value = "24px";

        document.documentElement.style.fontSize = value;
    }

    // -------------------------------
    // 4. Aplică limba aplicației
    // -------------------------------
    function applyLanguage() {
        document.documentElement.setAttribute("lang", language);
        document.documentElement.setAttribute("data-lang", language);
    }

    // -------------------------------
    // 5. Aplică setările TTS global
    // -------------------------------
    function applyTTS() {
        window.appTTS = {
            voice: voice,
            rate: parseFloat(rate),
            mode: readMode
        };
    }

    // -------------------------------
    // 6. Aplică totul când pagina este gata
    // -------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        applyTheme();
        applyTextSize();
        applyLanguage();
        applyTTS();
    });

})();
