import Link from "next/link";
import { footerContent, profile, profileLinkLabels } from "@/constants";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import SocialIcon from "@/components/icons/SocialIcon";

const linkClasses = "focus-ring text-ink-muted transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-8 font-mono text-xs tracking-widest uppercase md:flex-row md:justify-between md:px-10">
        <p className="text-ink-muted">{footerContent.copyright}</p>

        <ul className="flex items-center gap-5">
          {profile.links.map(({ kind, href }) => (
            <li key={kind}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profileLinkLabels[kind]} profile`}
                className={`block ${linkClasses}`}
              >
                <SocialIcon kind={kind} className="size-5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <Link href={footerContent.privacyLink.link} className={linkClasses}>
            {footerContent.privacyLink.name}
          </Link>
          <a href="#top" className={`inline-flex items-center gap-2 ${linkClasses}`}>
            {footerContent.backToTopLabel}
            <ArrowDownIcon className="size-3.5 rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  );
}
