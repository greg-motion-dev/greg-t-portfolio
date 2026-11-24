import { contactContent } from "@/constants";
import ContactFluid from "@/components/contact/ContactFluid";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import SectionHeading from "@/components/ui/SectionHeading";
import ShapeMarker from "@/components/ui/ShapeMarker";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-48 pb-16 md:pt-64 md:pb-20">
      <ContactFluid />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading id="contact-title" title={contactContent.title} />

        <p className="mt-12 text-lg text-ink md:mt-16 md:text-2xl">
          {contactContent.introLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
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
