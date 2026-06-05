import type { Metadata, Viewport } from "next";
import { Anton, Ballet, Geist_Mono, Montserrat } from "next/font/google";
import {
  SITE_APPLE_TOUCH_ICON,
  SITE_BRAND_PRIMARY,
  SITE_BRAND_SECONDARY,
  SITE_DESCRIPTION,
  SITE_FAVICON_96,
  SITE_FAVICON_ICO,
  SITE_FAVICON_SVG,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_SRC,
  SITE_OG_IMAGE_WIDTH,
  SITE_SEO_KEYWORDS,
  SITE_THEME_COLOR,
  SITE_TITLE,
  SITE_URL,
  SITE_WEB_MANIFEST,
} from "@/components/portfolio/data";
import JsonLd from "@/components/seo/JsonLd";
import { PORTFOLIO_LCP_IMAGES } from "@/components/portfolio/portfolioImages";
import "./globals.css";
import "./hero-breakpoints-narrow.css";
import "./hero-red-frame.css";
import "./hero-side-labels-fluid.css";
import "./hero-portrait-fluid.css";
import "./hero-headline-fluid.css";
import "./hero-tagline-social-fluid.css";
import "./hero-layout-mobile.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton-family",
  display: "swap",
});

const ballet = Ballet({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ballet-family",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteAuthor = `${SITE_BRAND_PRIMARY} ${SITE_BRAND_SECONDARY}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${siteAuthor}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: siteAuthor,
  authors: [{ name: siteAuthor, url: SITE_URL }],
  creator: siteAuthor,
  publisher: siteAuthor,
  category: "technology",
  keywords: [...SITE_SEO_KEYWORDS],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: SITE_WEB_MANIFEST,
  icons: {
    icon: [
      { url: SITE_FAVICON_ICO, sizes: "any" },
      { url: SITE_FAVICON_SVG, type: "image/svg+xml" },
      { url: SITE_FAVICON_96, sizes: "96x96", type: "image/png" },
    ],
    apple: SITE_APPLE_TOUCH_ICON,
    shortcut: SITE_FAVICON_ICO,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: siteAuthor,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE_SRC,
        width: SITE_OG_IMAGE_WIDTH,
        height: SITE_OG_IMAGE_HEIGHT,
        alt: SITE_OG_IMAGE_ALT,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: {
      url: SITE_OG_IMAGE_SRC,
      alt: SITE_OG_IMAGE_ALT,
    },
  },
};

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${anton.variable} ${ballet.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        {PORTFOLIO_LCP_IMAGES.map((href) => (
          <link
            key={href}
            rel="preload"
            as="image"
            href={href}
            type={href.endsWith(".webp") ? "image/webp" : undefined}
          />
        ))}
      </head>
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
