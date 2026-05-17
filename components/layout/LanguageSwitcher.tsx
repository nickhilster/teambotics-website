"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import {
  isSiteLocale,
  siteLocaleLabels,
  siteLocales,
  stripLocaleFromPath,
  withLocalePath,
} from "@/lib/siteLocale";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, messages } = useSiteLocale();

  return (
    <div className="language-switcher">
      <select
        aria-label={messages.header.languageLabel}
        className="language-switcher__select"
        onChange={(event) => {
          const nextLocale = event.target.value;

          if (isSiteLocale(nextLocale)) {
            const { pathname: basePath } = stripLocaleFromPath(pathname);
            const hash = typeof window === "undefined" ? "" : window.location.hash;

            router.push(withLocalePath(nextLocale, `${basePath}${hash}`));
          }
        }}
        value={locale}
      >
        {siteLocales.map((localeOption) => (
          <option key={localeOption} value={localeOption}>
            {siteLocaleLabels[localeOption]}
          </option>
        ))}
      </select>
    </div>
  );
}