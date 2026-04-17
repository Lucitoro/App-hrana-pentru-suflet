// =====================
//  SALVARE LOCALSTORAGE
// =====================

function saveSetting(key, value) {
    localStorage.setItem(key, value);
}

// =====================
//  TEMA (LIGHT / DARK)
// =====================

function setTheme(mode) {
    document.body.setAttribute("data-theme", mode);
    saveSetting("theme", mode);
}

// =====================
//  TEXT SIZE
// =====================

function setTextSize(size) {
    document.body.setAttribute("data-text-size", size);
    saveSetting("textSize", size);
}

// =====================
//  LIMBA
// =====================

function setLanguage(lang) {
    saveSetting("language", lang);
    alert("Limba a fost schimbată în: " + lang);
}

// =====================
//  TTS – VOCE
// =====================

let ttsSettings = {
    voice: "female",
    rate: 1,
    mode: "normal"
};

function setVoice(type) {
    ttsSettings.voice = type;
    saveSetting("ttsVoice", type);
}

function setRate(speed) {
    ttsSettings.rate = speed;
    saveSetting("ttsRate", speed);
}

function setReadMode(mode) {
    ttsSettings.mode = mode;
    saveSetting("ttsMode", mode);
}

// =====================
//  RESETARE
// =====================

function resetSettings() {
    localStorage.clear();
    location.reload();
}

// =====================
//  APLICARE LA ÎNCEPUT
// =====================

window.onload = () => {
    let theme = localStorage.getItem("theme");
    if (theme) document.body.setAttribute("data-theme", theme);

    let textSize = localStorage.getItem("textSize");
    if (textSize) document.body.setAttribute("data-text-size", textSize);
};
