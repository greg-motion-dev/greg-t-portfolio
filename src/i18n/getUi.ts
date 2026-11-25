import { uiContentDe, uiContentEn, type LocalizedUiContent, type UiContent } from "@/constants";
import { getLocale } from "./getLocale";

const uiContent = {
  en: uiContentEn,
  de: uiContentDe,
} as const satisfies LocalizedUiContent;

export function uiFor(locale: keyof LocalizedUiContent): UiContent {
  return uiContent[locale];
}

export async function getUi(): Promise<UiContent> {
  return uiFor(await getLocale());
}
