// Deschidere / închidere meniu lateral
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const body = document.body;

    menu.classList.toggle("open");

    // Blochează scroll-ul când meniul este deschis
    if (menu.classList.contains("open")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
}

// Închide meniul dacă utilizatorul apasă în afara lui
document.addEventListener("click", function (event) {
    const menu = document.getElementById("sideMenu");
    const button = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("open");
        document.body.style.overflow = "auto";
    }
});

// Animație la scroll pentru carduri
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-appear");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

// Efect premium pe carduri (mic bounce)
document.querySelectorAll(".card3d").forEach(card => {
    card.addEventListener("mousedown", () => {
        card.style.transform = "scale(0.97)";
    });
    card.addEventListener("mouseup", () => {
        card.style.transform = "scale(1.03)";
        setTimeout(() => {
            card.style.transform = "scale(1)";
        }, 150);
    });
});

// Efect premium pe butoane
document.querySelectorAll(".btn-premium").forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
    });
});
