"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  submitContact,
  type SubmitContactState,
} from "@/app/actions/contact";

const initialState: SubmitContactState = {
  ok: false,
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/35 transition focus:border-[#e60000]/50 focus:outline-none focus:ring-2 focus:ring-[#e60000]/40 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";

const textareaClass = `${inputClass} resize-y min-h-28`;

type ContactFormProps = {
  source?: "header" | "contact-section" | "services";
  onSuccess?: () => void;
};

export default function ContactForm({
  source = "header",
  onSuccess,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      onSuccess?.();
    }
  }, [state.ok, onSuccess]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="source" value={source} />

      <div
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="font-mono text-xs text-white/55">
          Name *
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Your name"
          aria-invalid={Boolean(state.fieldErrors?.name)}
        />
        {state.fieldErrors?.name ? (
          <p className="text-sm text-[#e60000]" role="alert">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="font-mono text-xs text-white/55">
          Email *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@email.com"
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? (
          <p className="text-sm text-[#e60000]" role="alert">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="font-mono text-xs text-white/55">
          Phone / WhatsApp (optional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          placeholder="+92 ..."
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs text-white/55"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={textareaClass}
          placeholder="Tell me about your project, timeline, and goals..."
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
        {state.fieldErrors?.message ? (
          <p className="text-sm text-[#e60000]" role="alert">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.message ? (
        <p
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm ${
            state.ok
              ? "border-[#e60000]/30 bg-[#e60000]/10 text-white/90"
              : "border-red-500/30 bg-red-500/10 text-white/90"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-lg bg-[#e60000] px-4 py-3 font-sans text-sm font-semibold text-black transition hover:bg-[#ff1a1a] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
