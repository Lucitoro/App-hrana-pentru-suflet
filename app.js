/* ============================
   HRANA PENTRU SUFLET – APP.JS
   Versiune Premium Finală
============================ */

/* ====== SCROLL SOFT ====== */
document.documentElement.style.scrollBehavior = "smooth";

/* ====== DARK MODE ====== */
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Salvăm preferința
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// Aplicăm tema salvată
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

/* ====== TEXT-TO-SPEECH PREMIUM ====== */
function speak(text) {
    if (!window.speechSynthesis) {
        alert("Citirea cu voce nu este suportată pe acest dispozitiv.");
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ro-RO";
    utter.rate = 1;
    utter.pitch = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

/* Citește selecția */
function readSelection() {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
        speak(selection);
    } else {
        alert("Selectează textul pe care vrei să îl citești.");
    }
}

/* Citește toată pagina */
function readPage() {
    speak(document.body.innerText);
}

/* Citește secțiunea curentă */
function readSection(id) {
    const el = document.getElementById(id);
    if (el) speak(el.innerText);
}

/* ====== MENIU SLIDE-DOWN PREMIUM ====== */
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");

if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", () => {
        menuPanel.classList.toggle("open");
    });
}
