import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  company: z.string().max(0).optional().or(z.literal("")),
  source: z.enum(["header", "contact-section", "services"]).default("header"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<
  Record<keyof ContactFormInput, string>
>;
