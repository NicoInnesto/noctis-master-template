const story = document.querySelector<HTMLElement>("[data-story]");
const stage = document.querySelector<HTMLElement>("[data-story-stage]");
const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

if (story && stage && scenes.length > 1) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        if (!story || !stage) return;
        story.classList.add("is-enhanced");
        scenes.forEach((scene, index) => {
          scene.inert = index !== 0;
          scene.style.pointerEvents = index === 0 ? "auto" : "none";
        });

        const progressBar = document.querySelector<HTMLElement>("[data-story-progress]");
        const counter = document.querySelector<HTMLElement>("[data-story-count]");
        let activeIndex = 0;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: story,
            start: "top top",
            end: () => `+=${Math.round((scenes.length - 1) * window.innerHeight * 1.05)}`,
            scrub: 0.65,
            pin: stage,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) gsap.set(progressBar, { scaleY: self.progress });
              const next = Math.min(scenes.length - 1, Math.round(self.progress * (scenes.length - 1)));
              if (next !== activeIndex) {
                activeIndex = next;
                scenes.forEach((scene, index) => {
                  scene.inert = index !== activeIndex;
                  scene.style.pointerEvents = index === activeIndex ? "auto" : "none";
                });
                if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
              }
            },
          },
        });

        scenes.forEach((scene, index) => {
          if (index === scenes.length - 1) return;
          const currentMedia = scene.querySelector<HTMLElement>("[data-scene-media]");
          const currentCopy = scene.querySelector<HTMLElement>("[data-scene-copy]");
          const nextScene = scenes[index + 1];
          const nextMedia = nextScene.querySelector<HTMLElement>("[data-scene-media]");
          const nextCopy = nextScene.querySelector<HTMLElement>("[data-scene-copy]");
          if (!currentMedia || !currentCopy || !nextMedia || !nextCopy) return;
          timeline
            .to(currentMedia, { scale: 1.17, xPercent: index % 2 ? -3 : 3, duration: 1 }, index)
            .to(currentCopy, { autoAlpha: 0, y: -35, duration: 0.32 }, index + 0.39)
            .fromTo(nextScene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.43 }, index + 0.55)
            .fromTo(nextMedia, { scale: 1.21, xPercent: index % 2 ? 4 : -4 }, { scale: 1, xPercent: 0, duration: 0.62 }, index + 0.55)
            .fromTo(nextCopy, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: 0.32 }, index + 0.7)
            .set(scene, { autoAlpha: 0 }, index + 0.99);
        });

        ScrollTrigger.refresh();
        return () => {
          story.classList.remove("is-enhanced");
          scenes.forEach((scene) => { scene.inert = false; scene.style.pointerEvents = ""; });
          timeline.kill();
          gsap.set(scenes, { clearProps: "all" });
          gsap.set(scenes.flatMap((scene) => [scene.querySelector("[data-scene-media]"), scene.querySelector("[data-scene-copy]")]).filter(Boolean), { clearProps: "all" });
        };
      });

      media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const effects = scenes.map((scene) => {
          const mediaElement = scene.querySelector<HTMLElement>("[data-scene-media]");
          if (!mediaElement) return null;
          return gsap.fromTo(mediaElement, { scale: 1.1, yPercent: -2 }, {
            scale: 1, yPercent: 2, ease: "none",
            scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.4 },
          });
        });
        return () => effects.forEach((effect) => effect?.kill());
      });
    });
  }
}
