"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Radio, RefreshCw } from "lucide-react";
import type { EnrichedGame, Game, Stadium, Team } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import {
  MSN_FIFA_HUB,
  enrichGame,
  formatDateTime,
  groupBingUrl,
  isLive,
  matchBingUrl,
  matchStatus,
  scoreLabel,
  stadiumBingUrl,
  teamName,
} from "@/lib/transform";
import { MatchTeam } from "./match-team";

type Props = {
  initialGames: Game[];
  teams: Team[];
  stadiums: Stadium[];
  locale: Locale;
  copy: LiveCarouselCopy;
};

export type LiveCarouselCopy = {
  title: string;
  syncFallback: string;
  previous: string;
  next: string;
  queue: string;
  openHub: string;
  openMatchSearch: string;
  noData: string;
  stadiumTbd: string;
  live: string;
  vs: string;
  status: Record<"Finished" | "Live" | "Scheduled", string>;
};

export function LiveScoreCarousel({ initialGames, teams, stadiums, locale, copy }: Props) {
  const [games, setGames] = useState(initialGames);
  const [index, setIndex] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setIndex((current) => (games.length ? (current + 1) % games.length : 0));
    }, 5000);
    return () => window.clearInterval(tick);
  }, [games.length]);

  useEffect(() => {
    const refresh = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://worldcup26.ir/get/games", { cache: "no-store" });
        const data = (await response.json()) as { games: Game[] };
        const groupGames = data.games.filter((game) => game.type === "group").slice(0, 24);
        setGames(groupGames);
        setUpdatedAt(new Date());
      } catch {
        setUpdatedAt(new Date());
      } finally {
        setLoading(false);
      }
    };
    refresh();
    const interval = window.setInterval(refresh, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const enriched = useMemo(
    () => games.map((game) => enrichGame(game, teams, stadiums)).sort((a, b) => Number(a.id) - Number(b.id)),
    [games, teams, stadiums],
  );

  const safeIndex = enriched.length ? index % enriched.length : 0;
  const active = enriched[safeIndex];
  const upcoming = enriched.slice(safeIndex + 1, safeIndex + 5).concat(enriched.slice(0, Math.max(0, 4 - (enriched.length - safeIndex - 1))));

  return (
    <section id="live" className="standard-box overflow-hidden">
      <a
        href={MSN_FIFA_HUB}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-center justify-between bg-[var(--nav)] px-3 py-2 text-white transition hover:bg-[#1c2c43]"
        aria-label={copy.openHub}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
          <h2 className="hltv-title text-base uppercase">{copy.title}</h2>
          <ExternalLink size={13} className="text-white/55 transition group-hover:text-white" />
        </div>
        <div className="flex items-center gap-1 text-[10px] uppercase text-white/70">
          <RefreshCw className={loading ? "animate-spin" : ""} size={13} />
          {updatedAt ? updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : copy.syncFallback}
        </div>
      </a>

      {active ? (
        <div className="p-3">
          <ScoreCard game={active} locale={locale} copy={copy} />
          <div className="mt-3 flex items-center justify-between gap-2">
            <button type="button" onClick={() => setIndex((value) => (value - 1 + enriched.length) % enriched.length)} className="grid min-h-10 min-w-10 place-items-center border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)]" aria-label={copy.previous}>
              <ChevronLeft size={18} />
            </button>
            <div className="text-center text-[11px] uppercase text-[var(--muted)]">
              {matchOf(safeIndex + 1, enriched.length, locale)}
            </div>
            <button type="button" onClick={() => setIndex((value) => (value + 1) % enriched.length)} className="grid min-h-10 min-w-10 place-items-center border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)]" aria-label={copy.next}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-4">
            <div className="hltv-title mb-2 text-xs uppercase text-[var(--muted)]">{copy.queue}</div>
            <div className="space-y-2">
              {upcoming.map((game) => (
                <div key={game.id} className="relative flex items-stretch border border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)]">
                  <button
                    type="button"
                    onClick={() => setIndex(enriched.findIndex((item) => item.id === game.id))}
                    className="flex-1 p-2 text-left"
                    aria-label={showMatch(teamName(game, "home", locale), teamName(game, "away", locale), locale)}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="truncate font-bold">{teamName(game, "home", locale)} {copy.vs} {teamName(game, "away", locale)}</span>
                      <span className="hltv-title shrink-0 text-[var(--accent)]">{scoreLabel(game, locale)}</span>
                    </div>
                  </button>
                  <a
                    href={matchBingUrl(game, locale)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="grid min-h-10 min-w-10 place-items-center border-l border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface-3)] hover:text-[var(--accent-2)]"
                    aria-label={copy.openMatchSearch}
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-[var(--muted)]">{copy.noData}</div>
      )}
    </section>
  );
}

function ScoreCard({ game, locale, copy }: { game: EnrichedGame; locale: Locale; copy: LiveCarouselCopy }) {
  const status = matchStatus(game);
  const live = isLive(game);
  const score = scoreLabel(game, locale);
  return (
    <article className={`overflow-hidden ${live ? "live-match-card" : "border border-[var(--border)] bg-[var(--surface-3)]"}`}>
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-[11px] uppercase text-[var(--muted)]">
        <a
          href={groupBingUrl(game.group)}
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-[var(--accent-2)] hover:underline"
        >
          {groupMatch(game.group, game.id, locale)}
        </a>
        <span className={`inline-flex items-center gap-1 font-bold ${live ? "text-[var(--accent)]" : status === "Finished" ? "text-[var(--accent-2)]" : ""}`}>
          <Radio size={12} /> {copy.status[status]}
        </span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="min-w-0"><MatchTeam game={game} side="home" locale={locale} /></div>
          <a
            href={matchBingUrl(game, locale)}
            target="_blank"
            rel="noreferrer noopener"
            className={`hltv-title px-3 py-2 text-center text-xl ${live ? "bg-[var(--accent)] text-white" : "bg-[var(--nav)] text-white"} hover:opacity-90`}
            aria-label={searchMatch(game.id, locale)}
          >
            {score}
          </a>
          <div className="min-w-0"><MatchTeam game={game} side="away" locale={locale} /></div>
        </div>
        <div className="mt-3 border-t border-[var(--border)] pt-2 text-xs text-[var(--muted)]">
          <div>{formatDateTime(game.dateObject, locale)}</div>
          {game.stadium ? (
            <a
              href={stadiumBingUrl(game.stadium)}
              target="_blank"
              rel="noreferrer noopener"
              className="block truncate hover:text-[var(--accent-2)] hover:underline"
            >
              {game.stadium.fifa_name || game.stadium.name_en}
            </a>
          ) : (
            <div className="truncate">{copy.stadiumTbd}</div>
          )}
        </div>
      </div>
    </article>
  );
}

function matchOf(current: number, total: number, locale: Locale) {
  return locale === "zh" ? `第 ${current} / ${total} 场` : `Match ${current} of ${total}`;
}

function showMatch(home: string, away: string, locale: Locale) {
  return locale === "zh" ? `查看 ${home} 对 ${away}` : `Show ${home} vs ${away}`;
}

function groupMatch(group: string, id: string, locale: Locale) {
  return locale === "zh" ? `${group} 组 | 第 ${id} 场` : `Group ${group} | Match #${id}`;
}

function searchMatch(id: string, locale: Locale) {
  return locale === "zh" ? `在 Bing 搜索第 ${id} 场比赛` : `Search match ${id} on Bing`;
}
