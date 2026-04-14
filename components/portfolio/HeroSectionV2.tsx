import Image from "next/image";
import { forwardRef } from "react";

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
  "font-sans block w-full select-none text-center text-2xl font-semibold uppercase leading-none md:text-3xl lg:text-4xl xl:text-5xl";

/**
 * Minimal hero: only `portfolio-background.jpg` + dark overlay + `herosection-image.webp`.
 * No copy, blob, or CTAs. Keeps layout hooks class names used by `usePortfolioAnimations`.
 */
const HeroSectionV2 = forwardRef<HTMLElement>(function HeroSectionV2(_, ref) {
  return (
    <section
      ref={ref}
      className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="hero-bg-wrap pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="hero-bg-orb absolute inset-0">
          <Image
            src="/portfolio-background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/25 dark:bg-black/45" />
      </div>

      <div
        aria-label={`${HERO_VERTICAL_LABEL}. ${HERO_NAME}`}
        className="pointer-events-none absolute inset-y-0 left-2 z-20 flex h-full min-h-0 flex-row items-stretch gap-2 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(4.5rem,env(safe-area-inset-bottom))] md:left-6 md:gap-3 md:pt-[max(5.5rem,env(safe-area-inset-top))] md:pb-[max(5.5rem,env(safe-area-inset-bottom))]"
        data-scroll
        data-scroll-speed="0.35"
      >
        <div className="flex min-h-0 min-w-13 flex-col items-stretch justify-between px-1.5 md:min-w-17 md:px-2.5 lg:min-w-19 lg:px-3">
          {HERO_VERTICAL_LABEL.split("").map((ch, i) => (
            <span
              key={`hero-v-${i}`}
              className={`${heroVerticalLetterClass} ${
                i >= HERO_DEVELOPER_START_INDEX
                  ? "text-[#e60000]"
                  : "text-black"
              }`}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="w-1 shrink-0 self-stretch rounded-full"
          style={{ backgroundColor: HERO_LABEL_COLOR_DEVELOPER }}
        />
        <div className="flex min-h-0 min-w-11 flex-col items-stretch justify-between px-1 md:min-w-13 md:px-1.5 lg:min-w-15 lg:px-2">
          {HERO_NAME.split("").map((ch, i) => (
            <span
              key={`hero-name-${i}`}
              className={`${heroVerticalLetterClass} ${
                i < HERO_NAME_RED_END_INDEX
                  ? "text-[#e60000]"
                  : "text-black"
              }`}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-stage-inner relative z-10 flex w-full flex-1 flex-col justify-end pr-0 pt-16 pl-6 pb-[max(0px,env(safe-area-inset-bottom))] md:pl-10 md:pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        <div className="self-end translate-y-12 md:translate-y-20 lg:translate-y-24">
          <div className="hero-portrait relative aspect-4/5 w-[min(100vw,45rem)] max-w-210 sm:w-[min(100vw,50rem)] md:w-[min(100vw,52.5rem)]">
            <div className="hero-portrait-reveal absolute inset-0 opacity-0">
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

      <p
        className="hero-tagline font-anton pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] right-10 z-30 flex w-max max-w-[calc(100vw-1.25rem)] shrink-0 pr-[max(0.25rem,env(safe-area-inset-right))] -translate-y-2 flex-col gap-y-1 text-center text-2xl font-semibold leading-[1.08] tracking-[0.14em] text-[#e60000] [text-shadow:0.01em_0_0_currentColor,-0.01em_0_0_currentColor] drop-shadow-[0_2px_8px_rgba(0,0,0,0.38)] md:bottom-[max(3.5rem,env(safe-area-inset-bottom))] md:right-12 md:-translate-y-3 md:gap-y-1.5 md:pr-[max(0.5rem,env(safe-area-inset-right))] md:text-3xl md:tracking-[0.18em] lg:bottom-[max(4.5rem,env(safe-area-inset-bottom))] lg:right-16 lg:-translate-y-4 lg:pr-[max(0.75rem,env(safe-area-inset-right))] lg:text-4xl lg:tracking-[0.2em] xl:text-5xl 2xl:text-6xl"
      >
        <span className="block w-full text-center">Turning</span>
        <span className="block w-full text-center">Coffee</span>
        <span className="block w-full text-center text-[0.62em] tracking-widest md:text-[0.65em] md:tracking-[0.12em] lg:text-[0.68em] lg:tracking-[0.14em]">
          Into
        </span>
        <span className="block w-full text-center">Code</span>
      </p>
    </section>
  );
});

export default HeroSectionV2;
