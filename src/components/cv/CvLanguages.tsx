import { languageProficiencyAccent, languages } from "@/constants";
import ShapeMarker from "@/components/ui/ShapeMarker";
import { accentTextClasses } from "@/components/ui/accentClasses";

export default function CvLanguages() {
  return (
    <ul className="space-y-1">
      {languages.map((language) => (
        <li key={language.name} className="flex items-center justify-between gap-3 text-cv-sm">
          <span className="flex items-center gap-1.5 font-bold text-paper-ink">
            <ShapeMarker
              shape="circle"
              className={`size-1.5 ${accentTextClasses[languageProficiencyAccent[language.proficiency]]}`}
            />
            {language.name}
          </span>
          <span className="font-mono text-paper-muted">
            {language.proficiency} · {language.cefr}
          </span>
        </li>
      ))}
    </ul>
  );
}
