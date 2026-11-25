import {
  disciplineAccent,
  disciplineShape,
  type ProjectDiscipline,
  type ProjectGalleryMedia,
  type ProjectMedia,
} from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import ProjectCoverImage from "@/components/projects/ProjectCoverImage";
import ProjectGalleryTrigger from "@/components/projects/ProjectGalleryTrigger";
import ProjectVideo from "@/components/projects/ProjectVideo";
import type { CoverSlide } from "@/components/projects/ProjectCoverCarousel";
import { accentTextClasses } from "@/components/ui/accentClasses";
import { getUi } from "@/i18n/getUi";

export interface ProjectMediaSlotProps {
  readonly media: readonly ProjectMedia[];
  readonly discipline: ProjectDiscipline;
  readonly title: string;
  readonly note: string | undefined;
  readonly domain: string | undefined;
}

const coverClasses =
  "object-cover object-top brightness-[0.85] transition-[filter] duration-500 group-focus-within/card:brightness-100 group-hover/card:brightness-100 motion-reduce:transition-none";

function coverSlides(items: readonly ProjectGalleryMedia[]): readonly CoverSlide[] {
  return items.flatMap((item, galleryIndex) => {
    if (item.kind === "page") {
      return [{ src: item.preview, alt: item.alt, galleryIndex }];
    }
    return item.frame === "phone" ? [] : [{ src: item.src, alt: item.alt, galleryIndex }];
  });
}

export default async function ProjectMediaSlot({
  media,
  discipline,
  title,
  note,
  domain,
}: ProjectMediaSlotProps) {
  const { lineup } = await getUi();
  const [cover] = media;
  const galleryItems = media.filter((item): item is ProjectGalleryMedia => item.kind !== "video");

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
      {cover?.kind === "video" ? (
        galleryItems.length > 0 ? (
          <ProjectGalleryTrigger
            title={title}
            items={galleryItems}
            domain={domain}
            note={note}
            labels={lineup}
          >
            <ProjectVideo video={cover} className={coverClasses} />
          </ProjectGalleryTrigger>
        ) : (
          <ProjectVideo video={cover} className={coverClasses} />
        )
      ) : cover?.kind === "image" ? (
        galleryItems.length > 1 ? (
          <ProjectGalleryTrigger
            title={title}
            items={galleryItems}
            domain={domain}
            note={note}
            slides={coverSlides(galleryItems)}
            imageClassName={coverClasses}
            labels={lineup}
          />
        ) : (
          <ProjectCoverImage image={cover} className={coverClasses} />
        )
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
