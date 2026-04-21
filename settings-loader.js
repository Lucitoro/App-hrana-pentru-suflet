// settings-loader.js
// Încarcă și aplică TOATE setările utilizatorului pe TOATE paginile

(function () {
  // 1. Citește setările din localStorage (cu valori de rezervă)
  const theme      = localStorage.getItem("theme")      || "light";   // "light" | "dark"
  const textSize   = localStorage.getItem("textSize")   || "medium";  // "small" | "medium" | "large" | "xlarge"
  const language   = localStorage.getItem("language")   || "ro";      // "ro" | "it" | "en"
  const ttsVoice   = localStorage.getItem("ttsVoice")   || "default";
  const ttsRate    = localStorage.getItem("ttsRate")    || "1";
  const ttsEnabled = localStorage.getItem("ttsEnabled") || "on";      // "on" | "off"

  // 2. Aplică tema (dark / light) pe <body>
  function applyTheme() {
    document.body.classList.remove("light-theme", "dark-theme");
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }

  // 3. Aplică mărimea textului pe întreaga pagină
  function applyTextSize() {
    // poți ajusta valorile după cum ai în CSS
    let sizeValue = "100%";
    if (textSize === "small")  sizeValue = "90%";
    if (textSize === "medium") sizeValue = "100%";
    if (textSize === "large")  sizeValue = "115%";
    if (textSize === "xlarge") sizeValue = "130%";

    document.documentElement.style.fontSize = sizeValue;
  }

  // 4. Aplică limba (doar setează atributul, traducerea o faci tu în codul de UI)
  function applyLanguage() {
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("data-lang", language);
  }

  // 5. Aplică setările TTS (doar le pregătește global)
  function applyTTS() {
    window.appTTSSettings = {
      enabled: ttsEnabled === "on",
      voice: ttsVoice,
      rate: parseFloat(ttsRate)
    };
  }

  // 6. Rulează după ce DOM-ul este gata
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme();
    applyTextSize();
    applyLanguage();
    applyTTS();
  });
})();
