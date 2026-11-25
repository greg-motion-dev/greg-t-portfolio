import { languageProficiencyAccent } from "@/constants";
import { getLanguages } from "@/i18n/content";
import { accentTextClasses } from "@/components/ui/accentClasses";

const rowClasses =
  "grid grid-cols-[1fr_auto_3rem] items-baseline gap-x-3 max-[384px]:grid-cols-[1fr_3rem] max-[384px]:gap-y-1 md:max-lg:grid-cols-[1fr_3rem] md:max-lg:gap-y-1";

const proficiencyClasses =
  "text-right text-sm text-ink-muted max-[384px]:col-start-1 max-[384px]:row-start-2 max-[384px]:text-left md:max-lg:col-start-1 md:max-lg:row-start-2 md:max-lg:text-left";

const cefrClasses =
  "font-mono text-xs tracking-wider max-[384px]:col-start-2 max-[384px]:row-start-1 max-[384px]:text-right md:max-lg:col-start-2 md:max-lg:row-start-1 md:max-lg:text-right";

export default async function LanguageList() {
  const languages = await getLanguages();
  return (
    <ul className="flex flex-col divide-y divide-white/10">
      {languages.map((language) => (
        <li
          key={language.key}
          className="flex flex-1 flex-col justify-center py-3 first:pt-0 last:pb-0"
        >
          <div className={rowClasses}>
            <span className="text-ink">{language.name}</span>
            <span className={proficiencyClasses}>{language.proficiencyLabel}</span>
            <span
              className={`${cefrClasses} ${accentTextClasses[languageProficiencyAccent[language.proficiency]]}`}
            >
              {language.cefr}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
