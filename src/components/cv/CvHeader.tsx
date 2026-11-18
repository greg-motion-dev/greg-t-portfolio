import Image from "next/image";
import { contactContent, heroPortrait, profile, profileLinkLabels } from "@/constants";

const linkClasses = "underline decoration-paper-line underline-offset-2";

const displayUrl = (href: string): string => href.replace(/^https?:\/\/(www\.)?/, "");

export default function CvHeader() {
  return (
    <header className="flex items-center gap-6">
      <Image
        src={heroPortrait.src}
        alt={heroPortrait.alt}
        width={heroPortrait.width}
        height={heroPortrait.height}
        sizes="96px"
        className="size-24 shrink-0 rounded-full bg-brand-yellow object-cover"
      />
      <div className="min-w-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-paper-ink">{profile.name}</h1>
        <p className="mt-1 font-mono text-cv text-paper-muted">{profile.title}</p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-cv-sm text-paper-ink">
          <li>
            <a href={`mailto:${contactContent.email}`} className={linkClasses}>
              {contactContent.email}
            </a>
          </li>
          <li>{profile.location}</li>
          {profile.links.map(({ kind, href }) => (
            <li key={kind}>
              <a href={href} aria-label={profileLinkLabels[kind]} className={linkClasses}>
                {displayUrl(href)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
