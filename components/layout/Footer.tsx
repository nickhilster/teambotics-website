"use client";

import Link from "next/link";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { Container } from "./Container";

export function Footer() {
  const { messages } = useSiteLocale();

  return (
    <footer className="site-footer">
      <Container
        className="site-footer__inner"
        style={{ alignItems: "flex-start", gap: "clamp(1.5rem, 4vw, 4rem)" }}
      >
        <p style={{ maxWidth: "36rem", lineHeight: 1.55 }}>{messages.footer.copyright}</p>
        <nav
          aria-label={messages.footer.navLabel}
          style={{
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            rowGap: "0.75rem",
            textAlign: "left",
          }}
        >
          <Link href="/about">About</Link>
          <Link href="/land-acknowledgment">Land Acknowledgment</Link>
          <Link href="/privacy">{messages.footer.privacyLabel}</Link>
          <Link href="/terms">{messages.footer.termsLabel}</Link>
          <Link href={siteConfig.socials.linkedin} rel="noopener noreferrer" target="_blank">
            {messages.footer.linkedInLabel}
            <span className="sr-only"> (opens in new tab)</span>
          </Link>
        </nav>
      </Container>
      <Container>
        <p className="site-footer__made">{"\u2764\ufe0f"} {messages.footer.madeWith}</p>
      </Container>
    </footer>
  );
}
