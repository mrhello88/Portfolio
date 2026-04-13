export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-[var(--border)] py-20 md:py-28"
    >
      <div className="contact-block mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-[var(--accent)]">
          Contact
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
          Same scroll timeline brings this section in — tweak times in{" "}
          <span className="font-mono text-[var(--foreground)]">scrollTl</span>{" "}
          to re-order.
        </p>
        <a
          href="mailto:you@example.com"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-8 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-stone-950"
        >
          you@example.com
        </a>
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
