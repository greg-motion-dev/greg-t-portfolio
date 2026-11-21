"use client";

import { useEffect, useRef } from "react";
import type { ProjectVideoMedia } from "@/constants";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export interface ProjectVideoProps {
  readonly video: ProjectVideoMedia;
  readonly className: string;
}

export default function ProjectVideo({ video, className }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, false);
  const reducedMotion = useReducedMotion();
  const shouldPlay = inView && !reducedMotion;

  useEffect(() => {
    const element = videoRef.current;
    if (element === null) {
      return;
    }
    if (shouldPlay) {
      element.play().catch(() => element.pause());
    } else {
      element.pause();
    }
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      src={video.src}
      poster={video.poster}
      aria-label={video.alt}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="none"
      className={`absolute inset-0 size-full ${className}`}
    />
  );
}
