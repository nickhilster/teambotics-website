import type { ReactNode } from "react";

const routeEnhancements = `
  @media (max-width: 760px) {
    .nav-inner {
      gap: 10px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .nav-logo {
      font-size: 14px !important;
      white-space: nowrap !important;
    }

    .nav-link {
      font-size: 12px !important;
      padding-left: 4px !important;
      padding-right: 4px !important;
      white-space: nowrap !important;
    }

    .nav-cta {
      display: none !important;
    }
  }

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

export default function MdownManagerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: routeEnhancements }} />
      {children}
    </>
  );
}
