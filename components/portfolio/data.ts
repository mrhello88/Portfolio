export type TimelineMilestone = {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  body: string;
  tags?: string[];
};

export const SITE_NAV = [
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
] as const;

export const heroWordsPrimary = ["Career", "&", "work,"];
export const heroWordsAccent = ["in", "order."];

/** Blob-clipped hero portrait — put your PNG in /public and set e.g. "/hero-portrait.png". */
export const HERO_PORTRAIT_SRC = "/herosection-image.webp";

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "start",
    period: "Today",
    title: "Your Name",
    subtitle: "Full-stack developer",
    body: "You are here — building products on the web. Swap this copy for your one-line story.",
  },
  {
    id: "role-1",
    period: "2023 — Present",
    title: "Senior role @ Company",
    subtitle: "Product engineering",
    body: "Shipped features end-to-end: APIs, dashboards, and design systems. Quantify impact when you can.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "role-2",
    period: "2020 — 2023",
    title: "Engineer @ Previous Co.",
    subtitle: "Platform & integrations",
    body: "Owned services, on-call rotation, and cross-team APIs. Mention scale or users if it helps.",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    id: "edu",
    period: "2016 — 2020",
    title: "Computer Science",
    subtitle: "University name",
    body: "Foundations, internships, or notable coursework — keep it short.",
    tags: ["Algorithms", "Systems"],
  },
  {
    id: "project",
    period: "Side work",
    title: "Flagship project",
    subtitle: "Open source or product",
    body: "Link a repo or live demo from this card. Describe the problem and what you learned.",
    tags: ["Next.js", "GSAP"],
  },
];
