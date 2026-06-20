import type { Team } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { intlLocale, teamDisplayName } from "@/lib/i18n";
import { teamMsnUrl } from "@/lib/transform";

export function TeamsGrid({ teams, locale, copy }: { teams: Team[]; locale: Locale; copy: Dictionary }) {
  const sorted = [...teams].sort((a, b) => a.groups.localeCompare(b.groups) || teamDisplayName(a, locale).localeCompare(teamDisplayName(b, locale), intlLocale(locale)));
  return (
    <div className="standard-box border-t-0 p-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {sorted.map((team) => (
          <a
            key={team.id}
            href={teamMsnUrl(team.name_en)}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden border border-[var(--border)] bg-[var(--surface-3)] p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent-2)]"
            aria-label={copy.common.openTeam(teamDisplayName(team, locale))}
          >
            <div className="absolute right-2 top-2 bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--muted)]">{team.groups}</div>
            <div className="mx-auto mb-3 grid h-16 w-20 place-items-center bg-[var(--surface-2)] p-2">
              <img src={team.flag} alt="" className="max-h-10 w-14 object-cover shadow" loading="lazy" />
            </div>
            <div className="truncate text-sm font-bold group-hover:text-[var(--accent-2)] group-hover:underline">{teamDisplayName(team, locale)}</div>
            <div className="mt-1 text-[11px] uppercase text-[var(--muted)]">{team.fifa_code}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
