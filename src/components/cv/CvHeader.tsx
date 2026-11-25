import Image from "next/image";
import { heroPortrait, profile, profileLinkLabels } from "@/constants";
import { getUi } from "@/i18n/getUi";
import CvOrbit from "@/components/cv/CvOrbit";
import GlobeIcon from "@/components/icons/GlobeIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import MailIcon from "@/components/icons/MailIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import SocialIcon from "@/components/icons/SocialIcon";

const contactRowClasses = "grid grid-cols-3 gap-x-4";
const itemClasses = "flex items-center gap-1.5";
const linkClasses =
  "flex w-fit items-center gap-1.5 underline decoration-white/25 underline-offset-2";
const iconClasses = "size-[3mm] shrink-0 text-brand-yellow";

export default async function CvHeader() {
  const ui = await getUi();
  return (
    <header className="relative shrink-0 overflow-hidden bg-canvas px-[14mm] pt-[10mm] pb-[5mm] text-ink">
      <div className="flex items-center gap-[4.8mm]">
        <div className="relative flex h-[31.8mm] w-[57mm] shrink-0 items-center justify-center">
          <CvOrbit />
          <Image
            src={heroPortrait.src}
            alt={ui.hero.portraitAlt}
            width={heroPortrait.width}
            height={heroPortrait.height}
            sizes="120px"
            className="relative size-[25mm] rounded-full bg-brand-yellow object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[4mm]">
          <h1 className="text-[2.375rem] leading-none font-extrabold tracking-[0.02em] text-ink uppercase [text-box:trim-both_cap_alphabetic]">
            {profile.name}
          </h1>
          <p className="font-mono text-cv text-ink [text-box:trim-both_cap_alphabetic]">
            {profile.title}
          </p>
          <p className="text-[0.6875rem]/[1.45] text-ink-muted [text-box:trim-both_cap_alphabetic]">
            {ui.cvPage.profileSummary}
          </p>
          <div className="flex flex-col gap-y-[2mm] font-mono text-cv-xs text-ink-muted">
            <ul className={contactRowClasses}>
              <li className={itemClasses}>
                <LocationIcon className={iconClasses} />
                {profile.location}
              </li>
              <li data-cv-phone hidden>
                <a data-cv-phone-link className={linkClasses}>
                  <PhoneIcon className={iconClasses} />
                  <span data-cv-phone-number />
                </a>
              </li>
              <li>
                <a href={`mailto:${ui.contact.email}`} className={linkClasses}>
                  <MailIcon className={iconClasses} />
                  {ui.contact.email}
                </a>
              </li>
            </ul>
            <ul className={contactRowClasses}>
              <li>
                <a href={profile.website.href} className={linkClasses}>
                  <GlobeIcon className={iconClasses} />
                  {profile.website.label}
                </a>
              </li>
              {profile.links.map(({ kind, handle, href }) => (
                <li key={kind}>
                  <a href={href} aria-label={profileLinkLabels[kind]} className={linkClasses}>
                    <SocialIcon kind={kind} className={iconClasses} />
                    {handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
