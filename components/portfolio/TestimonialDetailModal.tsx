"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { getPortfolioLenis } from "./portfolioLenis";
import type { Testimonial } from "./testimonialsData";

const ACCENT = "#e60000";

type TestimonialDetailModalProps = {
  open: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
};

function ModalSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <p
        className="font-mono text-xs font-medium uppercase tracking-wider sm:text-sm"
        style={{ color: ACCENT }}
      >
        {label}
      </p>
      {children}
    </section>
  );
}

export default function TestimonialDetailModal({
  open,
  onClose,
  testimonial,
}: TestimonialDetailModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const lenis = getPortfolioLenis();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onEscape);
    };
  }, [open, onClose]);

  if (!open || !testimonial) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close client journey"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative z-10 flex max-h-[min(92vh,56rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        onWheel={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:size-16">
              <Image
                src={testimonial.avatar}
                alt=""
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </div>
            <div className="min-w-0">
              <p
                id={titleId}
                className="font-sans text-lg font-bold text-white sm:text-xl"
              >
                {testimonial.client}
              </p>
              <p className="mt-0.5 font-sans text-sm text-white/55 sm:text-[0.9375rem]">
                {testimonial.name}
                {testimonial.role ? ` · ${testimonial.role}` : ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/80 transition hover:border-white/20 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-5 sm:space-y-8 sm:px-6 sm:py-6"
        >
          <ModalSection label="// 1. Client requirements">
            <p className="whitespace-pre-line font-sans text-base leading-relaxed text-white/85 sm:text-[1.0625rem]">
              {testimonial.clientRequirements}
            </p>
          </ModalSection>

          <div className="h-px bg-white/10" aria-hidden />

          <ModalSection label="// 2. Challenges & evolving requirements">
            <p className="whitespace-pre-line font-sans text-base leading-relaxed text-white/85 sm:text-[1.0625rem]">
              {testimonial.challenges}
            </p>
          </ModalSection>

          <div className="h-px bg-white/10" aria-hidden />

          <ModalSection label="// 3. What we delivered">
            <ul className="grid gap-2 sm:grid-cols-2">
              {testimonial.delivered.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-snug text-white/85 sm:text-[0.9375rem]"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </ModalSection>

          <div className="h-px bg-white/10" aria-hidden />

          <ModalSection label="// 4. Client feedback">
            {(() => {
              const [mainReview, ...rest] =
                testimonial.clientFeedback.split(/\n\n(?=Ratings)/);
              const highlights = rest.join("").trim();
              return (
                <>
                  <blockquote className="border-l-2 border-[#e60000]/50 pl-4 font-sans text-base leading-relaxed text-white/90 italic sm:text-[1.0625rem]">
                    &ldquo;{mainReview.trim()}&rdquo;
                  </blockquote>
                  {highlights ? (
                    <p className="mt-5 whitespace-pre-line font-sans text-sm leading-relaxed text-white/75 sm:text-[0.9375rem]">
                      {highlights}
                    </p>
                  ) : null}
                </>
              );
            })()}
          </ModalSection>
        </div>
      </div>
    </div>,
    document.body,
  );
}
