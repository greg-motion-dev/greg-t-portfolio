import { heroCtas, heroIntro, profile } from "@/constants";
import PortraitPlaceholder from "@/components/hero/PortraitPlaceholder";
import HeroCtaButton from "@/components/hero/HeroCtaButton";

export default function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh items-center justify-center px-5 pt-nav pb-16 md:px-10"
    >
      <div className="flex max-w-4xl flex-col items-center text-center">
        <PortraitPlaceholder />

        <h1 id="hero-title" className="mt-10 font-mono text-sm text-ink-muted md:text-base">
          <span className="sr-only">{profile.name}, </span>
          {profile.title}
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-ink md:text-xl">
          {heroIntro}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {heroCtas.map((cta) => (
            <HeroCtaButton key={cta.id} cta={cta} />
          ))}
        </div>
      </div>
    </section>
  );
}
