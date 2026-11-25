import Link from "next/link";
import { fillTemplate, profile, profileLinkLabels } from "@/constants";
import { getUi } from "@/i18n/getUi";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import SocialIcon from "@/components/icons/SocialIcon";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

const linkClasses = "focus-ring text-ink-muted transition-colors hover:text-ink";

export default async function Footer() {
  const ui = await getUi();
  const locale = await getLocale();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-frame flex-col items-center gap-6 px-5 py-8 font-mono text-xs tracking-widest uppercase md:flex-row md:justify-between md:px-10">
        <p className="text-ink-muted max-md:order-last">{ui.footer.copyright}</p>

        <div className="flex items-center gap-8">
          <Link href={localizeHref(locale, ui.footer.privacyLink.link)} className={linkClasses}>
            {ui.footer.privacyLink.name}
          </Link>
          <a href="#top" className={`inline-flex items-center gap-2 ${linkClasses}`}>
            {ui.footer.backToTopLabel}
            <ArrowDownIcon className="size-3.5 rotate-180" />
          </a>
        </div>

        <ul className="flex items-center gap-5 max-md:order-first">
          {profile.links.map(({ kind, href }) => (
            <li key={kind}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={fillTemplate(ui.nav.profileLinkAriaTemplate, {
                  name: profileLinkLabels[kind],
                })}
                className={`block ${linkClasses}`}
              >
                <SocialIcon kind={kind} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
