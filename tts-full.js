// ===============================
// MOD CITIRE: CONTROL ON/OFF
// ===============================

// Dacă nu există setare, implicit este OFF
if (!localStorage.getItem("readingMode")) {
    localStorage.setItem("readingMode", "off");
}

// Variabilă globală pentru REIA
let lastReadText = "";


// ===============================
// ACTIVARE SETĂRI CÂND MODUL ESTE ACTIV
// ===============================
function applyReadingSettings() {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    document.body.setAttribute("data-text-size", "large");
    localStorage.setItem("textSize", "large");

    localStorage.setItem("language", "ro");
    localStorage.setItem("ttsVoice", "female");
    localStorage.setItem("ttsRate", "1");
    localStorage.setItem("ttsMode", "normal");
}


// ===============================
// TTS — FUNCȚIE PRINCIPALĂ
// ===============================
function speakText(text) {
    if (!text || text.trim().length === 0) return;

    lastReadText = text; // Salvăm textul pentru REIA

    speechSynthesis.cancel(); // Oprim orice citire anterioară

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
// FUNCȚIA REIA — REIA ULTIMA CITIRE
// ===============================
function reiaCitirea() {
    if (!lastReadText || lastReadText.trim().length === 0) {
        speakText("Nu există o citire anterioară de reluat.");
        return;
    }

    speechSynthesis.cancel();
    speakText(lastReadText);
}


// ===============================
// CITIRE AUTOMATĂ A TEXTULUI SELECTAT
// ===============================
document.addEventListener("selectionchange", () => {
    if (localStorage.getItem("readingMode") !== "on") return;

    const selected = window.getSelection().toString().trim();
    if (selected.length > 2) {
        speakText(selected);
    }
});


// ===============================
// CITIRE TITLU / H1 / H2
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
// FUNCȚII PENTRU BUTONUL PLUTITOR
// ===============================

// Citește TOT TEXTUL DIN PAGINĂ
function readPage() {
    const iframe = document.querySelector("iframe");

    if (iframe && iframe.contentDocument) {
        const text = iframe.contentDocument.body.innerText.trim();
        speakText(text);
        return;
    }

    const text = document.body.innerText.trim();
    speakText(text);
}


// Citește DOAR TEXTUL SELECTAT
function readSelection() {
    let selection = "";

    if (window.getSelection) {
        selection = window.getSelection().toString().trim();
    }

    if (!selection && document.getSelection) {
        selection = document.getSelection().toString().trim();
    }

    const iframe = document.querySelector("iframe");
    if (!selection && iframe && iframe.contentWindow) {
        const iframeSel = iframe.contentWindow.getSelection().toString().trim();
        if (iframeSel.length > 0) selection = iframeSel;
    }

    if (!selection && document.activeElement &&
        (document.activeElement.tagName === "TEXTAREA" ||
         document.activeElement.tagName === "INPUT")) {

        selection = document.activeElement.value.substring(
            document.activeElement.selectionStart,
            document.activeElement.selectionEnd
        ).trim();
    }

    if (selection && selection.length > 0) {
        speakText(selection);
    } else {
        speakText("Nu ai selectat niciun text.");
    }
}


// Citește TOATE TITLURILE H1, H2, H3
function readTitles() {
    const iframe = document.querySelector("iframe");
    let titles = [];

    if (iframe && iframe.contentDocument) {
        titles = [...iframe.contentDocument.querySelectorAll("h1, h2, h3")];
    } else {
        titles = [...document.querySelectorAll("h1, h2, h3")];
    }

    const text = titles.map(t => t.innerText.trim()).join(". ");

    if (text.length > 0) {
        speakText(text);
    } else {
        speakText("Nu există titluri de citit pe această pagină.");
    }
}


// Citește DE LA SELECȚIE ÎN JOS
function readFromHere() {
    let selection = window.getSelection().toString().trim();

    const iframe = document.querySelector("iframe");
    if (!selection && iframe && iframe.contentWindow) {
        selection = iframe.contentWindow.getSelection().toString().trim();
    }

    if (!selection) {
        speakText("Selectează un cuvânt de unde să încep citirea.");
        return;
    }

    let fullText = "";

    if (iframe && iframe.contentDocument) {
        fullText = iframe.contentDocument.body.innerText;
    } else {
        fullText = document.body.innerText;
    }

    const index = fullText.indexOf(selection);
    if (index === -1) {
        speakText("Nu pot găsi textul selectat în pagină.");
        return;
    }

    const textToRead = fullText.substring(index);
    speakText(textToRead);
}


// ===============================
// BUTON MOD CITIRE — ON/OFF
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
