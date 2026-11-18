import { contactContent } from "@/constants";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import SectionHeading from "@/components/ui/SectionHeading";
import ShapeMarker from "@/components/ui/ShapeMarker";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading id="contact-title" title={contactContent.title} />

        <p className="mt-12 max-w-2xl text-lg text-ink md:mt-16 md:text-2xl">
          {contactContent.intro}
        </p>

        <p className="mt-6 flex items-center gap-3 font-mono text-xs tracking-wider text-ink-muted uppercase">
          <ShapeMarker shape="circle" className="size-2 text-brand-yellow" />
          {contactContent.availability}
        </p>

        <a
          href={`mailto:${contactContent.email}`}
          className="focus-ring mt-12 inline-block text-2xl font-extrabold tracking-tight break-all text-ink underline decoration-white/20 decoration-2 underline-offset-8 transition-colors hover:decoration-brand-yellow md:text-4xl"
        >
          {contactContent.email}
        </a>

        <div className="mt-8">
          <CopyEmailButton
            email={contactContent.email}
            label={contactContent.copyLabel}
            copiedLabel={contactContent.copiedLabel}
            failedLabel={contactContent.copyFailedLabel}
          />
        </div>
      </div>
    </section>
  );
}
