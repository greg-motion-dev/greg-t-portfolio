import Image from "next/image";
import type { ProjectImageMedia } from "@/constants";

export interface ProjectCoverImageProps {
  readonly image: ProjectImageMedia;
  readonly className: string;
}

export default function ProjectCoverImage({ image, className }: ProjectCoverImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      className={className}
    />
  );
}
