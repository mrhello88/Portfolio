import type { RefObject } from "react";
import { timelineMilestones } from "./data";

type JourneySectionProps = {
  lineFillRef: RefObject<HTMLDivElement | null>;
};

export default function JourneySection({ lineFillRef }: JourneySectionProps) {
  return (
    <section
      id="journey"
      className="border-t border-[var(--border)] bg-[var(--surface)] py-16 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="journey-head font-mono text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Journey
        </h2>
        <p className="journey-lede mt-3 max-w-xl text-[var(--muted)]">
          Milestones below animate from one master scroll timeline — not
          separate triggers per card.
        </p>

        <div className="relative mt-14 md:mt-20">
          <div
            className="pointer-events-none absolute left-[11px] top-3 bottom-3 w-px bg-[var(--border)] md:left-[13px]"
            aria-hidden
          />
          <div
            ref={lineFillRef}
            className="pointer-events-none absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-[var(--accent)] md:left-[13px]"
            style={{ transform: "scaleY(0)" }}
            aria-hidden
          />

          <ol className="relative flex flex-col gap-10 md:gap-14">
            {timelineMilestones.map((m) => (
              <li key={m.id} className="timeline-node flex gap-6 md:gap-8">
                <div className="relative flex w-6 shrink-0 justify-center md:w-7">
                  <span
                    className="relative z-10 mt-1.5 size-3 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)]"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <p className="font-mono text-sm text-[var(--accent)]">
                    {m.period}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[var(--muted)]">
                    {m.subtitle}
                  </p>
                  <article className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm md:max-w-2xl">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {m.body}
                    </p>
                    {m.tags && m.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {m.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-md bg-[var(--surface)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
