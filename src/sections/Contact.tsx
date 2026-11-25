import { getUi } from "@/i18n/getUi";
import ContactFluid from "@/components/contact/ContactFluid";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import SectionHeading from "@/components/ui/SectionHeading";
import ShapeMarker from "@/components/ui/ShapeMarker";

export default async function Contact() {
  const ui = await getUi();
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden pt-48 pb-16 md:pt-64 md:pb-20"
    >
      <ContactFluid />
      <div className="relative mx-auto max-w-frame px-5 md:px-10">
        <SectionHeading id="contact-title" title={ui.contact.title} />

        <p className="mt-12 text-lg text-ink md:mt-16 md:text-2xl">
          {ui.contact.introLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <ul className="mt-6 flex flex-col gap-2 font-mono text-xs tracking-wider text-ink-muted uppercase">
          {ui.contact.availability.map((line) => (
            <li key={line} className="flex items-center gap-3">
              <ShapeMarker shape="circle" className="size-2 text-brand-yellow" />
              {line}
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${ui.contact.email}`}
          className="focus-ring mt-12 inline-block font-mono text-2xl break-all text-brand-yellow underline decoration-brand-yellow/30 decoration-2 underline-offset-8 transition-colors hover:decoration-brand-yellow md:text-4xl"
        >
          {ui.contact.email}
        </a>

        <div className="mt-8">
          <CopyEmailButton
            email={ui.contact.email}
            label={ui.contact.copyLabel}
            copiedLabel={ui.contact.copiedLabel}
            failedLabel={ui.contact.copyFailedLabel}
          />
        </div>
      </div>
    </section>
  );
}
