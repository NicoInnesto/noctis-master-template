export {};

const catalog = document.querySelector<HTMLElement>("[data-menu-catalog]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (catalog) {
  const phone = window.matchMedia("(max-width: 620px)");
  const tabs = [...catalog.querySelectorAll<HTMLButtonElement>("[data-menu-tab]")];
  const categories = [...catalog.querySelectorAll<HTMLElement>(".menu-category")];
  let activeId = categories[0]?.id;

  const selectCategory = (id: string) => {
    if (!categories.some((category) => category.id === id)) return;
    activeId = id;
    for (const category of categories) category.hidden = phone.matches && category.id !== id;
    for (const tab of tabs) tab.setAttribute("aria-pressed", String(tab.dataset.menuTab === id));
  };

  const syncLayout = () => {
    catalog.classList.toggle("is-mobile-tabs", phone.matches);
    selectCategory(activeId || categories[0]?.id || "");
  };

  for (const tab of tabs) tab.addEventListener("click", () => selectCategory(tab.dataset.menuTab || ""));
  phone.addEventListener("change", syncLayout);
  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) selectCategory(id);
  });
  const initialHash = decodeURIComponent(window.location.hash.slice(1));
  if (initialHash) activeId = initialHash;
  syncLayout();
}

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
