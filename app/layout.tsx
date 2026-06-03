import type { Metadata } from "next";
import { Anton, Ballet, Geist_Mono, Montserrat } from "next/font/google";
import {
  SITE_BRAND_PRIMARY,
  SITE_BRAND_SECONDARY,
  SITE_DESCRIPTION,
  SITE_LOGO_SRC,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_SRC,
  SITE_OG_IMAGE_WIDTH,
  SITE_TITLE,
  SITE_URL,
} from "@/components/portfolio/data";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: SITE_LOGO_SRC, type: "image/png" }],
    apple: SITE_LOGO_SRC,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${SITE_BRAND_PRIMARY} ${SITE_BRAND_SECONDARY}`,
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
    images: [SITE_OG_IMAGE_SRC],
  },
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
        <link
          rel="icon"
          href={SITE_LOGO_SRC}
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href={SITE_LOGO_SRC} />
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
