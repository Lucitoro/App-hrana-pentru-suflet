// ===============================
// MOD CITIRE: CONTROL ON/OFF
// ===============================

// Dacă nu există setare, implicit este OFF
if (!localStorage.getItem("readingMode")) {
    localStorage.setItem("readingMode", "off");
}

// Variabile globale
let lastReadText = "";
let selectedVoice = null;


// ===============================
// ÎNCĂRCARE SIGURĂ A VOCILOR
// ===============================
function loadVoices() {
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // FEMININĂ implicit
    selectedVoice =
        voices.find(v => v.name.toLowerCase().includes("female")) ||
        voices.find(v => v.name.toLowerCase().includes("femeie")) ||
        voices.find(v => v.lang.startsWith("ro") && v.gender === "female") ||
        voices.find(v => v.lang.startsWith("ro")) ||
        voices[0];
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();


// ===============================
// ACTIVARE SETĂRI CÂND MODUL ESTE ACTIV
// ===============================
function applyReadingSettings() {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    document.body.setAttribute("data-text-size", "large");
    localStorage.setItem("textSize", "large");

    localStorage.setItem("language", "ro-RO");
    localStorage.setItem("ttsRate", "1");
}


// ===============================
// TTS — FUNCȚIE PRINCIPALĂ
// ===============================
function speakText(text) {
    if (!text || !text.trim()) return;

    lastReadText = text;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = localStorage.getItem("language") || "ro-RO";
    utter.rate = parseFloat(localStorage.getItem("ttsRate")) || 1;

    if (selectedVoice) utter.voice = selectedVoice;

    speechSynthesis.speak(utter);
}


// ===============================
// FUNCȚIA REIA — REIA ULTIMA CITIRE
// ===============================
function reiaCitirea() {
    if (!lastReadText.trim()) {
        speakText("Nu există o citire anterioară de reluat.");
        return;
    }
    speechSynthesis.cancel();
    speakText(lastReadText);
}


// ===============================
// CITIRE AUTOMATĂ A TEXTULUI SELECTAT (OPTIMIZATĂ)
// ===============================
let selectionTimeout = null;

document.addEventListener("selectionchange", () => {
    if (localStorage.getItem("readingMode") !== "on") return;

    clearTimeout(selectionTimeout);

    selectionTimeout = setTimeout(() => {
        const selected = window.getSelection().toString().trim();
        if (selected.length > 2) speakText(selected);
    }, 200);
});


// ===============================
// CITIRE TITLU / H1 / H2
// ===============================
function readSelectedOrTitle() {
    if (localStorage.getItem("readingMode") !== "on") return;

    const sel = window.getSelection().toString().trim();
    if (sel) return speakText(sel);

    const title = document.title.trim();
    if (title) return speakText(title);

    const h1 = document.querySelector("h1");
    if (h1) return speakText(h1.innerText.trim());

    const h2 = document.querySelector("h2");
    if (h2) return speakText(h2.innerText.trim());

    speakText("Nu există text de citit.");
}


// ===============================
// CITEȘTE TOT TEXTUL DIN PAGINĂ
// ===============================
function readPage() {
    const iframe = document.querySelector("iframe");

    const text = iframe?.contentDocument
        ? iframe.contentDocument.body.innerText.trim()
        : document.body.innerText.trim();

    speakText(text);
}


// ===============================
// CITEȘTE DOAR TEXTUL SELECTAT
// ===============================
function readSelection() {
    let selection = window.getSelection().toString().trim();

    const iframe = document.querySelector("iframe");
    if (!selection && iframe?.contentWindow) {
        selection = iframe.contentWindow.getSelection().toString().trim();
    }

    if (!selection && document.activeElement &&
        ["TEXTAREA", "INPUT"].includes(document.activeElement.tagName)) {

        const el = document.activeElement;
        selection = el.value.substring(el.selectionStart, el.selectionEnd).trim();
    }

    speakText(selection || "Nu ai selectat niciun text.");
}


// ===============================
// CITEȘTE TITLURILE H1, H2, H3
// ===============================
function readTitles() {
    const iframe = document.querySelector("iframe");

    const titles = iframe?.contentDocument
        ? [...iframe.contentDocument.querySelectorAll("h1, h2, h3")]
        : [...document.querySelectorAll("h1, h2, h3")];

    const text = titles.map(t => t.innerText.trim()).join(". ");

    speakText(text || "Nu există titluri de citit pe această pagină.");
}


// ===============================
// CITEȘTE DE LA SELECȚIE ÎN JOS
// ===============================
function readFromHere() {
    let selection = window.getSelection().toString().trim();

    const iframe = document.querySelector("iframe");
    if (!selection && iframe?.contentWindow) {
        selection = iframe.contentWindow.getSelection().toString().trim();
    }

    if (!selection) return speakText("Selectează un cuvânt de unde să încep citirea.");

    const fullText = iframe?.contentDocument
        ? iframe.contentDocument.body.innerText
        : document.body.innerText;

    const index = fullText.indexOf(selection);
    if (index === -1) return speakText("Nu pot găsi textul selectat în pagină.");

    speakText(fullText.substring(index));
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
