"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  IMPACT_SECTION_RAIL_CLASS,
  SECTION_EYEBROW_CLASS,
} from "./data";

const ACCENT = "#e60000";

/** Put your photo in /public — default uses services-section.png */
const SERVICES_IMAGE_SRC = "/services-section.png";

const SERVICES = [
  {
    id: "01",
    title: "Custom Web Development",
    description:
      "Build complete web applications from scratch — frontend to backend — optimized for speed, security, and scalability.",
    hireHref:
      process.env.NEXT_PUBLIC_HIRE_EMAIL?.trim()
        ? `mailto:${process.env.NEXT_PUBLIC_HIRE_EMAIL.trim()}`
        : "mailto:you@example.com",
  },
  {
    id: "02",
    title: "Frontend Engineering",
    description:
      "Pixel-accurate UI, accessible components, and performance-minded React / Next.js interfaces that feel fast in production.",
    hireHref:
      process.env.NEXT_PUBLIC_HIRE_EMAIL?.trim()
        ? `mailto:${process.env.NEXT_PUBLIC_HIRE_EMAIL.trim()}`
        : "mailto:you@example.com",
  },
  {
    id: "03",
    title: "Server logic & API Development",
    description:
      "REST and GraphQL APIs, auth flows, databases, and deployment pipelines built for reliability and clear contracts.",
    hireHref:
      process.env.NEXT_PUBLIC_HIRE_EMAIL?.trim()
        ? `mailto:${process.env.NEXT_PUBLIC_HIRE_EMAIL.trim()}`
        : "mailto:you@example.com",
  },
  {
    id: "04",
    title: "Full Stack Application Development",
    description:
      "End-to-end product delivery — from discovery and architecture through launch, monitoring, and iterative improvements.",
    hireHref:
      process.env.NEXT_PUBLIC_HIRE_EMAIL?.trim()
        ? `mailto:${process.env.NEXT_PUBLIC_HIRE_EMAIL.trim()}`
        : "mailto:you@example.com",
  },
] as const;

export default function ServicesSection() {
  const [openId, setOpenId] = useState<string>(SERVICES[0].id);

  return (
    <section
      id="services"
      className="relative w-full border-t border-white/10 bg-black pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-36"
    >
      <div className={IMPACT_SECTION_RAIL_CLASS}>
        <div className="services-section-head mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <p className={SECTION_EYEBROW_CLASS} style={{ color: ACCENT }}>
            {"// Service"}
          </p>
          <h2 className="max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-white md:text-right md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            End-to-End Web Development Services
          </h2>
        </div>

        <div
          className="services-section-rule mx-auto mt-8 flex w-full max-w-5xl items-center gap-3 md:mt-10 md:gap-4"
          aria-hidden
        >
          <span
            className="font-mono text-sm font-medium md:text-base"
            style={{ color: ACCENT }}
          >
            {"<"}
          </span>
          <span className="h-px flex-1 bg-white/12" />
          <span
            className="font-mono text-sm font-medium md:text-base"
            style={{ color: ACCENT }}
          >
            {">"}
          </span>
        </div>

        <div className="services-section-body mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-stretch gap-10 md:mt-12 md:grid-cols-[1.22fr_1fr] md:gap-10 lg:gap-14">
          <div className="relative min-h-[22rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:min-h-[26rem] md:min-h-[min(36rem,78vh)]">
            <Image
              src={SERVICES_IMAGE_SRC}
              alt="Developer at work"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover object-center grayscale"
              priority={false}
            />
          </div>

          <ul className="services-section-list list-none divide-y divide-white/10">
            {SERVICES.map((service) => {
              const isOpen = openId === service.id;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId(isOpen ? "" : service.id)
                    }
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:bg-white/2 md:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base font-semibold text-white md:text-lg">
                      {service.title}
                    </span>
                    <span className="shrink-0 font-mono text-sm tabular-nums text-white/50 md:text-base">
                      ({service.id})
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="pb-6 md:pb-7">
                      <p className="max-w-md font-sans text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
                        {service.description}
                      </p>
                      <Link
                        href={service.hireHref}
                        className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#e60000] underline decoration-[#e60000] underline-offset-[0.22em] transition hover:text-[#ff4d4d] hover:decoration-[#ff4d4d] md:text-[0.9375rem]"
                      >
                        Hire Me
                        <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
                      </Link>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
