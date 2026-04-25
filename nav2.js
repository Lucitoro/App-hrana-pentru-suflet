// ============================================================
// HRANĂ PENTRU SUFLET – nav2.js SUPER‑PREMIUM
// Carduri premium + butoane 3D + ripple + glow + fade-in inteligent
// Meniu sticky cu blur + auto-hide + scroll lin + back-to-top
// ============================================================

(function () {
    "use strict";

    // -----------------------------
    // 1. Helper: scroll lin
    // -----------------------------
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY || window.pageYOffset;
        const distance = targetY - startY;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
            window.scrollTo(0, startY + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    // -----------------------------
    // 2. Carduri premium inteligente
    // -----------------------------
    function buildCardsInPosts() {
        const posts = document.querySelectorAll(".post-body");
        if (!posts.length) return;

        posts.forEach(postBody => {
            const children = Array.from(postBody.children);
            let currentCard = null;

            children.forEach(el => {
                if (el.matches("h2, h3")) {
                    currentCard = document.createElement("div");
                    currentCard.className = "card-premium fade-in-observe";
                    postBody.insertBefore(currentCard, el);
                    currentCard.appendChild(el);
                } else if (currentCard) {
                    currentCard.appendChild(el);
                }
            });
        });
    }

    // -----------------------------
    // 3. Fade-in inteligent (IntersectionObserver)
    // -----------------------------
    function enableSmartFadeIn() {
        const elements = document.querySelectorAll(".fade-in-observe");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(el => observer.observe(el));
    }

    // -----------------------------
    // 4. Highlight pe linkul activ
    // -----------------------------
    function highlightActiveNav() {
        const links = document.querySelectorAll("a[href]");
        const current = window.location.href.split("#")[0];

        links.forEach(a => {
            const href = a.href.split("#")[0];
            if (href === current) a.classList.add("nav-active");
        });
    }

    // -----------------------------
    // 5. Scroll lin pentru linkuri interne
    // -----------------------------
    function enableSmoothAnchors() {
        document.addEventListener("click", e => {
            const a = e.target.closest("a[href^='#']");
            if (!a) return;

            const id = a.getAttribute("href").slice(1);
            const target = document.getElementById(id);
            if (!target) return;

            e.preventDefault();
            const rect = target.getBoundingClientRect();
            const targetY = rect.top + window.pageYOffset - 80;
            smoothScrollTo(targetY, 600);
        });
    }

    // -----------------------------
    // 6. Butoane premium 3D + ripple + glow
    // -----------------------------
    function enhancePremiumButtons() {
        const buttons = document.querySelectorAll(".btn-premium");
        if (!buttons.length) return;

        buttons.forEach(btn => {
            // Ripple effect
            btn.addEventListener("click", function (e) {
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                const rect = btn.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left) + "px";
                ripple.style.top = (e.clientY - rect.top) + "px";
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });

            // Glow effect
            btn.addEventListener("mouseenter", () => btn.classList.add("btn-glow"));
            btn.addEventListener("mouseleave", () => btn.classList.remove("btn-glow"));

            // 3D press effect
            btn.addEventListener("mousedown", () => btn.classList.add("btn-press"));
            btn.addEventListener("mouseup", () => btn.classList.remove("btn-press"));
            btn.addEventListener("mouseleave", () => btn.classList.remove("btn-press"));
        });
    }

    // -----------------------------
    // 7. Meniu sticky premium + blur + auto-hide
    // -----------------------------
    function enablePremiumStickyMenu() {
        const header = document.querySelector(".header-outer, header, .Header");
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const current = window.scrollY;

            // Blur + sticky
            header.classList.add("premium-sticky");

            // Auto-hide
            if (current > lastScroll && current > 120) {
                header.classList.add("hide-header");
            } else {
                header.classList.remove("hide-header");
            }

            lastScroll = current;
        });
    }

    // -----------------------------
    // 8. Buton „Sus”
    // -----------------------------
    function createBackToTop() {
        const btn = document.createElement("button");
        btn.className = "btn-back-to-top";
        btn.type = "button";
        btn.textContent = "↑ Sus";

        btn.addEventListener("click", () => smoothScrollTo(0, 600));
        document.body.appendChild(btn);

        function toggleVisibility() {
            btn.classList.toggle("visible", window.scrollY > 400);
        }

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility();
    }

    // -----------------------------
    // 9. Init
    // -----------------------------
    function init() {
        buildCardsInPosts();
        enableSmartFadeIn();
        highlightActiveNav();
        enableSmoothAnchors();
        enhancePremiumButtons();
        enablePremiumStickyMenu();
        createBackToTop();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
