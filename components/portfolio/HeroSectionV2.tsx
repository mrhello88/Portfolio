"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { forwardRef, useLayoutEffect, useRef } from "react";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";

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
  "font-sans block w-full origin-center scale-y-[1.05] select-none text-center font-bold uppercase leading-none tracking-tight antialiased text-(length:--hero-side-letter) [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]";

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
        const m = Math.min(HERO_BG_MOUSE_MAX_PX, rect.width * 0.012);
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
      className="hero-section relative w-full min-h-(--hero-scroll-runway)"
    >
      <div
        ref={heroStageRef}
        className="hero-stage-sticky sticky top-0 z-0 flex w-full min-h-(--hero-stage-min-h) flex-col items-stretch overflow-hidden"
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
          className={`hero-layout-rail relative z-10 mx-auto flex w-full min-h-(--hero-stage-min-h) flex-col items-stretch ${LAYOUT_MAX_WIDTH_CLASS}`}
        >
        <div
          aria-hidden
          className="pointer-events-none absolute top-(--hero-frame-top) right-(--hero-frame-right) z-5 h-(--hero-frame-h) w-(--hero-frame-w) -translate-y-1/2 border-solid border-[#e60000] bg-transparent"
          style={{ borderWidth: "var(--hero-frame-border)" }}
        />

        <div className="hero-center-headline pointer-events-none absolute inset-0 z-14 flex items-end justify-start pt-(--hero-headline-pt) pr-(--hero-headline-pr) pb-(--hero-headline-pb) pl-(--hero-headline-pl)">
          <div className="hero-headline-stack inline-flex max-w-(--hero-headline-max-w) flex-col items-start">
            <p className="hero-intro pointer-events-auto max-w-(--hero-headline-max-w) cursor-text select-text text-left font-sans font-normal leading-snug tracking-normal">
              <span className="block text-white/90 [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]">
                Hi there<span className="text-[#e60000]">!</span> this is
              </span>
              <span className="mt-0.5 block font-semibold capitalize text-[#e60000] sm:mt-1 [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]">
                {HERO_INTRO_LINE_2}
              </span>
            </p>
            <p className="hero-headline-display inline-flex max-w-(--hero-headline-max-w) origin-bottom-left flex-col items-start gap-0 text-left font-sans uppercase font-black leading-none tracking-(--hero-headline-tracking) [text-shadow:0_0.04em_0.12em_rgba(0,0,0,0.22)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]">
              <span className="hero-headline-line text-white">
                {HERO_CENTER_LINE_1}
              </span>
              <span className="hero-headline-line text-white">
                {HERO_CENTER_LINE_2}
              </span>
              <span className="hero-headline-line text-[#e60000]">
                {HERO_CENTER_LINE_3}
              </span>
            </p>

            <div className="hero-services-panel pointer-events-auto w-full max-w-[min(100%,15.5rem)] text-left">
              <div className="h-px w-full bg-white/12" aria-hidden />
              <ul className="space-y-[0.35em] py-[0.85em] font-sans font-medium leading-tight text-white/50 text-(length:--hero-services-text)">
                <li>Website Design</li>
                <li>Product Design</li>
                <li>Branding & Strategy</li>
              </ul>
              <div className="h-px w-full bg-white/12" aria-hidden />
              <Link
                href="/#services"
                className="mt-[0.75em] inline-flex items-center gap-[0.4em] font-sans font-medium text-[#e60000] underline decoration-[#e60000] underline-offset-[0.22em] transition hover:text-[#ff1a1a] hover:decoration-[#ff1a1a] text-(length:--hero-services-text)"
              >
                How can I help?
                <ArrowUpRight
                  className="size-[0.95em] shrink-0 text-[#e60000]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-label={`${HERO_NAME}. ${HERO_VERTICAL_LABEL}`}
          className="hero-side-labels pointer-events-none absolute inset-y-0 left-(--hero-side-inset-x) z-20 flex h-full min-h-0 flex-row items-stretch gap-(--hero-side-gap) pt-[max(env(safe-area-inset-top),var(--hero-side-pad-top))] pb-[max(env(safe-area-inset-bottom),var(--hero-side-pad-bottom))]"
        >
          <div className="hero-side-col hero-side-col--name flex min-h-0 min-w-(--hero-side-col-w) flex-col items-stretch justify-between">
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
            className="w-(--hero-side-divider-w) shrink-0 self-stretch rounded-full"
            style={{ backgroundColor: HERO_LABEL_COLOR_DEVELOPER }}
          />
          <div className="hero-side-col hero-side-col--role flex min-h-0 min-w-[calc(var(--hero-side-col-w)*1.15)] flex-col items-stretch justify-between">
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

        <div className="hero-stage-inner pointer-events-auto relative z-10 flex w-full flex-1 flex-col justify-end overflow-hidden pr-0 pt-(--hero-stage-pt) pl-(--hero-stage-pl) pb-[max(0px,env(safe-area-inset-bottom))]">
          <div className="hero-portrait-row flex w-full justify-end overflow-hidden">
            <div className="hero-portrait relative aspect-4/5 w-(--hero-portrait-w) overflow-hidden">
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

        <div className="hero-bottom-stack pointer-events-none absolute bottom-(--hero-bottom-inset) left-0 right-0 z-25 flex flex-col items-center gap-(--hero-bottom-gap) px-[clamp(1rem,3vw,1.5rem)]">
          <nav
            aria-label="Social profiles"
            className="pointer-events-auto flex items-center justify-center gap-(--hero-social-gap)"
          >
            <ul className="flex items-center gap-(--hero-social-gap)">
              <li>
                <a
                  href={heroSocialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                >
                  <Linkedin
                    className="size-(--hero-social-size)"
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
                  <FiverrIcon className="size-(--hero-social-size)" />
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
                    className="size-(--hero-social-size)"
                    strokeWidth={1.85}
                    aria-hidden
                  />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hero-tagline-shift pointer-events-none absolute bottom-(--hero-tagline-bottom) right-(--hero-tagline-right) z-30 flex w-max max-w-[calc(100%-2rem)] shrink-0 flex-col gap-y-(--hero-tagline-gap)">
          <p className="hero-tagline font-anton flex flex-col gap-y-(--hero-tagline-gap) text-center font-semibold leading-[1.08] text-[#e60000] text-(length:--hero-tagline-size) tracking-(--hero-tagline-tracking) [text-shadow:0.01em_0_0_currentColor,-0.01em_0_0_currentColor] drop-shadow-[0_2px_8px_rgba(0,0,0,0.38)]">
            <span className="block w-full text-center">Turning</span>
            <span className="block w-full text-center">Coffee</span>
            <span className="block w-full text-center text-[0.62em] tracking-[0.14em]">
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
