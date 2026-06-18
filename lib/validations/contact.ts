import { z } from "zod";

export const PHONE_EXAMPLE = "+92 300 1234567";

/** ITU E.164: max 15 digits; min ~8 for valid international numbers worldwide */
const PHONE_MIN_DIGITS = 8;
const PHONE_MAX_DIGITS = 15;

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(120, "Name is too long"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address (e.g. you@email.com)")
      .max(254, "Email is too long"),
    phone: z
      .string()
      .trim()
      .max(28, "Phone number is too long")
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(1, "Message is required")
      .min(10, "Message must be at least 10 characters")
      .max(5000, "Message is too long"),
    company: z.string().max(0).optional().or(z.literal("")),
    source: z
      .enum(["header", "contact-section", "services", "hero"])
      .default("header"),
  })
  .superRefine((data, ctx) => {
    const phone = data.phone?.trim() ?? "";
    if (!phone) return;

    if (!phone.startsWith("+")) {
      ctx.addIssue({
        code: "custom",
        message: `Use international format starting with +, e.g. ${PHONE_EXAMPLE}`,
        path: ["phone"],
      });
      return;
    }

    if (!/^\+[\d\s().]{6,24}$/.test(phone)) {
      ctx.addIssue({
        code: "custom",
        message: "Use only +, digits, spaces, or parentheses",
        path: ["phone"],
      });
      return;
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (
      digitsOnly.length < PHONE_MIN_DIGITS ||
      digitsOnly.length > PHONE_MAX_DIGITS
    ) {
      ctx.addIssue({
        code: "custom",
        message: `Enter ${PHONE_MIN_DIGITS} to ${PHONE_MAX_DIGITS} digits with country code (e.g. +1, +44, +92, +971)`,
        path: ["phone"],
      });
    }
  });

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<
  Record<keyof ContactFormInput, string>
>;

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function parseContactFormValues(
  formData: FormData,
): ContactFormValues & { company: string; source: string } {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
    source: String(formData.get("source") ?? "header"),
  };
}

export function mapZodErrors(
  error: z.ZodError<ContactFormInput>,
): ContactFormFieldErrors {
  const fieldErrors: ContactFormFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      typeof key === "string" &&
      !fieldErrors[key as keyof ContactFormFieldErrors]
    ) {
      fieldErrors[key as keyof ContactFormFieldErrors] = issue.message;
    }
  }
  return fieldErrors;
}
