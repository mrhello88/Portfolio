import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  SITE_BRAND_PRIMARY,
  SITE_BRAND_SECONDARY,
  SITE_LOGO_SRC,
  SITE_TITLE,
} from "./data";

type ErrorPageShellProps = {
  code: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

const homeLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 font-sans text-sm font-medium text-white transition hover:border-[#e60000]/40 hover:bg-[#e60000]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function ErrorPageShell({
  code,
  title,
  description,
  actions,
}: ErrorPageShellProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-16 text-center">
      <Link
        href="/"
        aria-label={SITE_TITLE}
        className="mb-12 inline-flex items-center gap-3 font-sans text-lg font-medium leading-none tracking-tight"
      >
        <Image
          src={SITE_LOGO_SRC}
          alt=""
          width={48}
          height={36}
          sizes="40px"
          className="h-10 w-auto shrink-0"
        />
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-white">{SITE_BRAND_PRIMARY}</span>
          <span className="text-neutral-400">{SITE_BRAND_SECONDARY}</span>
        </span>
      </Link>

      <p className="font-mono text-sm font-medium tracking-[0.2em] text-[#e60000]">
        ERROR {code}
      </p>
      <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-white/55 md:text-base">
        {description}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {actions ?? (
          <Link href="/" className={homeLinkClass}>
            Back to home
          </Link>
        )}
      </div>
    </main>
  );
}

export { homeLinkClass };
