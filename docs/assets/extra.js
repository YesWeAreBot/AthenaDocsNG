document.addEventListener("DOMContentLoaded", () => {
  const homeHero = document.querySelector(".home-hero");
  if (!homeHero) return;
  if (!homeHero.querySelector(".version-badge")) {
    const badge = document.createElement("span");
    badge.className = "version-badge";
    badge.textContent = "v4";
    homeHero.appendChild(badge);
  }
});
