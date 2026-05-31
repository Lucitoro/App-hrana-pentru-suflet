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

    // Mărime text manuală (A− / A+)
    const manualFont = localStorage.getItem("fontSize") || "18";

    // -------------------------------
    // 2. Aplică tema global
    // -------------------------------
    function applyTheme() {
        document.documentElement.setAttribute("data-theme", theme);
    }

    // -------------------------------
    // 3. Aplică mărimea textului presetată (small / normal / large / xlarge)
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
    // 6. CONTROL MANUAL MĂRIME TEXT (A− / A+)
    // -------------------------------
    function applyManualFont() {
        document.documentElement.style.setProperty("--app-font-size", manualFont + "px");
    }

    window.changeFontSize = function(direction) {
        let size = parseInt(localStorage.getItem("fontSize") || "18");

        size += direction; // +1 sau -1

        if (size < 14) size = 14;
        if (size > 28) size = 28;

        localStorage.setItem("fontSize", size);
        document.documentElement.style.setProperty("--app-font-size", size + "px");
    };

    // -------------------------------
    // 7. Aplică totul când pagina este gata
    // -------------------------------
    document.addEventListener("DOMContentLoaded", function () {
        applyTheme();
        applyTextSize();
        applyLanguage();
        applyTTS();
        applyManualFont();
    });

})();
