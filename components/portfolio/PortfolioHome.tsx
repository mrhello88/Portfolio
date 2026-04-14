"use client";

import { useRef } from "react";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";
import SiteHeader from "./SiteHeader";
import HeroSectionV2 from "./HeroSectionV2";
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
        <JourneySection lineFillRef={lineFillRef} />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  );
}
