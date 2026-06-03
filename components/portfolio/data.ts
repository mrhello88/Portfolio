/** Design canvas (Figma reference): 2560×1440 CSS px. */
export const DESIGN_VIEWPORT_MAX_WIDTH_PX = 2560;
export const DESIGN_VIEWPORT_MAX_HEIGHT_PX = 1440;
export const DESIGN_VIEWPORT_CLASS = "design-viewport";

/** Layout “truth” width — prefer DesignViewportContainer for new sections. */
export const LAYOUT_MAX_WIDTH_CLASS = "max-w-[2560px]";

/** Shared // Skills / // Projects eyebrow + gap to content below */
export const SECTION_EYEBROW_CLASS =
  "mb-0 font-mono text-sm font-medium tracking-[0.12em] md:text-base";

export const SECTION_EYEBROW_TO_CONTENT_CLASS = "mt-4";

export const IMPACT_SECTION_RAIL_CLASS = `impact-section-rail relative z-20 mx-auto flex w-full flex-col items-center ${LAYOUT_MAX_WIDTH_CLASS} px-6 pb-0 pt-10 sm:px-8 md:px-10 lg:px-12`;

export const SITE_LOGO_SRC =
  "/logo/Generated_image-background-remover.png";

/** Production URL — required for WhatsApp / social link previews (absolute og:image) */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://www.abubakarsiddiqi.me";

/** Browser tab title + SEO + Open Graph */
export const SITE_TITLE = "AbuBakar Siddiqi | Full Stack Developer";

export const SITE_DESCRIPTION =
  "Full stack web developer building fast, modern websites and web apps with Next.js, React, and scalable backends for clients worldwide.";

/** WhatsApp, LinkedIn, Facebook link preview (1200×630) */
export const SITE_OG_IMAGE_SRC = "/whatsapp/herosection-portfolio-whatsapp.png";
export const SITE_OG_IMAGE_WIDTH = 1201;
export const SITE_OG_IMAGE_HEIGHT = 630;
export const SITE_OG_IMAGE_ALT =
  "AbuBakar Siddiqi — Full Stack Developer. Defining new digital standards.";

/** Header wordmark (logo + text) */
export const SITE_BRAND_PRIMARY = "AbuBakar";
export const SITE_BRAND_SECONDARY = "Siddiqi";

export const SITE_NAV = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
] as const;

export const heroWordsPrimary = ["Career", "&", "work,"];
export const heroWordsAccent = ["in", "order."];

/** Blob-clipped hero portrait — put your PNG in /public and set e.g. "/hero-portrait.png". */
export const HERO_PORTRAIT_SRC = "/herosection-image.webp";
