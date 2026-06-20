import type { BracketRound, EnrichedGame, EnrichedGroup, Game, Group, Stadium, Team } from "./types";
import { getDictionary, intlLocale, teamDisplayName, type Locale } from "./i18n";

const groupOrder = "ABCDEFGHIJKL".split("");

export function toInt(value?: string | number | null) {
  const parsed = Number.parseInt(String(value ?? "0"), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function gameDate(game: Game) {
  const [date = "", time = "00:00"] = (game.local_date || "").split(" ");
  const [month, day, year] = date.split("/").map((part) => Number.parseInt(part, 10));
  const [hour, minute] = time.split(":").map((part) => Number.parseInt(part, 10));
  if (!month || !day || !year) return new Date(0);
  return new Date(year, month - 1, day, hour || 0, minute || 0);
}

export function enrichGame(game: Game, teams: Team[], stadiums: Stadium[]): EnrichedGame {
  const homeTeam = teams.find((team) => team.id === game.home_team_id);
  const awayTeam = teams.find((team) => team.id === game.away_team_id);
  const stadium = stadiums.find((item) => item.id === game.stadium_id);
  return { ...game, homeTeam, awayTeam, stadium, dateObject: gameDate(game) };
}

export function buildGroups(groups: Group[], teams: Team[], games: Game[], stadiums: Stadium[], locale: Locale = "en"): EnrichedGroup[] {
  return [...groups]
    .sort((a, b) => groupOrder.indexOf(a.name) - groupOrder.indexOf(b.name))
    .map((group) => {
      const standings = [...(group.teams || [])]
        .map((standing) => ({ ...standing, team: teams.find((team) => team.id === standing.team_id) }))
        .sort((a, b) =>
          toInt(b.pts) - toInt(a.pts) ||
          toInt(b.gd) - toInt(a.gd) ||
          toInt(b.gf) - toInt(a.gf) ||
          teamDisplayName(a.team, locale).localeCompare(teamDisplayName(b.team, locale), intlLocale(locale)),
        );

      return {
        ...group,
        standings,
        games: games
          .filter((game) => game.group === group.name)
          .sort((a, b) => toInt(a.id) - toInt(b.id))
          .map((game) => enrichGame(game, teams, stadiums)),
      };
    });
}

export function buildKnockoutRounds(games: Game[], teams: Team[], stadiums: Stadium[], locale: Locale = "en"): BracketRound[] {
  const { round } = getDictionary(locale);
  const labels: Record<string, string> = {
    r32: round.r32,
    r16: round.r16,
    qf: round.qf,
    sf: round.sf,
    final: locale === "zh" ? "冠军决赛" : "Grand final",
  };
  const order = ["r32", "r16", "qf", "sf", "final"];
  return order.map((key) => ({
    key,
    title: labels[key],
    matches: games
      .filter((game) => game.type === key)
      .sort((a, b) => toInt(a.id) - toInt(b.id))
      .map((game) => enrichGame(game, teams, stadiums)),
  }));
}

export function formatDateTime(date: Date, locale: Locale = "en") {
  if (date.getTime() === 0) return getDictionary(locale).common.tbd;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function shortDate(date: Date, locale: Locale = "en") {
  if (date.getTime() === 0) return getDictionary(locale).common.tbd;
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "short", day: "numeric" }).format(date);
}

export function dateRangeLabel(games: Game[], locale: Locale = "en") {
  const dates = games.map(gameDate).filter((date) => date.getTime() > 0).sort((a, b) => a.getTime() - b.getTime());
  if (!dates.length) return locale === "zh" ? "2026年6月11日 - 7月19日" : "Jun 11 - Jul 19, 2026";
  const first = dates[0];
  const last = dates[dates.length - 1];
  return locale === "zh"
    ? `${shortDate(first, locale)} - ${shortDate(last, locale)}`
    : `${shortDate(first, locale)} - ${shortDate(last, locale)}, ${last.getFullYear()}`;
}

export function teamName(game: EnrichedGame, side: "home" | "away", locale: Locale = "en") {
  const dictionary = getDictionary(locale);
  if (side === "home") return game.homeTeam ? teamDisplayName(game.homeTeam, locale) : game.home_team_name_en || game.home_team_label || dictionary.common.tbd;
  return game.awayTeam ? teamDisplayName(game.awayTeam, locale) : game.away_team_name_en || game.away_team_label || dictionary.common.tbd;
}

export function teamFlag(game: EnrichedGame, side: "home" | "away") {
  return side === "home" ? game.homeTeam?.flag : game.awayTeam?.flag;
}

export function scoreLabel(game: Game, locale: Locale = "en") {
  if (game.finished === "TRUE" || game.time_elapsed === "finished") {
    return `${game.home_score ?? "0"} - ${game.away_score ?? "0"}`;
  }
  if (game.time_elapsed && game.time_elapsed !== "notstarted") return game.time_elapsed;
  return getDictionary(locale).common.vs;
}

export function matchStatus(game: Game) {
  if (game.finished === "TRUE" || game.time_elapsed === "finished") return "Finished";
  if (game.time_elapsed && game.time_elapsed !== "notstarted") return "Live";
  return "Scheduled";
}

export function money(amount: number, locale: Locale = "en") {
  return new Intl.NumberFormat(intlLocale(locale), { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function compactNumber(amount: number, locale: Locale = "en") {
  return new Intl.NumberFormat(intlLocale(locale), { notation: "compact", maximumFractionDigits: 1 }).format(amount);
}

export function bingSearchUrl(query: string) {
  return `https://www.bing.com/search?q=${encodeURIComponent(query.trim())}`;
}

export const BING_FIFA_HUB = bingSearchUrl("FIFA World Cup 2026 live scores");

export function teamBingUrl(name?: string) {
  return bingSearchUrl(`${name ?? ""} national football team`);
}

export function matchBingUrl(game: EnrichedGame, locale: Locale = "en") {
  const home = teamName(game, "home", locale);
  const away = teamName(game, "away", locale);
  const stage = roundLabel(game, locale) || "FIFA World Cup 2026";
  return bingSearchUrl(`${home} vs ${away} ${stage} 2026`);
}

export function stadiumBingUrl(stadium?: Stadium) {
  if (!stadium) return bingSearchUrl("FIFA World Cup 2026 stadium");
  return bingSearchUrl(`${stadium.fifa_name || stadium.name_en} ${stadium.city_en} stadium`);
}

export function groupBingUrl(name: string) {
  return bingSearchUrl(`FIFA World Cup 2026 Group ${name} standings`);
}

export function roundBingUrl(round: string) {
  return bingSearchUrl(`FIFA World Cup 2026 ${round}`);
}

export function prizeBingUrl() {
  return bingSearchUrl("FIFA World Cup 2026 prize money distribution");
}

export function eventDataBingUrl() {
  return bingSearchUrl("FIFA World Cup 2026 schedule format");
}

export function roundLabel(game: EnrichedGame, locale: Locale = "en") {
  const { round } = getDictionary(locale);
  switch (game.type) {
    case "group":
      return round.group(game.group);
    case "r32":
      return round.r32;
    case "r16":
      return round.r16;
    case "qf":
      return round.qf;
    case "sf":
      return round.sf;
    case "final":
      return round.final;
    case "third":
      return round.third;
    default:
      return "";
  }
}

export function isLive(game: Game) {
  if (game.finished === "TRUE" || game.time_elapsed === "finished") return false;
  if (!game.time_elapsed) return false;
  return game.time_elapsed !== "notstarted";
}
