document.addEventListener("DOMContentLoaded", () => {
  const homeHero = document.querySelector(".home-hero");
  if (!homeHero) return;
  const badge = document.createElement("span");
  badge.className = "version-badge";
  badge.textContent = "v4";
  homeHero.appendChild(badge);
});
