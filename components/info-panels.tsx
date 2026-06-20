import type { Game, Stadium, Team } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  bingSearchUrl,
  compactNumber,
  dateRangeLabel,
  eventDataBingUrl,
  money,
  stadiumBingUrl,
} from "@/lib/transform";

export function InfoPanels({ games, teams, stadiums, locale, copy }: { games: Game[]; teams: Team[]; stadiums: Stadium[]; locale: Locale; copy: Dictionary }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section>
        <div id="formats" className="section-header"><span>{copy.sections.formats}</span></div>
        <div className="standard-box border-t-0">
          <table className="w-full text-sm">
            <tbody>
              <Row label={copy.info.groupStage} value={copy.info.groupStageValue} search="FIFA World Cup 2026 group stage format" />
              <Row label={copy.info.knockout} value={copy.info.knockoutValue} search="FIFA World Cup 2026 knockout stage format" />
              <Row label={copy.info.tiebreakers} value={copy.info.tiebreakersValue} search="FIFA World Cup 2026 tiebreakers" />
            </tbody>
          </table>
        </div>

        <div id="event-data" className="section-header"><span>{copy.sections.eventData}</span></div>
        <div className="standard-box border-t-0">
          <table className="w-full text-sm">
            <tbody>
              <Row label={copy.info.date} value={dateRangeLabel(games, locale)} search="FIFA World Cup 2026 schedule" />
              <Row label={copy.info.teams} value={String(teams.length)} search="FIFA World Cup 2026 teams list" />
              <Row label={copy.info.matches} value={String(games.length)} search="FIFA World Cup 2026 fixtures" />
              <Row label={copy.info.prizePool} value={money(896_000_000, locale)} search="FIFA World Cup 2026 prize money" />
              <Row label={copy.info.hosts} value={copy.info.hostsValue} search="FIFA World Cup 2026 host cities" />
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-right">
          <a
            href={eventDataBingUrl()}
            target="_blank"
            rel="noreferrer noopener"
            className="text-xs uppercase text-[var(--muted)] hover:text-[var(--accent-2)] hover:underline"
          >
            {copy.info.moreOnBing}
          </a>
        </div>
      </section>

      <section>
        <div id="stadiums" className="section-header"><span>{copy.sections.stadiums}</span></div>
        <div className="standard-box grid grid-cols-2 gap-2 border-t-0 p-3 sm:grid-cols-3">
          {[...stadiums].sort((a, b) => a.city_en.localeCompare(b.city_en)).map((stadium) => (
            <a
              key={stadium.id}
              href={stadiumBingUrl(stadium)}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-[var(--border)] bg-[var(--surface-3)] p-3 transition hover:-translate-y-0.5 hover:border-[var(--accent-2)]"
               aria-label={copy.info.searchStadium(stadium.fifa_name || stadium.name_en)}
            >
              <div className="truncate text-sm font-bold">{stadium.fifa_name || stadium.name_en}</div>
              <div className="mt-1 text-xs text-[var(--muted)]">{stadium.city_en}</div>
              <div className="mt-2 inline-flex bg-[var(--surface-2)] px-2 py-1 text-[10px] font-bold uppercase text-[var(--muted)]">
                 {compactNumber(stadium.capacity, locale)} {copy.info.seats}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, search }: { label: string; value: string; search?: string }) {
  return (
    <tr className="border-b border-[var(--border)] last:border-b-0">
      <th className="w-36 bg-[var(--surface-2)] px-3 py-3 text-left text-xs uppercase text-[var(--muted)]">{label}</th>
      <td className="px-3 py-3 font-bold">
        {search ? (
          <a
            href={bingSearchUrl(search)}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-[var(--accent-2)] hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}
