"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { Container } from "./Container";

export function Footer() {
  const pathname = usePathname();
  const { locale, messages } = useSiteLocale();
  const isHome = pathname === "/" || pathname === `/${locale}`;
  const homeCopyright = {
    en: "© 2026 Teambotics. AI consultancy for human and agent workflows.",
    "fr-CA": "© 2026 Teambotics. Conseil en IA pour les processus humains et les agents.",
    "es-419": "© 2026 Teambotics. Consultoría de IA para flujos de trabajo entre personas y agentes.",
  };

  return (
    <footer className="site-footer">
      <Container
        className="site-footer__inner"
        style={{ alignItems: "flex-start", gap: "clamp(1.5rem, 4vw, 4rem)" }}
      >
        <p style={{ maxWidth: "36rem", lineHeight: 1.55 }}><strong style={{ display: "block", marginBottom: ".5rem" }}>{siteConfig.tagline}</strong>{isHome ? homeCopyright[locale] : messages.footer.copyright}</p>
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
        <section className="site-footer__ai-disclaimer" aria-label="AI disclaimer">
          <p>
            “Everything’s computer.”{" "}
            <cite>
              — <a
                href="https://rollcall.com/factbase/trump/transcript/donald-trump-press-gaggle-tesla-vehicles-white-house-march-11-2025"
                target="_blank"
                rel="noopener noreferrer"
                title="March 11, 2025 transcript, 20:32–20:47"
              >
                President of the United States of America, 2025
                <span className="sr-only"> (opens transcript in new tab)</span>
              </a>
            </cite>
          </p>
          <p>
            “Everything’s AI.”{" "}
            <cite>— Teambotics, 2026</cite>
          </p>
        </section>
        <p className="site-footer__made">{"\u2764\ufe0f"} {messages.footer.madeWith}</p>
      </Container>
    </footer>
  );
}
