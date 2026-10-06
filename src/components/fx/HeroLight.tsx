"use client";

import { useEffect, useRef } from "react";

/**
 * The inspection light on the hero photo. On devices with a real pointer, a
 * soft pool of light follows the cursor across the photograph. It only adds
 * light: with no pointer, no JavaScript or reduced motion, the photo simply
 * sits at its normal exposure.
 */
export default function HeroLight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el?.closest<HTMLElement>(".hero");
    const photo = el?.parentElement;
    if (!el || !hero || !photo) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0.62;
    let y = 0.44;
    let tx = x;
    let ty = y;
    let raf = 0;

    const tick = () => {
      raf = 0;
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.setProperty("--lx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--ly", `${(y * 100).toFixed(2)}%`);
      if (Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = photo.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      el.style.setProperty("--lo", "1");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => el.style.setProperty("--lo", "0");

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ref} className="hero-light" aria-hidden="true" />;
}
