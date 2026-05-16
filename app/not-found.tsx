import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">404</p>
        <h1 className="not-found-title">The requested resource could not be found.</h1>
        <p className="not-found-copy">
          The requested page is not part of the current Teambotics site.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
