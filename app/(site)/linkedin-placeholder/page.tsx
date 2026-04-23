import Link from "next/link";

export default function LinkedInPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Placeholder</p>
        <h1 className="not-found-title">LinkedIn destination placeholder</h1>
        <p className="not-found-copy">
          The final LinkedIn company page has not been supplied yet. This preview
          route keeps the navigation functional for review.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
