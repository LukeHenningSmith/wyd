import { HistorySchema, TIME_PERIOD } from "./types";
import _startCase from "lodash/startCase";
import _toLower from "lodash/toLower";

// TODO: Add tests
export const convertTimePeriodToMilliSeconds = (
  timePeriod: TIME_PERIOD,
  duration: number
): number => {
  switch (timePeriod) {
    case TIME_PERIOD.DAY:
      return duration * 24 * 60 * 60 * 1000;
    case TIME_PERIOD.WEEK:
      return duration * 7 * 24 * 60 * 60 * 1000;
    case TIME_PERIOD.MONTH:
      return duration * 30 * 24 * 60 * 60 * 1000;
  }
};

// TODO: Add tests
export const getTopFiveUniqueSites = (
  history: chrome.history.HistoryItem[]
): chrome.history.HistoryItem[] => {
  return history
    .sort((a, b) => {
      if (!a.visitCount) return 1;
      if (!b.visitCount) return -1;
      return b.visitCount - a.visitCount;
    })
    .reduce((acc: chrome.history.HistoryItem[], item) => {
      const existingItem = acc.find((site) => site.title === item.title);
      if (existingItem) {
        existingItem.visitCount =
          (existingItem.visitCount || 0) + (item.visitCount || 0);
        existingItem.url += `, ${item.url}`;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, [])
    .slice(0, 5);
};

// TODO: Add tests
export const adaptHistoryItem = (
  items: chrome.history.HistoryItem[]
): HistorySchema[] => {
  return items.map((item) => {
    return {
      id: item.id,
      label: item.title || "No title",
      visits: item.visitCount || 0,
      url: item.url,
    };
  });
};

// TODO: Add tests
export const formatShortTimestamp = (timestamp: number): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Math.round(timestamp)));
};

// TODO: Add tests
export const formatBreadcrumb = (path: string): string => {
  return _startCase(_toLower(path));
};
