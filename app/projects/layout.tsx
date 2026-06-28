import ContactModal from "@/components/portfolio/ContactModal";
import { ContactModalProvider } from "@/components/portfolio/ContactModalContext";
import SiteFooter from "@/components/portfolio/SiteFooter";
import SiteHeader from "@/components/portfolio/SiteHeader";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContactModalProvider>
      <SiteHeader />
      <main id="main-content" className="pt-(--site-header-total-h)">
        {children}
      </main>
      <SiteFooter />
      <ContactModal />
    </ContactModalProvider>
  );
}
