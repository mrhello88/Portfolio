"use client";

import Link from "next/link";
import { useEffect } from "react";
import ErrorPageShell, {
  homeLinkClass,
} from "@/components/portfolio/ErrorPageShell";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const retryButtonClass =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-[#e60000]/50 bg-[#e60000]/15 px-6 font-sans text-sm font-medium text-white transition hover:bg-[#e60000]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-full bg-black antialiased">
        <ErrorPageShell
          code="500"
          title="Something went wrong"
          description="A critical error occurred. Please try again or return to the homepage."
          actions={
            <>
              <button type="button" onClick={reset} className={retryButtonClass}>
                Try again
              </button>
              <Link href="/" className={homeLinkClass}>
                Back to home
              </Link>
            </>
          }
        />
      </body>
    </html>
  );
}
