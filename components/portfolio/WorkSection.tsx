"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import {
  DESIGN_VIEWPORT_MAX_HEIGHT_PX,
  DESIGN_VIEWPORT_MAX_WIDTH_PX,
  LAYOUT_MAX_WIDTH_CLASS,
} from "./data";

const ACCENT = "#e60000";

const DESIGN_H = DESIGN_VIEWPORT_MAX_HEIGHT_PX;
const DESIGN_W = DESIGN_VIEWPORT_MAX_WIDTH_PX;

/**
 * Structural tokens; layout fixed, typography scales via --work-ui-scale in globals.css.
 */
const WORK_SECTION_VARS = [
  `[--work-design-h:${DESIGN_H}px]`,
  `[--work-design-w:${DESIGN_W}px]`,
  `[--work-min-h:min(92dvh,calc(${DESIGN_H}px*0.92))]`,
].join(" ");

const WORK_SECTION_RAIL_CLASS = `work-section-rail impact-section-rail relative z-20 mx-auto flex w-full flex-col items-center ${LAYOUT_MAX_WIDTH_CLASS}`;

const WORK_BLOCK_CLASS = "work-section-block mx-auto w-full max-w-5xl";

const WORK_SIDE_TOP = "IT'S";
const WORK_SIDE_VERTICAL = "ME";
const workSideLetterClass =
  "work-side-letter font-sans block text-center font-[950] uppercase leading-[0.9] tracking-tight text-white";

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items:
      "HTML · CSS · JavaScript · React · Next.js · TypeScript · Tailwind CSS",
  },
  {
    title: "Server-side development",
    items: "Node.js · REST APIs · Auth · Databases · Performance · Deployment",
  },
  {
    title: "Tools",
    items:
      "Git · Docker · VS Code · Figma · Postman · CI/CD · Linux · npm / pnpm",
  },
] as const;

const STATS = [
  { value: "1+", label: "Years in Experience" },
  { value: "16+", label: "Clients Worldwide" },
  { value: "97+", label: "Completed Projects" },
] as const;

export default function WorkSection() {
  return (
    <section
      id="work"
      className={`work-section relative w-full overflow-x-clip border-t border-white/10 bg-black ${WORK_SECTION_VARS}`}
    >
      <div
        aria-label={`${WORK_SIDE_TOP}. ${WORK_SIDE_VERTICAL}.`}
        className="work-side-rail pointer-events-none absolute inset-y-0 z-20 hidden h-full min-h-0 flex-col items-center justify-start md:flex"
      >
        <div aria-hidden className="w-full flex-1 bg-white" />
        <p className="work-side-it origin-center scale-x-[1.38] scale-y-[1.42] font-sans font-[950] uppercase leading-none tracking-[0.08em] text-[#C82B21]">
          {WORK_SIDE_TOP}
        </p>
        <div className="work-side-letters flex min-h-0 w-full flex-none flex-col items-center justify-start">
          {WORK_SIDE_VERTICAL.split("").map((ch, i) => (
            <span
              key={`work-side-${i}`}
              className={`${workSideLetterClass} rotate-90 scale-y-[1.8] ${ch === "E" ? "scale-x-[1.45]" : ""} ${ch === "M" ? "font-[1000] scale-x-[1.2]" : ""}`}
            >
              {ch}
            </span>
          ))}
        </div>
        <div aria-hidden className="w-full flex-[0_0_28%] bg-[#C82B21]" />
      </div>

      <div
        aria-hidden
        className="work-section-preview pointer-events-none absolute right-0 bottom-0 z-10 origin-bottom-right"
      >
        <Image
          src="/about-us-page.png"
          alt=""
          width={2400}
          height={1800}
          sizes="928px"
          unoptimized
          className="block h-full w-full rounded-lg object-contain object-bottom-right shadow-[0_28px_100px_rgba(0,0,0,0.5)]"
          priority={false}
        />
      </div>

      <div aria-hidden className="work-section-spacer" />

      <div className={WORK_SECTION_RAIL_CLASS}>
        <div className={`work-section-head ${WORK_BLOCK_CLASS} text-left`}>
          <p
            className="mb-0 font-mono font-medium tracking-[0.12em] text-(length:--work-eyebrow-size)"
            style={{ color: ACCENT }}
          >
            {"// Skills"}
          </p>
        </div>

        <div
          className={`work-section-title ${WORK_BLOCK_CLASS} mt-(--work-eyebrow-gap) grid w-full grid-cols-1 items-start gap-(--work-title-gap) text-left min-[1366px]:grid-cols-2`}
        >
          <div className="text-left">
            <ul className="space-y-0">
              {SKILL_GROUPS.map((group) => (
                <li
                  key={group.title}
                  className="border-b border-white/10 py-(--work-skill-py) first:pt-0"
                >
                  <div className="flex items-start justify-between gap-(--work-inline-gap)">
                    <span className="font-sans font-semibold text-(length:--work-skill-title) text-white">
                      {group.title}
                    </span>
                    <Code2
                      className="mt-0.5 size-(--work-skill-icon) shrink-0 text-white/35"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-(--work-skill-desc-mt) font-sans leading-relaxed text-(length:--work-skill-body) text-white/55">
                    {group.items}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="work-section-bio flex flex-col justify-start text-left">
            <p className="font-sans leading-relaxed text-(length:--work-bio-size) text-white/90">
              I build fast, accessible interfaces and solid backends focused on
              clarity, performance, and shipping work that holds up in
              production.
            </p>
            <Link
              href="/resume.pdf"
              className="mt-(--work-btn-mt) inline-flex h-(--work-btn-h) w-max items-center justify-center rounded-full bg-[#e60000] px-(--work-btn-px) font-sans font-semibold text-(length:--work-btn-text) text-black transition hover:bg-[#ff1a1a]"
            >
              My Resume
            </Link>
          </div>
        </div>

        <div className={`work-section-lede ${WORK_BLOCK_CLASS} mt-(--work-stats-mt) grid w-full grid-cols-1 gap-(--work-stats-gap) pt-(--work-stats-pt) min-[36rem]:grid-cols-3`}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center border-b border-white/10 pb-(--work-stat-pb) text-center last:border-b-0 min-[36rem]:border-b-0 min-[36rem]:pb-0"
            >
              <p className="font-sans font-bold tabular-nums text-(length:--work-stat-value) text-white">
                {s.value}
              </p>
              <p
                className="mt-(--work-stat-label-mt) max-w-56 font-sans font-medium leading-snug text-(length:--work-stat-label)"
                style={{ color: ACCENT }}
              >
                {s.label}
              </p>
              <div className="mx-auto mt-(--work-stat-rule-mt) hidden h-px w-full max-w-48 bg-white/10 min-[36rem]:block" />
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="work-section-spacer" />
    </section>
  );
}
