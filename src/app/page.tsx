"use client";

import NavBar from "@/components/HeroModels/NavBar";
import LogoSection from "@/sections/LogoSection";
import Showcase from "@/sections/Showcase";
import Hero from "@/sections/Hero";
import Competencies from "@/sections/Competencies";
import Experience from "@/sections/Experience";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Showcase />
      <LogoSection />
      <Competencies />
      <Experience />
    </>
  );
}
