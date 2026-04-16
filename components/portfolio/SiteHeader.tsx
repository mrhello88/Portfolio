import Link from "next/link";
import { SITE_NAV } from "./data";

export default function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground"
        >
          ./portfolio
        </Link>
        <nav className="flex items-center gap-8">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-sm text-(--muted) transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
