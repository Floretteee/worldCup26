import type { Team } from "./types";

export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

const teamNameZh: Record<string, string> = {
  Argentina: "阿根廷",
  Australia: "澳大利亚",
  Belgium: "比利时",
  Brazil: "巴西",
  Canada: "加拿大",
  Colombia: "哥伦比亚",
  Croatia: "克罗地亚",
  Ecuador: "厄瓜多尔",
  England: "英格兰",
  France: "法国",
  Germany: "德国",
  Ghana: "加纳",
  Iran: "伊朗",
  Japan: "日本",
  Mexico: "墨西哥",
  Morocco: "摩洛哥",
  Netherlands: "荷兰",
  Portugal: "葡萄牙",
  Qatar: "卡塔尔",
  Senegal: "塞内加尔",
  Serbia: "塞尔维亚",
  Spain: "西班牙",
  Switzerland: "瑞士",
  "United States": "美国",
  Uruguay: "乌拉圭",
};

export const dictionaries = {
  zh: {
    metadata: {
      title: "2026 世界杯总览 | WC26TV",
      description: "HLTV 风格的 2026 FIFA 世界杯赛程、淘汰赛、球队、积分榜与实时比分。",
    },
    languageName: "中文",
    nav: {
      aria: "赛事版块",
      home: "WC26TV 首页",
      sections: "导航",
      settings: "设置",
      openMenu: "打开菜单",
      language: "English",
    },
    theme: {
      light: "日间",
      dark: "夜间",
      system: "自动",
    },
    hero: {
      masthead: "2026 世界杯赛事中心",
      hosts: "美国 | 墨西哥 | 加拿大",
      title: "FIFA 2026 世界杯",
      status: "赛程同步中",
      description: "完整赛程、积分榜、淘汰赛签表与实时比分总览。",
      location: "美国、墨西哥和加拿大",
    },
    sections: {
      brackets: "淘汰赛签表",
      groups: "小组赛",
      teams: "参赛球队",
      prizes: "奖金分配",
      formats: "赛制",
      eventData: "赛事数据",
      stadiums: "承办球场",
      live: "实时比分",
    },
    stats: {
      matches: "比赛",
      groups: "小组",
      firstKickOff: "揭幕战",
      firstKickOffValue: "6月11日",
      date: "日期",
      prizePool: "总奖金",
      teams: "球队",
      location: "举办地",
    },
    bracket: {
      playoffs: "淘汰赛",
      hint: "单败淘汰 | 拖动浏览",
      show: "展开签表",
      hide: "收起签表",
      fixturePending: "对阵待定",
    },
    standings: {
      team: "球队",
      mp: "赛",
      w: "胜",
      d: "平",
      l: "负",
      gd: "净胜",
      pts: "积分",
      group: "小组",
      matches: "场比赛",
    },
    live: {
      title: "实时比分",
      syncFallback: "同步中",
      previous: "上一场比分",
      next: "下一场比分",
      matchOf: (current: number, total: number) => `第 ${current} / ${total} 场`,
      queue: "候场",
      showMatch: (home: string, away: string) => `查看 ${home} 对 ${away}`,
      openHub: "打开 MSN 世界杯中心",
      openMatchSearch: "在 Bing 搜索这场比赛",
      noData: "暂无比分数据。",
      groupMatch: (group: string, id: string) => `${group} 组 | 第 ${id} 场`,
      stadiumTbd: "球场待定",
      live: "直播中",
    },
    info: {
      groupStage: "小组赛",
      groupStageValue: "12 个小组，每组 4 队，组内单循环",
      knockout: "淘汰赛",
      knockoutValue: "从 32 强到决赛的单败淘汰制",
      tiebreakers: "排名规则",
      tiebreakersValue: "积分、净胜球、进球数、公平竞赛积分",
      date: "日期",
      teams: "球队",
      matches: "比赛",
      prizePool: "总奖金",
      hosts: "东道主",
      hostsValue: "美国、墨西哥、加拿大",
      moreOnBing: "Bing 详情",
      searchStadium: (name: string) => `在 Bing 搜索 ${name}`,
      seats: "座",
    },
    prizes: {
      items: [
        ["第1名", "世界冠军"],
        ["第2名", "亚军"],
        ["第3名", "季军"],
        ["第4名", "第四名"],
        ["第5-8名", "八强球队"],
        ["第9-16名", "十六强"],
        ["第17-32名", "三十二强"],
        ["第33-48名", "小组赛"],
      ] as const,
      note: "赛事总奖金以赛事元数据呈现，各队奖金按 HLTV 风格名次卡片展示。",
      moreOnBing: "Bing 详情",
    },
    round: {
      r32: "32 强",
      r16: "16 强",
      qf: "四分之一决赛",
      sf: "半决赛",
      final: "决赛",
      third: "季军赛",
      group: (name: string) => `${name} 组`,
    },
    status: {
      Finished: "已结束",
      Live: "直播中",
      Scheduled: "未开始",
    },
    common: {
      tbd: "待定",
      vs: "对阵",
      score: "比分",
      match: "比赛",
      searchMatch: (id: string) => `在 Bing 搜索第 ${id} 场比赛`,
      searchScore: (score: string) => `比分 ${score}`,
      openTeam: (name: string) => `在 MSN 体育打开 ${name}`,
    },
  },
  en: {
    metadata: {
      title: "World Cup 2026 overview | WC26TV",
      description: "HLTV-style 2026 FIFA World Cup schedule, bracket, teams, standings and live scores.",
    },
    languageName: "English",
    nav: {
      aria: "Sections",
      home: "WC26TV home",
      sections: "Sections",
      settings: "Settings",
      openMenu: "Open menu",
      language: "中文",
    },
    theme: {
      light: "Day",
      dark: "Night",
      system: "Auto",
    },
    hero: {
      masthead: "World Cup 2026 Match Center",
      hosts: "United States | Mexico | Canada",
      title: "FIFA World Cup 2026",
      status: "Live schedule",
      description: "Complete overview, schedule, standings, bracket and live scores.",
      location: "United States, Mexico & Canada",
    },
    sections: {
      brackets: "Knockout bracket",
      groups: "Group stage",
      teams: "Teams attending",
      prizes: "Prize distribution",
      formats: "Formats",
      eventData: "Event data",
      stadiums: "Host stadiums",
      live: "Live",
    },
    stats: {
      matches: "Matches",
      groups: "Groups",
      firstKickOff: "First kick-off",
      firstKickOffValue: "Jun 11",
      date: "Date",
      prizePool: "Prize pool",
      teams: "Teams",
      location: "Location",
    },
    bracket: {
      playoffs: "Playoffs",
      hint: "Single elimination | drag to browse",
      show: "Show bracket",
      hide: "Hide bracket",
      fixturePending: "Fixture pending",
    },
    standings: {
      team: "Team",
      mp: "MP",
      w: "W",
      d: "D",
      l: "L",
      gd: "GD",
      pts: "PTS",
      group: "Group",
      matches: "matches",
    },
    live: {
      title: "Live scoreboard",
      syncFallback: "syncing",
      previous: "Previous score",
      next: "Next score",
      matchOf: (current: number, total: number) => `Match ${current} of ${total}`,
      queue: "Queue",
      showMatch: (home: string, away: string) => `Show ${home} vs ${away}`,
      openHub: "Open MSN FIFA World Cup hub",
      openMatchSearch: "Open match search on Bing",
      noData: "No score data available.",
      groupMatch: (group: string, id: string) => `Group ${group} | Match #${id}`,
      stadiumTbd: "Stadium TBD",
      live: "Live",
    },
    info: {
      groupStage: "Group stage",
      groupStageValue: "12 groups of 4 teams, one match against each opponent",
      knockout: "Knockout",
      knockoutValue: "Single elimination from Round of 32 to Final",
      tiebreakers: "Tiebreakers",
      tiebreakersValue: "Points, goal difference, goals scored, disciplinary record",
      date: "Date",
      teams: "Teams",
      matches: "Matches",
      prizePool: "Prize pool",
      hosts: "Hosts",
      hostsValue: "United States, Mexico, Canada",
      moreOnBing: "More on Bing",
      searchStadium: (name: string) => `Search ${name} on Bing`,
      seats: "seats",
    },
    prizes: {
      items: [
        ["1st", "World champion"],
        ["2nd", "Runner-up"],
        ["3rd", "Third place"],
        ["4th", "Fourth place"],
        ["5-8th", "Quarter-finalists"],
        ["9-16th", "Round of 16"],
        ["17-32nd", "Round of 32"],
        ["33-48th", "Group stage"],
      ] as const,
      note: "Total tournament purse displayed as event metadata. Per-team values are presented in an HLTV-style placements layout.",
      moreOnBing: "More on Bing",
    },
    round: {
      r32: "Round of 32",
      r16: "Round of 16",
      qf: "Quarter-finals",
      sf: "Semi-finals",
      final: "Final",
      third: "Third place",
      group: (name: string) => `Group ${name}`,
    },
    status: {
      Finished: "Finished",
      Live: "Live",
      Scheduled: "Scheduled",
    },
    common: {
      tbd: "TBD",
      vs: "vs",
      score: "Score",
      match: "match",
      searchMatch: (id: string) => `Search match ${id} on Bing`,
      searchScore: (score: string) => `Score ${score}`,
      openTeam: (name: string) => `Open ${name} on MSN sports`,
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale];
}

export function intlLocale(locale: Locale) {
  return locale === "zh" ? "zh-CN" : "en-US";
}

export function teamDisplayName(team: Team | undefined, locale: Locale) {
  if (!team) return getDictionary(locale).common.tbd;
  if (locale === "en") return team.name_en;
  if (teamNameZh[team.name_en]) return teamNameZh[team.name_en];
  try {
    const name = new Intl.DisplayNames([intlLocale(locale)], { type: "region" }).of(team.iso2?.toUpperCase());
    return name || team.name_en;
  } catch {
    return team.name_en;
  }
}
