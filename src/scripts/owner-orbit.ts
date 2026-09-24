export {};

const orbit = document.querySelector<HTMLElement>("[data-owner-orbit]");
const stage = orbit?.querySelector<HTMLElement>("[data-owner-stage]");

if (orbit && stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  import("gsap").then(async ({ gsap }) => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const visual = stage.querySelector<HTMLElement>("[data-owner-visual]");
    const world = stage.querySelector<HTMLElement>("[data-owner-world]");
    const room = stage.querySelector<HTMLElement>("[data-owner-room]");
    const chef = stage.querySelector<HTMLElement>("[data-owner-chef]");
    const halo = stage.querySelector<HTMLElement>("[data-owner-halo]");
    const flare = stage.querySelector<HTMLElement>("[data-owner-flare]");
    const copy = stage.querySelector<HTMLElement>("[data-owner-copy]");
    if (!visual || !world || !room || !chef || !halo || !flare || !copy) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      orbit.classList.add("is-enhanced");
      gsap.set(world, { transformPerspective: 1450, transformStyle: "preserve-3d", force3D: true });
      gsap.set(room, { z: -180, scale: 1.16, force3D: true });
      gsap.set(chef, { z: 180, transformOrigin: "50% 27%", force3D: true });
      gsap.set(halo, { z: 80, force3D: true });
      gsap.set(flare, { z: 240, force3D: true });

      // Three camera beats: approach, orbit past the chef, and pull back to the room.
      // Distinct depth planes create parallax while moving properties stay on the compositor.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: orbit,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2.9)}`,
          pin: stage,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(world,
          { rotationY: -9, rotationX: 4, xPercent: 4, scale: 0.93 },
          { rotationY: 9, rotationX: -3, xPercent: -3, scale: 1.05, duration: 1.05, ease: "power1.inOut" }, 0)
        .to(world, { rotationY: -12, rotationX: 5, xPercent: 0, scale: 1.11, duration: 1.05, ease: "power1.inOut" }, 1.05)
        .to(world, { rotationY: 3, rotationX: -1, xPercent: 0, scale: 1.02, duration: 0.8, ease: "power1.inOut" }, 2.1)
        .fromTo(room,
          { xPercent: -4, yPercent: 1, rotationY: -4, rotationX: -2 },
          { xPercent: 5, yPercent: -3, rotationY: 7, rotationX: 3, duration: 2.1, ease: "none" }, 0)
        .to(room, { xPercent: -1, yPercent: 0, rotationY: -2, rotationX: 0, duration: 0.8, ease: "none" }, 2.1)
        .fromTo(chef,
          { xPercent: 10, yPercent: 4, rotationY: -18, rotationX: 5, scale: 0.91 },
          { xPercent: -8, yPercent: -1, rotationY: 16, rotationX: -5, scale: 1.06, duration: 1.05, ease: "power1.inOut" }, 0)
        .to(chef, { xPercent: -6, yPercent: 1, rotationY: -19, rotationX: 4, scale: 1.1, duration: 1.05, ease: "power1.inOut" }, 1.05)
        .to(chef, { xPercent: 0, yPercent: 0, rotationY: 2, rotationX: 0, scale: 1, duration: 0.8, ease: "power1.inOut" }, 2.1)
        .fromTo(halo, { xPercent: -13, rotation: -18, scale: 0.82 }, { xPercent: 12, rotation: 21, scale: 1.24, duration: 2.9, ease: "none" }, 0)
        .fromTo(flare, { xPercent: -40, autoAlpha: 0.05 }, { xPercent: 32, autoAlpha: 0.38, duration: 1.5, ease: "none" }, 0.6)
        .to(flare, { xPercent: 48, autoAlpha: 0.06, duration: 0.8, ease: "none" }, 2.1)
        .fromTo(copy, { y: 55, autoAlpha: 0.7 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, 0.15);

      ScrollTrigger.refresh();
      return () => {
        timeline.kill();
        orbit.classList.remove("is-enhanced");
        gsap.set([world, room, chef, halo, flare, copy], { clearProps: "all" });
      };
    });

    media.add("(max-width: 1023px), (hover: none), (pointer: coarse)", () => {
      const roomTween = gsap.fromTo(room, { yPercent: -3 }, {
        yPercent: 3,
        ease: "none",
        scrollTrigger: { trigger: orbit, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      const chefTween = gsap.fromTo(chef, { yPercent: 3, scale: 0.97 }, {
        yPercent: -2,
        scale: 1.02,
        ease: "none",
        scrollTrigger: { trigger: orbit, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      return () => {
        roomTween.kill();
        chefTween.kill();
        gsap.set([room, chef], { clearProps: "all" });
      };
    });
  });
}
