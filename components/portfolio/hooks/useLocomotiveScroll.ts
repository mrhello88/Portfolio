"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

/**
 * Smooth scroll (Locomotive v5 → Lenis) + GSAP ScrollTrigger scroller proxy.
 * Call this hook **before** `usePortfolioAnimations` so ScrollTrigger sees the proxy.
 */
export function useLocomotiveScroll() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const loco = new LocomotiveScroll({
      lenisOptions: {
        smoothWheel: true,
        lerp: 0.09,
      },
      scrollCallback: () => {
        ScrollTrigger.update();
      },
    });

    const lenis = loco.lenisInstance;
    let unsubscribeLenis: (() => void) | undefined;

    if (lenis) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && typeof value === "number") {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.defaults({ scroller: document.documentElement });
      unsubscribeLenis = lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
    }

    return () => {
      unsubscribeLenis?.();
      loco.destroy();
      ScrollTrigger.defaults({ scroller: window });
      ScrollTrigger.refresh();
    };
  }, []);
}
