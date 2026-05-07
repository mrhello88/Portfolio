"use client";

import { useRef } from "react";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";
import SiteHeader from "./SiteHeader";
import HeroSectionV2 from "./HeroSectionV2";
import BrandLogosSection from "./BrandLogosSection";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";
import WorkSection from "./WorkSection";
import ContactSection from "./ContactSection";
import SiteFooter from "./SiteFooter";

export default function PortfolioHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useLocomotiveScroll();
  usePortfolioAnimations(rootRef, mainRef, heroRef);

  return (
    <div ref={rootRef}>
      <SiteHeader />
      <main ref={mainRef}>
        <HeroSectionV2 ref={heroRef} />
        <div className={`mx-auto w-full ${LAYOUT_MAX_WIDTH_CLASS}`}>
          <BrandLogosSection />
          <WorkSection />
          <ContactSection />
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
