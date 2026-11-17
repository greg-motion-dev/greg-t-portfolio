import { languageProficiencyAccent, languages } from "@/constants";
import { accentTextClasses } from "@/components/ui/accentClasses";

export default function LanguageList() {
  return (
    <ul className="flex flex-col divide-y divide-white/10">
      {languages.map((language) => (
        <li key={language.name} className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
          <span className="text-ink">{language.name}</span>
          <span className="flex items-baseline gap-3 text-right">
            <span className="text-sm text-ink-muted">{language.proficiency}</span>
            <span
              className={`w-12 font-mono text-xs tracking-wider ${accentTextClasses[languageProficiencyAccent[language.proficiency]]}`}
            >
              {language.cefr}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
