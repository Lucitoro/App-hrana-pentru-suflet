// ===============================
//  MOD CITIRE: CONTROL ON/OFF
// ===============================

// Dacă nu există setare, implicit este OFF
if (!localStorage.getItem("readingMode")) {
    localStorage.setItem("readingMode", "off");
}


// ===============================
//  ACTIVARE SETĂRI CÂND MODUL ESTE ACTIV
// ===============================
function applyReadingSettings() {
    console.log("🔧 Activare setări pentru modul de citire...");

    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    document.body.setAttribute("data-text-size", "large");
    localStorage.setItem("textSize", "large");

    localStorage.setItem("language", "ro");
    localStorage.setItem("ttsVoice", "female");
    localStorage.setItem("ttsRate", "1");
    localStorage.setItem("ttsMode", "normal");

    console.log("🎉 Setările pentru modul de citire au fost aplicate!");
}


// ===============================
//  TTS — FUNCȚIE PRINCIPALĂ
// ===============================
function speakText(text) {
    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = localStorage.getItem("language") || "ro-RO";
    utter.rate = parseFloat(localStorage.getItem("ttsRate")) || 1;

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(v =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("femeie")
    );

    if (selectedVoice) utter.voice = selectedVoice;

    speechSynthesis.speak(utter);
}

speechSynthesis.onvoiceschanged = () => {};


// ===============================
//  CITIRE AUTOMATĂ A TEXTULUI SELECTAT
// ===============================
document.addEventListener("selectionchange", () => {
    if (localStorage.getItem("readingMode") !== "on") return;

    const selected = window.getSelection().toString().trim();
    if (selected.length > 2) {
        speakText(selected);
    }
});


// ===============================
//  CITIRE TITLU / H1 / H2
// ===============================
function readSelectedOrTitle() {
    if (localStorage.getItem("readingMode") !== "on") return;

    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        speakText(selectedText);
        return;
    }

    const pageTitle = document.title.trim();
    if (pageTitle.length > 0) {
        speakText(pageTitle);
        return;
    }

    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");

    if (h1) {
        speakText(h1.innerText.trim());
        return;
    }

    if (h2) {
        speakText(h2.innerText.trim());
        return;
    }

    speakText("Nu există text de citit.");
}


// ===============================
//  BUTON MOD CITIRE — ON/OFF
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggleReadingMode");
    if (!btn) return;

    const mode = localStorage.getItem("readingMode");

    if (mode === "on") {
        btn.classList.add("active");
        btn.textContent = "Modul de citire este activ";
        applyReadingSettings();
    } else {
        btn.classList.remove("active");
        btn.textContent = "Activează modul de citire";
    }

    btn.addEventListener("click", () => {
        const current = localStorage.getItem("readingMode");

        if (current === "off") {
            localStorage.setItem("readingMode", "on");
            btn.classList.add("active");
            btn.textContent = "Modul de citire este activ";

            applyReadingSettings();
            speakText("Modul de citire este activat. Selectează textul pentru a fi citit.");

        } else {
            localStorage.setItem("readingMode", "off");
            btn.classList.remove("active");
            btn.textContent = "Activează modul de citire";

            speakText("Modul de citire a fost dezactivat.");
        }
    });
});
