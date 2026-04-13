export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto mb-4 max-w-5xl px-6">
        <div className="footer-line h-px w-full bg-[var(--border)]" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-[var(--muted)]">
        © {new Date().getFullYear()} Your Name. Next.js &amp; GSAP.
      </div>
    </footer>
  );
}
