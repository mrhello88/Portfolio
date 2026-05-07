/** Layout “truth” width (CSS px): content does not grow wider than this on ultra-wide. */
export const LAYOUT_MAX_WIDTH_CLASS = "max-w-[2560px]";

/** Hero stage min-height: full viewport until 1280px, then capped (tall monitors). */
export const LAYOUT_HERO_MIN_HEIGHT_CLASS = "min-h-[min(100svh,1280px)]";

export const SITE_NAV = [
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
] as const;

export const heroWordsPrimary = ["Career", "&", "work,"];
export const heroWordsAccent = ["in", "order."];

/** Blob-clipped hero portrait — put your PNG in /public and set e.g. "/hero-portrait.png". */
export const HERO_PORTRAIT_SRC = "/herosection-image.webp";
