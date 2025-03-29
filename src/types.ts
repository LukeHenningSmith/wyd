export enum TIME_PERIOD {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

export type HistorySchema = {
  id: string;
  label: string;
  visits: number;
  url: string | undefined;
};

export type BookmarkSchema = {
  id: string;
  title: string;
  url?: string;
  lastUsed?: number;
};

export type HistoryChange = HistorySchema & {
  thisPeriod: number;
  lastPeriod: number;
};
