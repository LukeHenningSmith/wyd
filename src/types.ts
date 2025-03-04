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
