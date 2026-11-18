import type { Metadata } from "next";
import { cvPageContent, profile } from "@/constants";
import CvAlso from "@/components/cv/CvAlso";
import CvEducation from "@/components/cv/CvEducation";
import CvHeader from "@/components/cv/CvHeader";
import CvLanguages from "@/components/cv/CvLanguages";
import CvSection from "@/components/cv/CvSection";
import CvSkills from "@/components/cv/CvSkills";
import CvTimeline from "@/components/cv/CvTimeline";

export const metadata: Metadata = {
  title: cvPageContent.documentTitle,
};

export default function CvPage() {
  return (
    <main className="flex-1 bg-canvas py-10 print:bg-paper print:py-0">
      <article className="mx-auto w-[210mm] max-w-full bg-paper p-[14mm] text-paper-ink shadow-2xl [print-color-adjust:exact] print:w-auto print:p-0 print:shadow-none">
        <CvHeader />

        <div className="mt-6">
          <CvSection title={cvPageContent.profileTitle}>
            <p className="text-cv text-paper-ink">{profile.about}</p>
          </CvSection>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_62mm] gap-8">
          <CvSection title={cvPageContent.experienceTitle}>
            <CvTimeline />
          </CvSection>

          <div className="space-y-6">
            <CvSection title={cvPageContent.skillsTitle}>
              <CvSkills />
            </CvSection>
            <CvSection title={cvPageContent.languagesTitle}>
              <CvLanguages />
            </CvSection>
            <CvSection title={cvPageContent.educationTitle}>
              <CvEducation />
            </CvSection>
            <CvSection title={cvPageContent.alsoTitle}>
              <CvAlso />
            </CvSection>
          </div>
        </div>
      </article>
    </main>
  );
}
