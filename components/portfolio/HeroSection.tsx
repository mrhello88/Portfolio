import Image from "next/image";
import { forwardRef, useId } from "react";
import {
  HERO_PORTRAIT_SRC,
  heroWordsAccent,
  heroWordsPrimary,
} from "./data";

/** Overall blob+portrait block width (~+42% vs 680px base). */
const HERO_BLOB_FRAME_MIN_PX = Math.round(680 * 1.42);

/** Same path geometry as `public/blob.svg` (viewBox 0 0 200 200). */
const BLOB_PATH_D =
  "M64.5,-0.2C64.5,30.6,32.3,61.2,1,61.2C-30.3,61.2,-60.6,30.6,-60.6,-0.2C-60.6,-30.9,-30.3,-61.8,1,-61.8C32.3,-61.8,64.5,-30.9,64.5,-0.2Z";
/** <1 shrinks blob + clip only; image x/y/w/h unchanged. */
const BLOB_SCALE = 0.76;
const BLOB_PATH_TRANSFORM = `translate(100,100) scale(${BLOB_SCALE})`;

/** Inset inside 200×200 viewBox — larger inset = smaller photo inside blob, more red rim. */
const IMG_VIEW_INSET = 48;
const IMG_VIEW_SIZE = 200 - IMG_VIEW_INSET * 2;
/** Nudge photo inside the blob (200×200 user space). +x = right, +y = down. */
const IMG_SHIFT_X = 5;
const IMG_SHIFT_Y = 10;
/** Right nudge in SVG user units (viewBox 200). ~1.5 ≈ 5px when blob ~680px wide (was 0.9 + ~2px). */
const IMG_NUDGE_RIGHT_USER = 1.5;

/** Solid red, 100% opaque. */
const BLOB_GLASS_RED_FILL = "#ff0000";

function HeroBlobClippedPortrait() {
  const rawId = useId().replace(/:/g, "");
  const clipId = `hero-blob-clip-${rawId}`;
  const glassFilterId = `blob-glass-filter-${rawId}`;

  return (
    <div
      className="hero-image-wrap relative z-10 mx-auto aspect-square max-w-5xl"
      style={{ width: `min(${HERO_BLOB_FRAME_MIN_PX}px, 98vw)` }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Portrait"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={BLOB_PATH_D} transform={BLOB_PATH_TRANSFORM} />
          </clipPath>
          <filter
            id={glassFilterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
          >
            <feDropShadow
              dx={0}
              dy={1.5}
              stdDeviation={2.2}
              floodColor="#000000"
              floodOpacity={0.2}
              result="drop"
            />
            <feMerge>
              <feMergeNode in="drop" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${glassFilterId})`}>
          <path
            d={BLOB_PATH_D}
            transform={BLOB_PATH_TRANSFORM}
            fill={BLOB_GLASS_RED_FILL}
            opacity={1}
            aria-hidden
          />
        </g>
        <image
          href={HERO_PORTRAIT_SRC}
          x={IMG_VIEW_INSET + IMG_SHIFT_X + IMG_NUDGE_RIGHT_USER}
          y={IMG_VIEW_INSET + IMG_SHIFT_Y}
          width={IMG_VIEW_SIZE}
          height={IMG_VIEW_SIZE}
          preserveAspectRatio="xMidYMid meet"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </div>
  );
}

const HeroSection = forwardRef<HTMLElement>(function HeroSection(_, ref) {
  return (
    <section
      ref={ref}
      className="hero-section relative flex min-h-screen flex-col justify-center overflow-hidden pb-20 pt-10 md:pb-28 md:pt-16"
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

      <div className="hero-stage-inner relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="hero-line mb-6 h-px w-14 bg-(--accent) md:w-20" aria-hidden />
        <p className="hero-eyebrow mb-4 font-mono text-sm font-medium tracking-wide text-(--accent)">
          GSAP timeline · portfolio
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
          <span className="flex flex-wrap justify-center gap-x-3 gap-y-1 md:gap-x-4">
            {heroWordsPrimary.map((w) => (
              <span key={w} className="inline-block overflow-hidden pb-0.5">
                <span className="hero-word inline-block">{w}</span>
              </span>
            ))}
          </span>
          <span className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-(--muted) md:mt-3 md:gap-x-4">
            {heroWordsAccent.map((w) => (
              <span key={w} className="inline-block overflow-hidden pb-0.5">
                <span className="hero-word-muted inline-block font-normal">
                  {w}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="relative my-10 flex w-full justify-center md:my-12">
          <HeroBlobClippedPortrait />
        </div>

        <p className="hero-sub max-w-2xl text-lg leading-relaxed text-(--muted) md:text-xl md:leading-relaxed">
          One intro timeline on load — then the full page is a single scrubbed{" "}
          <code className="rounded bg-(--surface) px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
            gsap.timeline
          </code>{" "}
          tied to scroll: journey, line, and contact all sequenced together.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#journey"
            className="hero-cta inline-flex h-11 items-center justify-center rounded-lg bg-(--accent) px-6 text-sm font-medium text-white transition-colors hover:bg-(--accent-hover) dark:text-stone-950"
          >
            Scroll the story
          </a>
          <a
            href="#contact"
            className="hero-cta inline-flex h-11 items-center justify-center rounded-lg border border-(--border) bg-(--surface) px-6 text-sm font-medium text-foreground transition-colors hover:border-(--muted)"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-(--muted)">
          Scroll
        </span>
        <span
          className="hero-scroll-chevron flex h-10 w-5 items-start justify-center rounded-full border border-(--border) pt-2"
          aria-hidden
        >
          <span className="block size-1 rounded-full bg-(--accent)" />
        </span>
      </div>
    </section>
  );
});

export default HeroSection;
