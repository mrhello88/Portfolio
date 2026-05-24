import type { Metadata } from "next";
import { Anton, Geist_Mono, Montserrat } from "next/font/google";
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
      className={`${montserrat.variable} ${anton.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
