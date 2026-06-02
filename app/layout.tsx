import type { Metadata } from "next";
import { Anton, Ballet, Geist_Mono, Montserrat } from "next/font/google";
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
  title: "Portfolio",
  description:
    "Portfolio with GSAP scroll-driven motion. Built with Next.js.",
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
