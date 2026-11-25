import { locale } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const value = await locale();
  return value !== undefined && isLocale(value) ? value : defaultLocale;
}
