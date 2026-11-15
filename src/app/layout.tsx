import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const FONTSHARE_API_ORIGIN = "https://api.fontshare.com";
const FONTSHARE_CDN_ORIGIN = "https://cdn.fontshare.com";
const SATOSHI_STYLESHEET_URL = `${FONTSHARE_API_ORIGIN}/v2/css?f[]=satoshi@1&display=swap`;

export const metadata: Metadata = {
  title: "Greg | Creative Engineer",
  description: "Portfolio",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href={FONTSHARE_API_ORIGIN} />
        <link rel="preconnect" href={FONTSHARE_CDN_ORIGIN} crossOrigin="anonymous" />
        <link rel="stylesheet" href={SATOSHI_STYLESHEET_URL} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
