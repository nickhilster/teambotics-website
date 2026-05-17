import { SiteShell } from "@/components/layout/SiteShell";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
