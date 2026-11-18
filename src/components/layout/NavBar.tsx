import { navContact, navLinks, profile, profileLinkLabels } from "@/constants";
import Link from "next/link";
import SocialIcon from "@/components/icons/SocialIcon";

export default function NavBar() {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex h-nav max-w-7xl items-center justify-between gap-6 px-5 md:px-10">
        <Link
          href="/#about"
          className="focus-ring font-mono text-base font-extrabold tracking-widest text-ink uppercase md:text-lg"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ name, link }) => (
              <li key={name}>
                <Link
                  href={link}
                  className="focus-ring font-mono text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-4">
            {profile.links.map(({ kind, href }) => (
              <li key={kind}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profileLinkLabels[kind]} profile`}
                  className="focus-ring block text-ink-muted transition-colors hover:text-ink"
                >
                  <SocialIcon kind={kind} className="size-5" />
                </a>
              </li>
            ))}
          </ul>
          <Link
            href={navContact.link}
            className="focus-ring border border-ink px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-ink hover:text-canvas"
          >
            {navContact.name}
          </Link>
        </div>
      </div>
    </header>
  );
}
