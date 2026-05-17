"use client";

import { createContext, useContext, useEffect } from "react";
import {
  getSiteMessages,
  siteLocaleHtmlLang,
  type SiteLocale,
  type SiteMessages,
} from "@/lib/siteLocale";

type SiteLocaleContextValue = {
  locale: SiteLocale;
  messages: SiteMessages;
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

export function LocaleProvider({ children, locale }: { children: React.ReactNode; locale: SiteLocale }) {
  const messages = getSiteMessages(locale);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.lang = siteLocaleHtmlLang[locale];
  }, [locale]);

  return (
    <SiteLocaleContext.Provider
      value={{
        locale,
        messages,
      }}
    >
      {children}
    </SiteLocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const context = useContext(SiteLocaleContext);

  if (!context) {
    throw new Error("useSiteLocale must be used within a LocaleProvider");
  }

  return context;
}