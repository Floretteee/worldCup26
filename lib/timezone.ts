import type { Game, Stadium } from "./types";

const CITY_TIMEZONE: Record<string, string> = {
  "Mexico City": "America/Mexico_City",
  Guadalajara: "America/Mexico_City",
  Monterrey: "America/Monterrey",
  Dallas: "America/Chicago",
  Houston: "America/Chicago",
  "Kansas City": "America/Chicago",
  Atlanta: "America/New_York",
  Miami: "America/New_York",
  Boston: "America/New_York",
  Philadelphia: "America/New_York",
  "New York/New Jersey": "America/New_York",
  Toronto: "America/Toronto",
  Vancouver: "America/Vancouver",
  Seattle: "America/Los_Angeles",
  "San Francisco Bay Area": "America/Los_Angeles",
  "Los Angeles": "America/Los_Angeles",
};

const STADIUM_ID_TIMEZONE: Record<string, string> = {
  "1": "America/Mexico_City",
  "2": "America/Mexico_City",
  "3": "America/Monterrey",
  "4": "America/Chicago",
  "5": "America/Chicago",
  "6": "America/Chicago",
  "7": "America/New_York",
  "8": "America/New_York",
  "9": "America/New_York",
  "10": "America/New_York",
  "11": "America/New_York",
  "12": "America/Toronto",
  "13": "America/Vancouver",
  "14": "America/Los_Angeles",
  "15": "America/Los_Angeles",
  "16": "America/Los_Angeles",
};

const VENUE_FALLBACK_TZ = "America/Mexico_City";

export function normalizeCity(cityEn?: string): string {
  if (!cityEn) return "";
  return cityEn.split("(")[0].trim();
}

export function cityTimezone(cityEn?: string): string {
  const key = normalizeCity(cityEn);
  return CITY_TIMEZONE[key] || VENUE_FALLBACK_TZ;
}

export function stadiumTimezone(stadium?: Stadium, stadiumId?: string): string {
  if (stadium?.city_en) return cityTimezone(stadium.city_en);
  if (stadiumId && STADIUM_ID_TIMEZONE[String(stadiumId)]) return STADIUM_ID_TIMEZONE[String(stadiumId)];
  return VENUE_FALLBACK_TZ;
}

export function gameTimezone(game: Game, stadiums: Stadium[] = []): string {
  const stadium = stadiums.find((item) => item.id === game.stadium_id);
  return stadiumTimezone(stadium, game.stadium_id);
}

export function parseInTimezone(
  year: number,
  monthIndex: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const asIfUtc = Date.UTC(year, monthIndex, day, hour, minute);
  if (timeZone === "UTC") return new Date(asIfUtc);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts: Record<string, string> = {};
  for (const part of formatter.formatToParts(new Date(asIfUtc))) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  const tzYear = Number(parts.year);
  const tzMonth = Number(parts.month) - 1;
  const tzDay = Number(parts.day);
  const tzHour = Number(parts.hour) % 24;
  const tzMinute = Number(parts.minute);
  const displayedAsUtc = Date.UTC(tzYear, tzMonth, tzDay, tzHour, tzMinute);
  return new Date(2 * asIfUtc - displayedAsUtc);
}

let displayTz: string | null = null;

export function setDisplayTimezone(tz: string) {
  displayTz = tz;
}

export function displayTimezone(): string {
  return displayTz || "UTC";
}

export function getBrowserTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz || "UTC";
  } catch {
    return "UTC";
  }
}
