"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "./Container";

const navItems = [
  { href: "#flagships", label: "Flagships" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#engagement", label: "Approach" },
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
          <Button className="site-header__cta" href="#contact">
            Start a conversation
          </Button>
          <ThemeToggle />
          <button
            aria-controls="mobile-drawer"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            className="site-nav-toggle"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      <div className={`mobile-drawer${isOpen ? " mobile-drawer--open" : ""}`} id="mobile-drawer">
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
          <Button href="#contact">Start a conversation</Button>
        </Container>
      </div>
    </header>
  );
}
