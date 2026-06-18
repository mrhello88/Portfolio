"use client";

import {
  trackContactModalOpen,
} from "@/lib/analytics/gtag";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ContactSource =
  | "header"
  | "hero"
  | "services"
  | "contact-section";

type ContactModalContextValue = {
  open: boolean;
  source: ContactSource;
  openContact: (
    source?: ContactSource,
    extra?: Record<string, string | undefined>,
  ) => void;
  closeContact: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null,
);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ContactSource>("header");

  const openContact = useCallback(
    (
      from: ContactSource = "header",
      extra?: Record<string, string | undefined>,
    ) => {
      setSource(from);
      setOpen(true);
      trackContactModalOpen(from, extra);
    },
    [],
  );

  const closeContact = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, source, openContact, closeContact }),
    [open, source, openContact, closeContact],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}
