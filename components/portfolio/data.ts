/** Layout “truth” width (CSS px): content does not grow wider than this on ultra-wide. */
export const LAYOUT_MAX_WIDTH_CLASS = "max-w-[2560px]";

/** Shared // Skills / // Projects eyebrow + gap to content below */
export const SECTION_EYEBROW_CLASS =
  "mb-0 font-mono text-sm font-medium tracking-[0.12em] md:text-base";

export const SECTION_EYEBROW_TO_CONTENT_CLASS = "mt-4";

export const IMPACT_SECTION_RAIL_CLASS = `impact-section-rail relative z-20 mx-auto flex w-full flex-col items-center ${LAYOUT_MAX_WIDTH_CLASS} px-6 pb-0 pt-10 sm:px-8 md:px-10 lg:px-12`;

/** Hero stage min-height: full viewport until 1280px, then capped (tall monitors). */
export const LAYOUT_HERO_MIN_HEIGHT_CLASS = "min-h-[min(100svh,1280px)]";

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
