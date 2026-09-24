export {};

document.querySelectorAll<HTMLImageElement>("img[data-fallback-src]").forEach((image) => {
  const showFallback = () => {
    const fallback = image.dataset.fallbackSrc;
    if (!fallback || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    image.removeAttribute("srcset");
    image.src = fallback;
  };
  image.addEventListener("error", showFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) showFallback();
});
