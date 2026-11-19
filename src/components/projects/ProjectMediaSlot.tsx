import Image from "next/image";
import {
  disciplineAccent,
  disciplineShape,
  type ProjectDiscipline,
  type ProjectMedia,
} from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

export interface ProjectMediaSlotProps {
  readonly media: readonly ProjectMedia[];
  readonly discipline: ProjectDiscipline;
}

export default function ProjectMediaSlot({ media, discipline }: ProjectMediaSlotProps) {
  const cover = media.find((item) => item.kind === "image");

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top brightness-[0.85] transition-[filter] duration-500 group-focus-within/card:brightness-100 group-hover/card:brightness-100 motion-reduce:transition-none"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <ShapeMarker
            shape={disciplineShape[discipline]}
            className={`size-1/4 opacity-20 ${accentTextClasses[disciplineAccent[discipline]]}`}
          />
        </div>
      )}
    </div>
  );
}
