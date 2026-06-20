import type { BracketRound, EnrichedGame } from "@/lib/types";
import type { Dictionary, Locale } from "@/lib/i18n";
import { bingSearchUrl, formatDateTime, matchBingUrl, matchStatus, scoreLabel, stadiumBingUrl } from "@/lib/transform";
import { BracketScroller } from "./bracket-scroller";
import { MatchTeam } from "./match-team";

export function KnockoutBracket({ rounds, locale, copy }: { rounds: BracketRound[]; locale: Locale; copy: Dictionary }) {
  const matches = rounds.flatMap((round) => round.matches);
  const hasResolvedMatchups = matches.some((match) => Boolean(match.homeTeam || match.awayTeam));

  return (
    <BracketScroller defaultCollapsed={!hasResolvedMatchups} labels={copy.bracket}>
        <div className="hltv-bracket min-w-[1640px]">
          {rounds.map((round, roundIndex) => (
            <div key={round.key} className="hltv-bracket-round">
              <div className="hltv-bracket-round-title">{round.title}</div>
              <div className={`hltv-bracket-lane bracket-lane-${roundIndex}`}>
                {round.matches.length ? (
                  round.matches.map((match, matchIndex) => (
                    <BracketMatch
                      key={match.id}
                      match={match}
                      locale={locale}
                      copy={copy}
                      matchIndex={matchIndex}
                      hasConnector={roundIndex < rounds.length - 1}
                    />
                  ))
                ) : (
                  <EmptyMatch copy={copy} />
                )}
              </div>
            </div>
          ))}
        </div>
    </BracketScroller>
  );
}

function BracketMatch({ match, locale, copy, matchIndex, hasConnector }: { match: EnrichedGame; locale: Locale; copy: Dictionary; matchIndex: number; hasConnector: boolean }) {
  const status = matchStatus(match);
  const statusTone = status === "Live" ? "is-live" : status === "Finished" ? "is-finished" : "is-scheduled";
  const score = scoreLabel(match, locale);

  return (
    <article className={`hltv-bracket-match ${hasConnector ? "has-connector" : ""} ${matchIndex % 2 ? "connect-up" : "connect-down"}`}>
      <a
        href={matchBingUrl(match, locale)}
        target="_blank"
        rel="noreferrer noopener"
        className="hltv-bracket-meta block-link"
        aria-label={copy.common.searchMatch(match.id)}
      >
        <span>#{match.id}</span>
        <span className={statusTone}>{copy.status[status]}</span>
      </a>
      <div className="hltv-bracket-teams">
        <TeamRow game={match} side="home" score={match.home_score} isDone={status === "Finished"} locale={locale} />
        <TeamRow game={match} side="away" score={match.away_score} isDone={status === "Finished"} locale={locale} />
      </div>
      <div className="hltv-bracket-footer">
        <a
          href={bingSearchUrl(`${formatDateTime(match.dateObject)} FIFA World Cup 2026`)}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-[var(--accent-2)] hover:underline"
        >
          {formatDateTime(match.dateObject, locale)}
        </a>
        <a
          href={stadiumBingUrl(match.stadium)}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-[var(--accent-2)] hover:underline"
        >
          {match.stadium?.city_en || copy.common.tbd}
        </a>
      </div>
      <a
        href={matchBingUrl(match, locale)}
        target="_blank"
        rel="noreferrer noopener"
        className="hltv-bracket-score"
        aria-label={copy.common.searchScore(score)}
      >
        {score}
      </a>
    </article>
  );
}

function TeamRow({ game, side, score, isDone, locale }: { game: EnrichedGame; side: "home" | "away"; score?: string; isDone: boolean; locale: Locale }) {
  return (
    <div className="hltv-bracket-team-row">
      <MatchTeam game={game} side={side} compact locale={locale} />
      <span className="hltv-bracket-team-score">{isDone ? score || "0" : "-"}</span>
    </div>
  );
}

function EmptyMatch({ copy }: { copy: Dictionary }) {
  return (
    <div className="hltv-bracket-match is-empty">
      <div className="hltv-bracket-meta">
        <span>{copy.common.tbd}</span>
        <span className="is-scheduled">{copy.status.Scheduled}</span>
      </div>
      <div className="hltv-bracket-teams">
        <div className="hltv-bracket-team-row">
          <span className="text-xs font-bold text-[var(--muted)]">{copy.bracket.fixturePending}</span>
          <span className="hltv-bracket-team-score">-</span>
        </div>
      </div>
    </div>
  );
}
