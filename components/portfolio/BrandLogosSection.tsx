"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type BrandLogo = {
  name: string;
  src: string;
  imageClass?: string;
};

const BRAND_LOGOS: BrandLogo[] = [
  { name: "DOVA", src: "/Dova-logo.png" },
  { name: "Energy Recruitement", src: "/energy-recruitement.webp" },
  { name: "LinkBiz", src: "/linkbizlogo.png", imageClass: "scale-[1.06]" },
  { name: "Tujitume", src: "/TujitumeLogo.svg" },
  { name: "brand-appeal", src: "/brand-appeal.ico" },
];

/** One full viewport band: each brand once; duplicate band exists only for seamless GSAP loop. */
function LogoBand({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex min-w-[100vw] shrink-0 items-center justify-evenly gap-3 px-6 sm:gap-5 sm:px-10 md:gap-8 md:px-14"
      aria-hidden={ariaHidden}
    >
      {BRAND_LOGOS.map((brand) => (
        <div
          key={brand.name}
          className="relative z-0 flex h-16 min-w-0 max-w-[min(220px,19vw)] flex-1 basis-0 cursor-pointer items-center justify-center transition-transform duration-200 ease-out will-change-transform hover:z-10 hover:scale-[1.1] sm:h-20 md:h-24"
        >
          <Image
            src={brand.src}
            alt={ariaHidden ? "" : `${brand.name} logo`}
            width={220}
            height={96}
            className={`pointer-events-none h-full w-full max-h-full object-contain p-2 ${brand.imageClass ?? ""}`}
          />
        </div>
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
      className="relative w-full overflow-x-hidden border-t border-white/10 bg-black py-14 md:py-18"
    >
      <div className="relative left-1/2 mt-8 w-screen max-w-[100vw] -translate-x-1/2">
        <div
          className="brand-marquee-wrap cursor-pointer overflow-hidden py-2"
          onPointerEnter={onMarqueePointerEnter}
          onPointerLeave={onMarqueePointerLeave}
        >
          <div
            ref={trackRef}
            className="brand-marquee-track flex w-max will-change-transform"
          >
            <LogoBand />
            <LogoBand ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
