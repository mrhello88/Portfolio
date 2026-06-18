"use client";

import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import ContactForm from "./ContactForm";
import { useContactModal } from "./ContactModalContext";
import { getPortfolioLenis } from "./portfolioLenis";

const ACCENT = "#e60000";

export default function ContactModal() {
  const { open, closeContact } = useContactModal();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
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
  }, [open, closeContact]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close contact form"
        onClick={closeContact}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="testimonial-modal-scroll relative z-10 flex max-h-[min(92vh,44rem)] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        onWheel={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
          <div>
            <p
              className="font-mono text-xs font-medium uppercase tracking-wider"
              style={{ color: ACCENT }}
            >
              {"// Contact"}
            </p>
            <h2
              id={titleId}
              className="mt-1 font-sans text-xl font-bold text-white sm:text-2xl"
            >
              Let&apos;s talk
            </h2>
            <p className="mt-1 font-sans text-sm text-white/55">
              Share your project details. I&apos;ll reply as soon as I can.
            </p>
          </div>
          <button
            type="button"
            onClick={closeContact}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/80 transition hover:border-white/20 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            aria-label="Close"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
          <ContactForm source="header" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
