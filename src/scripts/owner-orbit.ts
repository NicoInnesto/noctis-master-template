export {};

const orbit = document.querySelector<HTMLElement>("[data-owner-orbit]");
const stage = orbit?.querySelector<HTMLElement>("[data-owner-stage]");

if (orbit && stage) {
  import("gsap").then(async ({ gsap }) => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    const world = stage.querySelector<HTMLElement>("[data-owner-world]");
    const room = stage.querySelector<HTMLElement>("[data-owner-room]");
    const chef = stage.querySelector<HTMLElement>("[data-owner-chef]");
    const halo = stage.querySelector<HTMLElement>("[data-owner-halo]");
    const flare = stage.querySelector<HTMLElement>("[data-owner-flare]");
    const copy = stage.querySelector<HTMLElement>("[data-owner-copy]");
    if (!world || !room || !chef || !halo || !flare || !copy) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      orbit.classList.add("is-enhanced");
      gsap.set(world, { transformPerspective: 1450, transformStyle: "preserve-3d", force3D: true });
      gsap.set(room, { z: -180, scale: 1.16, force3D: true });
      gsap.set(chef, { z: 180, transformOrigin: "50% 27%", force3D: true });
      gsap.set(halo, { z: 80, force3D: true });
      gsap.set(flare, { z: 240, force3D: true });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: orbit,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.95)}`,
          pin: stage,
          scrub: 0.25,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(world,
          { rotationY: -9, rotationX: 4, xPercent: 4, scale: 0.93 },
          { rotationY: 9, rotationX: -3, xPercent: -3, scale: 1.05, duration: 1, ease: "power1.inOut" }, 0)
        .fromTo(room,
          { xPercent: -4, yPercent: 1, rotationY: -4, rotationX: -2 },
          { xPercent: 0, yPercent: -1, rotationY: 2, rotationX: 1, duration: 1, ease: "none" }, 0)
        .fromTo(chef,
          { xPercent: 10, yPercent: 4, rotationY: -18, rotationX: 5, scale: 0.91 },
          { xPercent: -8, yPercent: -1, rotationY: 16, rotationX: -5, scale: 1.06, duration: 1, ease: "power1.inOut" }, 0)
        .fromTo(halo,
          { xPercent: -13, rotation: -18, scale: 0.82 },
          { xPercent: 0, rotation: 0, scale: 1, duration: 1, ease: "none" }, 0)
        .fromTo(flare,
          { xPercent: -40, autoAlpha: 0.05 },
          { xPercent: 0, autoAlpha: 0.12, duration: 1, ease: "none" }, 0)
        .fromTo(copy,
          { y: 35, autoAlpha: 0.78 },
          { y: 0, autoAlpha: 1, duration: 0.85, ease: "power2.out" }, 0.1);

      ScrollTrigger.refresh();
      return () => {
        timeline.kill();
        orbit.classList.remove("is-enhanced");
        gsap.set([world, room, chef, halo, flare, copy], { clearProps: "all" });
      };
    });
  });
}
