export {};

const catalog = document.querySelector<HTMLElement>("[data-menu-catalog]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (catalog && "IntersectionObserver" in window && !reducedMotion.matches) {
  const rows = [...catalog.querySelectorAll<HTMLElement>(".menu-row")];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

  for (const row of rows) {
    if (row.getBoundingClientRect().top >= window.innerHeight - 32) {
      row.classList.add("will-reveal");
      observer.observe(row);
    }
  }

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer.disconnect();
    rows.forEach((row) => row.classList.add("is-visible"));
  });
}
