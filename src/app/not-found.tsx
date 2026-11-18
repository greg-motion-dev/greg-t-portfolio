import type { Metadata } from "next";
import Link from "next/link";
import { notFoundContent } from "@/constants";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export const metadata: Metadata = {
  title: "Page not found | Greg Telakis",
};

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="flex flex-1 items-center pt-nav">
        <section
          aria-labelledby="not-found-title"
          className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:px-10"
        >
          <p className="font-mono text-sm text-brand-yellow md:text-base">{notFoundContent.code}</p>
          <h1
            id="not-found-title"
            className="mt-4 text-hero font-extrabold text-ink md:text-hero-lg"
          >
            {notFoundContent.title}
          </h1>
          <p className="mt-6 text-sm text-ink-muted md:text-base">{notFoundContent.body}</p>
          <Link
            href={notFoundContent.homeHref}
            className="focus-ring mt-10 border border-ink px-6 py-3 font-mono text-sm tracking-widest text-ink uppercase transition-colors hover:bg-ink hover:text-canvas"
          >
            {notFoundContent.homeLabel}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
