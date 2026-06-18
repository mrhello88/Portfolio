"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import {
  submitContact,
  type SubmitContactState,
} from "@/app/actions/contact";
import {
  contactFormSchema,
  mapZodErrors,
  PHONE_EXAMPLE,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { trackContactFormSubmit } from "@/lib/analytics/gtag";
import type { ContactSource } from "./ContactModalContext";

const initialState: SubmitContactState = {
  ok: false,
  message: "",
};

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputBaseClass =
  "w-full rounded-lg bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/35 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]";

const inputOkClass = `${inputBaseClass} border border-white/10 focus:border-[#e60000]/50 focus:ring-[#e60000]/40`;

const inputErrorClass = `${inputBaseClass} border-2 border-[#e60000] focus:border-[#e60000] focus:ring-[#e60000]/50`;

const textareaOkClass = `${inputOkClass} resize-y min-h-28`;

const textareaErrorClass = `${inputErrorClass} resize-y min-h-28`;

function fieldClass(hasError: boolean, multiline = false) {
  if (multiline) return hasError ? textareaErrorClass : textareaOkClass;
  return hasError ? inputErrorClass : inputOkClass;
}

type ContactFormProps = {
  source?: ContactSource;
  onSuccess?: () => void;
};

export default function ContactForm({
  source = "header",
  onSuccess,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const successHandledRef = useRef(false);
  const submitTrackedRef = useRef(false);
  const errorSummaryId = useId();
  const [values, setValues] = useState<ContactFormValues>(emptyValues);
  const [clientErrors, setClientErrors] = useState<ContactFormFieldErrors>({});
  const [clearedServerFields, setClearedServerFields] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  const serverFieldErrors = Object.fromEntries(
    Object.entries(state.fieldErrors ?? {}).filter(
      ([key]) => !clearedServerFields[key as keyof ContactFormValues],
    ),
  ) as ContactFormFieldErrors;

  const fieldErrors = { ...serverFieldErrors, ...clientErrors };
  const errorEntries = Object.entries(fieldErrors).filter(
    ([, message]) => Boolean(message),
  );

  useEffect(() => {
    if (!state.fieldErrors) return;
    const firstKey = Object.keys(state.fieldErrors)[0];
    if (!firstKey) return;
    const el = formRef.current?.querySelector<HTMLElement>(
      `[name="${firstKey}"], #contact-${firstKey}`,
    );
    el?.focus();
    el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [state.fieldErrors]);

  useEffect(() => {
    if (pending) {
      submitTrackedRef.current = false;
      return;
    }
    if (submitTrackedRef.current) return;
    if (!state.message && !state.ok) return;

    submitTrackedRef.current = true;
    trackContactFormSubmit(source, state.ok ? "success" : "error", {
      error_message: state.ok ? undefined : state.message,
    });
  }, [pending, state.ok, state.message, source]);

  useEffect(() => {
    if (!state.ok) {
      successHandledRef.current = false;
      return;
    }
    if (successHandledRef.current) return;
    successHandledRef.current = true;
    setValues(emptyValues);
    setClientErrors({});
    setClearedServerFields({});
    formRef.current?.reset();
    onSuccess?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per successful submit
  }, [state.ok]);

  function updateField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setClearedServerFields((prev) => ({ ...prev, [key]: true }));
    setClientErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const parsed = contactFormSchema.safeParse({
      ...values,
      company: "",
      source,
    });

    if (!parsed.success) {
      event.preventDefault();
      const errors = mapZodErrors(parsed.error);
      setClientErrors(errors);
      setClearedServerFields({});
      const firstKey = Object.keys(errors)[0];
      if (firstKey) {
        const el = formRef.current?.querySelector<HTMLElement>(
          `[name="${firstKey}"], #contact-${firstKey}`,
        );
        el?.focus();
        el?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      return;
    }

    setClientErrors({});
    setClearedServerFields({});
  }

  const messageLength = values.message.length;
  const messageMin = 10;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
      aria-describedby={errorEntries.length ? errorSummaryId : undefined}
    >
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

      {errorEntries.length > 0 ? (
        <div
          id={errorSummaryId}
          role="alert"
          className="rounded-lg border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-white/90"
        >
          <p className="font-medium text-white">
            {errorEntries.length === 1
              ? "1 field needs your attention:"
              : `${errorEntries.length} fields need your attention:`}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-white/75">
            {errorEntries.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.message && !errorEntries.length ? (
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

      <div className="space-y-1.5">
        <label htmlFor="contact-name" className="font-mono text-xs text-white/55">
          Name <span className="text-[#e60000]">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={fieldClass(Boolean(fieldErrors.name))}
          placeholder="Your full name"
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        {fieldErrors.name ? (
          <p id="contact-name-error" className="text-sm text-[#e60000]" role="alert">
            {fieldErrors.name}
          </p>
        ) : (
          <p className="text-xs text-white/35">At least 2 characters</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-email" className="font-mono text-xs text-white/55">
          Email <span className="text-[#e60000]">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={fieldClass(Boolean(fieldErrors.email))}
          placeholder="you@email.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
        />
        {fieldErrors.email ? (
          <p id="contact-email-error" className="text-sm text-[#e60000]" role="alert">
            {fieldErrors.email}
          </p>
        ) : (
          <p className="text-xs text-white/35">I&apos;ll reply to this address</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-phone" className="font-mono text-xs text-white/55">
          Phone / WhatsApp <span className="text-white/35">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={fieldClass(Boolean(fieldErrors.phone))}
          placeholder={PHONE_EXAMPLE}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "contact-phone-error" : "contact-phone-hint"}
        />
        {fieldErrors.phone ? (
          <p id="contact-phone-error" className="text-sm text-[#e60000]" role="alert">
            {fieldErrors.phone}
          </p>
        ) : (
          <p id="contact-phone-hint" className="text-xs text-white/35">
            International format: +country code then number. Examples: {PHONE_EXAMPLE},
            +1 555 123 4567, +44 7700 900123, +971 50 123 4567
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="contact-message"
            className="font-mono text-xs text-white/55"
          >
            Message <span className="text-[#e60000]">*</span>
          </label>
          <span
            className={`font-mono text-xs ${
              messageLength < messageMin ? "text-white/40" : "text-white/55"
            }`}
          >
            {messageLength}/{messageMin}+ chars
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={fieldClass(Boolean(fieldErrors.message), true)}
          placeholder="Tell me about your project, timeline, and goals..."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
        />
        {fieldErrors.message ? (
          <p id="contact-message-error" className="text-sm text-[#e60000]" role="alert">
            {fieldErrors.message}
          </p>
        ) : (
          <p className="text-xs text-white/35">Minimum 10 characters</p>
        )}
      </div>

      {state.message && errorEntries.length > 0 ? (
        <p
          role="status"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/90"
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
