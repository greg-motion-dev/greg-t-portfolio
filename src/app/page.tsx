import NavBar from "@/components/layout/NavBar";
import LogoSection from "@/sections/LogoSection";
import Showcase from "@/sections/Showcase";
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
        <Showcase />
        <LogoSection />
        <Competencies />
        <Experience />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
