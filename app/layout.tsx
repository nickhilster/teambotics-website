import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";
import { siteConfig } from "@/lib/config";
import "../styles/globals.css";
import "../styles/typography.css";
import CommitTracker from "@/components/ui/CommitTracker";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Teambotics",
    "independent AI lab",
    "conversational AI products",
    "interactive AI products",
    "workforce enablement",
    "interactive motion platform",
    "narrative intelligence",
    "workflow automation",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.socials.x,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      try {
        const storedTheme = window.localStorage.getItem("teambotics-theme");
        const theme = storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.style.colorScheme = theme;
      } catch {}
    })();
  `;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          id="theme-init"
          strategy="beforeInteractive"
        />
        <CommitTracker />
      </body>
    </html>
  );
}
