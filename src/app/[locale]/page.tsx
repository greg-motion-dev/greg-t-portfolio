import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import ClientStrip from "@/sections/ClientStrip";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import ProjectLineup from "@/sections/ProjectLineup";
import TechStack from "@/sections/TechStack";
import { getAlternates } from "@/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: await getAlternates("/") };
}

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ClientStrip />
        <ProjectLineup />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
