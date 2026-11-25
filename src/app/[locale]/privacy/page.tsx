import type { Metadata } from "next";
import { getUi } from "@/i18n/getUi";
import { getAlternates } from "@/i18n/metadata";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata(): Promise<Metadata> {
  const ui = await getUi();
  return {
    title: `${ui.privacy.title} | Greg Telakis`,
    alternates: await getAlternates("/privacy"),
  };
}

export default async function PrivacyPage() {
  const ui = await getUi();
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-nav">
        <section aria-labelledby="privacy-title" className="mx-auto max-w-3xl px-5 py-24 md:px-10">
          <SectionHeading id="privacy-title" title={ui.privacy.title} />
          <p className="mt-8 text-base text-ink-muted">{ui.privacy.body}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
