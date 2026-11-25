import { languageProficiencyAccent } from "@/constants";
import { getLanguages } from "@/i18n/content";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

export default async function CvLanguages() {
  const languages = await getLanguages();
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5">
      {languages.map((language) => (
        <li key={language.key} className="flex items-center gap-1.5 text-cv-sm">
          <ShapeMarker
            shape="circle"
            className={`size-1.5 shrink-0 ${accentTextClasses[languageProficiencyAccent[language.proficiency]]}`}
          />
          <span className="font-bold text-paper-ink">{language.name}</span>
          <span className="font-mono text-paper-muted">{language.cefr}</span>
        </li>
      ))}
    </ul>
  );
}
