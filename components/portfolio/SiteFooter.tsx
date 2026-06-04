import Image from "next/image";
import Link from "next/link";
import {
  LAYOUT_MAX_WIDTH_CLASS,
  SITE_BRAND_PRIMARY,
  SITE_BRAND_SECONDARY,
  SITE_LOGO_SRC,
  SITE_NAV,
  SITE_TITLE,
} from "./data";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="site-footer relative z-20 w-full border-t border-white/10 bg-black py-10 md:py-12"
    >
      <div
        className={`mx-auto flex w-full flex-col gap-8 px-6 sm:px-8 md:px-10 lg:px-12 ${LAYOUT_MAX_WIDTH_CLASS}`}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link
            href="/"
            aria-label={SITE_TITLE}
            className="inline-flex shrink-0 items-center gap-3 font-sans text-base font-medium leading-none tracking-tight antialiased md:text-lg"
          >
            <Image
              src={SITE_LOGO_SRC}
              alt=""
              width={48}
              height={36}
              sizes="40px"
              className="h-9 w-auto shrink-0 md:h-10"
            />
            <span className="inline-flex items-baseline gap-1.5">
              <span className="text-white">{SITE_BRAND_PRIMARY}</span>
              <span className="text-neutral-400">{SITE_BRAND_SECONDARY}</span>
            </span>
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {SITE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-white/55 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="text-center font-sans text-xs text-white/40">
          © {year} {SITE_BRAND_PRIMARY} {SITE_BRAND_SECONDARY}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
