"use client";

import { type RefObject, useLayoutEffect } from "react";

/** Canvas width breakpoints (smallest first). Syncs `data-hero-bp` on .design-viewport. */
/** Smallest matching `max` wins. No separate 1024 bucket — it had no CSS and made headline jump bigger. */
const HERO_CANVAS_BPS = [
  { max: 600, id: "600" },
  { max: 630, id: "630" },
  { max: 695, id: "695" },
  { max: 720, id: "720" },
  { max: 768, id: "768" },
  { max: 800, id: "800" },
  { max: 810, id: "810" },
  { max: 890, id: "890" },
  { max: 1095, id: "1095" },
  { max: 1135, id: "1135" },
] as const;

/** Inline tokens on canvas — reliable when @media / container lag behind canvas width */
const CANVAS_TOKEN_OVERRIDES: Record<string, Record<string, string>> = {
  "1095": {
    "--hero-headline-stack-offset-y": "0.85rem",
  },
  "1135": {
    "--hero-headline-stack-offset-y": "0rem",
  },
};

const CANVAS_OVERRIDE_KEYS = [
  ...new Set(
    Object.values(CANVAS_TOKEN_OVERRIDES).flatMap((o) => Object.keys(o)),
  ),
];

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

      for (const key of CANVAS_OVERRIDE_KEYS) {
        el.style.removeProperty(key);
      }
      if (match && CANVAS_TOKEN_OVERRIDES[match.id]) {
        for (const [key, value] of Object.entries(
          CANVAS_TOKEN_OVERRIDES[match.id],
        )) {
          el.style.setProperty(key, value);
        }
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
