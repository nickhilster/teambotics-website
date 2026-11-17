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
            // Only the home and product pages have localized routes. For any
            // other page (about, legal, editorial), switch to the localized
            // home instead of pushing a locale-prefixed URL that 404s.
            const hasLocalizedRoute = basePath === "/" || basePath.startsWith("/products");
            const target = hasLocalizedRoute ? `${basePath}${hash}` : "/";

            router.push(withLocalePath(nextLocale, target));
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