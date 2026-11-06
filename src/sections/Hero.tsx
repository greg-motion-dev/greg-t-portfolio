"use client";

import React from "react";
import { words } from "@/constants";
import Button from "@/components/Button";

import HeroExperience from "@/components/HeroModels/HeroExperience";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10"></div>
      <img src="/images/bg.png" alt="background" />
      <div className="hero-layout">
        {/* LEFT CONTENT */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Crafting
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text}-${index}`}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into interfaces that move</h1>
              <h1>with intent & rhythm</h1>
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Ahoi! I'm Greg, a developer in Berlin with a real passion for
              code, especially where it meets motion and 3D.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See my work"
            />
          </div>
        </header>

        {/* RIGHT CONTENT */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
