import { heroCtas, heroGreeting, heroIntro, profile } from "@/constants";
import HeroCtaButton from "@/components/hero/HeroCtaButton";
import HeroOrbit from "@/components/hero/HeroOrbit";
import OrbitHint from "@/components/hero/OrbitHint";
import OrbitStateProvider from "@/components/hero/OrbitStateProvider";
import Portrait from "@/components/hero/Portrait";

const titleLines = profile.title.split(" | ");

export default function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 pt-[calc(var(--spacing-nav)+2.5rem)] pb-16 md:px-10 md:pt-40"
    >
      <OrbitStateProvider>
        <div className="pointer-events-none relative z-10 flex max-w-4xl flex-col items-center text-center">
          <div className="relative">
            <HeroOrbit />
            <Portrait />
          </div>

          <p className="pointer-events-auto mt-20 font-mono text-sm text-brand-yellow md:text-base">
            {heroGreeting}
          </p>

          <h1
            id="hero-title"
            className="pointer-events-auto mt-4 text-hero font-extrabold text-ink md:text-hero-lg"
          >
            <span className="sr-only">{profile.name}, </span>
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="pointer-events-auto mt-8 max-w-2xl text-sm text-ink-muted md:text-base">
            {heroIntro}
          </p>

          <div className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row">
            {heroCtas.map((cta) => (
              <HeroCtaButton key={cta.id} cta={cta} />
            ))}
          </div>
        </div>
        <OrbitHint />
      </OrbitStateProvider>
    </section>
  );
}
