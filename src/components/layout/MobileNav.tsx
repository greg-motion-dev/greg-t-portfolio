"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  fillTemplate,
  profile,
  profileLinkLabels,
  type MobileNavLabels,
  type NavContent,
} from "@/constants";
import CloseIcon from "@/components/icons/CloseIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import SocialIcon from "@/components/icons/SocialIcon";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { localizeHref, type Locale } from "@/i18n/config";

const iconButtonClasses =
  "focus-ring flex size-10 items-center justify-center text-ink transition-colors hover:text-brand-yellow";

const dialogClasses =
  "m-0 h-dvh max-h-none w-full max-w-none -translate-y-2 border-0 bg-canvas p-0 text-ink opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-transparent open:translate-y-0 open:opacity-100 motion-reduce:transition-none starting:open:-translate-y-2 starting:open:opacity-0";

const formatIndex = (index: number): string => String(index + 1).padStart(2, "0");

export interface MobileNavProps {
  readonly locale: Locale;
  readonly nav: NavContent;
  readonly labels: MobileNavLabels;
}

export default function MobileNav({ locale, nav, labels }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  useEffect(() => {
    if (isDesktop) {
      dialogRef.current?.close();
    }
  }, [isDesktop]);

  const openMenu = (): void => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  const closeMenu = (): void => {
    dialogRef.current?.close();
  };

  const handleDialogClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={labels.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openMenu}
        className={iconButtonClasses}
      >
        <MenuIcon className="size-6" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={labels.menu}
        onClose={handleDialogClose}
        className={dialogClasses}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10">
            <div className="mx-auto flex h-nav max-w-7xl items-center justify-between gap-3 px-5 md:px-10">
              <Link
                href={localizeHref(locale, "/#about")}
                onClick={closeMenu}
                className="focus-ring font-mono text-sm font-extrabold tracking-widest text-ink uppercase sm:text-base md:text-lg"
              >
                {profile.name}
              </Link>
              <div className="flex items-center gap-4">
                <LanguageSwitch locale={locale} label={nav.languageSwitchLabel} />
                <div className="-mr-2">
                  <button
                    type="button"
                    aria-label={labels.closeMenu}
                    onClick={closeMenu}
                    className={iconButtonClasses}
                  >
                    <CloseIcon className="size-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label={nav.ariaLabel} className="flex-1 overflow-y-auto">
            <ul className="mx-auto max-w-7xl px-5 py-8 md:px-10">
              {nav.links.map(({ name, link }, index) => (
                <li key={name} className="border-b border-white/10">
                  <Link
                    href={localizeHref(locale, link)}
                    onClick={closeMenu}
                    className="focus-ring group flex items-baseline gap-4 py-5"
                  >
                    <span className="font-mono text-sm text-ink-muted">{formatIndex(index)}</span>
                    <span className="text-heading font-extrabold text-ink transition-colors group-hover:text-brand-yellow">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/10">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 md:px-10">
              <Link
                href={localizeHref(locale, nav.contact.link)}
                onClick={closeMenu}
                className="focus-ring border border-ink px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
              >
                {nav.contact.name}
              </Link>
              <ul className="flex items-center gap-5">
                {profile.links.map(({ kind, href }) => (
                  <li key={kind}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={fillTemplate(nav.profileLinkAriaTemplate, {
                        name: profileLinkLabels[kind],
                      })}
                      className="focus-ring block text-ink-muted transition-colors hover:text-ink"
                    >
                      <SocialIcon kind={kind} className="size-6" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
