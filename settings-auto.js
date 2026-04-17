(function() {
    console.log("🔧 Activare automată a TUTUROR setărilor...");

    // -----------------------------
    // 1. Tema (light / dark)
    // -----------------------------
    const theme = "dark";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // -----------------------------
    // 2. Mărimea textului (small / medium / large)
    // -----------------------------
    const textSize = "large";
    document.body.setAttribute("data-text-size", textSize);
    localStorage.setItem("textSize", textSize);

    // -----------------------------
    // 3. Limba (ro / en / etc.)
    // -----------------------------
    const language = "ro";
    localStorage.setItem("language", language);

    // -----------------------------
    // 4. TTS – voce (female / male)
    // -----------------------------
    const ttsVoice = "female";
    localStorage.setItem("ttsVoice", ttsVoice);

    // -----------------------------
    // 5. TTS – viteză (0.5 – 2)
    // -----------------------------
    const ttsRate = "1";
    localStorage.setItem("ttsRate", ttsRate);

    // -----------------------------
    // 6. TTS – mod citire (normal / slow / fast)
    // -----------------------------
    const ttsMode = "normal";
    localStorage.setItem("ttsMode", ttsMode);

    // -----------------------------
    // 7. Confirmare
    // -----------------------------
    console.log("🎉 Toate setările au fost activate și salvate!");
    console.log({
        theme,
        textSize,
        language,
        ttsVoice,
        ttsRate,
        ttsMode
    });

    console.log("🔄 Reîncarcă pagina dacă vrei să vezi efectele complete.");
})();
