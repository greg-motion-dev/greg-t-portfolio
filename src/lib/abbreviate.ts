import { cvAbbreviations } from "@/constants";

export const abbreviate = (text: string): string =>
  cvAbbreviations.reduce((result, [full, short]) => result.replaceAll(full, short), text);
