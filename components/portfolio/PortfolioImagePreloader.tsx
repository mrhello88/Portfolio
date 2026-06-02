"use client";

import { useLayoutEffect } from "react";
import { PORTFOLIO_EAGER_IMAGES, PORTFOLIO_LCP_IMAGES } from "./portfolioImages";

function preloadViaLink(href: string) {
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return null;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  document.head.appendChild(link);
  return link;
}

function preloadViaImage(href: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = href;
}

/**
 * Starts fetching portfolio images as soon as the page hydrates so scroll
 * does not wait on lazy-loaded below-the-fold assets.
 */
export default function PortfolioImagePreloader() {
  useLayoutEffect(() => {
    const links: HTMLLinkElement[] = [];

    for (const href of PORTFOLIO_LCP_IMAGES) {
      const link = preloadViaLink(href);
      if (link) links.push(link);
    }

    for (const href of PORTFOLIO_EAGER_IMAGES) {
      const link = preloadViaLink(href);
      if (link) links.push(link);
      preloadViaImage(href);
    }

    return () => {
      for (const link of links) {
        link.remove();
      }
    };
  }, []);

  return null;
}
