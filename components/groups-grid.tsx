import type { EnrichedGame, EnrichedGroup } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { teamDisplayName } from "@/lib/i18n";
import {
  bingSearchUrl,
  formatDateTime,
  groupBingUrl,
  isLive,
  matchBingUrl,
  scoreLabel,
  teamBingUrl,
  toInt,
} from "@/lib/transform";
import { MatchTeam } from "./match-team";

export function GroupsGrid({ groups, locale, copy }: { groups: EnrichedGroup[]; locale: Locale; copy: Dictionary }) {
  return (
    <div className="standard-box border-t-0 p-3">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {groups.map((group) => (
          <GroupCard key={group.name} group={group} locale={locale} copy={copy} />
        ))}
      </div>
    </div>
  );
}

function GroupCard({ group, locale, copy }: { group: EnrichedGroup; locale: Locale; copy: Dictionary }) {
  return (
    <article className="inner-box overflow-hidden">
      <a
        href={groupBingUrl(group.name)}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-between bg-[var(--nav)] px-3 py-2 text-white transition hover:bg-[#1c2c43]"
        aria-label={`${copy.standings.group} ${group.name}`}
      >
        <h3 className="hltv-title text-lg">{copy.round.group(group.name)}</h3>
        <span className="text-[11px] uppercase text-white/65">{group.games.length} {copy.standings.matches}</span>
      </a>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[430px] text-left text-xs">
          <thead className="bg-[var(--surface-2)] text-[10px] uppercase text-[var(--muted)]">
            <tr>
              <th className="px-2 py-2">{copy.standings.team}</th>
              <th className="px-1 py-2 text-center">{copy.standings.mp}</th>
              <th className="px-1 py-2 text-center">{copy.standings.w}</th>
              <th className="px-1 py-2 text-center">{copy.standings.d}</th>
              <th className="px-1 py-2 text-center">{copy.standings.l}</th>
              <th className="px-1 py-2 text-center">{copy.standings.gd}</th>
              <th className="px-1 py-2 text-center">{copy.standings.pts}</th>
            </tr>
          </thead>
          <tbody>
            {group.standings.map((standing, index) => (
              <tr key={standing.team_id} className="border-t border-[var(--border)] odd:bg-[var(--surface-3)]">
                <td className="px-2 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className={`grid h-5 w-5 place-items-center text-[10px] font-bold text-white ${index < 2 ? "bg-[var(--green)]" : index === 2 ? "bg-[var(--yellow)]" : "bg-[var(--faint)]"}`}>{index + 1}</span>
                    {standing.team?.flag ? <img src={standing.team.flag} className="flag-img" alt="" loading="lazy" /> : null}
                    {standing.team ? (
                      <a
                        href={teamBingUrl(standing.team.name_en)}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="truncate font-bold hover:text-[var(--accent-2)] hover:underline"
                      >
                        {teamDisplayName(standing.team, locale)}
                      </a>
                    ) : (
                      <span className="truncate font-bold">{standing.team_id}</span>
                    )}
                  </div>
                </td>
                <Num value={standing.mp} />
                <Num value={standing.w} />
                <Num value={standing.d} />
                <Num value={standing.l} />
                <Num value={standing.gd} signed />
                <td className="px-1 py-2 text-center font-bold">{standing.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-[var(--border)] bg-[var(--surface)] p-2">
        <div className="grid gap-2 sm:grid-cols-2">
          {group.games.slice(0, 6).map((game) => (
            <GroupMatch key={game.id} game={game} locale={locale} copy={copy} />
          ))}
        </div>
      </div>
    </article>
  );
}

function Num({ value, signed = false }: { value: string; signed?: boolean }) {
  const number = toInt(value);
  return <td className="px-1 py-2 text-center tabular-nums">{signed && number > 0 ? `+${number}` : value}</td>;
}

function GroupMatch({ game, locale, copy }: { game: EnrichedGame; locale: Locale; copy: Dictionary }) {
  const live = isLive(game);
  const score = scoreLabel(game, locale);
  return (
    <article className={`relative p-2 transition ${live ? "live-match-card" : "border border-[var(--border)] bg-[var(--surface-3)] hover:border-[var(--accent-2)]"}`}>
      <a
        href={matchBingUrl(game, locale)}
        target="_blank"
        rel="noreferrer noopener"
        className="card-link"
        aria-label={copy.common.searchMatch(game.id)}
      />
      <div className="relative z-10 mb-1 flex items-center justify-between text-[10px] uppercase text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <a
            href={matchBingUrl(game, locale)}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[var(--accent-2)] hover:underline"
          >
            #{game.id}
          </a>
          {live ? <LiveBadge label={copy.live.live} /> : null}
        </span>
        <a
          href={bingSearchUrl(`${formatDateTime(game.dateObject)} FIFA World Cup 2026`)}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-[var(--accent-2)] hover:underline"
        >
          {formatDateTime(game.dateObject, locale)}
        </a>
      </div>
      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <MatchTeam game={game} side="home" compact locale={locale} />
        <a
          href={matchBingUrl(game, locale)}
          target="_blank"
          rel="noreferrer noopener"
          className={`hltv-title px-2 py-1 text-center text-xs ${live ? "bg-[var(--accent)] text-white" : "bg-[var(--surface-2)] hover:opacity-80"}`}
          aria-label={copy.common.searchScore(score)}
        >
          {score}
        </a>
        <div className="min-w-0 justify-self-end text-right"><MatchTeam game={game} side="away" compact locale={locale} /></div>
      </div>
    </article>
  );
}

function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[var(--accent)] px-1.5 py-0.5 font-bold uppercase text-white shadow-sm">
      <span className="relative inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      {label}
    </span>
  );
}
