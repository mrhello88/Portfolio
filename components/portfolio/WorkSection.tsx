"use client";

import { useId } from "react";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";

const IMPACT_RED = "#C82B21";
const IMPACT_COPY =
  "From complex backend systems to high-converting interfaces, I've delivered 40+ global projects with a 100% client satisfaction rate. I don't just ship code; I ship success.";

function TacticalStar({
  className,
  gradId,
}: {
  className?: string;
  gradId: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="12%"
          y1="0%"
          x2="88%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f0786c" />
          <stop offset="42%" stopColor={IMPACT_RED} />
          <stop offset="100%" stopColor="#4a0f0c" />
        </linearGradient>
      </defs>
      <polygon
        points="50,6 62.5,38.5 98,38.5 70,58.5 81,94 50,74 19,94 30,58.5 2,38.5 37.5,38.5"
        fill={`url(#${gradId})`}
        stroke="#5c1410"
        strokeWidth="0.75"
        className="drop-shadow-[0_0_10px_rgba(200,43,33,0.85)]"
      />
    </svg>
  );
}

export default function WorkSection() {
  const rawId = useId().replace(/:/g, "");
  const starGrad = (i: number) => `impact-star-grad-${rawId}-${i}`;

  return (
    <section
      id="work"
      className="relative w-full border-t border-white/10 bg-black py-20 md:py-28 lg:py-36"
    >
      <div
        className={`impact-section-rail relative mx-auto flex w-full flex-col items-stretch ${LAYOUT_MAX_WIDTH_CLASS} px-6 sm:px-8 md:px-10 lg:px-12`}
      >
        <h2 className="work-section-head text-center font-[family-name:var(--font-anton-family)] text-[clamp(1.15rem,3.8vw,2.85rem)] font-normal uppercase leading-tight tracking-[0.12em] text-white [text-shadow:0_0_24px_rgba(255,255,255,0.18),0_2px_12px_rgba(0,0,0,0.85)] sm:tracking-[0.14em] md:tracking-[0.16em]">
          MASTERING COMPLEXITY. DELIVERING EXCELLENCE.
        </h2>

        <div className="work-section-title relative mx-auto mt-14 flex min-h-[min(52vw,280px)] w-full max-w-5xl items-center justify-center py-6 md:mt-20 md:min-h-[320px] md:py-10 lg:min-h-[360px]">
          <div className="relative z-10 flex w-full items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-14">
            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
              {[0, 1, 2].map((i) => (
                <TacticalStar
                  key={`L-${i}`}
                  gradId={starGrad(i)}
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                />
              ))}
            </div>

            <span
              className="impact-counter select-none font-[family-name:var(--font-anton-family)] font-normal leading-none tracking-tighter text-[#C82B21] drop-shadow-[0_0_28px_rgba(200,43,33,0.75)]"
              style={{
                fontSize: "clamp(4.25rem, 18vw, 12rem)",
                textShadow:
                  "0 2px 0 rgba(0,0,0,0.85), 0 0 1px rgba(255,120,100,0.35), 0 0 48px rgba(200,43,33,0.45)",
              }}
              aria-hidden
            >
              43
            </span>

            <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
              {[3, 4, 5].map((i) => (
                <TacticalStar
                  key={`R-${i}`}
                  gradId={starGrad(i)}
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
                />
              ))}
            </div>
          </div>
        </div>

        <p className="work-section-lede mx-auto mt-12 max-w-4xl text-pretty text-center text-base font-medium leading-relaxed text-white/92 sm:text-lg md:mt-16 md:max-w-5xl md:text-xl [text-shadow:0_1px_18px_rgba(0,0,0,0.9)]">
          {IMPACT_COPY}
        </p>
      </div>
    </section>
  );
}
