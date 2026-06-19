import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Non-profit Application — MDownManager",
  description:
    "Apply for free Commercial access to MDownManager for your non-profit organization. Includes unlimited vaults and up to 10 seats.",
  openGraph: {
    title: `Non-profit Application | ${siteConfig.name}`,
    url: `${siteConfig.url}/nonprofit-application`,
  },
};

export default function NonprofitApplicationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
