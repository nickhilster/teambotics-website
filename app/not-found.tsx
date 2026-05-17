import { Container } from "@/components/layout/Container";
import { NotFoundTetris } from "@/components/content/NotFoundTetris";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <div className="not-found-shell__grid" aria-hidden="true" />
      <Container className="not-found-shell__inner">
        <section className="not-found-copy-panel">
          <p className="section-eyebrow">404 // field console online</p>
          <h1 className="not-found-title">This route got tetrominoed.</h1>
          <p className="not-found-copy">
            Somewhere between the lab and deployment, the page you wanted slipped
            behind a stack of falling blocks.
          </p>
          <p className="not-found-copy not-found-copy--secondary">
            The good news: the FC-404 pocket console still works. Clear a few lines,
            then jump back to a live system when you are ready.
          </p>
          <div className="not-found-badges" aria-label="Recovery console details">
            <span className="not-found-badge">Lab-issued FC-404</span>
            <span className="not-found-badge">Recovery sim</span>
            <span className="not-found-badge">Arrows + Z/X + Space</span>
          </div>
          <div className="not-found-actions">
            <Button href="/">Return home</Button>
            <Button href="/products" variant="ghost">
              Browse products
            </Button>
          </div>
        </section>
        <NotFoundTetris />
      </Container>
    </main>
  );
}
