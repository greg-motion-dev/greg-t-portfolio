import type { Metadata } from "next";
import { cvSectionAccents } from "@/constants";
import { getUi } from "@/i18n/getUi";
import CvAlso from "@/components/cv/CvAlso";
import CvEducation from "@/components/cv/CvEducation";
import CvFooter from "@/components/cv/CvFooter";
import CvHeader from "@/components/cv/CvHeader";
import CvLanguages from "@/components/cv/CvLanguages";
import CvSection from "@/components/cv/CvSection";
import CvSkills from "@/components/cv/CvSkills";
import CvTimeline from "@/components/cv/CvTimeline";

export async function generateMetadata(): Promise<Metadata> {
  const ui = await getUi();
  return { title: ui.cvPage.documentTitle };
}

export default async function CvPage() {
  const ui = await getUi();
  return (
    <main className="flex-1 bg-canvas py-10 print:bg-paper print:py-0">
      <article className="mx-auto text-pretty flex h-[297mm] w-[210mm] max-w-full flex-col overflow-hidden bg-paper text-paper-ink shadow-2xl ring-1 ring-white/10 [print-color-adjust:exact] print:shadow-none print:ring-0">
        <CvHeader />

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_63mm] gap-[10mm] px-[14mm] py-[8mm]">
          <CvSection
            index={1}
            title={ui.cvPage.experienceTitle}
            accent={cvSectionAccents.experience}
            fill
          >
            <CvTimeline />
          </CvSection>

          <div className="flex flex-col justify-between">
            <CvSection index={2} title={ui.cvPage.skillsTitle} accent={cvSectionAccents.skills}>
              <CvSkills />
            </CvSection>
            <CvSection
              index={3}
              title={ui.cvPage.languagesTitle}
              accent={cvSectionAccents.languages}
            >
              <CvLanguages />
            </CvSection>
            <CvSection
              index={4}
              title={ui.cvPage.educationTitle}
              accent={cvSectionAccents.education}
            >
              <CvEducation />
            </CvSection>
            <CvSection index={5} title={ui.cvPage.alsoTitle} accent={cvSectionAccents.also}>
              <CvAlso />
            </CvSection>
          </div>
        </div>

        <CvFooter />
      </article>
    </main>
  );
}
