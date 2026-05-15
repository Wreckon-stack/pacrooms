import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PACROOMS — Tokenized Agent / Pump.fun Origin",
  description:
    "PACROOMS is a tokenized autonomous agent born on Pump.fun, trapped in the Backrooms, hunting weak memecoins across Solana.",
  keywords: [
    "PACROOMS",
    "Pump.fun",
    "Solana",
    "memecoin",
    "Backrooms",
    "tokenized agent",
    "crypto",
  ],
  openGraph: {
    title: "PACROOMS — The Tokenized Entity Is Hungry",
    description:
      "Born on Pump.fun. Trapped in the Backrooms. Programmed to detect, stalk, and consume weak memecoins across Solana.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PACROOMS — The Tokenized Entity Is Hungry",
    description:
      "Born on Pump.fun. Trapped in the Backrooms. Programmed to detect, stalk, and consume weak memecoins across Solana.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050402",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-void-900">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Major+Mono+Display&family=Share+Tech+Mono&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void-900 text-zinc-200 antialiased">{children}</body>
    </html>
  );
}
