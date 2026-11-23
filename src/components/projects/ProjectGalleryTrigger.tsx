"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import { lineupContent, type ProjectGalleryMedia } from "@/constants";

const ProjectGallery = dynamic(() => import("@/components/projects/ProjectGallery"), {
  ssr: false,
});

export interface ProjectGalleryTriggerProps {
  readonly title: string;
  readonly items: readonly ProjectGalleryMedia[];
  readonly domain: string | undefined;
  readonly note: string | undefined;
  readonly children: ReactNode;
}

export default function ProjectGalleryTrigger({
  title,
  items,
  domain,
  note,
  children,
}: ProjectGalleryTriggerProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  const openGallery = (): void => {
    setRequested(true);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`${lineupContent.galleryOpenLabel}: ${title}, ${items.length} ${lineupContent.galleryImagesLabel}`}
        onClick={openGallery}
        className="focus-ring absolute inset-0 block size-full cursor-zoom-in"
      >
        {children}
        <span className="pointer-events-none absolute right-3 bottom-3 border border-white/15 bg-canvas/85 px-2.5 py-1 font-mono text-xs tracking-wider text-ink uppercase backdrop-blur-sm">
          {items.length} {lineupContent.galleryImagesLabel}
        </span>
      </button>
      {requested ? (
        <ProjectGallery
          title={title}
          items={items}
          domain={domain}
          note={note}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
