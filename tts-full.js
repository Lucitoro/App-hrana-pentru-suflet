// ===============================
//  ACTIVARE AUTOMATĂ SETĂRI
// ===============================
(function() {
    console.log("🔧 Activare automată a TUTUROR setărilor...");

    const theme = "dark";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const textSize = "large";
    document.body.setAttribute("data-text-size", textSize);
    localStorage.setItem("textSize", textSize);

    const language = "ro";
    localStorage.setItem("language", language);

    const ttsVoice = "female";
    localStorage.setItem("ttsVoice", ttsVoice);

    const ttsRate = "1";
    localStorage.setItem("ttsRate", ttsRate);

    const ttsMode = "normal";
    localStorage.setItem("ttsMode", ttsMode);

    console.log("🎉 Toate setările au fost activate!");
})();


// ===============================
//  FUNCȚIE TTS PRINCIPALĂ
// ===============================
function speakText(text) {
    const utter = new SpeechSynthesisUtterance(text);

    // Setări salvate
    utter.lang = localStorage.getItem("language") || "ro";
    utter.rate = parseFloat(localStorage.getItem("ttsRate")) || 1;

    const voicePref = localStorage.getItem("ttsVoice") || "female";
    const voices = speechSynthesis.getVoices();

    // Selectează vocea potrivită
    const selectedVoice = voices.find(v =>
        voicePref === "female" ? v.name.toLowerCase().includes("female") :
        voicePref === "male"   ? v.name.toLowerCase().includes("male")   :
        false
    );

    if (selectedVoice) {
        utter.voice = selectedVoice;
    }

    speechSynthesis.speak(utter);
}

// Pentru browsere care încarcă vocile mai târziu
speechSynthesis.onvoiceschanged = () => {};


// ===============================
//  CITIRE TEXT SELECTAT / TITLU
// ===============================
function readSelectedOrTitle() {
    const selectedText = window.getSelection().toString().trim();

    // 1. Dacă există text selectat → citește-l
    if (selectedText.length > 0) {
        speakText(selectedText);
        return;
    }

    // 2. Dacă nu există selecție → citește titlul paginii
    const pageTitle = document.title.trim();
    if (pageTitle.length > 0) {
        speakText(pageTitle);
        return;
    }

    // 3. Dacă nu există titlu → citește primul H1 sau H2
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

    // 4. Dacă nu există nimic → fallback
    speakText("Nu există text de citit.");
}


// ===============================
//  BUTON DE CITIRE (HTML)
// ===============================
// <button onclick="readSelectedOrTitle()">🔊 Citește</button>
