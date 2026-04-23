import Link from "next/link";

export default function GitHubPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Placeholder</p>
        <h1 className="not-found-title">GitHub destination placeholder</h1>
        <p className="not-found-copy">
          The final GitHub organization link has not been supplied yet. This page
          keeps the preview complete until that handoff happens.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
