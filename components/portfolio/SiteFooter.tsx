export default function SiteFooter() {
  return (
    <footer className="border-t border-(--border) py-8">
      <div className="mx-auto mb-4 max-w-5xl px-6">
        <div className="footer-line h-px w-full bg-(--border)" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-(--muted)">
        © {new Date().getFullYear()} Your Name. Next.js &amp; Lenis.
      </div>
    </footer>
  );
}
