document.addEventListener("DOMContentLoaded", () => {

    const bottomNav = `
    <nav class="bottom-nav">
        <a href="index.html">🏠 Acasă</a>
        <a href="pravila.html">📘 Pravila</a>
        <a href="setari.html">⚙️ Setări</a>
        <a href="https://raw.githubusercontent.com/Lucitoro/App-hrana-pentru-suflet/main/hrana-pentru-suflet.apk"
           class="btn-action" download>📥 APK</a>
    </nav>
    `;

    document.body.insertAdjacentHTML("beforeend", bottomNav);
});
