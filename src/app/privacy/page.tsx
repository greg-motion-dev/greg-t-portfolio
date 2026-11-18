import type { Metadata } from "next";
import { privacyContent } from "@/constants";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy | Greg Telakis",
};

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="flex-1 pt-nav">
        <section aria-labelledby="privacy-title" className="mx-auto max-w-3xl px-5 py-24 md:px-10">
          <SectionHeading id="privacy-title" title={privacyContent.title} />
          <p className="mt-8 text-base text-ink-muted">{privacyContent.body}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
