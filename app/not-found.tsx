import type { Metadata } from "next";
import Link from "next/link";
import ErrorPageShell, {
  homeLinkClass,
} from "@/components/portfolio/ErrorPageShell";
import { SITE_TITLE } from "@/components/portfolio/data";

export const metadata: Metadata = {
  title: `404 | ${SITE_TITLE}`,
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <ErrorPageShell
      code="404"
      title="Page not found"
      description="This URL does not exist or may have moved. Head back to the portfolio and keep exploring."
      actions={
        <Link href="/" className={homeLinkClass}>
          Back to home
        </Link>
      }
    />
  );
}
