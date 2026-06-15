import type { ReactNode } from "react";

const mobileAlignmentFix = `
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

export default function MdownManagerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: mobileAlignmentFix }} />
      {children}
    </>
  );
}
