export type Testimonial = {
  client: string;
  shortSummary: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  clientRequirements: string;
  challenges: string;
  delivered: string[];
  clientFeedback: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    client: "Energy Recruitment Platform",
    shortSummary:
      "Energy Recruitment began with a Wix to Next.js migration and dashboard, then grew into a broader platform with workflows, subscriptions, candidate management, and AI as we partnered long term with the founder and adapted scope as the product evolved.",
    quote:
      "Brilliant work from start to finish. Great communication, quick turnaround, and really high quality results on the dashboard build. He understood exactly what we needed and delivered beyond expectations. Highly recommended, will definitely use again.",
    name: "ian_johnson27",
    role: "Founder / Project Stakeholder & Decision Maker",
    avatar: "/testimonial/testimonail-4.png",
    clientRequirements: `Initial goals

Move off Wix onto a custom Next.js platform with better performance, full ownership, and room to grow.

Core scope
• Wix → Next.js migration
• Admin & Staff (VA) dashboards with role based access
• Job panel: add, edit, publish, and remove listings
• Candidate CV storage & management
• Subscription ready architecture for premium jobs
• Responsive UI across admin and public surfaces
• Bulk job uploads (spreadsheet / CMS style workflow)`,
    challenges: `How the project evolved

A Wix migration and job board became a full recruitment and career platform. We shipped new workflows, automation, and AI features as the business scaled.

What we added over time

Design & UX
• Custom UI/UX from scratch for admins and job seekers
• Iterative layout and workflow improvements from stakeholder feedback

Access & roles
• Admin, Staff/VA, Recruiter, Job Seeker, and membership tiers, each with its own permissions and flows

AI recruitment
• AI job creation, smart recommendations, CV analysis, candidate matching, and workflow automation

Career Intelligence
• CV driven insights: job fit, career roadmaps, skills gaps, upskilling paths, role transitions, and personalized scoring, so candidates see their next step, not just open roles

Partnership model
• Long term collaboration: ongoing planning, phased roadmap, and features shaped by real business feedback, not a one off website handoff.`,
    delivered: [
      "Wix → Next.js migration & scalable foundation",
      "Custom UI/UX (admin + job seeker)",
      "Multi role access (Admin, VA, Recruiter, Seeker, Member)",
      "Job management, CV storage & bulk uploads",
      "Subscriptions & premium job listings",
      "AI job creation, matching & CV analysis",
      "Recruitment workflow automation",
      "Career Intelligence (roadmaps, gaps, scoring)",
      "Career transition & upskilling recommendations",
      "Ongoing feature expansion with the client",
    ],
    clientFeedback: `Brilliant work from start to finish. Great communication, quick turnaround, and really high quality results on the dashboard build. He understood exactly what we needed and delivered beyond expectations. Highly recommended, will definitely use again.

Ratings (5/5)
• Seller communication level
• Quality of delivery
• Value of delivery

What went well
• Quick responsiveness
• Deep understanding
• Went above and beyond
• Attention to details
• Code expertise
• Professionalism of work`,
  },
  {
    client: "Tujitume Trusted Fundraising Platform",
    shortSummary:
      "A standalone React + Tailwind SME & Business Loans Directory for the Tujitume platform: searchable lender and SACCO listings, map view, curated and live data tabs, and a CRON link checker, built to lift and shift into their existing Laravel stack.",
    quote:
      "Great to work with easy communication, responsive, and delivered what was asked. Open to feedback and made changes quickly which made the whole process smooth. Would happily work together again.",
    name: "swaruta",
    role: "Product Owner / Project Coordinator",
    avatar: "/testimonial/testimonial-1.jpg",
    clientRequirements: `Initial goals

Add a new SME & Business Loans Directory module inside the existing Tujitume Beta website.

Core scope
• Resource directory at /resources/kenya-business-loans with tabs: Banks, SACCOs, Curated, Live
• Search and filters: find lenders, filter SACCOs, browse by category/type
• Interactive map: show SACCOs and lenders with location based viewing
• Login gated access (auth, protected routes, secure sessions) noted in early docs; later deferred to a future phase
• CRON link checker: scheduled job to verify lender URLs and flag broken/inactive links
• Lift and shift delivery: standalone build, Laravel friendly integration, full source + setup guide
• UI aligned with the current site (no Figma; rough wireframes and existing theme only)`,
    challenges: `How the project evolved

After kickoff, several technical and architectural issues surfaced and were resolved with the client.

Tech stack clarification
Early docs referenced Next.js, but the live stack was Laravel backend with React + Tailwind frontend. We aligned on a standalone React + Tailwind module.

Authentication scope
Login and secure sessions were in scope on paper, but without source access or backend APIs, auth was planned for a later integration phase.

SACCO location data
A licensed SACCOs PDF had no lat/lng, so maps could not render until addresses were geocoded.

County and dataset mismatch
Existing datasets used different naming conventions, which broke direct county mapping until normalization was added.

Live vs curated data
The Live tab had to be built from the official PDF, separate from static curated data, requiring custom parsing and mapping.

Partnership approach
We delivered a deployment ready module with documentation so the client could review, host a demo, and integrate into Laravel on their timeline.`,
    delivered: [
      "Full React + Tailwind source (Laravel friendly, modular)",
      "SME & Business Loans Directory UI",
      "Multi tab layout (Banks, SACCOs, Curated, Live)",
      "Lender search and SACCO filtering",
      "Interactive map with geocoded locations",
      "Curated and Live dataset handling",
      "Automated CRON link checker",
      "Demo deployment",
      "Setup guide and integration documentation",
    ],
    clientFeedback: `Great to work with easy communication, responsive, and delivered what was asked. Open to feedback and made changes quickly which made the whole process smooth. Would happily work together again.

Ratings (5/5)
• Seller communication level
• Quality of delivery
• Value of delivery

What went well
• Easy communication
• Responsive throughout the project
• Delivered what was asked
• Open to feedback
• Quick changes and iterations
• Smooth collaboration process`,
  },
  {
    client: "E-Commerce Platform (Admin, Sellers & Users)",
    shortSummary:
      "Stabilize and complete an existing ecommerce platform with auth failures, dashboard instability, backend bugs, and deployment issues. Work moved through staged fixes into platform wide optimization, payments, database integration, and production readiness for admins, sellers, and end users.",
    quote:
      "Very clean and professional. His work is really on point.",
    name: "dacallender1112",
    role: "Platform Owner / Feature direction, bug fixes & delivery",
    avatar: "/testimonial/testimonial-2.png",
    clientRequirements: `Initial goals

Transform an unstable platform into a reliable, scalable system for administrators, sellers, and end users. Delivery was split into stages to fix critical issues systematically.

Stage 1: Authentication recovery
• Fix admin login issues
• Restore successful auth for admin and users
• Verify authentication flow and deployment environment
• Test production login process

Stage 2: Core fixes and dashboard stability
• Resolve backend and frontend issues
• Improve API connectivity and routing
• Improve platform performance
• Stabilize admin dashboard and seller management workflows

Stage 3: Production optimization
• Complete remaining platform features
• Improve security and performance
• Final testing, QA, and production deployment validation
• Codebase cleanup and optimization`,
    challenges: `How the project evolved

What started as authentication fixes expanded into full platform stabilization as deeper investigation uncovered issues across the stack.

Authentication and access control
• Fixed admin authentication flow and restored login
• Validated role based access and improved reliability

Dashboard stability
• Resolved dashboard issues and seller management workflows
• Enhanced admin operations and user management

Backend and API
• Fixed API communication and routing architecture
• Improved backend stability and system performance

Deployment and infrastructure
• Verified deployment configuration and production reliability
• Resolved environment issues and tested deployment workflows`,
    delivered: [
      "Admin and user authentication recovery",
      "Access management improvements",
      "Core ecommerce functionality fixes",
      "Stripe integration and payment flow validation",
      "Seller dashboard stabilization",
      "Admin panel and user management enhancements",
      "Database integration and Supabase configuration",
      "Backend connectivity improvements",
      "Production deployment validation",
      "Codebase cleanup and optimization",
    ],
    clientFeedback: `Very clean and professional. His work is really on point.

Ratings (5/5)
• Seller communication level
• Quality of delivery
• Value of delivery

What went well
• Clean and professional delivery
• High quality, on point work
• Polished final output`,
  },
  {
    client: "Corporate News & Company Website",
    shortSummary:
      "Custom Next.js corporate site to showcase technology, social responsibility, innovation, and brand trust. Delivered in milestones from landing page to a full multi page presence with news, articles, about, and a cohesive design system.",
    quote:
      "Abubakar is an outstanding talent in the web field and provides excellent service. He not only delivered results that satisfied me but also helped me with some additional work after I completed the payment. Through this project, we became friends.",
    name: "Client Name",
    role: "Business Owner / Stakeholder",
    avatar: "/testimonial/testimonial-3.png",
    clientRequirements: `Initial goals

Build a modern corporate website that communicates technology, social responsibility, innovation, and strong brand presence with a professional, responsive digital experience.

Core scope
• Modern, technology focused brand presentation
• Company news and updates
• Mission, vision, and values
• Trust and credibility across the site
• Responsive layouts on all devices
• Clean, professional visual identity
• Smooth interactions and animations`,
    challenges: `How the project evolved

The engagement started with a landing page and grew into a complete multi page corporate site with a unified design system and reusable frontend architecture.

Homepage
• Modern hero, CTAs, company intro, news highlights
• Responsive layouts, animations, and clear visual hierarchy

News platform
• Article grids, cover images, metadata, previews, pagination
• Modern card based UI

Dynamic article pages
• Rich content rendering, typography hierarchy, author blocks
• Related content and an optimized reading experience

About and brand presence
• Company story, mission and vision, team showcase
• Contact design and values/culture sections

Design system and architecture
• Reusable components, typography, responsive and accessible structure
• Framer Motion: hovers, page transitions, loading states, skeleton loaders, micro interactions
• Optimized for mobile, tablet, desktop, and large displays`,
    delivered: [
      "Next.js and React frontend architecture",
      "Responsive design system and reusable components",
      "Homepage design and development",
      "News listing page",
      "Dynamic article pages",
      "About page and brand presence sections",
      "Framer Motion animations and interactions",
      "Loading states and skeleton loaders",
      "Performance and responsive optimization",
    ],
    clientFeedback: `Abubakar is an outstanding talent in the web field and provides excellent service. He not only delivered results that satisfied me but also helped me with some additional work after I completed the payment. Through this project, we became friends.

Ratings (5/5)
• Seller communication level
• Quality of delivery
• Value of delivery

What went well
• Outstanding web development talent
• Excellent service and communication
• Delivered satisfying results
• Extra support even after payment
• Strong collaboration and trust`,
  },
];
