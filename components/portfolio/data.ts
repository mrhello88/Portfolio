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
