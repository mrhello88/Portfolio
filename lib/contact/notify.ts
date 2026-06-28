const PLACEHOLDER_EMAILS = new Set([
  "your@example.com",
  "you@example.com",
  "your@email.com",
]);

function isConfiguredEmail(value: string | undefined) {
  if (!value) return false;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed.includes("@")) return false;
  return !PLACEHOLDER_EMAILS.has(trimmed);
}

export async function sendContactNotificationEmail(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_NOTIFY_EMAIL?.trim();
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  if (!apiKey || !isConfiguredEmail(to)) {
    return { sent: false as const, reason: "email_not_configured" };
  }

  const phoneLine = payload.phone ? `\nPhone: ${payload.phone}` : "";
  const text = [
    `New contact from ${payload.name}`,
    `Email: ${payload.email}${phoneLine}`,
    `Source: ${payload.source}`,
    "",
    payload.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Portfolio contact: ${payload.name}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Resend error", await response.text());
    return { sent: false as const, reason: "resend_failed" };
  }

  return { sent: true as const };
}
