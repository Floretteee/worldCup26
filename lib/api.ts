import type { Game, Group, Stadium, Team } from "./types";

const API_BASE = "https://worldcup26.ir";
const fetchOptions = { cache: "force-cache" } as const;

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`World Cup API request failed: ${path} (${response.status})`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`World Cup API request failed: ${path}`, error);
    return fallback;
  }
}

export async function getWorldCupData() {
  const [groups, teams, games, stadiums] = await Promise.all([
    getJson<{ groups: Group[] }>("/get/groups", { groups: [] }),
    getJson<{ teams: Team[] }>("/get/teams", { teams: [] }),
    getJson<{ games: Game[] }>("/get/games", { games: [] }),
    getJson<{ stadiums: Stadium[] }>("/get/stadiums", { stadiums: [] }),
  ]);

  return {
    groups: groups.groups ?? [],
    teams: teams.teams ?? [],
    games: games.games ?? [],
    stadiums: stadiums.stadiums ?? [],
  };
}
