"use client";

import type { EnrichedGame } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { teamBingUrl, teamFlag, teamName } from "@/lib/transform";

export function MatchTeam({ game, side, compact = false, locale = "en" }: { game: EnrichedGame; side: "home" | "away"; compact?: boolean; locale?: Locale }) {
  const flag = teamFlag(game, side);
  const name = teamName(game, side, locale);
  const team = side === "home" ? game.homeTeam : game.awayTeam;
  const linkable = Boolean(team);
  const className = `truncate font-bold ${compact ? "text-xs" : "text-sm"}`;
  return (
    <div className="flex min-w-0 items-center gap-2">
      {flag ? <img src={flag} alt="" className="flag-img shrink-0" loading="lazy" /> : <div className="h-[18px] w-[26px] shrink-0 border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)]" />}
      {linkable ? (
        <a
          href={teamBingUrl(team?.name_en)}
          className={`${className} hover:text-[var(--accent-2)] hover:underline`}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          {name}
        </a>
      ) : (
        <span className={className}>{name}</span>
      )}
    </div>
  );
}
