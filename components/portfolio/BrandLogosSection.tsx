"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { trackBrandLogoClick } from "@/lib/analytics/gtag";

type BrandLogo = {
  name: string;
  src: string;
  href: string;
  imageClass?: string;
};

const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "DOVA",
    src: "/Dova-logo.webp",
    href: "https://dova.fyi/",
    imageClass: "scale-[0.7] sm:scale-[0.82] md:scale-100",
  },
  {
    name: "Energy Recruitment Hub",
    src: "/energy-recruitement.webp",
    href: "https://www.energyrecruitmenthub.com/",
  },
  {
    name: "LinkBiz",
    src: "/linkbizlogo.png",
    href: "https://www.linkbiz.co.za/",
    imageClass: "scale-[1.06]",
  },
  {
    name: "Tujitume",
    src: "/TujitumeLogo.svg",
    href: "https://www.tujitume.com/",
  },
  {
    name: "Brand Appeal",
    src: "/brand-appeal.ico",
    href: "https://brandappeal.io/",
    imageClass: "scale-[0.65] sm:scale-[0.78] md:scale-100",
  },
];

/** One full viewport band: each brand once; duplicate band exists only for seamless GSAP loop. */
function LogoBand({
  ariaHidden,
  onLogoClick,
}: {
  ariaHidden?: boolean;
  onLogoClick: (brandName: string, href: string) => void;
}) {
  return (
    <div
      className="flex min-w-screen shrink-0 items-center justify-evenly gap-[clamp(0.375rem,1.2vw,2rem)] px-[clamp(0.5rem,2vw,3.5rem)]"
      aria-hidden={ariaHidden}
    >
      {BRAND_LOGOS.map((brand) => (
        <a
          key={brand.name}
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaHidden ? undefined : `${brand.name} (opens in new tab)`}
          tabIndex={ariaHidden ? -1 : 0}
          onClick={() => onLogoClick(brand.name, brand.href)}
          className="relative z-0 flex h-[clamp(3rem,12vw,6rem)] min-w-0 max-w-[min(220px,19vw)] flex-1 basis-0 cursor-pointer items-center justify-center bg-transparent p-0 transition-transform duration-200 ease-out will-change-transform hover:z-10 hover:scale-[1.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <Image
            src={brand.src}
            alt=""
            width={220}
            height={96}
            loading="eager"
            className={`pointer-events-none max-h-full max-w-full origin-center object-contain p-[clamp(0.125rem,0.65vw,0.5rem)] ${brand.imageClass ?? ""}`}
          />
        </a>
      ))}
    </div>
  );
}

export default function BrandLogosSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  /** Pointer is inside the static clip box — logos move under it, so we must not rely on per-logo enter/leave for pause. */
  const pointerInMarqueeRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMarqueePointerEnter = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    pointerInMarqueeRef.current = true;
    tweenRef.current?.pause();
  }, []);

  const onMarqueePointerLeave = useCallback(() => {
    pointerInMarqueeRef.current = false;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      resumeTimerRef.current = null;
      if (!pointerInMarqueeRef.current) {
        tweenRef.current?.play();
      }
    }, 45);
  }, []);

  const onLogoClick = useCallback((brandName: string, href: string) => {
    trackBrandLogoClick(brandName, href);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const run = () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.set(track, { x: 0 });
      const half = track.scrollWidth / 2;
      if (half < 16) return;
      const duration = Math.max(52, half / 18);
      const tween = gsap.to(track, {
        x: -half,
        duration,
        ease: "none",
        repeat: -1,
      });
      tweenRef.current = tween;
      if (pointerInMarqueeRef.current) {
        tween.pause();
      }
    };

    run();

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(run);
    });
    ro.observe(track);

    return () => {
      ro.disconnect();
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  return (
    <section
      id="brands"
      className="relative flex w-full flex-col justify-center overflow-x-hidden border-t border-white/10 bg-black py-[clamp(2rem,4.5vw,4.5rem)]"
    >
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div
          className="brand-marquee-wrap flex min-h-[clamp(3rem,12vw,6rem)] cursor-pointer items-center overflow-hidden py-[clamp(0.25rem,0.8vw,0.5rem)]"
          onPointerEnter={onMarqueePointerEnter}
          onPointerLeave={onMarqueePointerLeave}
        >
          <div
            ref={trackRef}
            className="brand-marquee-track flex w-max items-center will-change-transform"
          >
            <LogoBand onLogoClick={onLogoClick} />
            <LogoBand ariaHidden onLogoClick={onLogoClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
