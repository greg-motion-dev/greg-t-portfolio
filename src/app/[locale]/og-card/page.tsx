import Image from "next/image";
import { notFound } from "next/navigation";
import { heroPortrait, profile } from "@/constants";
import { getUi } from "@/i18n/getUi";
import CvOrbit from "@/components/cv/CvOrbit";

const titleLines = profile.title.split(" | ");

export default async function OgCardPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  const ui = await getUi();

  return (
    <main className="flex flex-1 items-center justify-center bg-canvas p-10">
      <div
        data-og-card
        className="flex h-[315px] w-[600px] shrink-0 flex-col items-center justify-center overflow-hidden bg-canvas text-center text-ink"
      >
        <div className="relative mt-[22px] mb-[16px] flex h-[31.8mm] w-[57mm] scale-[1.36] items-center justify-center">
          <CvOrbit />
          <Image
            src={heroPortrait.src}
            alt={ui.hero.portraitAlt}
            width={heroPortrait.width}
            height={heroPortrait.height}
            sizes="200px"
            loading="eager"
            className="relative size-[25mm] rounded-full bg-brand-yellow object-cover"
          />
        </div>
        <p className="font-mono text-[11px] text-brand-yellow">{ui.hero.greeting}</p>
        <h1 className="mt-2 text-[2.375rem] leading-none font-extrabold tracking-[0.02em] uppercase">
          {profile.name}
        </h1>
        <p className="mt-2.5 font-mono text-[11px] text-ink-muted">
          {titleLines.join(" · ")} · {profile.website.label}
        </p>
      </div>
    </main>
  );
}
