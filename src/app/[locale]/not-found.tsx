import type { Metadata } from "next";
import Link from "next/link";
import { getUi } from "@/i18n/getUi";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

export async function generateMetadata(): Promise<Metadata> {
  const ui = await getUi();
  return { title: `${ui.notFound.title} | Greg Telakis` };
}

export default async function NotFound() {
  const ui = await getUi();
  const locale = await getLocale();

  return (
    <>
      <NavBar />
      <main className="flex flex-1 items-center pt-nav">
        <section
          aria-labelledby="not-found-title"
          className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:px-10"
        >
          <p className="font-mono text-sm text-brand-yellow md:text-base">{ui.notFound.code}</p>
          <h1
            id="not-found-title"
            className="mt-4 text-hero font-extrabold text-ink md:text-hero-lg"
          >
            {ui.notFound.title}
          </h1>
          <p className="mt-6 text-sm text-ink-muted md:text-base">{ui.notFound.body}</p>
          <Link
            href={localizeHref(locale, ui.notFound.homeHref)}
            className="focus-ring mt-10 border border-ink px-6 py-3 font-mono text-sm tracking-widest text-ink uppercase transition-colors hover:bg-ink hover:text-canvas"
          >
            {ui.notFound.homeLabel}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
