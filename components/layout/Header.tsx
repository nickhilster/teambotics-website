"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { TeamboticsSVGLogo } from "@/components/layout/TeamboticsSVGLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { withLocalePath } from "@/lib/siteLocale";
import { Container } from "./Container";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, messages } = useSiteLocale();
  const navItems = messages.header.navItems;
  const showLanguageSwitcher = pathname !== "/privacy" && pathname !== "/terms";
  const homeHref = withLocalePath(locale, "/");
  const contactHref = withLocalePath(locale, "/#contact");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerFirstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus first drawer link when drawer opens; return focus to toggle when it closes
  useEffect(() => {
    if (isOpen) {
      drawerFirstLinkRef.current?.focus();
    } else {
      // Only return focus if the drawer was previously open (not on initial render)
      if (document.activeElement && (document.activeElement as HTMLElement).closest("#mobile-drawer")) {
        toggleRef.current?.focus();
      }
    }
  }, [isOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
      <Container className="site-header__inner">
        <Link className="site-logo" href={homeHref}>
          <TeamboticsSVGLogo />
          <span className="site-logo__text">Teambotics</span>
        </Link>
        <nav className="site-nav" aria-label={messages.header.navLabel}>
          {navItems.map((item) => (
            <Link key={item.href} href={`${homeHref}${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__meta">
          {showLanguageSwitcher ? <LanguageSwitcher /> : null}
          <ThemeToggle />
          <button
            ref={toggleRef}
            aria-controls="mobile-drawer"
            aria-expanded={isOpen}
            aria-label={isOpen ? messages.header.closeNavigationLabel : messages.header.openNavigationLabel}
            className="site-nav-toggle"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      <div
        className={`mobile-drawer${isOpen ? " mobile-drawer--open" : ""}`}
        id="mobile-drawer"
        aria-hidden={!isOpen}
      >
        <Container className="mobile-drawer__inner">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? drawerFirstLinkRef : undefined}
              href={`${homeHref}${item.href}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href={contactHref}>{messages.header.ctaLabel}</Button>
        </Container>
      </div>
    </header>
  );
}
