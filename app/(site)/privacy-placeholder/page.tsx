import Link from "next/link";

export default function PrivacyPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Placeholder</p>
        <h1 className="not-found-title">Privacy policy placeholder</h1>
        <p className="not-found-copy">
          This route stands in for the final privacy page so footer navigation works
          during preview.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
