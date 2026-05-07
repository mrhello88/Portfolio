"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function usePortfolioAnimations(
  rootRef: RefObject<HTMLDivElement | null>,
  mainRef: RefObject<HTMLElement | null>,
  heroRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const main = mainRef.current;
    if (!root || !main) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero-center-headline", { opacity: 1, y: 0 });
        gsap.set(".hero-bg-orb", { opacity: 1, scale: 1 });
        gsap.set(".hero-portrait-reveal", { opacity: 1, scale: 1, y: 0 });
        gsap.set(".hero-bg-scroll-zoom, .hero-portrait-scroll-zoom", {
          scale: 1,
        });
        gsap.set(
          ".hero-side-labels, .hero-tagline-shift, .hero-bottom-stack, .hero-stage-inner",
          { y: 0 },
        );
        gsap.set(".site-header", { y: 0, opacity: 1 });
        gsap.set(".nav-link", { opacity: 1, y: 0 });
        gsap.set(".brand-logos-head, .brand-marquee-wrap", {
          opacity: 1,
          y: 0,
        });
        gsap.set(
          ".work-section-head, .work-section-title, .work-section-lede, .contact-block",
          { opacity: 1, y: 0 },
        );
        gsap.set(".footer-line", { scaleX: 1 });
        return;
      }

      gsap.set(".hero-center-headline", { opacity: 0, y: 18 });
      gsap.set(".hero-bg-orb", { opacity: 0, scale: 0.6 });
      gsap.set(".hero-portrait-reveal", {
        opacity: 0,
        scale: 0.88,
        y: 36,
        transformOrigin: "bottom right",
      });
      gsap.set(".hero-bg-scroll-zoom, .hero-portrait-scroll-zoom", {
        scale: 1,
      });
      gsap.set(
        ".hero-side-labels, .hero-tagline-shift, .hero-bottom-stack, .hero-stage-inner",
        { y: 0 },
      );
      gsap.set(".site-header", { y: -16, opacity: 0 });
      gsap.set(".nav-link", { opacity: 0, y: -6 });
      gsap.set(".brand-logos-head", { opacity: 0, y: 24 });
      gsap.set(".brand-marquee-wrap", { opacity: 0, y: 22 });

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
        .to(
          ".hero-center-headline",
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.22,
        );

      gsap.set(".work-section-head", { opacity: 0, y: 28 });
      gsap.set(".work-section-title", { opacity: 0, y: 40 });
      gsap.set(".work-section-lede", { opacity: 0, y: 28 });
      gsap.set(".contact-block", { opacity: 0, y: 40 });
      gsap.set(".footer-line", {
        scaleX: 0,
        transformOrigin: "center center",
      });

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
          { opacity: 1 },
          {
            opacity: 0.72,
            ease: "none",
            duration: 0.35,
          },
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

      const heroBgScrollZoom = heroStage?.querySelector(".hero-bg-scroll-zoom");
      const heroPortraitScrollZoom = heroStage?.querySelector(
        ".hero-portrait-scroll-zoom",
      );
      if (heroStage && heroBgScrollZoom && heroPortraitScrollZoom) {
        const heroScrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroStage,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        const heroScrollEase = { ease: "none", duration: 1 } as const;
        heroScrollTl.fromTo(
          heroBgScrollZoom,
          { scale: 1, transformOrigin: "50% 50%" },
          { scale: 1.14, ...heroScrollEase },
        );
        heroScrollTl.fromTo(
          heroPortraitScrollZoom,
          {
            scale: 1,
            transformOrigin: "82% 96%",
          },
          { scale: 1.09, ...heroScrollEase },
          0,
        );
      }

      scrollTl.to(
        ".brand-logos-head",
        { opacity: 1, y: 0, duration: 0.09, ease: "power2.out" },
        0.06,
      );
      scrollTl.to(
        ".brand-marquee-wrap",
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0.08,
      );

      scrollTl.to(
        ".work-section-head",
        { opacity: 1, y: 0, duration: 0.11, ease: "power2.out" },
        0.16,
      );
      scrollTl.to(
        ".work-section-title",
        { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
        0.2,
      );
      scrollTl.to(
        ".work-section-lede",
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0.24,
      );

      scrollTl.to(
        ".contact-block",
        { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
        0.58,
      );

      scrollTl.to(
        ".footer-line",
        { scaleX: 1, duration: 0.14, ease: "power2.out" },
        0.74,
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef, mainRef, heroRef]);
}
