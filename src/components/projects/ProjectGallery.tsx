"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { lineupContent, type ProjectGalleryMedia } from "@/constants";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import ProjectGallerySlide from "@/components/projects/ProjectGallerySlide";

export interface ProjectGalleryProps {
  readonly title: string;
  readonly items: readonly ProjectGalleryMedia[];
  readonly domain: string | undefined;
  readonly note: string | undefined;
  readonly open: boolean;
  readonly onClose: () => void;
}

type Direction = 1 | -1;

const SWIPE_THRESHOLD = 80;

const iconButtonClasses =
  "focus-ring flex size-11 items-center justify-center border border-white/10 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";

const dialogClasses =
  "m-0 h-dvh max-h-none w-full max-w-none border-0 bg-canvas p-0 text-ink opacity-0 transition-[opacity,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-canvas/80 open:opacity-100 motion-reduce:transition-none starting:open:opacity-0";

const slideVariants = {
  enter: (direction: Direction) => ({ x: `${direction * 12}%`, opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: Direction) => ({ x: `${direction * -12}%`, opacity: 0 }),
};

function formatCount(index: number, total: number): string {
  return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export default function ProjectGallery({
  title,
  items,
  domain,
  note,
  open,
  onClose,
}: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [[index, direction], setSlide] = useState<[number, Direction]>([0, 1]);
  const reducedMotion = useReducedMotion();
  const total = items.length;
  const current = items[index];
  const hasPrevious = index > 0;
  const hasNext = index < total - 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const goTo = (nextIndex: number): void => {
    if (nextIndex < 0 || nextIndex >= total || nextIndex === index) {
      return;
    }
    setSlide([nextIndex, nextIndex > index ? 1 : -1]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      goTo(index + 1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      goTo(index - 1);
    }
  };

  const handleClose = (): void => {
    setSlide([0, 1]);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title}, ${total} ${lineupContent.galleryImagesLabel}`}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      className={dialogClasses}
    >
      <div className="flex h-full flex-col">
        <header className="border-b border-white/10">
          <div className="mx-auto flex h-nav max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
            <p className="truncate text-lg font-bold tracking-tight text-ink md:text-xl">{title}</p>
            <div className="flex items-center gap-4">
              <p aria-live="polite" className="font-mono text-sm text-ink-muted tabular-nums">
                {formatCount(index, total)}
              </p>
              <button
                type="button"
                aria-label={lineupContent.galleryCloseLabel}
                onClick={() => dialogRef.current?.close()}
                className={iconButtonClasses}
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {current ? (
              <motion.figure
                key={current.src}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 m-0 flex cursor-grab flex-col px-5 py-6 active:cursor-grabbing md:px-10 md:py-8"
              >
                <div className="flex min-h-0 flex-1 items-center justify-center [container-type:size]">
                  <ProjectGallerySlide item={current} domain={domain} />
                </div>
                <figcaption className="mx-auto mt-4 max-w-3xl text-center text-sm text-ink-muted">
                  {current.alt}
                  {current.kind === "page" ? (
                    <span className="mt-1 block font-mono text-xs tracking-wider text-ink-muted/70 uppercase">
                      {lineupContent.galleryScrollHint}
                    </span>
                  ) : null}
                </figcaption>
              </motion.figure>
            ) : null}
          </AnimatePresence>
        </div>

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="max-w-xl font-mono text-xs tracking-wider text-ink-muted">{note ?? ""}</p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={lineupContent.galleryPreviousLabel}
                onClick={() => goTo(index - 1)}
                disabled={!hasPrevious}
                className={iconButtonClasses}
              >
                <ArrowDownIcon className="size-4 rotate-90" />
              </button>
              <button
                type="button"
                aria-label={lineupContent.galleryNextLabel}
                onClick={() => goTo(index + 1)}
                disabled={!hasNext}
                className={iconButtonClasses}
              >
                <ArrowDownIcon className="size-4 -rotate-90" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
