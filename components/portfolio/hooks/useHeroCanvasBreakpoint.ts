"use client";

import { type RefObject, useLayoutEffect } from "react";

/** Canvas width breakpoints (smallest first). Syncs `data-hero-bp` on .design-viewport. */
const HERO_CANVAS_BPS = [
  { max: 1095, id: "1095" },
  { max: 1135, id: "1135" },
] as const;

export function useHeroCanvasBreakpoint(
  canvasRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const sync = () => {
      const w = el.getBoundingClientRect().width;
      const match = HERO_CANVAS_BPS.find((bp) => w <= bp.max);
      if (match) {
        el.setAttribute("data-hero-bp", match.id);
      } else {
        el.removeAttribute("data-hero-bp");
      }

      const header = document.querySelector<HTMLElement>(".site-header");
      const headerH = header?.getBoundingClientRect().height ?? 56;
      const padY =
        getComputedStyle(el).getPropertyValue("--hero-side-pad-y").trim() ||
        "5.5rem";
      el.style.setProperty(
        "--hero-side-labels-pt",
        `calc(${padY} + ${headerH}px)`,
      );
    };

    sync();
    const header = document.querySelector<HTMLElement>(".site-header");
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    if (header) ro.observe(header);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [canvasRef]);
}
