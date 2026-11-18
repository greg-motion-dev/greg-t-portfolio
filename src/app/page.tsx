import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import LogoSection from "@/sections/LogoSection";
import ProjectLineup from "@/sections/ProjectLineup";
import Hero from "@/sections/Hero";
import Competencies from "@/sections/Competencies";
import Experience from "@/sections/Experience";
import TechStack from "@/sections/TechStack";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ProjectLineup />
        <LogoSection />
        <Competencies />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
