import Link from "next/link";
import { Container } from "./Container";
import { footerLinks, siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <p>© 2026 Teambotics. Flagship AI products for operations, creativity, and narrative systems.</p>
        <nav aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href={siteConfig.socials.linkedin} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
