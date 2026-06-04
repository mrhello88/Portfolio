"use server";

import { sendContactNotificationEmail } from "@/lib/contact/notify";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import {
  contactFormSchema,
  type ContactFormFieldErrors,
} from "@/lib/validations/contact";

export type SubmitContactState = {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFormFieldErrors;
};

export async function submitContact(
  _prev: SubmitContactState | null,
  formData: FormData,
): Promise<SubmitContactState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    message: formData.get("message"),
    company: formData.get("company") ?? "",
    source: formData.get("source") ?? "header",
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key as keyof ContactFormFieldErrors]) {
        fieldErrors[key as keyof ContactFormFieldErrors] = issue.message;
      }
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  if (data.company) {
    return { ok: true, message: "Thanks — we will be in touch soon." };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
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
      };
    }

    await sendContactNotificationEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: data.source,
    });

    return {
      ok: true,
      message: "Thanks! Your message was sent — I will get back to you soon.",
    };
  } catch (err) {
    console.error("submitContact", err);
    return {
      ok: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
