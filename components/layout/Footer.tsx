"use client";

import Link from "next/link";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { Container } from "./Container";

export function Footer() {
  const { messages } = useSiteLocale();

  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <p>{messages.footer.copyright}</p>
        <nav aria-label={messages.footer.navLabel}>
          <Link href="/about">About</Link>
          <Link href="/privacy">{messages.footer.privacyLabel}</Link>
          <Link href="/terms">{messages.footer.termsLabel}</Link>
          <Link href={siteConfig.socials.linkedin} rel="noopener noreferrer" target="_blank">
            {messages.footer.linkedInLabel}
            <span className="sr-only"> (opens in new tab)</span>
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
