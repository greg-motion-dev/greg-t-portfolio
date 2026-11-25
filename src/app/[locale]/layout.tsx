import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";
import { profile } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";
import { uiFor } from "@/i18n/getUi";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const robots = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
} as const satisfies Metadata["robots"];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = uiFor(locale);
  const alternateLocales = locales
    .filter((alternate) => alternate !== locale)
    .map((alternate) => uiFor(alternate).meta.openGraphLocale);
  return {
    metadataBase: new URL(profile.website.href),
    title: meta.title,
    description: meta.description,
    robots,
    openGraph: {
      type: "website",
      siteName: profile.name,
      title: meta.title,
      description: meta.description,
      locale: meta.openGraphLocale,
      alternateLocale: alternateLocales,
      images: [meta.previewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.previewImage],
    },
  };
}

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await localeParam();
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
