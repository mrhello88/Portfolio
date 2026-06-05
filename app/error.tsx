"use client";

import Link from "next/link";
import { useEffect } from "react";
import ErrorPageShell, {
  homeLinkClass,
} from "@/components/portfolio/ErrorPageShell";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const retryButtonClass =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-[#e60000]/50 bg-[#e60000]/15 px-6 font-sans text-sm font-medium text-white transition hover:bg-[#e60000]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e60000] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageShell
      code="500"
      title="Something went wrong"
      description="A server error occurred while loading this page. You can try again or return to the homepage."
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
  );
}
