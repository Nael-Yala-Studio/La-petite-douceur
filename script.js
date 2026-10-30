const van = document.getElementById("vanTrigger");
const openButton = document.getElementById("openVan");
const closeButton = document.getElementById("closeVan");
const revealPanel = document.getElementById("revealPanel");
const vanInstruction = document.getElementById("vanInstruction");

function openVan() {
  van.classList.add("open");
  revealPanel.classList.add("visible");
  vanInstruction.textContent = "LE COFFRE EST OUVERT — LAISSEZ-VOUS TENTER";
  openButton.textContent = "Le coffre est ouvert ✦";
  openButton.disabled = true;
  setTimeout(() => revealPanel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 250);
}
function closeVan() {
  van.classList.remove("open");
  revealPanel.classList.remove("visible");
  vanInstruction.textContent = "APPUYEZ SUR LA CAMIONNETTE POUR DÉCOUVRIR SON SECRET";
  openButton.innerHTML = 'Ouvrir le coffre <span>✦</span>';
  openButton.disabled = false;
}
van.addEventListener("click", () => van.classList.contains("open") ? closeVan() : openVan());
openButton.addEventListener("click", openVan);
closeButton.addEventListener("click", closeVan);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  document.body.classList.toggle("menu-open", opened);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".dessert-card, .story-copy, .story-image, .menu-top").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(22px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
  revealObserver.observe(el);
});
const style = document.createElement("style");
style.textContent = ".in-view{opacity:1!important;transform:translateY(0)!important}";
document.head.appendChild(style);

// Tap a dessert image to enlarge it; the original menu can also be enlarged.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
document.querySelectorAll(".dessert-image img, .menu-image-link img").forEach(img => {
  img.parentElement.addEventListener("click", event => {
    if (event.target.closest(".menu-image-link")) event.preventDefault();
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });
