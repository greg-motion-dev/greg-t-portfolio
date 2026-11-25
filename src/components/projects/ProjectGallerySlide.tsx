import Image from "next/image";
import type { LineupContent, ProjectGalleryMedia } from "@/constants";
import BrowserFrame from "@/components/projects/BrowserFrame";
import PhoneFrame from "@/components/projects/PhoneFrame";

export interface ProjectGallerySlideProps {
  readonly item: ProjectGalleryMedia;
  readonly domain: string | undefined;
  readonly labels: LineupContent;
}

const BROWSER_BAR = "2.25rem + 2px";
const PHONE_BEZEL = "1rem + 2px";
const imageSizes = "(min-width: 1280px) 72rem, 100vw";

function fitWidth(ratio: number, verticalChrome: string, horizontalChrome = "0px"): string {
  return `min(100cqw, calc((100cqh - (${verticalChrome})) * ${ratio} + (${horizontalChrome})))`;
}

function renderImage(item: ProjectGalleryMedia) {
  return (
    <Image
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes={imageSizes}
      draggable={false}
      className="block h-auto w-full"
    />
  );
}

export default function ProjectGallerySlide({ item, domain, labels }: ProjectGallerySlideProps) {
  const ratio = item.width / item.height;

  if (item.kind === "page") {
    return (
      <BrowserFrame domain={domain} style={{ width: "min(100cqw, 72rem)", height: "100cqh" }}>
        <div
          tabIndex={0}
          aria-label={`${item.alt}. ${labels.galleryScrollHint}`}
          className="focus-ring min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {renderImage(item)}
        </div>
      </BrowserFrame>
    );
  }

  if (item.frame === "browser") {
    return (
      <BrowserFrame domain={domain} style={{ width: fitWidth(ratio, BROWSER_BAR) }}>
        {renderImage(item)}
      </BrowserFrame>
    );
  }

  if (item.frame === "phone") {
    return (
      <PhoneFrame style={{ width: fitWidth(ratio, PHONE_BEZEL, PHONE_BEZEL) }}>
        {renderImage(item)}
      </PhoneFrame>
    );
  }

  return (
    <div style={{ width: fitWidth(ratio, "0px") }}>
      {renderImage(item)}
    </div>
  );
}
