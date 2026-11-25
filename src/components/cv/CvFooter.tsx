import { cvWorkedWith } from "@/constants";
import { getUi } from "@/i18n/getUi";
import CvInlineList from "@/components/cv/CvInlineList";
import { abbreviate } from "@/lib/abbreviate";

export default async function CvFooter() {
  const ui = await getUi();
  return (
    <footer className="shrink-0 bg-canvas px-[14mm] py-[4.5mm]">
      <p className="font-mono text-cv-xs leading-relaxed tracking-wider text-ink-muted uppercase">
        <span className="text-brand-yellow">{ui.cvPage.workedWithTitle}</span>
        <span className="mx-2 text-white/20">/</span>
        <span className="text-ink">
          <CvInlineList items={cvWorkedWith.map(abbreviate)} />
        </span>
      </p>
    </footer>
  );
}
