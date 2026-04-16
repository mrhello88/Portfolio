"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { forwardRef, useLayoutEffect, useRef } from "react";
import {
  LAYOUT_HERO_MIN_HEIGHT_CLASS,
  LAYOUT_MAX_WIDTH_CLASS,
} from "./data";

type ParallaxFrameFn = () => void;

/** Hero bg mouse parallax: max translate (px) each axis; lerp factor per frame. */
const HERO_BG_MOUSE_MAX_PX = 12;
const HERO_BG_MOUSE_LERP = 0.085;

/** Fiverr has no Lucide icon; monochrome mark, uses `currentColor` for red. */
function FiverrIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.004 15.588a.995.995 0 1 0-.996-1.732v-6.01h-4v6.01zm-4-12.587v6.01h4V3.001h-4zm-12 6.01H7V9.01h4v4.01H7v2.01h8v-4.01h-4v-2.01h4V9.01H7V3.001H3v12.017h4v-6.01zm16 6.017h-4v2.01h4v-2.01zm0 4.01h-4v2.01h4v-2.01zM3 21.019h8v-4.01H3v4.01z" />
    </svg>
  );
}

const heroSocialLinks = {
  linkedin:
    process.env.NEXT_PUBLIC_HERO_LINKEDIN_URL?.trim() ||
    "https://www.linkedin.com/",
  fiverr:
    process.env.NEXT_PUBLIC_HERO_FIVERR_URL?.trim() ||
    "https://www.fiverr.com/",
  github:
    process.env.NEXT_PUBLIC_HERO_GITHUB_URL?.trim() || "https://github.com/",
} as const;

const iconLinkClass =
  "text-[#e60000] transition-opacity hover:opacity-85 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const HERO_LABEL_FULL = "FULL";
const HERO_LABEL_STACK = "STACK";
const HERO_LABEL_DEVELOPER = "DEVELOPER";
const HERO_VERTICAL_LABEL = `${HERO_LABEL_FULL}${HERO_LABEL_STACK}${HERO_LABEL_DEVELOPER}`;
const HERO_DEVELOPER_START_INDEX =
  HERO_LABEL_FULL.length + HERO_LABEL_STACK.length;
const HERO_LABEL_COLOR_DEVELOPER = "#e60000";
const HERO_NAME_ABUBAKR = "ABUBAKR";
const HERO_NAME_SIDDIQI = "SIDDIQI";
const HERO_NAME = `${HERO_NAME_ABUBAKR}${HERO_NAME_SIDDIQI}`;
const HERO_NAME_RED_END_INDEX = HERO_NAME_ABUBAKR.length;

const heroVerticalLetterClass =
  "font-sans block w-full origin-center scale-y-[1.05] select-none text-center text-2xl font-bold uppercase leading-none tracking-tight antialiased sm:scale-y-[1.06] md:scale-y-[1.07] md:text-3xl lg:scale-y-[1.08] lg:text-4xl xl:text-5xl [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]";

/** Extra scroll distance while hero stays in view (sticky inner); delays next section. */
const HERO_SCROLL_RUNWAY = "min-h-[220vh]";

const HERO_INTRO_LINE_2 = "abubakr siddiqi";

const HERO_CENTER_LINE_1 = "DEFINING";
/** Hair space (U+200A) between NEW and DIGITAL — tighter than thin space. */
const HERO_CENTER_LINE_2 = "NEW\u200ADIGITAL";
const HERO_CENTER_LINE_3 = "STANDARDS";

const HeroSectionV2 = forwardRef<HTMLElement>(function HeroSectionV2(_, ref) {
  const heroStageRef = useRef<HTMLDivElement>(null);
  const heroBgParallaxRef = useRef<HTMLDivElement>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const parallaxRafActiveRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const runParallaxFrameRef = useRef<ParallaxFrameFn>(() => {});

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    runParallaxFrameRef.current = () => {
      const pos = mousePosRef.current;
      const tgt = mouseTargetRef.current;
      const k = HERO_BG_MOUSE_LERP;
      pos.x += (tgt.x - pos.x) * k;
      pos.y += (tgt.y - pos.y) * k;
      const el = heroBgParallaxRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      }
      const err = Math.abs(tgt.x - pos.x) + Math.abs(tgt.y - pos.y);
      if (err > 0.025) {
        requestAnimationFrame(() => runParallaxFrameRef.current());
      } else {
        parallaxRafActiveRef.current = false;
      }
    };

    const stage = heroStageRef.current;
    if (!stage || reduceMotionRef.current) return;

    const kickParallax = () => {
      if (!parallaxRafActiveRef.current) {
        parallaxRafActiveRef.current = true;
        requestAnimationFrame(() => runParallaxFrameRef.current());
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (reduceMotionRef.current) return;
      const rect = stage.getBoundingClientRect();
      const { clientX: cx, clientY: cy } = e;
      if (
        cx < rect.left ||
        cx > rect.right ||
        cy < rect.top ||
        cy > rect.bottom
      ) {
        mouseTargetRef.current = { x: 0, y: 0 };
      } else {
        const w = Math.max(rect.width, 1);
        const h = Math.max(rect.height, 1);
        const nx = (cx - rect.left) / w - 0.5;
        const ny = (cy - rect.top) / h - 0.5;
        const m = HERO_BG_MOUSE_MAX_PX;
        mouseTargetRef.current = { x: nx * 2 * m, y: ny * 2 * m };
      }
      kickParallax();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <section
      ref={ref}
      className={`hero-section relative w-full ${HERO_SCROLL_RUNWAY}`}
    >
      <div
        ref={heroStageRef}
        className={`hero-stage-sticky sticky top-0 z-0 flex w-full flex-col items-stretch overflow-hidden ${LAYOUT_HERO_MIN_HEIGHT_CLASS}`}
      >
        <div
          className="hero-bg-wrap pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div className="hero-bg-orb absolute inset-0 overflow-hidden">
            <div className="hero-bg-scroll-zoom absolute inset-0 will-change-transform">
              <div
                ref={heroBgParallaxRef}
                className="hero-bg-mouse-shift absolute -inset-[5%] will-change-transform"
                style={{ transform: "translate3d(0px,0px,0px)" }}
              >
                <Image
                  src="/portfolio-background.jpg"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/25 dark:bg-black/45" />
        </div>

        <div
          className={`hero-layout-rail relative z-10 mx-auto flex w-full flex-col items-stretch ${LAYOUT_HERO_MIN_HEIGHT_CLASS} ${LAYOUT_MAX_WIDTH_CLASS}`}
        >
        <div
          aria-hidden
          className="pointer-events-none absolute top-[35%] right-[max(3rem,env(safe-area-inset-right))] z-5 h-[min(60vh,30rem)] w-11 -translate-y-1/2 border-4 border-[#e60000] bg-transparent md:top-[32%] md:right-[max(4rem,env(safe-area-inset-right))] md:h-[min(64vh,34rem)] md:w-14 lg:top-[30%] lg:right-[max(5rem,env(safe-area-inset-right))] lg:h-[min(68vh,38rem)]"
        />

        <div className="hero-center-headline pointer-events-none absolute inset-0 z-14 flex items-end justify-start pb-[max(9rem,calc(env(safe-area-inset-bottom)+12rem))] pl-[max(0.5rem,calc(env(safe-area-inset-left)+10.85rem))] pr-4 pt-24 sm:pb-[max(9.5rem,calc(env(safe-area-inset-bottom)+13rem))] sm:pl-[max(0.5rem,calc(env(safe-area-inset-left)+11.65rem))] md:pb-[max(10rem,calc(env(safe-area-inset-bottom)+14rem))] md:pl-[max(1rem,calc(env(safe-area-inset-left)+13.15rem))] md:pr-8 lg:pb-[max(10.5rem,calc(env(safe-area-inset-bottom)+15rem))] lg:pl-[max(1.25rem,calc(env(safe-area-inset-left)+14.5rem))]">
          <div className="inline-flex flex-col items-start">
            <p className="pointer-events-auto max-w-[min(100%,46rem)] cursor-text -translate-y-22 -translate-x-0.5 select-text text-left font-sans text-base font-normal leading-snug tracking-normal sm:-translate-y-27 sm:translate-x-0 sm:text-lg md:-translate-y-36 md:translate-x-1 md:text-xl lg:-translate-y-45 lg:translate-x-2 lg:text-2xl">
              <span className="block text-white/90 [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]">
                Hi there<span className="text-[#e60000]">!</span> this is
              </span>
              <span className="mt-0.5 block font-semibold capitalize text-[#e60000] [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)] sm:mt-1">
                {HERO_INTRO_LINE_2}
              </span>
            </p>
            <p className="inline-flex max-w-[min(100%,46rem)] origin-bottom-left scale-x-[1.095] scale-y-[1.28] flex-col items-start gap-0 text-left font-sans uppercase text-[clamp(2.5rem,11.5vw,8.25rem)] font-black leading-none tracking-[0.06em] [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)] sm:max-w-5xl sm:scale-x-[1.12] sm:scale-y-[1.36] sm:tracking-[0.09em] md:max-w-6xl md:scale-x-[1.15] md:scale-y-[1.44] md:tracking-[0.11em] lg:max-w-7xl lg:scale-x-[1.18] lg:scale-y-[1.52] lg:tracking-[0.13em] xl:max-w-[min(100%,88rem)] [&>span+span]:-mt-[0.18em] sm:[&>span+span]:-mt-[0.22em] md:[&>span+span]:-mt-[0.26em] lg:[&>span+span]:-mt-[0.12em]">
              <span className="block leading-[0.92] text-white">
                {HERO_CENTER_LINE_1}
              </span>
              <span className="block leading-[0.92] text-white">
                {HERO_CENTER_LINE_2}
              </span>
              <span className="block leading-[0.92] text-[#e60000]">
                {HERO_CENTER_LINE_3}
              </span>
            </p>
          </div>
        </div>

        <div
          aria-label={`${HERO_NAME}. ${HERO_VERTICAL_LABEL}`}
          className="hero-side-labels pointer-events-none absolute inset-y-0 left-2 z-20 flex h-full min-h-0 flex-row items-stretch gap-2 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(4.5rem,env(safe-area-inset-bottom))] md:left-6 md:gap-3 md:pt-[max(5.5rem,env(safe-area-inset-top))] md:pb-[max(5.5rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex min-h-0 min-w-11 flex-col items-stretch justify-between px-1 md:min-w-13 md:px-1.5 lg:min-w-15 lg:px-2">
            {HERO_NAME.split("").map((ch, i) => (
              <span
                key={`hero-name-${i}`}
                className={`${heroVerticalLetterClass} ${
                  i < HERO_NAME_RED_END_INDEX ? "text-[#e60000]" : "text-white"
                }`}
              >
                {ch}
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="w-1 shrink-0 self-stretch rounded-full"
            style={{ backgroundColor: HERO_LABEL_COLOR_DEVELOPER }}
          />
          <div className="flex min-h-0 min-w-13 flex-col items-stretch justify-between px-1.5 md:min-w-17 md:px-2.5 lg:min-w-19 lg:px-3">
            {HERO_VERTICAL_LABEL.split("").map((ch, i) => (
              <span
                key={`hero-v-${i}`}
                className={`${heroVerticalLetterClass} ${
                  i >= HERO_DEVELOPER_START_INDEX
                    ? "text-[#e60000]"
                    : "text-white"
                }`}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-stage-inner pointer-events-auto relative z-10 flex w-full flex-1 flex-col justify-end pr-0 pt-16 pl-6 pb-[max(0px,env(safe-area-inset-bottom))] md:pl-10 md:pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          <div className="flex w-full translate-y-12 justify-end md:translate-y-20 lg:translate-y-24">
            <div className="hero-portrait relative aspect-4/5 w-[min(100%,45rem)] max-w-210 sm:w-[min(100%,50rem)] md:w-[min(100%,52.5rem)]">
              <div className="hero-portrait-reveal absolute inset-0 opacity-0">
                <div className="hero-portrait-scroll-zoom absolute inset-0 will-change-transform">
                  <Image
                    src="/herosection-image.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 840px"
                    className="object-contain object-bottom-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-stack pointer-events-none absolute bottom-[max(2.25rem,env(safe-area-inset-bottom))] left-0 right-0 z-25 flex flex-col items-center gap-5 px-4 md:gap-6">
          <div className="hero-services-panel pointer-events-auto w-full max-w-62 -translate-x-3 text-left md:-translate-x-6 lg:-translate-x-228">
            <div className="h-px w-full bg-white/12" aria-hidden />
            <ul className="space-y-0.5 py-2.5 font-sans text-[0.9375rem] font-medium leading-tight text-white/50 md:space-y-1 md:py-3 md:text-[0.97rem]">
              <li>Website Design</li>
              <li>Product Design</li>
              <li>Branding & Strategy</li>
            </ul>
            <div className="h-px w-full bg-white/12" aria-hidden />
            <Link
              href="/#contact"
              className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[#e60000] underline decoration-[#e60000] underline-offset-[0.22em] transition hover:text-[#ff1a1a] hover:decoration-[#ff1a1a] md:mt-4 md:text-[0.9375rem]"
            >
              How can I help?
              <ArrowUpRight
                className="size-3.5 shrink-0 text-[#e60000] md:size-4"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>

          <nav
            aria-label="Social profiles"
            className="pointer-events-auto flex items-center justify-center gap-6 md:gap-8"
          >
            <ul className="flex items-center gap-6 md:gap-8">
              <li>
                <a
                  href={heroSocialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <Linkedin
                    className="size-7 md:size-8"
                    strokeWidth={1.85}
                    aria-hidden
                  />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={heroSocialLinks.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <FiverrIcon className="size-7 md:size-8" />
                  <span className="sr-only">Fiverr</span>
                </a>
              </li>
              <li>
                <a
                  href={heroSocialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <Github
                    className="size-7 md:size-8"
                    strokeWidth={1.85}
                    aria-hidden
                  />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hero-tagline-shift pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] right-10 z-30 flex w-max max-w-[calc(100%-1.25rem)] shrink-0 flex-col gap-y-1 pr-[max(0.25rem,env(safe-area-inset-right))] md:bottom-[max(3.5rem,env(safe-area-inset-bottom))] md:right-12 md:gap-y-1.5 md:pr-[max(0.5rem,env(safe-area-inset-right))] lg:bottom-[max(4.5rem,env(safe-area-inset-bottom))] lg:right-16 lg:pr-[max(0.75rem,env(safe-area-inset-right))]">
          <p className="hero-tagline font-anton flex flex-col gap-y-1 text-center text-2xl font-semibold leading-[1.08] tracking-[0.14em] text-[#e60000] [text-shadow:0.01em_0_0_currentColor,-0.01em_0_0_currentColor] drop-shadow-[0_2px_8px_rgba(0,0,0,0.38)] md:text-3xl md:tracking-[0.18em] lg:text-4xl lg:tracking-[0.2em] xl:text-5xl 2xl:text-6xl">
            <span className="block w-full text-center">Turning</span>
            <span className="block w-full text-center">Coffee</span>
            <span className="block w-full text-center text-[0.62em] tracking-widest md:text-[0.65em] md:tracking-[0.12em] lg:text-[0.68em] lg:tracking-[0.14em]">
              Into
            </span>
            <span className="block w-full text-center">Code</span>
          </p>
        </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSectionV2;
