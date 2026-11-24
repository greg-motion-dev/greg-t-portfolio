import { languageProficiencyAccent, languages } from "@/constants";
import { accentTextClasses } from "@/components/ui/accentClasses";

const rowClasses =
  "grid grid-cols-[1fr_auto_3rem] items-baseline gap-x-3 md:max-lg:grid-cols-[1fr_3rem] md:max-lg:gap-y-1";

const proficiencyClasses =
  "text-right text-sm text-ink-muted md:max-lg:col-start-1 md:max-lg:row-start-2 md:max-lg:text-left";

const cefrClasses =
  "font-mono text-xs tracking-wider md:max-lg:col-start-2 md:max-lg:row-start-1 md:max-lg:text-right";

export default function LanguageList() {
  return (
    <ul className="flex flex-col divide-y divide-white/10">
      {languages.map((language) => (
        <li
          key={language.name}
          className="flex flex-1 flex-col justify-center py-3 first:pt-0 last:pb-0"
        >
          <div className={rowClasses}>
            <span className="text-ink">{language.name}</span>
            <span className={proficiencyClasses}>{language.proficiency}</span>
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
