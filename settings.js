// ===============================
// SETTINGS.JS FINAL PREMIUM
// ===============================

// -------------------------------
// TEMA APLICAȚIEI
// -------------------------------
function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
}

// -------------------------------
// VOCE TTS
// -------------------------------
function setVoice(v) {
    localStorage.setItem("voice", v);
}

// -------------------------------
// VITEZĂ TTS
// -------------------------------
function setRate(r) {
    localStorage.setItem("rate", r);
}

// -------------------------------
// MOD CITIRE (titluri / normal)
// -------------------------------
function setReadMode(m) {
    localStorage.setItem("readMode", m);
}

// -------------------------------
// MĂRIME TEXT
// -------------------------------
function setTextSize(size) {
    let value = "16px";

    if (size === "small") value = "14px";
    if (size === "normal") value = "16px";
    if (size === "large") value = "20px";
    if (size === "xlarge") value = "24px";

    document.documentElement.style.fontSize = value;
    localStorage.setItem("textSize", size);
}

// -------------------------------
// LIMBA APLICAȚIEI
// -------------------------------
function setLanguage(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}

// -------------------------------
// RESETARE SETĂRI
// -------------------------------
function resetSettings() {
    localStorage.clear();
    location.reload();
}

// -------------------------------
// ÎNCĂRCARE SETĂRI LA PORNIRE
// -------------------------------
window.onload = () => {

    // Tema
    let theme = localStorage.getItem("theme");
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }

    // Mărime text
    let size = localStorage.getItem("textSize");
    if (size) {
        setTextSize(size);
    }

    // Limbă
    let lang = localStorage.getItem("language");
    if (lang) {
        document.documentElement.setAttribute("lang", lang);
    }
};
