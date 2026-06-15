import type { ReactNode } from "react";

const downloadUrl =
  "https://github.com/nickhilster/MDownManager/releases/download/v0.1.0/MdownManager_0.1.0_x64_en-US.msi";
const sourceUrl = "https://github.com/nickhilster/MDownManager";

const routeEnhancements = `
  @media (max-width: 600px) {
    .flow-steps {
      align-items: stretch !important;
      gap: 1.5rem !important;
    }

    .flow-step {
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;

const hyperlinkEnhancer = `
  (() => {
    const downloadUrl = ${JSON.stringify("https://github.com/nickhilster/MDownManager/releases/download/v0.1.0/MdownManager_0.1.0_x64_en-US.msi")};
    const sourceUrl = ${JSON.stringify("https://github.com/nickhilster/MDownManager")};

    const replaceButtonWithLink = (button, href) => {
      if (!button || button.tagName.toLowerCase() !== "button") return;
      const link = document.createElement("a");
      link.href = href;
      link.className = button.className;
      link.innerHTML = button.innerHTML;
      link.setAttribute("role", "button");
      link.setAttribute("aria-label", button.textContent?.trim() || "Open link");
      button.replaceWith(link);
    };

    const wireLinks = () => {
      document.querySelectorAll("a.nav-cta").forEach((link) => {
        link.setAttribute("href", downloadUrl);
      });

      document.querySelectorAll("button.btn-primary").forEach((button) => {
        replaceButtonWithLink(button, downloadUrl);
      });

      document.querySelectorAll("button.btn-secondary").forEach((button) => {
        replaceButtonWithLink(button, sourceUrl);
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", wireLinks, { once: true });
    } else {
      wireLinks();
    }
  })();
`;

export default function MdownManagerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: routeEnhancements }} />
      <script dangerouslySetInnerHTML={{ __html: hyperlinkEnhancer }} />
      {children}
    </>
  );
}
