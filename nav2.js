/* ============================================================
   HRANA PENTRU SUFLET – nav2.js SUPER‑PREMIUM EXTINS
   ============================================================ */

/* MENIU STICKY + AUTO-HIDE */
let lastScroll = 0;
const nav = document.querySelector(".header-outer") || document.createElement("div");

if (!document.querySelector(".header-outer")) {
  nav.className = "header-outer";
  document.body.prepend(nav);
}

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;
  if (current > lastScroll) {
    nav.style.transform = "translateY(-100%)";
  } else {
    nav.style.transform = "translateY(0)";
  }
  lastScroll = current;
});

/* FADE-IN PROGRESIV */
const fadeEls = document.querySelectorAll(".card-premium, .fade-in");
fadeEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.8s ease ${(i * 0.15)}s, transform 0.8s ease ${(i * 0.15)}s`;
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => obs.observe(el));

/* CARDURI PREMIUM 3D */
document.querySelectorAll(".card-premium").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateX(${ -y / 20 }deg) rotateY(${ x / 20 }deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

/* BACK TO TOP PREMIUM */
const topBtn = document.createElement("div");
topBtn.className = "btn-back-to-top";
topBtn.innerHTML = "↑";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* MENIU PREMIUM – FĂRĂ BUTON APK ÎN SUBMENIU */
const menuItems = [
  { title: "Acasă", link: "/" },
  { title: "Rugăciuni", link: "/rugaciuni" },
  { title: "Acatist", link: "/acatiste" },
  { title: "Paraclise", link: "/paraclise" },
  { title: "Viețile Sfinților", link: "/vieti" }
];

/* GENERARE MENIU */
const menu = document.createElement("nav");
menu.className = "menu-premium";

menuItems.forEach(item => {
  const a = document.createElement("a");
  a.href = item.link;
  a.textContent = item.title;
  menu.appendChild(a);
});

nav.appendChild(menu);

/* HIGHLIGHT LINK ACTIV */
const current = window.location.pathname;
document.querySelectorAll("nav a").forEach(a => {
  if (a.getAttribute("href") === current) {
    a.classList.add("active");
  }
});
