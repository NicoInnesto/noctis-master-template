export {};

const story = document.querySelector<HTMLElement>("[data-story]");
const stage = document.querySelector<HTMLElement>("[data-story-stage]");
const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

if (story && stage && scenes.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  import("gsap").then(async ({ gsap }) => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      if (!story || !stage) return;
      story.classList.add("is-enhanced");

      const frames = scenes.map((scene) => ({
        scene,
        image: scene.querySelector<HTMLElement>("[data-scene-media]"),
        copy: scene.querySelector<HTMLElement>("[data-scene-copy]"),
      }));
      const progressBar = stage.querySelector<HTMLElement>("[data-story-progress]");
      const counter = stage.querySelector<HTMLElement>("[data-story-count]");
      const light = stage.querySelector<HTMLElement>("[data-story-light]");
      const letterbox = Array.from(stage.querySelectorAll<HTMLElement>(".story-letterbox"));
      const segment = 2.35;
      let activeIndex = -1;

      frames.forEach(({ scene, image, copy }, index) => {
        gsap.set(scene, { autoAlpha: index === 0 ? 1 : 0, zIndex: index + 1 });
        if (image) gsap.set(image, { transformOrigin: scene.style.getPropertyValue("--camera-origin") || "50% 50%", force3D: true });
        if (copy) gsap.set(copy, { force3D: true });
      });
      gsap.set(letterbox, { scaleY: 0 });
      if (light) gsap.set(light, { autoAlpha: 0 });

      const setActive = (index: number) => {
        if (activeIndex === index) return;
        activeIndex = index;
        frames.forEach(({ scene }, sceneIndex) => {
          scene.inert = sceneIndex !== index;
          scene.style.pointerEvents = sceneIndex === index ? "auto" : "none";
        });
        if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(frames.length).padStart(2, "0")}`;
      };
      setActive(0);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: () => `+=${Math.round((frames.length - 1) * window.innerHeight * 1.85)}`,
          scrub: 0.75,
          pin: stage,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBar) gsap.set(progressBar, { scaleY: self.progress });
            const elapsed = self.progress * (frames.length - 1) * segment;
            const visible = Math.min(frames.length - 1, Math.max(0, Math.floor((elapsed + 1.02) / segment)));
            setActive(visible);
          },
        },
      });

      timeline.to(letterbox, { scaleY: 1, duration: 0.5, ease: "power2.out" }, 0);

      for (let index = 0; index < frames.length - 1; index++) {
        const current = frames[index];
        const next = frames[index + 1];
        if (!current.image || !current.copy || !next.image || !next.copy) continue;
        const at = index * segment;
        const direction = index % 2 === 0 ? 1 : -1;

        // A push-in crosses into an extreme close-up; the following shot pulls
        // back and changes camera axis using only composited transforms.
        timeline
          .to(current.image, {
            scale: index === 0 ? 3.35 : 2.8,
            xPercent: direction * 17,
            yPercent: index === 1 ? -11 : 9,
            rotation: direction * 4.5,
            duration: 1.62,
            ease: "power2.inOut",
          }, at)
          .to(current.copy, { autoAlpha: 0, y: -82, scale: 0.9, duration: 0.42, ease: "power2.in" }, at + 0.25)
          .fromTo(next.image, {
            scale: 2.25,
            xPercent: -direction * 12,
            yPercent: direction * 7,
            rotation: -direction * 4.2,
          }, {
            scale: 1.04,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            duration: 1.32,
            ease: "power2.out",
          }, at + 1.01)
          .fromTo(next.scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.58 }, at + 1.01)
          .to(current.scene, { autoAlpha: 0, duration: 0.42 }, at + 1.2)
          .fromTo(next.copy, { autoAlpha: 0, y: 105, rotationX: -12 }, {
            autoAlpha: 1,
            y: 0,
            rotationX: 0,
            duration: 0.59,
            ease: "power2.out",
          }, at + 1.69);

        if (light) {
          timeline
            .to(light, { autoAlpha: 0.58, xPercent: direction * 9, duration: 0.26 }, at + 1.08)
            .to(light, { autoAlpha: 0, xPercent: direction * 18, duration: 0.42 }, at + 1.34);
        }
      }

      ScrollTrigger.refresh();
      return () => {
        timeline.kill();
        story.classList.remove("is-enhanced");
        frames.forEach(({ scene }) => { scene.inert = false; scene.style.pointerEvents = ""; });
        gsap.set([...scenes, ...frames.flatMap(({ image, copy }) => [image, copy]).filter(Boolean), ...letterbox, light].filter(Boolean), { clearProps: "all" });
      };
    });

    media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference), (hover: none) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference)", () => {
      story.classList.add("is-enhanced", "is-mobile-enhanced");
      ScrollTrigger.config({ ignoreMobileResize: true });

      const frames = scenes.map((scene) => ({
        scene,
        image: scene.querySelector<HTMLElement>("[data-scene-media]"),
        copy: scene.querySelector<HTMLElement>("[data-scene-copy]"),
      }));
      const progressBar = stage.querySelector<HTMLElement>("[data-story-progress]");
      const counter = stage.querySelector<HTMLElement>("[data-story-count]");
      let activeIndex = -1;

      frames.forEach(({ scene, image, copy }, index) => {
        gsap.set(scene, { autoAlpha: index === 0 ? 1 : 0, zIndex: index + 1 });
        if (image) gsap.set(image, { transformOrigin: scene.style.getPropertyValue("--camera-origin") || "50% 50%", force3D: true });
        if (copy) gsap.set(copy, { force3D: true });
      });

      const setActive = (index: number) => {
        if (activeIndex === index) return;
        activeIndex = index;
        frames.forEach(({ scene }, sceneIndex) => {
          scene.inert = sceneIndex !== index;
          scene.style.pointerEvents = sceneIndex === index ? "auto" : "none";
        });
        if (counter) counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(frames.length).padStart(2, "0")}`;
      };
      setActive(0);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: () => `+=${Math.round(stage.clientHeight * (frames.length - 1) * 0.85)}`,
          scrub: 0.25,
          pin: stage,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBar) gsap.set(progressBar, { scaleY: self.progress });
            setActive(Math.min(frames.length - 1, Math.floor(self.progress * (frames.length - 1) + 0.45)));
          },
        },
      });

      for (let index = 0; index < frames.length - 1; index++) {
        const current = frames[index];
        const next = frames[index + 1];
        if (!current.image || !current.copy || !next.image || !next.copy) continue;
        const direction = index % 2 === 0 ? 1 : -1;
        timeline
          .to(current.image, { scale: 1.78, xPercent: direction * 7, yPercent: -3, duration: 0.82, ease: "power1.inOut" }, index)
          .to(current.copy, { autoAlpha: 0, y: -28, duration: 0.28, ease: "power1.in" }, index + 0.18)
          .fromTo(next.image,
            { scale: 1.35, xPercent: -direction * 7, yPercent: 4 },
            { scale: 1.02, xPercent: 0, yPercent: 0, duration: 0.54, ease: "power1.out" }, index + 0.4)
          .fromTo(next.scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, index + 0.4)
          .to(current.scene, { autoAlpha: 0, duration: 0.22 }, index + 0.72)
          .fromTo(next.copy, { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: 0.34, ease: "power1.out" }, index + 0.62);
      }

      ScrollTrigger.refresh();
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        story.classList.remove("is-enhanced", "is-mobile-enhanced");
        frames.forEach(({ scene }) => { scene.inert = false; scene.style.pointerEvents = ""; });
        gsap.set([...scenes, ...frames.flatMap(({ image, copy }) => [image, copy]).filter(Boolean), progressBar].filter(Boolean), { clearProps: "all" });
      };
    });
  });
}
