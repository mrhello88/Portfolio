"use client";

import { useRef } from "react";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";
import SiteHeader from "./SiteHeader";
import HeroSectionV2 from "./HeroSectionV2";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";
import JourneySection from "./JourneySection";
import ContactSection from "./ContactSection";
import SiteFooter from "./SiteFooter";

export default function PortfolioHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useLocomotiveScroll();
  usePortfolioAnimations(rootRef, mainRef, heroRef, lineFillRef);

  return (
    <div ref={rootRef}>
      <SiteHeader />
      <main ref={mainRef}>
        <HeroSectionV2 ref={heroRef} />
        <div className={`mx-auto w-full ${LAYOUT_MAX_WIDTH_CLASS}`}>
          <JourneySection lineFillRef={lineFillRef} />
          <ContactSection />
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
