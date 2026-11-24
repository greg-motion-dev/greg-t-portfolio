import Image from "next/image";
import {
  contactContent,
  cvPageContent,
  heroPortrait,
  profile,
  profileLinkLabels,
} from "@/constants";
import CvOrbit from "@/components/cv/CvOrbit";
import LocationIcon from "@/components/icons/LocationIcon";
import MailIcon from "@/components/icons/MailIcon";
import SocialIcon from "@/components/icons/SocialIcon";

const linkClasses = "flex items-center gap-1.5 underline decoration-white/25 underline-offset-2";
const iconClasses = "size-[3mm] shrink-0 text-brand-yellow";

export default function CvHeader() {
  return (
    <header className="relative shrink-0 overflow-hidden bg-canvas px-[14mm] py-[7mm] text-ink">
      <div className="flex items-center gap-[4.8mm]">
        <div className="relative flex h-[31.8mm] w-[57mm] shrink-0 items-center justify-center">
          <CvOrbit />
          <Image
            src={heroPortrait.src}
            alt={heroPortrait.alt}
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
            {cvPageContent.profileSummary}
          </p>
          <ul className="flex flex-wrap justify-between gap-x-5 gap-y-1 font-mono text-cv-xs text-ink-muted">
            <li className="flex items-center gap-1.5">
              <LocationIcon className={iconClasses} />
              {profile.location}
            </li>
            <li>
              <a href={`mailto:${contactContent.email}`} className={linkClasses}>
                <MailIcon className={iconClasses} />
                {contactContent.email}
              </a>
            </li>
            {profile.links.map(({ kind, handle, href }) => (
              <li key={kind}>
                <a href={href} aria-label={profileLinkLabels[kind]} className={linkClasses}>
                  <SocialIcon kind={kind} className={iconClasses} />/{handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
