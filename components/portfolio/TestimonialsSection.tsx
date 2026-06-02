"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { IMPACT_SECTION_RAIL_CLASS, SECTION_EYEBROW_CLASS } from "./data";
import TestimonialDetailModal from "./TestimonialDetailModal";
import { TESTIMONIALS } from "./testimonialsData";

const ACCENT = "#e60000";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
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

          <article
            key={index}
            className="testimonials-carousel-card relative z-10 flex w-full min-h-[34rem] flex-col gap-6 rounded-xl border border-white/10 bg-white/3 p-5 sm:min-h-[36rem] sm:p-6 sm:gap-8 md:min-h-[38rem]"
          >
            <div className="flex shrink-0 items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 md:size-18">
                <Image
                  src={active.avatar}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover object-center"
                />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-1 font-sans text-base font-bold text-white md:text-lg">
                  {active.name}
                </p>
                <p className="mt-0.5 line-clamp-2 font-sans text-sm text-white/55 md:text-[0.9375rem]">
                  {active.role}
                </p>
                <p
                  className="mt-1 line-clamp-2 font-mono text-xs font-medium"
                  style={{ color: ACCENT }}
                >
                  {active.client}
                </p>
              </div>
            </div>

            <div className="w-full shrink-0 space-y-2">
              <p className="font-mono text-xs font-medium text-white/45">
                Short summary
              </p>
              <p className="line-clamp-4 min-h-[5.75rem] w-full font-sans text-sm leading-relaxed text-white/75 md:min-h-[6.25rem] md:text-base md:leading-relaxed">
                {active.shortSummary}
              </p>
            </div>

            <blockquote className="line-clamp-5 min-h-[8.5rem] shrink-0 font-sans text-lg leading-relaxed text-white/90 md:line-clamp-5 md:min-h-[9.5rem] md:text-xl md:leading-relaxed lg:line-clamp-4 lg:min-h-[8.75rem] lg:text-2xl lg:leading-snug">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex gap-3">
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
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#e60000] px-4 py-3 font-sans text-sm font-semibold text-black transition hover:bg-[#ff1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:ml-auto sm:w-auto sm:min-w-[14rem]"
              >
                View Client Journey
                <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden />
              </button>
            </div>
          </article>
        </div>
      </div>

      <TestimonialDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        testimonial={active}
      />
    </section>
  );
}
