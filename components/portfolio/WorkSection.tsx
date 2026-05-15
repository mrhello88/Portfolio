"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import {
  IMPACT_SECTION_RAIL_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_EYEBROW_TO_CONTENT_CLASS,
} from "./data";

const ACCENT = "#e60000";

const WORK_SIDE_TOP = "IT'S";
const WORK_SIDE_VERTICAL = "ME";
const workSideLetterClass =
  "font-sans block text-center text-[clamp(2.2rem,6.4vw,5.2rem)] font-[950] uppercase leading-[0.9] tracking-tight text-white";

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
  { value: "6+", label: "Years in Experience" },
  { value: "16+", label: "Clients Worldwide" },
  { value: "97+", label: "Completed Projects" },
] as const;

export default function WorkSection() {
  return (
    <section
      id="work"
      className="relative w-full min-h-[88vh] border-t border-white/10 bg-black pt-20 pb-0 md:min-h-[102vh] md:pt-28 md:pb-0 lg:pt-36 lg:pb-0"
    >
      <div
        aria-label={`${WORK_SIDE_TOP}. ${WORK_SIDE_VERTICAL}.`}
        className="pointer-events-none absolute inset-y-0 left-2 z-20 hidden h-full min-h-0 w-[clamp(4.5rem,8vw,7rem)] flex-col items-center justify-start gap-2 py-1 md:left-3 md:flex md:gap-3 md:py-2 lg:left-4 lg:gap-4"
      >
        <div aria-hidden className="w-full flex-1 bg-white" />
        <p className="origin-center scale-x-[1.18] scale-y-[1.42] font-sans text-[clamp(1.2rem,2.25vw,2.2rem)] font-[950] uppercase leading-none tracking-[0.08em] text-[#C82B21]">
          {WORK_SIDE_TOP}
        </p>
        <div className="flex min-h-0 w-full flex-none flex-col items-center justify-start gap-1 md:gap-1.5">
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
        className="work-section-preview pointer-events-none absolute right-0 -bottom-4 z-10 w-full max-w-4xl translate-x-2 sm:translate-x-4 md:-bottom-6 md:max-w-5xl md:translate-x-6 lg:bottom-0 lg:max-w-6xl lg:translate-x-8 xl:max-w-7xl 2xl:max-w-[min(92rem,96vw)] 2xl:translate-x-10"
      >
        <Image
          src="/about-us-page.png"
          alt=""
          width={2400}
          height={1800}
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1400px"
          unoptimized
          className="block h-auto w-full rounded-lg object-contain object-bottom-right shadow-[0_28px_100px_rgba(0,0,0,0.5)]"
          priority={false}
        />
      </div>

      <div
        className={IMPACT_SECTION_RAIL_CLASS}
      >
        <div className="work-section-head mx-auto w-full max-w-5xl text-left">
          <p className={SECTION_EYEBROW_CLASS} style={{ color: ACCENT }}>
            {"// Skills"}
          </p>
        </div>

        <div
          className={`work-section-title mx-auto grid w-full max-w-5xl items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20 ${SECTION_EYEBROW_TO_CONTENT_CLASS}`}
        >
          <div className="text-left">
            <ul className="space-y-0">
              {SKILL_GROUPS.map((group) => (
                <li
                  key={group.title}
                  className="border-b border-white/10 py-6 first:pt-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-sans text-base font-semibold text-white md:text-lg">
                      {group.title}
                    </span>
                    <Code2
                      className="mt-0.5 size-4 shrink-0 text-white/35 md:size-5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
                    {group.items}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-start text-left md:pl-2">
            <p className="font-sans text-base leading-relaxed text-white/90 md:text-lg">
              I build fast, accessible interfaces and solid backends focused on
              clarity, performance, and shipping work that holds up in
              production.
            </p>
            <Link
              href="/resume.pdf"
              className="mt-8 inline-flex h-12 w-max items-center justify-center rounded-full bg-[#e60000] px-8 font-sans text-sm font-semibold text-black transition hover:bg-[#ff1a1a] md:h-12 md:px-10 md:text-[0.9375rem]"
            >
              My Resume
            </Link>
          </div>
        </div>

        <div className="work-section-lede mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-10 pt-14 sm:grid-cols-3 sm:gap-8 md:mt-20 md:pt-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center border-b border-white/10 pb-8 text-center last:border-b-0 sm:border-b-0 sm:pb-0"
            >
              <p className="font-sans text-4xl font-bold tabular-nums text-white md:text-5xl lg:text-6xl">
                {s.value}
              </p>
              <p
                className="mt-2 max-w-56 font-sans text-sm font-medium leading-snug md:text-base"
                style={{ color: ACCENT }}
              >
                {s.label}
              </p>
              <div className="mx-auto mt-6 hidden h-px w-full max-w-48 bg-white/10 sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
