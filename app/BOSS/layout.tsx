import type { ReactNode } from "react";
import { bossSerif, bossSans } from "./_lib/fonts";

export default function BossRootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${bossSerif.variable} ${bossSans.variable}`}
      style={{ fontFamily: "var(--font-boss-sans)" }}
    >
      {children}
    </div>
  );
}
