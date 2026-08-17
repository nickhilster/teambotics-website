import localFont from "next/font/local";

export const bossSerif = localFont({
  src: [
    { path: "./fonts/source-serif-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/source-serif-700.ttf", weight: "700", style: "normal" },
    { path: "./fonts/source-serif-600-italic.ttf", weight: "600", style: "italic" },
  ],
  variable: "--font-boss-serif",
  display: "swap",
});

export const bossSans = localFont({
  src: [
    { path: "./fonts/public-sans-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/public-sans-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/public-sans-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/public-sans-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-boss-sans",
  display: "swap",
});
