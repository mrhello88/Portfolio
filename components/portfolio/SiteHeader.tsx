"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import {
  LAYOUT_MAX_WIDTH_CLASS,
  SITE_BRAND_PRIMARY,
  SITE_BRAND_SECONDARY,
  SITE_LOGO_SRC,
  SITE_NAV,
  SITE_TITLE,
} from "./data";

const navLinkClass =
  "nav-link text-(length:--site-header-nav-size) leading-none text-white/80 transition-colors hover:text-white";

const mobileNavLinkClass =
  "site-header-mobile-link font-mono text-(length:--site-header-mobile-nav-size) font-medium leading-snug tracking-tight text-white transition-colors hover:text-[#e60000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

const letsTalkLinkClass =
  "site-header-cta shrink-0 text-(length:--site-header-cta-size) font-medium leading-none text-white underline decoration-white underline-offset-[0.2em] transition-[color,text-decoration-color] hover:text-white/90 hover:decoration-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const LETS_TALK_HREF = process.env.NEXT_PUBLIC_HIRE_EMAIL?.trim()
  ? `mailto:${process.env.NEXT_PUBLIC_HIRE_EMAIL.trim()}`
  : "mailto:you@example.com";

const SCROLL_BLUR_THRESHOLD = 16;

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const updateScrolled = (scrollY: number) => {
      setScrolled(scrollY > SCROLL_BLUR_THRESHOLD);
    };

    const onPortfolioScroll = (event: Event) => {
      const scroll =
        (event as CustomEvent<{ scroll: number }>).detail?.scroll ?? 0;
      updateScrolled(scroll);
    };

    const onWindowScroll = () => updateScrolled(window.scrollY);

    window.addEventListener("portfolio-scroll", onPortfolioScroll);
    window.addEventListener("scroll", onWindowScroll, { passive: true });
    onWindowScroll();

    return () => {
      window.removeEventListener("portfolio-scroll", onPortfolioScroll);
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const desktopMq = window.matchMedia("(min-width: 768px)");
    const onDesktop = () => {
      if (desktopMq.matches) setMenuOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    desktopMq.addEventListener("change", onDesktop);
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      desktopMq.removeEventListener("change", onDesktop);
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 flex w-full flex-col pt-[env(safe-area-inset-top,0px)] transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 motion-reduce:transition-none [--site-header-cta-size:clamp(1rem,2.8vw,1.125rem)] [--site-header-logo-size:clamp(1rem,3.2vw,1.5rem)] [--site-header-menu-icon:clamp(1.25rem,4vw,1.5rem)] [--site-header-menu-size:clamp(2.25rem,8vw,2.5rem)] [--site-header-mobile-cta-size:clamp(1.0625rem,3vw,1.25rem)] [--site-header-mobile-nav-size:clamp(0.8125rem,2vw,1rem)] [--site-header-nav-size:clamp(0.6875rem,1.5vw,0.875rem)] ${
        scrolled
          ? "border-b border-white/5 bg-white/[0.015] shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-[2px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto flex min-h-(--site-header-total-h) w-full ${LAYOUT_MAX_WIDTH_CLASS} items-center justify-between gap-(--site-header-gap) px-(--site-header-px) text-white`}
      >
        <Link
          href="/"
          aria-label={SITE_TITLE}
          className="site-header-logo relative z-60 inline-flex shrink-0 items-center gap-[0.45em] font-sans text-(length:--site-header-logo-size) font-medium leading-none tracking-tight antialiased"
          onClick={closeMenu}
        >
          <Image
            src={SITE_LOGO_SRC}
            alt=""
            width={48}
            height={36}
            priority
            sizes="48px"
            className="h-[1.35em] w-auto shrink-0"
          />
          <span className="inline-flex items-baseline gap-[0.28em]">
            <span className="text-white">{SITE_BRAND_PRIMARY}</span>
            <span className="text-neutral-400">{SITE_BRAND_SECONDARY}</span>
          </span>
        </Link>

        <div className="hidden items-center md:flex md:gap-(--site-header-cta-gap) md:pr-[clamp(0.25rem,2vw,1.25rem)]">
          <nav
            className="flex items-center gap-(--site-header-nav-gap) translate-x-[clamp(-0.75rem,-2vw,-0.25rem)] lg:translate-x-[clamp(-1rem,-2.5vw,-0.5rem)]"
            aria-label="Main navigation"
          >
            {SITE_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={LETS_TALK_HREF} className={letsTalkLinkClass}>
            Let&apos;s talk!
          </Link>
        </div>

        <button
          type="button"
          className="site-header-menu-btn relative z-60 flex size-(--site-header-menu-size) shrink-0 items-center justify-center rounded-md text-white transition-colors hover:text-[#e60000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:hidden"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="size-(--site-header-menu-icon)" aria-hidden />
          ) : (
            <Menu className="size-(--site-header-menu-icon)" aria-hidden />
          )}
        </button>

        <div
          id={menuId}
          className={`fixed inset-0 z-40 md:hidden ${
            menuOpen ? "visible" : "invisible pointer-events-none"
          }`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none"
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          />

          <nav
            className={`site-header-mobile-panel absolute inset-x-0 flex flex-col border-b border-white/10 bg-stone-950/95 px-(--site-header-px) py-[clamp(0.375rem,1.2vw,0.75rem)] text-white shadow-lg backdrop-blur-md transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0"
            }`}
            style={{
              top: "calc(var(--site-header-total-h) + env(safe-area-inset-top, 0px))",
            }}
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-[clamp(0.125rem,0.5vw,0.25rem)]">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${mobileNavLinkClass} flex min-h-[clamp(2.5rem,10vw,3rem)] items-center rounded-md px-[clamp(0.25rem,1vw,0.5rem)]`}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={LETS_TALK_HREF}
                  className={`${letsTalkLinkClass} flex min-h-[clamp(2.5rem,10vw,3rem)] items-center rounded-md px-[clamp(0.25rem,1vw,0.5rem)] text-(length:--site-header-mobile-cta-size)`}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={closeMenu}
                >
                  Let&apos;s talk!
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
