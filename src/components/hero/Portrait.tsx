import Image from "next/image";
import { heroPortrait } from "@/constants";
import { getUi } from "@/i18n/getUi";

export default async function Portrait() {
  const ui = await getUi();
  return (
    <Image
      src={heroPortrait.src}
      alt={ui.hero.portraitAlt}
      width={heroPortrait.width}
      height={heroPortrait.height}
      sizes="(min-width: 1920px) and (min-height: 1200px) 258px, (min-width: 768px) 198px, 132px"
      preload
      className="relative -z-20 size-33 shrink-0 rounded-full bg-brand-yellow object-cover md:size-49.5 hero-xl:size-[16.0875rem]"
    />
  );
}
