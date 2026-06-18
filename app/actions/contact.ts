"use server";

import { sendContactNotificationEmail } from "@/lib/contact/notify";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import {
  contactFormSchema,
  mapZodErrors,
  parseContactFormValues,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "@/lib/validations/contact";

export type SubmitContactState = {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFormFieldErrors;
  values?: ContactFormValues;
};

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export async function submitContact(
  _prev: SubmitContactState | null,
  formData: FormData,
): Promise<SubmitContactState> {
  const raw = parseContactFormValues(formData);
  const values: ContactFormValues = {
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    message: raw.message,
  };

  const parsed = contactFormSchema.safeParse({
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    message: raw.message,
    company: raw.company,
    source: raw.source,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the fields below and try again.",
      fieldErrors: mapZodErrors(parsed.error),
      values,
    };
  }

  const data = parsed.data;
  const phone = data.phone?.trim() || "";

  if (data.company) {
    return { ok: true, message: "Thanks! We will be in touch soon." };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: phone || null,
      message: data.message,
      source: data.source,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error", error);
      return {
        ok: false,
        message:
          "Could not save your message. Please try again or email directly.",
        values,
      };
    }

    await sendContactNotificationEmail({
      name: data.name,
      email: data.email,
      phone: phone || undefined,
      message: data.message,
      source: data.source,
    });

    return {
      ok: true,
      message: "Thanks! Your message was sent. I will get back to you soon.",
      values: emptyValues,
    };
  } catch (err) {
    console.error("submitContact", err);
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
      values,
    };
  }
}
