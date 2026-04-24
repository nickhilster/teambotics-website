"use client";

import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "./Container";

const navItems = [
  { href: "#live-systems", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#positioning", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " site-header--scrolled" : ""}`}>
      <Container className="site-header__inner">
        <Link className="site-logo" href="/">
          [ teambotics ]
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__meta">
          <Link aria-label="Contact Teambotics" className="header-icon-link" href="#contact">
            <Mail aria-hidden="true" size={17} strokeWidth={1.8} />
          </Link>
          <ThemeToggle />
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="site-nav-toggle"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      <div className={`mobile-drawer${isOpen ? " mobile-drawer--open" : ""}`}>
        <Container className="mobile-drawer__inner">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href="#contact">Contact</Button>
        </Container>
      </div>
    </header>
  );
}
