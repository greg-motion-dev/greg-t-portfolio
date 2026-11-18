import Image from "next/image";
import { heroPortrait } from "@/constants";

export default function Portrait() {
  return (
    <Image
      src={heroPortrait.src}
      alt={heroPortrait.alt}
      width={heroPortrait.width}
      height={heroPortrait.height}
      sizes="(min-width: 768px) 198px, 152px"
      preload
      className="relative -z-20 size-38 shrink-0 rounded-full bg-brand-yellow object-cover md:size-49.5"
    />
  );
}
