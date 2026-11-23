"use client";

import Image from "next/image";
import { useEffect, useState, type UIEvent } from "react";
import { lineupContent } from "@/constants";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";

export interface CoverSlide {
  readonly src: string;
  readonly alt: string;
  readonly galleryIndex: number;
}

export interface ProjectCoverCarouselProps {
  readonly title: string;
  readonly slides: readonly CoverSlide[];
  readonly total: number;
  readonly imageClassName: string;
  readonly onOpen: (galleryIndex: number) => void;
}

const SLIDE_INTERVAL = 1400;
const imageSizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

export default function ProjectCoverCarousel({
  title,
  slides,
  total,
  imageClassName,
  onOpen,
}: ProjectCoverCarouselProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [primed, setPrimed] = useState(false);
  const count = slides.length;
  const autoplay = finePointer && hovering && !reducedMotion && count > 1;

  useEffect(() => {
    if (!autoplay) {
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [autoplay, count]);

  const openLabel = (index: number): string =>
    `${lineupContent.galleryOpenLabel}: ${title}, ${total} ${lineupContent.galleryImagesLabel}, ${index + 1} / ${count}`;

  const dots =
    count > 1 ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3.5 left-3 flex gap-1.5 rounded-full bg-canvas/80 px-2.5 py-2 backdrop-blur-sm"
      >
        {slides.map((slide, index) => (
          <span
            key={slide.src}
            className={`size-1.5 rounded-full transition-colors duration-300 motion-reduce:transition-none ${index === active ? "bg-ink" : "bg-ink/35"}`}
          />
        ))}
      </span>
    ) : null;

  if (finePointer) {
    const current = slides[active] ?? slides[0];
    return (
      <div
        className="absolute inset-0"
        onMouseEnter={() => {
          setPrimed(true);
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
          setActive(0);
        }}
      >
        {slides.map((slide, index) =>
          index === 0 || primed ? (
            <div
              key={slide.src}
              aria-hidden={index !== active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={slide.src} alt={slide.alt} fill sizes={imageSizes} className={imageClassName} />
            </div>
          ) : null,
        )}
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={openLabel(active)}
          onClick={() => onOpen(current?.galleryIndex ?? 0)}
          className="focus-ring absolute inset-0 cursor-zoom-in"
        />
        {hovering ? dots : null}
      </div>
    );
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    const strip = event.currentTarget;
    setActive(Math.round(strip.scrollLeft / Math.max(strip.clientWidth, 1)));
  };

  return (
    <div className="absolute inset-0">
      <div
        onScroll={handleScroll}
        className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <div key={slide.src} className="relative size-full shrink-0 snap-start">
            <Image src={slide.src} alt={slide.alt} fill sizes={imageSizes} className={imageClassName} />
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={openLabel(index)}
              onClick={() => onOpen(slide.galleryIndex)}
              className="focus-ring absolute inset-0"
            />
          </div>
        ))}
      </div>
      {dots}
    </div>
  );
}
