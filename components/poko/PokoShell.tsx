"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./poko-site.module.css";

const navItems = [
  { href: "/", label: "Product" },
  { href: "/how-to-use", label: "How to Use" },
  { href: "/features", label: "Features" },
  { href: "/admin", label: "Admin" },
];

export function PokoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.navWrap}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandKicker}>Poko</span>
            <span className={styles.brandName}>Desktop agent presence, made legible.</span>
          </Link>
          <nav className={styles.nav} aria-label="Poko site navigation">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>Poko is the active product line for the desktop runtime, themes, voice work, and Steward direction in this repo.</span>
          <a href="https://github.com/Teambotics-BackBurner/poko" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
