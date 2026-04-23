import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
      <div className="not-found-card">
        <p className="section-eyebrow">404</p>
        <h1 className="not-found-title">Could not find the requested resource.</h1>
        <p className="not-found-copy">
          The page you tried to reach is not part of the current Teambotics landing
          surface.
        </p>
        <Link className="button button--primary" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
