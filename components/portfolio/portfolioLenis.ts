import type Lenis from "lenis";

let portfolioLenis: Lenis | null = null;

export function setPortfolioLenis(lenis: Lenis | null) {
  portfolioLenis = lenis;
}

export function getPortfolioLenis() {
  return portfolioLenis;
}
