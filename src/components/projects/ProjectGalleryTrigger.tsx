"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import type { LineupContent, ProjectGalleryMedia } from "@/constants";
import ProjectCoverCarousel, { type CoverSlide } from "@/components/projects/ProjectCoverCarousel";

const ProjectGallery = dynamic(() => import("@/components/projects/ProjectGallery"), {
  ssr: false,
});

export interface ProjectGalleryTriggerProps {
  readonly title: string;
  readonly items: readonly ProjectGalleryMedia[];
  readonly domain: string | undefined;
  readonly note: string | undefined;
  readonly slides?: readonly CoverSlide[];
  readonly imageClassName?: string;
  readonly children?: ReactNode;
  readonly labels: LineupContent;
}

export default function ProjectGalleryTrigger({
  title,
  items,
  domain,
  note,
  slides,
  imageClassName,
  children,
  labels,
}: ProjectGalleryTriggerProps) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const openAt = (index: number): void => {
    setStartIndex(index);
    setSession((value) => value + 1);
    setOpen(true);
  };

  const countLabel = `${items.length} ${labels.galleryImagesLabel}`;

  return (
    <>
      {slides && slides.length > 0 ? (
        <ProjectCoverCarousel
          title={title}
          slides={slides}
          total={items.length}
          imageClassName={imageClassName ?? ""}
          onOpen={openAt}
          labels={labels}
        />
      ) : (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={`${labels.galleryOpenLabel}: ${title}, ${countLabel}`}
          onClick={() => openAt(0)}
          className="focus-ring absolute inset-0 block size-full cursor-zoom-in"
        >
          {children}
        </button>
      )}
      <span className="pointer-events-none absolute right-3 bottom-3 border border-white/15 bg-canvas/85 px-2.5 py-1 font-mono text-xs tracking-wider text-ink uppercase backdrop-blur-sm">
        {countLabel}
      </span>
      {session > 0 ? (
        <ProjectGallery
          key={session}
          title={title}
          items={items}
          initialIndex={startIndex}
          domain={domain}
          note={note}
          open={open}
          onClose={() => setOpen(false)}
          labels={labels}
        />
      ) : null}
    </>
  );
}
