"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePortfolioAnimations(
  rootRef: RefObject<HTMLDivElement | null>,
  mainRef: RefObject<HTMLElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  lineFillRef: RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const main = mainRef.current;
    const lineFill = lineFillRef.current;
    if (!root || !main) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero-word, .hero-word-muted", { yPercent: 0 });
        gsap.set(".hero-line", { scaleX: 1 });
        gsap.set(".hero-eyebrow, .hero-sub, .hero-cta, .hero-scroll-hint", {
          opacity: 1,
          y: 0,
        });
        gsap.set(".hero-bg-orb", { opacity: 1, scale: 1 });
        gsap.set(".hero-portrait-reveal", { opacity: 1, scale: 1, y: 0 });
        gsap.set(".site-header", { y: 0, opacity: 1 });
        gsap.set(".nav-link", { opacity: 1, y: 0 });
        gsap.set(".timeline-node", { opacity: 1, y: 0 });
        gsap.set(".journey-head, .journey-lede, .contact-block", {
          opacity: 1,
          y: 0,
        });
        gsap.set(".footer-line", { scaleX: 1 });
        if (lineFill) gsap.set(lineFill, { scaleY: 1 });
        return;
      }

      gsap.set(".hero-word, .hero-word-muted", { yPercent: 110 });
      gsap.set(".hero-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-eyebrow, .hero-sub, .hero-cta", { opacity: 0, y: 20 });
      gsap.set(".hero-scroll-hint", { opacity: 0, y: 8 });
      gsap.set(".hero-bg-orb", { opacity: 0, scale: 0.6 });
      gsap.set(".hero-portrait-reveal", {
        opacity: 0,
        scale: 0.88,
        y: 36,
        transformOrigin: "bottom right",
      });
      gsap.set(".site-header", { y: -16, opacity: 0 });
      gsap.set(".nav-link", { opacity: 0, y: -6 });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.12,
      });

      introTl
        .to(".site-header", { y: 0, opacity: 1, duration: 0.55 }, 0)
        .to(
          ".nav-link",
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          0.08,
        )
        .to(
          ".hero-bg-orb",
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
          },
          0,
        )
        .to(
          ".hero-portrait-reveal",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            ease: "power2.out",
          },
          0.12,
        )
        .to(".hero-line", { scaleX: 1, duration: 0.75 }, 0.15)
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5 }, 0.2)
        .to(
          ".hero-word",
          { yPercent: 0, duration: 0.72, stagger: 0.06, ease: "power4.out" },
          0.28,
        )
        .to(
          ".hero-word-muted",
          { yPercent: 0, duration: 0.65, stagger: 0.05, ease: "power3.out" },
          0.42,
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.35)",
          },
          0.62,
        )
        .to(".hero-scroll-hint", { opacity: 1, y: 0, duration: 0.45 }, 0.85)
        .to(
          ".hero-scroll-chevron",
          {
            y: 6,
            duration: 0.85,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          ">-0.05",
        );

      gsap.set(".timeline-node", { opacity: 0, y: 56 });
      gsap.set(".journey-head, .journey-lede", { opacity: 0, y: 28 });
      gsap.set(".contact-block", { opacity: 0, y: 40 });
      gsap.set(".footer-line", {
        scaleX: 0,
        transformOrigin: "center center",
      });
      if (lineFill) {
        gsap.set(lineFill, { scaleY: 0, transformOrigin: "top center" });
      }

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      const heroStage = heroRef.current;
      const heroInner = heroStage?.querySelector(".hero-stage-inner");
      const heroBg = heroStage?.querySelector(".hero-bg-wrap");
      if (heroInner) {
        scrollTl.fromTo(
          heroInner,
          { y: 0, opacity: 1 },
          { y: -70, opacity: 0.72, ease: "none", duration: 0.35 },
          0,
        );
      }
      if (heroBg) {
        scrollTl.fromTo(
          heroBg,
          { opacity: 1 },
          { opacity: 0.35, ease: "none", duration: 0.35 },
          0,
        );
      }

      scrollTl.to(
        ".journey-head",
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0.08,
      );
      scrollTl.to(
        ".journey-lede",
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.11,
      );

      scrollTl.to(
        ".timeline-node",
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          stagger: 0.07,
          ease: "power2.out",
        },
        0.14,
      );

      if (lineFill) {
        scrollTl.to(
          lineFill,
          { scaleY: 1, ease: "none", duration: 0.38 },
          0.12,
        );
      }

      scrollTl.to(
        ".contact-block",
        { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
        0.62,
      );

      scrollTl.to(
        ".footer-line",
        { scaleX: 1, duration: 0.14, ease: "power2.out" },
        0.78,
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);
}
