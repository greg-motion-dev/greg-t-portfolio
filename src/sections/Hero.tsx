import { profile } from "@/constants";
import { getUi } from "@/i18n/getUi";
import HeroCtaButton from "@/components/hero/HeroCtaButton";
import HeroOrbit from "@/components/hero/HeroOrbit";
import OrbitHint from "@/components/hero/OrbitHint";
import OrbitStateProvider from "@/components/hero/OrbitStateProvider";
import Portrait from "@/components/hero/Portrait";

const titleLines = profile.title.split(" | ");

export default async function Hero() {
  const ui = await getUi();
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 pt-[calc(var(--spacing-nav)+4rem)] pb-16 md:px-10 md:pt-40"
    >
      <OrbitStateProvider>
        <div className="pointer-events-none relative z-10 flex max-w-4xl flex-col items-center text-center">
          <div className="relative">
            <HeroOrbit />
            <Portrait />
          </div>

          <p className="pointer-events-auto mt-12 font-mono text-sm text-brand-yellow md:mt-20 md:text-base hero-xl:mt-26 hero-xl:text-xl">
            {ui.hero.greeting}
          </p>

          <h1
            id="hero-title"
            className="pointer-events-auto mt-4 text-hero font-extrabold text-ink md:text-hero-lg hero-xl:mt-5 hero-xl:text-[3.25rem]"
          >
            <span className="sr-only">{profile.name}, </span>
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="pointer-events-auto mt-4 max-w-2xl text-sm text-ink-muted max-md:text-balance md:mt-8 md:text-base hero-xl:mt-10 hero-xl:max-w-[52.5rem] hero-xl:text-xl">
            {ui.hero.intro}
          </p>

          <div className="pointer-events-auto mt-6 flex flex-col gap-4 sm:flex-row md:mt-10 hero-xl:mt-13">
            {ui.hero.ctas.map((cta) => (
              <HeroCtaButton key={cta.id} cta={cta} />
            ))}
          </div>
        </div>
        <OrbitHint label={ui.hero.orbitHint} />
      </OrbitStateProvider>
    </section>
  );
}
