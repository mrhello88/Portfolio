import Link from "next/link";
import { SITE_NAV } from "./data";

export default function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-[var(--foreground)]"
        >
          ./portfolio
        </Link>
        <nav className="flex items-center gap-8">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
