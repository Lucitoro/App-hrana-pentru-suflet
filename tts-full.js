// ===============================
// INIT GLOBAL TTS + UI 3D AVANSAT
// ===============================

// setări implicite
if (!localStorage.getItem("readingMode")) localStorage.setItem("readingMode", "off");
if (!localStorage.getItem("language")) localStorage.setItem("language", "ro-RO");
if (!localStorage.getItem("ttsRate")) localStorage.setItem("ttsRate", "1");

let lastReadText = "";
let selectedVoice = null;

// -------------------------------
// ÎNCĂRCARE VOCILOR
// -------------------------------
function loadVoices() {
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    const pref = localStorage.getItem("ttsVoice") || "female";

    selectedVoice =
        voices.find(v => v.lang.startsWith("ro") && v.name.toLowerCase().includes(pref)) ||
        voices.find(v => v.lang.startsWith("ro")) ||
        voices[0];
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// -------------------------------
// APLICARE SETĂRI MOD CITIRE
// -------------------------------
function applyReadingSettings() {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    document.body.setAttribute("data-text-size", "large");
    localStorage.setItem("textSize", "large");

    localStorage.setItem("language", "ro-RO");
    if (!localStorage.getItem("ttsRate")) localStorage.setItem("ttsRate", "1");
}

// -------------------------------
// ENGINE TTS UNIFICAT
// -------------------------------
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

function reiaCitirea() {
    if (!lastReadText.trim()) {
        speakText("Nu există o citire anterioară.");
        return;
    }
    speakText(lastReadText);
}

// -------------------------------
// FUNCȚII TTS CONTROLATE DIN MENIU
// -------------------------------
function readPage() {
    const iframe = document.querySelector("iframe");

    const text = iframe?.contentDocument
        ? iframe.contentDocument.body.innerText.trim()
        : document.body.innerText.trim();

    speakText(text);
}

function readSelection() {
    let selection = window.getSelection().toString().trim();

    const iframe = document.querySelector("iframe");
    if (!selection && iframe?.contentWindow) {
        selection = iframe.contentWindow.getSelection().toString().trim();
    }

    speakText(selection || "Nu ai selectat text.");
}

function readTitles() {
    const iframe = document.querySelector("iframe");

    const titles = iframe?.contentDocument
        ? [...iframe.contentDocument.querySelectorAll("h1, h2, h3")]
        : [...document.querySelectorAll("h1, h2, h3")];

    const text = titles.map(t => t.innerText.trim()).join(". ");

    speakText(text || "Nu există titluri.");
}

function readFromHere() {
    let selection = window.getSelection().toString().trim();

    const iframe = document.querySelector("iframe");
    if (!selection && iframe?.contentWindow) {
        selection = iframe.contentWindow.getSelection().toString().trim();
    }

    if (!selection) return speakText("Selectează un cuvânt.");

    const fullText = iframe?.contentDocument
        ? iframe.contentDocument.body.innerText
        : document.body.innerText;

    const index = fullText.indexOf(selection);
    if (index === -1) return speakText("Nu pot găsi textul.");

    speakText(fullText.substring(index));
}

// -------------------------------
// CONTROL TTS
// -------------------------------
function stopReading() { speechSynthesis.cancel(); }
function pauseReading() { speechSynthesis.pause(); }
function resumeReading() { speechSynthesis.resume(); }

function setVoice(type) {
    localStorage.setItem("ttsVoice", type);
    loadVoices();
    speakText("Vocea a fost schimbată.");
}

function setRate(rate) {
    localStorage.setItem("ttsRate", rate);
    speakText("Viteza a fost schimbată.");
}

// -------------------------------
// MOD CITIRE – DOAR SETĂRI (NU AUTO-READ)
// -------------------------------
function initReadingModeToggle() {
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
            speakText("Modul de citire este activat.");
        } else {
            localStorage.setItem("readingMode", "off");
            btn.classList.remove("active");
            btn.textContent = "Activează modul de citire";
            speakText("Modul de citire a fost dezactivat.");
        }
    });
}

// -------------------------------
// UI 3D AVANSAT – INJECT CSS + HTML
// -------------------------------
function injectTTS3DUI() {
    // CSS
    const style = document.createElement("style");
    style.textContent = `
.floating-tts {
    position: fixed;
    bottom: 22px;
    right: 22px;
    z-index: 999999;
    transition: opacity 0.3s ease;
}
.tts-main-btn {
    background: linear-gradient(145deg, #ffe680, #d4a300);
    border: 2px solid #fff4c2;
    padding: 18px 24px;
    border-radius: 50px;
    font-size: 26px;
    cursor: pointer;
    color: #4a3b00;
    position: relative;
    overflow: hidden;
    box-shadow:
        0 8px 0 #b38f00,
        0 8px 18px rgba(0,0,0,0.45);
    transition: all 0.2s ease;
}
.tts-main-btn::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50px;
    background: radial-gradient(circle, rgba(255,255,200,0.6), transparent 70%);
    opacity: 0.0;
    animation: pulseGlow 3s infinite ease-in-out;
}
@keyframes pulseGlow {
    0% { opacity: 0.0; }
    50% { opacity: 0.35; }
    100% { opacity: 0.0; }
}
.tts-main-btn:active {
    transform: translateY(5px);
    box-shadow:
        0 3px 0 #b38f00,
        0 3px 10px rgba(0,0,0,0.45);
}
.tts-main-btn::before {
    content: "";
    position: absolute;
    top: -100%;
    left: -50%;
    width: 200%;
    height: 300%;
    background: linear-gradient(
        120deg,
        transparent 0%,
        rgba(255,255,255,0.6) 50%,
        transparent 100%
    );
    transform: rotate(25deg);
    animation: shimmer 4s infinite;
}
@keyframes shimmer {
    0% { transform: translateX(-150%) rotate(25deg); }
    100% { transform: translateX(150%) rotate(25deg); }
}
.tts-menu {
    display: none;
    position: absolute;
    bottom: 80px;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    border-radius: 16px;
    padding: 14px;
    backdrop-filter: blur(10px);
    box-shadow:
        0 10px 25px rgba(0,0,0,0.35),
        inset 0 0 12px rgba(255,255,255,0.5);
    animation: fadeInUp 0.25s ease;
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}
.tts-menu button {
    display: block;
    width: 100%;
    margin: 6px 0;
    padding: 10px;
    border: none;
    background: linear-gradient(145deg, #fdfdfd, #e2e2e2);
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    box-shadow:
        0 4px 0 #bdbdbd,
        0 4px 10px rgba(0,0,0,0.25);
    transition: all 0.15s ease;
}
.tts-menu button:active {
    transform: translateY(4px);
    box-shadow:
        0 1px 0 #bdbdbd,
        0 1px 4px rgba(0,0,0,0.25);
}
`;
    document.head.appendChild(style);

    // HTML
    const container = document.createElement("div");
    container.innerHTML = `
<div class="floating-tts">
    <button class="tts-main-btn" onclick="toggleTTSMenu()">🔊</button>
    <div class="tts-menu" id="ttsMenu">
        <button onclick="readPage()">📄 Citește pagina</button>
        <button onclick="readSelection()">✂️ Citește selecția</button>
        <button onclick="readFromHere()">➡️ Citește de aici</button>
        <button onclick="readTitles()">🏷️ Citește titlurile</button>
        <hr />
        <button onclick="pauseReading()">⏸️ Pauză</button>
        <button onclick="resumeReading()">▶️ Reia</button>
        <button onclick="stopReading()">⛔ Oprește</button>
        <hr />
        <button onclick="setVoice('female')">👩 Voce feminină</button>
        <button onclick="setVoice('male')">👨 Voce masculină</button>
        <hr />
        <button onclick="setRate(0.8)">🐢 Lent</button>
        <button onclick="setRate(1)">⚖️ Normal</button>
        <button onclick="setRate(1.3)">🐇 Rapid</button>
    </div>
</div>`;
    document.body.appendChild(container);

    // închidere meniu când se apasă în afară
    document.addEventListener("click", (e) => {
        const menu = document.getElementById("ttsMenu");
        const btn = document.querySelector(".tts-main-btn");
        if (!menu || !btn) return;
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.style.display = "none";
        }
    });

    // buton plutitor inteligent (ascunde la scroll în jos)
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const btn = document.querySelector(".floating-tts");
        if (!btn) return;
        const current = window.scrollY;
        btn.style.opacity = current > lastScroll ? "0" : "1";
        lastScroll = current;
    });
}

// -------------------------------
// TOGGLE MENIU
// -------------------------------
function toggleTTSMenu() {
    const menu = document.getElementById("ttsMenu");
    if (!menu) return;
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// -------------------------------
// INIT GLOBAL
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    injectTTS3DUI();
    initReadingModeToggle();
});
