import { TESTIMONIALS } from "./testimonialsData";

/** Above-the-fold / LCP — also preloaded in root layout <head> */
export const PORTFOLIO_LCP_IMAGES = [
  "/portfolio-background.webp",
  "/herosection-image.webp",
] as const;

/** Load on site open (before scroll) — brand strip, work, services, logos */
export const PORTFOLIO_EAGER_IMAGES = [
  "/about-us-page.webp",
  "/services-section/custom-website.webp",
  "/services-section/frontend-engineering.webp",
  "/services-section/api-development.webp",
  "/services-section/fullstack-development.webp",
  "/Dova-logo.webp",
  "/energy-recruitement.webp",
  "/linkbizlogo.png",
  "/TujitumeLogo.svg",
  "/brand-appeal.ico",
  ...TESTIMONIALS.map((t) => t.avatar),
] as const;
