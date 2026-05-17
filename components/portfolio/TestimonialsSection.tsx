"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  IMPACT_SECTION_RAIL_CLASS,
  SECTION_EYEBROW_CLASS,
} from "./data";

const ACCENT = "#e60000";

const TESTIMONIALS = [
  {
    quote:
      "Working with Bruno Simon was one of the best decisions we made for our web platform. He understood our vision, delivered clean & scalable code, and communicated clearly throughout the project.",
    name: "Ronald Richards",
    role: "CEO, BankTech Inc.",
    avatar: "/testimonials-client.png",
  },
  {
    quote:
      "Exceptional attention to detail on both design and engineering. Deadlines were met, performance improved, and our team could ship features faster after launch.",
    name: "Sarah Chen",
    role: "Product Lead, NovaPay",
    avatar: "/testimonials-client.png",
  },
  {
    quote:
      "A rare developer who thinks product-first. Clear documentation, thoughtful architecture, and a polished handoff made ongoing maintenance straightforward.",
    name: "Marcus Webb",
    role: "CTO, Atlas Labs",
    avatar: "/testimonials-client.png",
  },
] as const;

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const active = TESTIMONIALS[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      id="testimonials"
      className="relative w-full border-t border-white/10 bg-black pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-36"
    >
      <div className={IMPACT_SECTION_RAIL_CLASS}>
        <div className="testimonials-section-head mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className={SECTION_EYEBROW_CLASS} style={{ color: ACCENT }}>
            {"// Testimonials"}
          </p>
          <h2 className="max-w-xl font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-right md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            What Clients Say About Me
          </h2>
        </div>

        <div
          className="testimonials-section-rule mx-auto mt-8 flex w-full max-w-5xl items-center gap-3 md:mt-10 md:gap-4"
          aria-hidden
        >
          <span
            className="font-mono text-sm font-medium md:text-base"
            style={{ color: ACCENT }}
          >
            {"< /"}
          </span>
          <span className="h-px flex-1 bg-white/12" />
          <span
            className="font-mono text-sm font-medium md:text-base"
            style={{ color: ACCENT }}
          >
            {"> /"}
          </span>
        </div>

        <div className="testimonials-section-body relative mx-auto mt-10 w-full max-w-5xl md:mt-12">
          <p
            className="pointer-events-none absolute -top-2 left-0 z-0 select-none font-serif text-[clamp(7rem,22vw,14rem)] leading-none text-[#e60000]/12"
            aria-hidden
          >
            &ldquo;
          </p>

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 flex-1 lg:max-w-3xl">
              <blockquote className="font-sans text-lg leading-relaxed text-white/90 md:text-xl md:leading-relaxed lg:text-2xl lg:leading-snug">
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex size-11 items-center justify-center rounded-lg bg-[#e60000] text-black transition hover:bg-[#ff1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-5" strokeWidth={2.5} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex size-11 items-center justify-center rounded-lg bg-[#e60000] text-black transition hover:bg-[#ff1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-5" strokeWidth={2.5} aria-hidden />
                </button>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4 lg:pt-2">
              <div className="relative size-16 overflow-hidden rounded-lg border border-white/10 bg-white/5 md:size-[4.5rem]">
                <Image
                  src={active.avatar}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover object-center"
                />
              </div>
              <div>
                <p className="font-sans text-base font-bold text-white md:text-lg">
                  {active.name}
                </p>
                <p className="mt-0.5 font-sans text-sm text-white/55 md:text-[0.9375rem]">
                  {active.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
