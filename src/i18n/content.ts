import {
  languageNamesDe,
  languages,
  proficiencyLabelsDe,
  projects,
  projectsDe,
  timeline,
  timelineDe,
  type CefrRange,
  type LanguageProficiency,
  type Project,
  type ProjectMedia,
  type ProjectText,
  type TimelineItem,
} from "@/constants";
import type { Locale } from "./config";
import { getLocale } from "./getLocale";

export interface LocalizedLanguage {
  readonly key: string;
  readonly name: string;
  readonly proficiency: LanguageProficiency;
  readonly proficiencyLabel: string;
  readonly cefr: CefrRange;
}

export function timelineFor(locale: Locale): readonly TimelineItem[] {
  if (locale === "en") {
    return timeline;
  }
  return timeline.map((item): TimelineItem => ({ ...item, ...timelineDe[item.id] }));
}

export function languagesFor(locale: Locale): readonly LocalizedLanguage[] {
  return languages.map((language) => ({
    key: language.name,
    name: locale === "en" ? language.name : languageNamesDe[language.name],
    proficiency: language.proficiency,
    proficiencyLabel:
      locale === "en" ? language.proficiency : proficiencyLabelsDe[language.proficiency],
    cefr: language.cefr,
  }));
}

function localizeMedia(
  media: ProjectMedia,
  text: ProjectText["media"][number] | undefined,
): ProjectMedia {
  if (text === undefined) {
    return media;
  }
  if (media.kind === "image" && media.link !== undefined && text.linkLabel !== undefined) {
    return { ...media, alt: text.alt, link: { ...media.link, label: text.linkLabel } };
  }
  return { ...media, alt: text.alt };
}

function localizeProject(project: Project, text: ProjectText): Project {
  return {
    ...project,
    summary: text.summary,
    note: text.note ?? project.note,
    links: project.links.map((link, index) => ({
      ...link,
      label: text.links[index] ?? link.label,
    })),
    media: project.media.map((media, index) => localizeMedia(media, text.media[index])),
  };
}

export function projectsFor(locale: Locale): readonly Project[] {
  if (locale === "en") {
    return projects;
  }
  return projects.map((project) => localizeProject(project, projectsDe[project.id]));
}

export async function getProjects(): Promise<readonly Project[]> {
  return projectsFor(await getLocale());
}

export async function getTimeline(): Promise<readonly TimelineItem[]> {
  return timelineFor(await getLocale());
}

export async function getLanguages(): Promise<readonly LocalizedLanguage[]> {
  return languagesFor(await getLocale());
}
