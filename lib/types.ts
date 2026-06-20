export type Team = {
  _id: string;
  id: string;
  name_en: string;
  name_fa?: string;
  flag: string;
  fifa_code: string;
  iso2: string;
  groups: string;
};

export type GroupStanding = {
  team_id: string;
  mp: string;
  w: string;
  l: string;
  d: string;
  pts: string;
  gf: string;
  ga: string;
  gd: string;
};

export type Group = {
  _id: string;
  name: string;
  teams: GroupStanding[];
};

export type Game = {
  _id: string;
  id: string;
  home_team_id?: string;
  away_team_id?: string;
  home_score?: string;
  away_score?: string;
  home_scorers?: string;
  away_scorers?: string;
  group: string;
  matchday: string;
  local_date: string;
  persian_date?: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_label?: string;
  away_team_label?: string;
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_team_name_fa?: string;
  away_team_name_fa?: string;
};

export type Stadium = {
  _id: string;
  id: string;
  name_en: string;
  name_fa?: string;
  fifa_name: string;
  city_en: string;
  city_fa?: string;
  country_en: string;
  country_fa?: string;
  capacity: number;
  region: string;
};

export type EnrichedGame = Game & {
  homeTeam?: Team;
  awayTeam?: Team;
  stadium?: Stadium;
  dateObject: Date;
};

export type EnrichedStanding = GroupStanding & {
  team?: Team;
};

export type EnrichedGroup = Group & {
  standings: EnrichedStanding[];
  games: EnrichedGame[];
};

export type BracketRound = {
  key: string;
  title: string;
  matches: EnrichedGame[];
};
