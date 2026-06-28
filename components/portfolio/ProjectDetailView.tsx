import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { ProjectDetail } from "./projectsData";
import { LAYOUT_MAX_WIDTH_CLASS } from "./data";

const metaLabelClass =
  "font-mono text-xs font-medium uppercase tracking-wider text-[#e60000]";
const metaValueClass = "mt-1 font-sans text-sm text-white md:text-base";
const sectionTitleClass =
  "font-sans text-2xl font-bold tracking-tight text-white md:text-3xl";
const bodyClass =
  "font-sans text-base leading-relaxed text-white/65 md:text-lg";
const listClass =
  "mt-4 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-white/65 md:text-lg";

const PAGE_X = "px-6 sm:px-8 md:px-10 lg:px-12";
const PAGE_Y = "pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-36 lg:pb-36";

type ProjectDetailViewProps = {
  project: ProjectDetail;
};

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const railClass = `mx-auto w-full ${LAYOUT_MAX_WIDTH_CLASS} ${PAGE_X}`;

  return (
    <article className={`min-h-screen bg-black text-white ${PAGE_Y}`}>
      <div className="flex flex-col gap-16 md:gap-20">
        {/* Hero */}
        <header className="border-b border-white/10 pb-16 md:pb-20">
          <div className={railClass}>
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-xs tracking-wide text-white/45 md:text-sm"
            >
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-white/25">
                  {"//"}
                </li>
                <li>
                  <Link
                    href="/#projects"
                    className="transition hover:text-white"
                  >
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden className="text-white/25">
                  {"//"}
                </li>
                <li className="text-[#e60000]">{project.title}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(260px,320px)] lg:items-start lg:gap-12">
              <div>
                <h1 className="font-sans text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className={`mt-5 max-w-2xl ${bodyClass}`}>
                  {project.tagline}
                </p>
                {project.liveUrl && project.liveUrl !== "#" ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e60000] px-6 py-3 font-sans text-sm font-semibold text-black transition hover:bg-[#ff1a1a]"
                  >
                    Live preview
                    <ExternalLink className="size-4" aria-hidden />
                  </a>
                ) : (
                  <span className="mt-8 inline-flex items-center rounded-full border border-white/15 px-6 py-3 font-sans text-sm text-white/45">
                    Live preview coming soon
                  </span>
                )}
              </div>

              <aside className="rounded-xl border border-white/10 bg-white/3 p-5 md:p-6">
                <dl className="space-y-5">
                  <div>
                    <dt className={metaLabelClass}>Client</dt>
                    <dd className={metaValueClass}>{project.client}</dd>
                  </div>
                  <div>
                    <dt className={metaLabelClass}>Industry</dt>
                    <dd className={metaValueClass}>{project.industry}</dd>
                  </div>
                  <div>
                    <dt className={metaLabelClass}>Timeline</dt>
                    <dd className={metaValueClass}>{project.timeline}</dd>
                  </div>
                  <div>
                    <dt className={metaLabelClass}>Technologies</dt>
                    <dd className={metaValueClass}>
                      {project.technologiesSummary}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </header>

        {/* Hero mockup */}
        <div className={railClass}>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/3">
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={`${project.title} project preview`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-white/6 to-white/2">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                  Project image soon
                </span>
                <span className="font-sans text-sm text-white/25">
                  Replace heroImage in projectsData.ts
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content sections */}
        <div className={`${railClass} space-y-16 md:space-y-20`}>
          <section>
            <h2 className={sectionTitleClass}>Project overview</h2>
            <div className="mt-5 space-y-4">
              {project.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={bodyClass}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className={sectionTitleClass}>Your role</h2>
            <ul className={listClass}>
              {project.role.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={sectionTitleClass}>Tech stack used</h2>
            <ul className={`${listClass} list-none space-y-3 pl-0`}>
              {project.techStack.map((item) => (
                <li key={item.label}>
                  <span className="font-semibold text-white">
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={sectionTitleClass}>Key features</h2>
            <ul className={listClass}>
              {project.keyFeatures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.platformModules && project.platformModules.length > 0 ? (
            <section>
              <h2 className={sectionTitleClass}>
                {project.modulesSectionTitle ?? "Platform modules"}
              </h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {project.platformModules.map((module) => (
                  <div
                    key={module.title}
                    className="rounded-xl border border-white/10 bg-white/3 p-5 md:p-6"
                  >
                    <h3 className="font-sans text-lg font-semibold text-white md:text-xl">
                      {module.title}
                    </h3>
                    <ul className={`${listClass} mt-3`}>
                      {module.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.userRoles && project.userRoles.length > 0 ? (
            <section>
              <h2 className={sectionTitleClass}>User roles</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {project.userRoles.map((role) => (
                  <div
                    key={role.title}
                    className="rounded-xl border border-white/10 bg-white/3 p-5 md:p-6"
                  >
                    <h3 className="font-sans text-lg font-semibold text-white md:text-xl">
                      {role.title}
                    </h3>
                    <ul className={`${listClass} mt-3`}>
                      {role.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {project.targetAudience && project.targetAudience.length > 0 ? (
            <section>
              <h2 className={sectionTitleClass}>Target audience</h2>
              <ul className={listClass}>
                {project.targetAudience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section>
            <h2 className={sectionTitleClass}>
              Code structure &amp; architecture
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0a] p-5 md:p-6">
              <pre className="font-mono text-sm leading-relaxed text-white/70">
                {project.codeStructure.join("\n")}
              </pre>
            </div>
            {project.performanceOptimizations &&
            project.performanceOptimizations.length > 0 ? (
              <>
                <h3 className="mt-8 font-sans text-xl font-semibold text-white md:text-2xl">
                  Performance optimizations
                </h3>
                <ul className={`${listClass} mt-4`}>
                  {project.performanceOptimizations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {project.architecturePoints.length > 0 ? (
              <ul className={`${listClass} mt-6`}>
                {project.architecturePoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>

          <section>
            <h2 className={sectionTitleClass}>Challenges &amp; solutions</h2>
            <ul className="mt-6 space-y-8">
              {project.challenges.map((item) => (
                <li
                  key={item.challenge}
                  className="border-l-2 border-[#e60000]/50 pl-5"
                >
                  <p className="font-sans text-base font-medium text-white md:text-lg">
                    {item.challenge}
                  </p>
                  <p className={`mt-2 ${bodyClass}`}>{item.solution}</p>
                </li>
              ))}
            </ul>
          </section>

          {project.results && project.results.length > 0 ? (
            <section>
              <h2 className={sectionTitleClass}>Results</h2>
              <ul className={listClass}>
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="border-t border-white/10 pt-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white transition hover:text-[#e60000]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to all projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
