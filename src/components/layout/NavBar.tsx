import { profile } from "@/constants";
import { getUi } from "@/i18n/getUi";
import Link from "next/link";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import MobileNav from "@/components/layout/MobileNav";
import { localizeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

export default async function NavBar() {
  const ui = await getUi();
  const locale = await getLocale();
  const navItems = [...ui.nav.links, ui.nav.contact];

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex h-nav max-w-frame items-center justify-between gap-3 px-5 md:px-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <Link
          href={localizeHref(locale, "/#about")}
          className="focus-ring justify-self-start font-mono text-sm font-extrabold tracking-widest text-ink uppercase sm:text-base md:text-lg"
        >
          {profile.name}
        </Link>

        <nav aria-label={ui.nav.ariaLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map(({ name, link }) => (
              <li key={name}>
                <Link
                  href={localizeHref(locale, link)}
                  className="focus-ring font-mono text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <LanguageSwitch locale={locale} label={ui.nav.languageSwitchLabel} />
          <div className="-mr-2 lg:hidden">
            <MobileNav locale={locale} nav={ui.nav} labels={ui.mobileNav} />
          </div>
        </div>
      </div>
    </header>
  );
}
