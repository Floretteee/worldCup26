import type { Game, Group, Stadium, Team } from "./types";

const API_BASE = "https://worldcup26.ir";
const fetchOptions = { cache: "force-cache" } as const;

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, fetchOptions);
  if (!response.ok) {
    throw new Error(`World Cup API request failed: ${path} (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function getWorldCupData() {
  const [groups, teams, games, stadiums] = await Promise.all([
    getJson<{ groups: Group[] }>("/get/groups"),
    getJson<{ teams: Team[] }>("/get/teams"),
    getJson<{ games: Game[] }>("/get/games"),
    getJson<{ stadiums: Stadium[] }>("/get/stadiums"),
  ]);

  return {
    groups: groups.groups,
    teams: teams.teams,
    games: games.games,
    stadiums: stadiums.stadiums,
  };
}
