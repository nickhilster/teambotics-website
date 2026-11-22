import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NotFoundTetrisSlot } from "@/components/content/NotFoundTetrisSlot";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 – Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <Container className="not-found-shell__inner">
        <section className="not-found-copy-panel">
          <p className="section-eyebrow not-found-signal__eyebrow">Page not found · 404</p>
          <h1 className="not-found-title">We couldn’t find that page.</h1>
          <p className="not-found-copy">
            The link may be outdated, or the page may have moved. Head back to the
            Teambotics homepage or explore selected work.
          </p>
          <div className="not-found-actions">
            <Button href="/">Return home</Button>
            <Button href="/#capabilities" variant="ghost">
              Explore selected work
            </Button>
          </div>
        </section>
        <NotFoundTetrisSlot />
        <p className="not-found-game-note">Take a moment with the recovery game while you’re here.</p>
      </Container>
    </main>
  );
}
