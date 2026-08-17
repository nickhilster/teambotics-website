export const bossTheme = {
  background: "#101e33",
  surface: "#16283f",
  surface2: "#1d3350",
  border: "#2e4560",
  borderSubtle: "#213652",
  textPrimary: "#e8eef6",
  textSecondary: "#a9bbd1",
  textMuted: "#7690ac",
  accent: "#e3a857",
  accentInk: "#ffd9a0",
  good: "#6fcb9f",
  risk: "#e98577",
} as const;

export type GuideNavItem = {
  slug: string;
  index: string;
  title: string;
  href: string;
};

export type GuideNavGroup = {
  title: string;
  items: GuideNavItem[];
};

export const guideNav: GuideNavGroup[] = [
  {
    title: "Start here",
    items: [
      { slug: "getting-started", index: "01", title: "Getting started", href: "/BOSS/guide" },
      { slug: "init", index: "02", title: "Init & environment", href: "/BOSS/guide/init" },
    ],
  },
  {
    title: "Connect your IDE",
    items: [
      { slug: "claude-code", index: "03", title: "Claude Code", href: "/BOSS/guide/claude-code" },
      { slug: "codex", index: "04", title: "Codex", href: "/BOSS/guide/codex" },
    ],
  },
  {
    title: "Day to day",
    items: [
      { slug: "audit", index: "05", title: "Running an audit", href: "/BOSS/guide/audit" },
      { slug: "console", index: "06", title: "The Console", href: "/BOSS/guide/console" },
      { slug: "cli", index: "07", title: "CLI reference", href: "/BOSS/guide/cli" },
    ],
  },
  {
    title: "Reference",
    items: [
      { slug: "troubleshooting", index: "08", title: "Troubleshooting", href: "/BOSS/guide/troubleshooting" },
    ],
  },
];

export const guideNavFlat: GuideNavItem[] = guideNav.flatMap((group) => group.items);
