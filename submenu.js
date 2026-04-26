document.addEventListener("DOMContentLoaded", () => {

    const submenu = `
    <button class="btn-action" onclick="toggleDownloadMenu()">⬇️ Afișează opțiunile</button>

    <div id="downloadMenu" style="display:none; margin-top:15px;">

        <a class="btn-action"
           href="https://raw.githubusercontent.com/Lucitoro/App-hrana-pentru-suflet/main/hrana-pentru-suflet.apk"
           download>📥 Descarcă aplicația (APK)</a>

        <a class="btn-action"
           href="whatsapp://send?text=Descarcă aplicația Hrana pentru suflet:%20https://lucitoro.github.io/App-hrana-pentru-suflet/">
           🤝 Trimite pe WhatsApp
        </a>

        <a class="btn-action"
           href="sms:?body=Descarcă aplicația Hrana pentru suflet:%20https://lucitoro.github.io/App-hrana-pentru-suflet/">
           📩 Trimite prin SMS
        </a>

        <a class="btn-action"
           href="mailto:?subject=Hrana pentru suflet&body=Descarcă aplicația:%20https://lucitoro.github.io/App-hrana-pentru-suflet/">
           ✉️ Trimite prin Email
        </a>

    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", submenu);
});

function toggleDownloadMenu() {
    const menu = document.getElementById("downloadMenu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
}
