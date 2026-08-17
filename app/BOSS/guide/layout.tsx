import type { ReactNode } from "react";
import { bossTheme } from "../_lib/theme";
import { GuideSidebar } from "./_components/GuideChrome";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid pt-[var(--site-header-height)] lg:grid-cols-[240px_1fr]"
      style={{ background: bossTheme.background, color: bossTheme.textPrimary, minHeight: "100vh" }}
    >
      <GuideSidebar />
      <div>{children}</div>
    </div>
  );
}
