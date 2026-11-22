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
import { stripLocaleFromPath, withLocalePath } from "@/lib/siteLocale";
import { Container } from "./Container";

const consultancyNav = {
  en: [
    { label: "How we work", href: "#systems" },
    { label: "Products", href: "#capabilities" },
    { label: "Start a project", href: "#engagement" },
    { label: "Contact", href: "#contact" },
    { label: "Values", href: "https://blog.teambotics.app/values" },
  ],
  "fr-CA": [
    { label: "Notre approche", href: "#systems" },
    { label: "Produits", href: "#capabilities" },
    { label: "Démarrer un projet", href: "#engagement" },
    { label: "Contact", href: "#contact" },
    { label: "Values", href: "https://blog.teambotics.app/values" },
  ],
  "es-419": [
    { label: "Cómo trabajamos", href: "#systems" },
    { label: "Productos", href: "#capabilities" },
    { label: "Iniciar un proyecto", href: "#engagement" },
    { label: "Contacto", href: "#contact" },
    { label: "Values", href: "https://blog.teambotics.app/values" },
  ],
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, messages } = useSiteLocale();
  const navItems = consultancyNav[locale];
  const homeHref = withLocalePath(locale, "/");
  const { pathname: basePath } = stripLocaleFromPath(pathname);
  const isHome = basePath === "/";
  // The editorial pages share the landing's cream/green surface, which has no
  // dark variant, so they hide the theme toggle like the landing does.
  const isEditorialPage =
    isHome ||
    ["/about", "/privacy", "/terms", "/land-acknowledgment", "/everythings-computer"].some(
      (route) => basePath === route || basePath === `${route}/`,
    );
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
        <Link
          aria-label="Teambotics — go to homepage"
          className="site-logo"
          href={homeHref}
        >
          <TeamboticsSVGLogo />
          <span className="site-logo__text">Teambotics</span>
        </Link>
        <nav className="site-nav" aria-label={messages.header.navLabel}>
          {navItems.map((item) => item.href.startsWith("https://") ? (
            <a href={item.href} key={item.href}>{item.label}</a>
          ) : (
            <Link key={item.href} href={`${homeHref}${item.href}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__meta">
          <LanguageSwitcher />
          {isEditorialPage ? null : <ThemeToggle />}
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
          {navItems.map((item, index) => item.href.startsWith("https://") ? (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
          ) : (
            <Link
              key={item.href}
              ref={index === 0 ? drawerFirstLinkRef : undefined}
              href={`${homeHref}${item.href}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href={contactHref}>{navItems.find((item) => item.href === "#contact")?.label}</Button>
        </Container>
      </div>
    </header>
  );
}
