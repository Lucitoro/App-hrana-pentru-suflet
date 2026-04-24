// ============================================================
// HRANĂ PENTRU SUFLET – nav2.js
// Carduri premium în postări + navigație optimizată
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
            const ease = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOut
            window.scrollTo(0, startY + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    // -----------------------------
    // 2. Carduri premium în postări
    // -----------------------------
    function buildCardsInPosts() {
        const posts = document.querySelectorAll(".post-body");
        if (!posts.length) return;

        posts.forEach(function (postBody) {
            const children = Array.from(postBody.children);
            let currentCard = null;

            children.forEach(function (el) {
                // Dacă e titlu de secțiune -> începe un card nou
                if (el.matches("h2, h3")) {
                    currentCard = document.createElement("div");
                    currentCard.className = "card-premium";
                    postBody.insertBefore(currentCard, el);
                    currentCard.appendChild(el);
                } else if (currentCard) {
                    // Restul elementelor după titlu intră în card
                    currentCard.appendChild(el);
                }
            });
        });
    }

    // -----------------------------
    // 3. Highlight pe linkul activ
    // -----------------------------
    function highlightActiveNav() {
        const links = document.querySelectorAll("a[href]");
        const current = window.location.href.replace(/#.*$/, "");

        links.forEach(function (a) {
            const href = a.href.replace(/#.*$/, "");
            if (href === current) {
                a.classList.add("nav-active");
            }
        });
    }

    // -----------------------------
    // 4. Scroll lin pentru linkuri interne
    // -----------------------------
    function enableSmoothAnchors() {
        document.addEventListener("click", function (e) {
            const a = e.target.closest("a[href^='#']");
            if (!a) return;

            const id = a.getAttribute("href").slice(1);
            if (!id) return;

            const target = document.getElementById(id);
            if (!target) return;

            e.preventDefault();
            const rect = target.getBoundingClientRect();
            const targetY = rect.top + window.pageYOffset - 80; // mic offset sub toolbar
            smoothScrollTo(targetY, 500);
        });
    }

    // -----------------------------
    // 5. Buton „sus” (back to top)
    // -----------------------------
    function createBackToTop() {
        const btn = document.createElement("button");
        btn.className = "btn-back-to-top";
        btn.type = "button";
        btn.textContent = "↑ Sus";

        btn.addEventListener("click", function () {
            smoothScrollTo(0, 500);
        });

        document.body.appendChild(btn);

        function toggleVisibility() {
            if (window.scrollY > 400) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        }

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility();
    }

    // -----------------------------
    // 6. Init
    // -----------------------------
    function init() {
        buildCardsInPosts();
        highlightActiveNav();
        enableSmoothAnchors();
        createBackToTop();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
