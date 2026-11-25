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
          <p className="mt-8 font-mono text-xs tracking-wider text-ink-muted uppercase">
            {ui.privacy.updated}
          </p>
          <div className="mt-12 flex flex-col gap-12">
            {ui.privacy.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-bold text-ink">{section.heading}</h3>
                <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
