/* =========================
   NAVIGAȚIE PREMIUM ECHILIBRATĂ
   ========================= */

// Deschidere / închidere meniu lateral
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");

    // Blochează scroll-ul când meniul este deschis (mobil)
    if (menu.classList.contains("open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}

// Închide meniul dacă utilizatorul apasă în afara lui
document.addEventListener("click", function (e) {
    const menu = document.getElementById("sideMenu");
    const btn = document.querySelector(".menu-btn");

    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    }
});

// Închide meniul automat când se schimbă orientarea sau lățimea ecranului
window.addEventListener("resize", () => {
    const menu = document.getElementById("sideMenu");
    if (window.innerWidth > 900) {
        menu.classList.remove("open");
        document.body.style.overflow = "";
    }
});

/* =========================
   ANIMAȚIE CARDURI LA SCROLL
   ========================= */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".scroll-appear").forEach((el) => observer.observe(el));

/* =========================
   HIGHLIGHT PENTRU PAGINA ACTIVĂ
   ========================= */

(function highlightActivePage() {
    const current = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".side-menu a, .bottom-nav a");

    links.forEach((link) => {
        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }
    });
})();
