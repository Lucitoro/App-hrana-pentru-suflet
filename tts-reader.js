// Funcție principală pentru citire
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

    // 4. Dacă nu există nimic → mesaj fallback
    speakText("Nu există text de citit.");
}

// Funcție TTS care folosește setările salvate
function speakText(text) {
    const utter = new SpeechSynthesisUtterance(text);

    // Setări din localStorage
    utter.lang = localStorage.getItem("language") || "ro";
    utter.rate = parseFloat(localStorage.getItem("ttsRate")) || 1;

    const voicePref = localStorage.getItem("ttsVoice") || "female";

    // Selectează vocea potrivită
    const voices = speechSynthesis.getVoices();
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
