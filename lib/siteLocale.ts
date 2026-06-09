import { siteMessagesEs419 } from "@/lib/i18n/generated/siteMessages.es-419";
import { siteMessagesFrCA } from "@/lib/i18n/generated/siteMessages.fr-CA";
import { siteMessagesEn } from "@/lib/i18n/siteMessages.source";
import {
  localizedRouteLocales,
  siteLocales,
  type LocalizedRouteLocale,
  type SiteLocale,
  type SiteMessages,
} from "@/lib/i18n/types";

export { localizedRouteLocales, siteLocales };
export type { LocalizedRouteLocale, SiteLocale, SiteMessages };

export const siteLocaleLabels: Record<SiteLocale, string> = {
  en: "English",
  "fr-CA": "Français",
  "es-419": "Español",
};

export const siteLocaleHtmlLang: Record<SiteLocale, string> = {
  en: "en",
  "fr-CA": "fr-CA",
  "es-419": "es-419",
};

export function getLocalePathPrefix(locale: SiteLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export function withLocalePath(locale: SiteLocale, path: string) {
  const [pathWithoutHash, hash = ""] = path.split("#", 2);
  const normalizedPath = pathWithoutHash === "/" ? "/" : pathWithoutHash.replace(/\/$/, "") || "/";
  const localizedPath = locale === "en"
    ? normalizedPath
    : normalizedPath === "/"
      ? `/${locale}`
      : `/${locale}${normalizedPath}`;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

export function stripLocaleFromPath(pathname: string) {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/";

  for (const locale of localizedRouteLocales) {
    if (normalizedPath === `/${locale}`) {
      return {
        locale,
        pathname: "/",
      } as const;
    }

    if (normalizedPath.startsWith(`/${locale}/`)) {
      return {
        locale,
        pathname: normalizedPath.slice(locale.length + 1),
      } as const;
    }
  }

  return {
    locale: "en",
    pathname: normalizedPath,
  } as const;
}

const siteMessages: Record<SiteLocale, SiteMessages> = {
  en: siteMessagesEn,
  "fr-CA": siteMessagesFrCA,
  "es-419": siteMessagesEs419,
};

export function getSiteMessages(locale: SiteLocale): SiteMessages {
  return siteMessages[locale];
}

export function isSiteLocale(value: string): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale);
}