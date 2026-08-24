"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import LoginGate from "@/components/admin/common/LoginGate";
import styles from "@/components/poko/poko-site.module.css";

type PokoAdminChromeProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/roadmap", label: "Roadmap" },
  { href: "/admin/trackerbuddy", label: "TrackerBuddy" },
  { href: "/admin/controls", label: "Controls" },
];

export function PokoAdminChrome({ title, description, children }: PokoAdminChromeProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthConfigured, setIsAuthConfigured] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    void checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/session');
      const payload = (await res.json()) as { authenticated: boolean; configured: boolean };
      setIsAuthenticated(payload.authenticated ?? false);
      setIsAuthConfigured(payload.configured ?? false);
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function login(password: string): Promise<boolean> {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };
      if (result.ok) {
        setIsAuthenticated(true);
        return true;
      }
      setLoginError(result.error ?? 'Invalid password.');
      return false;
    } catch {
      setLoginError('Network error. Please try again.');
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => null);
    setIsAuthenticated(false);
  }

  if (isAuthenticated === false) {
    return (
      <LoginGate
        title={title}
        description={description}
        onLogin={login}
        isLoggingIn={isLoggingIn}
        error={loginError}
        isConfigured={isAuthConfigured}
      />
    );
  }

  if (isAuthenticated === null) {
    return <div className={styles.page}><p className={styles.note}>Checking admin session…</p></div>;
  }

  return (
    <main className="admin-shell">
      <div className="admin-page-container">
        <header className={styles.adminHeader}>
          <div>
            <p className={styles.kicker}>Internal preview</p>
            <h1 className={styles.pageTitle} style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>{title}</h1>
            <p className={styles.sectionIntro}>{description}</p>
            <p className={styles.note}>This is an internal admin surface for Poko product operations. It is convenience-gated, not presented as a public product surface.</p>
          </div>
          <Button onClick={logout} variant="ghost">Sign out</Button>
        </header>
        <nav className={styles.adminNav} aria-label="Poko admin navigation">
          {adminLinks.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        {children}
      </div>
    </main>
  );
}
