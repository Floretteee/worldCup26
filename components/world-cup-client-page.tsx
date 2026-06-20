"use client";

import { CalendarDays, Globe2, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Game, Group, Stadium, Team } from "@/lib/types";
import { defaultLocale, getDictionary, intlLocale, type Locale } from "@/lib/i18n";
import { buildGroups, buildKnockoutRounds, dateRangeLabel, money } from "@/lib/transform";
import { Navbar } from "@/components/navbar";
import { EventHero } from "@/components/event-hero";
import { KnockoutBracket } from "@/components/knockout-bracket";
import { GroupsGrid } from "@/components/groups-grid";
import { TeamsGrid } from "@/components/teams-grid";
import { PrizeDistribution } from "@/components/prize-distribution";
import { InfoPanels } from "@/components/info-panels";
import { LiveScoreCarousel } from "@/components/live-score-carousel";

const localeStorageKey = "wc26tv-locale";

type WorldCupData = {
  groups: Group[];
  teams: Team[];
  games: Game[];
  stadiums: Stadium[];
};

export function WorldCupClientPage({ data }: { data: WorldCupData }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [syncedGames, setSyncedGames] = useState(data.games);
  const copy = getDictionary(locale);

  useEffect(() => {
    const stored = window.localStorage.getItem(localeStorageKey);
    if (stored === "zh" || stored === "en") setLocale(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale);
    document.documentElement.lang = intlLocale(locale);
    document.title = copy.metadata.title;
  }, [copy.metadata.title, locale]);

  useEffect(() => {
    setSyncedGames(data.games);
  }, [data.games]);

  const grouped = useMemo(() => buildGroups(data.groups, data.teams, syncedGames, data.stadiums, locale), [data.groups, data.stadiums, data.teams, syncedGames, locale]);
  const bracket = useMemo(() => buildKnockoutRounds(syncedGames, data.teams, data.stadiums, locale), [data.stadiums, data.teams, syncedGames, locale]);
  const groupGames = useMemo(() => syncedGames.filter((game) => game.type === "group"), [syncedGames]);
  const liveCopy = {
    title: copy.live.title,
    syncFallback: copy.live.syncFallback,
    previous: copy.live.previous,
    next: copy.live.next,
    queue: copy.live.queue,
    openHub: copy.live.openHub,
    openMatchSearch: copy.live.openMatchSearch,
    noData: copy.live.noData,
    stadiumTbd: copy.live.stadiumTbd,
    live: copy.live.live,
    vs: copy.common.vs,
    status: copy.status,
  };

  return (
    <main>
      <Navbar locale={locale} copy={copy} onLocaleChange={setLocale} />
      <div className="mx-auto w-full max-w-[1840px] px-3 pb-16 pt-5 sm:px-5 xl:px-6">
        <div className="mb-4 hidden h-[88px] items-center justify-center overflow-hidden border border-[var(--border)] bg-[linear-gradient(90deg,#10243b,#264a72,#10243b)] text-center text-[var(--nav-text)] shadow-lg md:flex">
          <div>
            <div className="hltv-title text-3xl">{copy.hero.masthead}</div>
            <div className="text-xs uppercase tracking-[.35em] text-blue-100/80">{copy.hero.hosts}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_460px]">
          <section className="min-w-0">
            <EventHero
              copy={copy}
              title={copy.hero.title}
              status={copy.hero.status}
              date={dateRangeLabel(syncedGames, locale)}
              prize={money(896_000_000, locale)}
              teams={data.teams.length}
              location={copy.hero.location}
              stats={[
                { label: copy.stats.matches, value: syncedGames.length.toString(), icon: Trophy },
                { label: copy.stats.groups, value: data.groups.length.toString(), icon: Globe2 },
                { label: copy.stats.firstKickOff, value: copy.stats.firstKickOffValue, icon: CalendarDays },
              ]}
            />

            <div id="brackets" className="section-header"><span>{copy.sections.brackets}</span></div>
            <KnockoutBracket rounds={bracket} locale={locale} copy={copy} />

            <div id="groups" className="section-header"><span>{copy.sections.groups}</span></div>
            <GroupsGrid groups={grouped} locale={locale} copy={copy} />

            <div id="teams" className="section-header"><span>{copy.sections.teams}</span></div>
            <TeamsGrid teams={data.teams} locale={locale} copy={copy} />

            <div id="prizes" className="section-header"><span>{copy.sections.prizes}</span></div>
            <PrizeDistribution locale={locale} copy={copy} />

            <InfoPanels games={syncedGames} teams={data.teams} stadiums={data.stadiums} locale={locale} copy={copy} />
          </section>

          <aside className="space-y-4 xl:sticky xl:top-[66px] xl:self-start">
            <LiveScoreCarousel initialGames={groupGames} teams={data.teams} stadiums={data.stadiums} locale={locale} copy={liveCopy} onGamesSync={setSyncedGames} />
          </aside>
        </div>
      </div>
    </main>
  );
}
