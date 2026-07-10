import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NotFoundTetrisSlot } from "@/components/content/NotFoundTetrisSlot";
import { Button } from "@/components/ui/Button";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const metadata: Metadata = {
  title: "404 – Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <ThemeProvider>
      <main className="not-found-shell">
        <div className="not-found-shell__grid" aria-hidden="true" />
        <div className="not-found-theme-toggle">
          <ThemeToggle />
        </div>
        <Container className="not-found-shell__inner">
          <section className="not-found-copy-panel">
            <div className="not-found-signal" aria-label="404 route not found">
              <span className="not-found-signal__code">404</span>
              <div className="not-found-signal__meta">
                <p className="section-eyebrow not-found-signal__eyebrow">Route not found</p>
                <p className="not-found-signal__line">Field console online</p>
              </div>
            </div>
            <h1 className="not-found-title">This route got tetrominoed.</h1>
            <p className="not-found-copy">
              Somewhere between the lab and deployment, the page you wanted slipped
              behind a stack of falling blocks.
            </p>
            <p className="not-found-copy not-found-copy--secondary">
              The good news: the FC-404 pocket console still works. Clear a few lines,
              then jump back to a live system when you are ready.
            </p>
          </section>
          <NotFoundTetrisSlot />
          <div className="not-found-support-panel">
            <div className="not-found-badges" aria-label="Recovery console details">
              <span className="not-found-badge">Lab-issued FC-404</span>
              <span className="not-found-badge">Recovery sim</span>
              <span className="not-found-badge">WASD + Space to Drop</span>
            </div>
            <div className="not-found-actions">
              <Button href="/">Return home</Button>
              <Button href="/products" variant="ghost">
                Browse products
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </ThemeProvider>
  );
}
