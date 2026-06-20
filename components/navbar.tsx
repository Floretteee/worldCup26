import { Menu } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";

export function Navbar({ locale, copy, onLocaleChange }: { locale: Locale; copy: Dictionary; onLocaleChange: (locale: Locale) => void }) {
  const nextLocale = locale === "zh" ? "en" : "zh";
  const links = [
    [copy.sections.brackets, "#brackets"],
    [copy.sections.groups, "#groups"],
    [copy.sections.teams, "#teams"],
    [copy.sections.prizes, "#prizes"],
    [copy.sections.formats, "#formats"],
    [copy.sections.eventData, "#event-data"],
    [copy.sections.stadiums, "#stadiums"],
    [copy.sections.live, "#live"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/20 bg-[var(--nav)] text-[var(--nav-text)] shadow-lg">
      <div className="mx-auto flex min-h-12 max-w-[1840px] items-center gap-3 px-3 sm:px-5 xl:px-6">
        <a className="hltv-title flex h-8 min-w-24 items-center justify-center bg-[#111] px-3 text-xl text-white ring-1 ring-white/15" href="#top" aria-label={copy.nav.home}>
          WC26TV
        </a>
        <nav className="thin-scrollbar hidden min-w-0 flex-1 items-center overflow-x-auto md:flex" aria-label={copy.nav.aria}>
          <span className="hltv-title mr-2 shrink-0 px-2 text-xs uppercase text-white/55">{copy.nav.sections}</span>
          {links.map(([label, href]) => (
            <a key={href} href={href} className="shrink-0 px-3 py-4 text-[13px] font-bold hover:bg-white/10">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
          <span className="hltv-title text-xs uppercase text-white/55">{copy.nav.settings}</span>
          <button type="button" onClick={() => onLocaleChange(nextLocale)} className="min-h-9 border border-white/15 px-3 py-2 text-[11px] font-bold uppercase text-white/80 hover:bg-white/10">
            {copy.nav.language}
          </button>
          <ThemeToggle labels={copy.theme} />
        </div>
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <button type="button" onClick={() => onLocaleChange(nextLocale)} className="grid min-h-10 place-items-center px-2 text-xs font-bold uppercase hover:bg-white/10">
            {copy.nav.language}
          </button>
          <button className="grid min-h-10 min-w-10 place-items-center hover:bg-white/10" aria-label={copy.nav.openMenu}>
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
