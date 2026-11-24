import { navContact, navLinks, profile } from "@/constants";
import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";

export default function NavBar() {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/10">
      <div className="mx-auto flex h-nav max-w-7xl items-center justify-between gap-3 px-5 md:px-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <Link
          href="/#about"
          className="focus-ring justify-self-start font-mono text-sm font-extrabold tracking-widest text-ink uppercase sm:text-base md:text-lg"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
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

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href={navContact.link}
            className="focus-ring hidden border border-ink px-4 py-2 font-mono text-sm text-ink transition-colors hover:bg-ink hover:text-canvas lg:block"
          >
            {navContact.name}
          </Link>
          <div className="-mr-2 lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
