import { siteConfig } from "@/lib/config";

/**
 * "Learn, Commit, Push..." - only the trailing three dots are a link.
 * Quiet by design: it looks like plain text and does not explain itself.
 */
export function Tagline() {
  const words = siteConfig.tagline.replace(/\.{3}$/, "");
  return (
    <>
      {words}
      <a
        href={siteConfig.taglineHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Educate, Agitate, Organize - Dr. B. R. Ambedkar (opens in a new tab)"
        style={{ color: "inherit", textDecoration: "none", padding: "0.35em 0.2em", margin: "-0.35em -0.2em" }}
      >
        ...
      </a>
    </>
  );
}
