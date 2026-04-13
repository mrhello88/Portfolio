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
  "block w-full select-none text-center text-2xl font-black uppercase leading-none [text-shadow:0.02em_0_0_currentColor,-0.02em_0_0_currentColor,0_0.02em_0_currentColor,0_-0.02em_0_currentColor] md:text-3xl lg:text-4xl xl:text-5xl";

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
        <div className="hero-portrait relative aspect-4/5 w-[min(100vw,45rem)] max-w-210 translate-y-6 self-end sm:w-[min(100vw,50rem)] md:translate-y-10 md:w-[min(100vw,52.5rem)]">
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
    </section>
  );
});

export default HeroSectionV2;
