"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
  const [password, setPassword] = useState("");

  useEffect(() => {
    void checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/admin/session");
      const payload = (await res.json()) as { authenticated: boolean; configured: boolean };
      setIsAuthenticated(payload.authenticated ?? false);
      setIsAuthConfigured(payload.configured ?? false);
    } catch {
      setIsAuthenticated(false);
    }
  }

  async function login(nextPassword: string): Promise<boolean> {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: nextPassword }),
      });
      const result = (await res.json()) as { ok: boolean; error?: string };
      if (result.ok) {
        setIsAuthenticated(true);
        setPassword("");
        return true;
      }
      setLoginError(result.error ?? "Invalid password.");
      return false;
    } catch {
      setLoginError("Network error. Please try again.");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setIsAuthenticated(false);
  }

  if (isAuthenticated === false) {
    return (
      <div className={styles.authGate}>
        <div className={styles.authCard}>
          <p className={styles.authEyebrow}>Internal preview</p>
          <h1 className={styles.authTitle}>{title}</h1>
          <p className={styles.authDescription}>{description}</p>
          <p className={styles.note} style={{ marginBottom: "1rem" }}>
            This admin is convenience-gated for internal use. It is not presented as a public product surface or a hardened security boundary.
          </p>
          <div className={styles.authForm}>
            <label className={styles.inputWrap}>
              <span className={styles.inputLabel}>Password</span>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter internal password"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    void login(password);
                  }
                }}
              />
            </label>
            {loginError ? <div className={styles.error}>{loginError}</div> : null}
            {isAuthConfigured === false ? (
              <div className={styles.error}>Admin password is not configured for this deployment.</div>
            ) : null}
            <div className={styles.actions} style={{ marginTop: 0 }}>
              <Button onClick={() => login(password)} variant="primary">
                {isLoggingIn ? "Signing in…" : "Sign in"}
              </Button>
              <Link href="/" className="button button--ghost">Back to product</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return <div className={styles.page}><p className={styles.note}>Checking admin session…</p></div>;
  }

  return (
    <main className={styles.page}>
      <header className={styles.adminHeader}>
        <div>
          <p className={styles.kicker}>Internal preview</p>
          <h1 className={styles.pageTitle} style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>{title}</h1>
          <p className={styles.sectionIntro}>{description}</p>
          <p className={styles.note}>This is an internal admin surface for Poko product operations. It is convenience-gated and intentionally distinct from the public Teambotics site.</p>
        </div>
        <Button onClick={logout} variant="ghost">Sign out</Button>
      </header>
      <nav className={styles.adminNav} aria-label="Poko admin navigation">
        {adminLinks.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      {children}
    </main>
  );
}
