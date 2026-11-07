"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Type-guard filter to ensure null refs are excluded safely
      const projects = [
        project1Ref.current,
        project2Ref.current,
        project3Ref.current,
      ].filter((card): card is HTMLDivElement => card !== null);

      projects.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 * (index + 1),
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
            },
          },
        );
      });

      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* LEFT SIDE */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="project1" />
            </div>
            <div className="text-content">
              <h2>
                An immersive, high-performance web portfolio piece inspired by
                Apple's product showcase pages.
              </h2>
              <p className="text-white-50 md:text-xl">
                High-performance Creative Frontend page built with Next.js,
                TypeScript, Tailwind CSS, GSAP, and React Three Fiber.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project2.png" alt="project2" />
              </div>
              <h2>Modern Cocktail Bar Website</h2>
            </div>
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7db]">
                <img src="/images/project3.png" alt="project3" />
              </div>
              <h2>Finance Influencer Website</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
