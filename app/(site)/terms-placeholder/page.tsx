import Link from "next/link";

export default function TermsPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Placeholder</p>
        <h1 className="not-found-title">Terms placeholder</h1>
        <p className="not-found-copy">
          This route stands in for the final terms page so the preview remains
          navigable end to end.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
