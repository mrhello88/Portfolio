import type { Metadata } from "next";
import PortfolioHome from "@/components/PortfolioHome";
import {
  SITE_DESCRIPTION,
  SITE_SEO_PRIMARY_KEYWORD,
  SITE_TITLE,
  SITE_URL,
} from "@/components/portfolio/data";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  other: {
    "subject": SITE_SEO_PRIMARY_KEYWORD,
  },
};

export default function Home() {
  return <PortfolioHome />;
}
