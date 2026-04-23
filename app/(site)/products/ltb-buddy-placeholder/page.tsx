import Link from "next/link";

export default function LtbBuddyPlaceholderPage() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">Product Placeholder</p>
        <h1 className="not-found-title">LTB Buddy preview destination</h1>
        <p className="not-found-copy">
          This is a temporary destination until the live LTB Buddy product URL is
          provided.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
