import Link from "next/link";

export default function EasyBuddyPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Product Placeholder</p>
        <h1 className="not-found-title">EasyBuddy preview destination</h1>
        <p className="not-found-copy">
          This is a temporary destination until the live EasyBuddy product URL is
          provided.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
