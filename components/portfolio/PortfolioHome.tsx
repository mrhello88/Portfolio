"use client";

import { useRef } from "react";
import { useLocomotiveScroll } from "./hooks/useLocomotiveScroll";
import { usePortfolioAnimations } from "./hooks/usePortfolioAnimations";
import SiteHeader from "./SiteHeader";
import HeroSectionV2 from "./HeroSectionV2";
import BrandLogosSection from "./BrandLogosSection";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";
import WorkSection from "./WorkSection";
import ProjectsSection from "./ProjectsSection";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import SiteFooter from "./SiteFooter";
import PortfolioImagePreloader from "./PortfolioImagePreloader";
import ContactModal from "./ContactModal";
import { ContactModalProvider } from "./ContactModalContext";

export default function PortfolioHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useLocomotiveScroll();
  usePortfolioAnimations(rootRef, mainRef, heroRef);

  return (
    <ContactModalProvider>
    <div ref={rootRef}>
      <PortfolioImagePreloader />
      <ContactModal />
      <SiteHeader />
      <main ref={mainRef} id="main-content">
        <HeroSectionV2 ref={heroRef} />
        <div className={`mx-auto w-full ${LAYOUT_MAX_WIDTH_CLASS}`}>
          <BrandLogosSection />
          <WorkSection />
          <ProjectsSection />
          <ServicesSection />
          <TestimonialsSection />
          <SiteFooter />
        </div>
      </main>
    </div>
    </ContactModalProvider>
  );
}
