import {
  languageNamesDe,
  languages,
  proficiencyLabelsDe,
  timeline,
  timelineDe,
  type CefrRange,
  type LanguageProficiency,
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

export async function getTimeline(): Promise<readonly TimelineItem[]> {
  return timelineFor(await getLocale());
}

export async function getLanguages(): Promise<readonly LocalizedLanguage[]> {
  return languagesFor(await getLocale());
}
