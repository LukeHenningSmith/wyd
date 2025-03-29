import { describe, expect, test } from "vitest";
import {
  adaptHistoryItem,
  convertTimePeriodToMilliSeconds,
  formatBreadcrumb,
  formatShortTimestamp,
  getTopFiveUniqueSites,
} from "./util";
import { TIME_PERIOD } from "./types";

describe("convertTimePeriodToMilliSeconds", () => {
  test("converts days to milliseconds", () => {
    const result = convertTimePeriodToMilliSeconds(TIME_PERIOD.DAY, 1);
    expect(result).toBe(24 * 60 * 60 * 1000); // 1 day in milliseconds
  });

  test("converts weeks to milliseconds", () => {
    const result = convertTimePeriodToMilliSeconds(TIME_PERIOD.WEEK, 2);
    expect(result).toBe(2 * 7 * 24 * 60 * 60 * 1000); // 2 weeks in milliseconds
  });

  test("converts months to milliseconds", () => {
    const result = convertTimePeriodToMilliSeconds(TIME_PERIOD.MONTH, 3);
    expect(result).toBe(3 * 30 * 24 * 60 * 60 * 1000); // 3 months in milliseconds
  });

  test("handles invalid time period", () => {
    const result = convertTimePeriodToMilliSeconds(
      undefined as unknown as TIME_PERIOD,
      1
    );
    expect(result).toBeUndefined(); // Should return undefined for invalid time period
  });
});

describe("getTopFiveUniqueSites", () => {
  test("returns top 5 unique sites by visit count", () => {
    const historyItems: chrome.history.HistoryItem[] = [
      { id: "1", title: "Site A", visitCount: 10, url: "https://a.com" },
      { id: "2", title: "Site B", visitCount: 20, url: "https://b.com" },
      { id: "3", title: "Site C", visitCount: 5, url: "https://c.com" },
      { id: "4", title: "Site D", visitCount: 15, url: "https://d.com" },
      { id: "5", title: "Site E", visitCount: 25, url: "https://e.com" },
      { id: "6", title: "Site F", visitCount: 30, url: "https://f.com" },
    ];

    const result = getTopFiveUniqueSites(historyItems);

    expect(result).toEqual([
      { id: "6", title: "Site F", visitCount: 30, url: "https://f.com" },
      { id: "5", title: "Site E", visitCount: 25, url: "https://e.com" },
      { id: "2", title: "Site B", visitCount: 20, url: "https://b.com" },
      { id: "4", title: "Site D", visitCount: 15, url: "https://d.com" },
      { id: "1", title: "Site A", visitCount: 10, url: "https://a.com" },
    ]);
  });

  test("handles empty input array", () => {
    const historyItems: chrome.history.HistoryItem[] = [];

    const result = getTopFiveUniqueSites(historyItems);

    expect(result).toEqual([]);
  });

  test("handles items with missing visit counts", () => {
    const historyItems: chrome.history.HistoryItem[] = [
      { id: "1", title: "Site A", visitCount: 0, url: "https://a.com" },
      { id: "2", title: "Site B", url: "https://b.com" },
      { id: "3", title: "Site C", visitCount: undefined, url: "https://c.com" },
    ];

    const result = getTopFiveUniqueSites(historyItems);

    expect(result).toEqual([
      { id: "1", title: "Site A", visitCount: 0, url: "https://a.com" },
      { id: "2", title: "Site B", visitCount: 0, url: "https://b.com" },
      { id: "3", title: "Site C", visitCount: 0, url: "https://c.com" },
    ]);
  });

  test("returns fewer than 5 sites if input has less than 5 unique titles", () => {
    const historyItems: chrome.history.HistoryItem[] = [
      { id: "1", title: "Site A", visitCount: 10, url: "https://a.com" },
      { id: "2", title: "Site B", visitCount: 20, url: "https://b.com" },
    ];

    const result = getTopFiveUniqueSites(historyItems);

    expect(result).toEqual([
      { id: "2", title: "Site B", visitCount: 20, url: "https://b.com" },
      { id: "1", title: "Site A", visitCount: 10, url: "https://a.com" },
    ]);
  });
});

describe("adaptHistoryItem", () => {
  test("adapts valid history items", () => {
    const historyItems: chrome.history.HistoryItem[] = [
      {
        id: "1",
        title: "Example Site",
        visitCount: 5,
        url: "https://example.com",
        lastVisitTime: 1672531199999,
      },
      {
        id: "2",
        title: "Another Site",
        visitCount: 10,
        url: "https://another.com",
        lastVisitTime: 1672531199999,
      },
    ];

    const adapted = adaptHistoryItem(historyItems);

    expect(adapted).toEqual([
      {
        id: "1",
        label: "Example Site",
        visits: 5,
        url: "https://example.com",
      },
      {
        id: "2",
        label: "Another Site",
        visits: 10,
        url: "https://another.com",
      },
    ]);
  });

  test("handles missing title and visitCount", () => {
    const historyItems: chrome.history.HistoryItem[] = [
      {
        id: "1",
        title: "",
        visitCount: 0,
        url: "https://example.com",
        lastVisitTime: 1672531199999,
      },
    ];

    const adapted = adaptHistoryItem(historyItems);

    expect(adapted).toEqual([
      {
        id: "1",
        label: "No title",
        visits: 0,
        url: "https://example.com",
      },
    ]);
  });

  test("handles empty input array", () => {
    const historyItems: chrome.history.HistoryItem[] = [];

    const adapted = adaptHistoryItem(historyItems);

    expect(adapted).toEqual([]);
  });
});

describe("formatShortTimestamp", () => {
  test("valid timestamp", () => {
    const timestamp = new Date("2025-03-29T00:00:00Z").getTime();
    expect(formatShortTimestamp(timestamp)).toBe("Mar 29, 2025");
  });

  test("timestamp with rounding", () => {
    const timestamp = 1672531199999.7; // Slightly non-integer timestamp
    expect(formatShortTimestamp(timestamp)).toBe("Jan 1, 2023");
  });

  test("timestamp at epoch", () => {
    const timestamp = 0; // Unix epoch
    expect(formatShortTimestamp(timestamp)).toBe("Jan 1, 1970");
  });

  test("invalid timestamp (NaN)", () => {
    expect(() => formatShortTimestamp(NaN)).toThrowError();
  });

  test("negative timestamp (before epoch)", () => {
    const timestamp = -86400000; // 1 day before Unix epoch
    expect(formatShortTimestamp(timestamp)).toBe("Dec 31, 1969");
  });
});

describe("formatBreadcrumb", () => {
  test("single string", () => {
    expect(formatBreadcrumb("test")).toBe("Test");
  });

  test("caps multi-word", () => {
    expect(formatBreadcrumb("OMG THIS IS WORDS")).toBe("Omg This Is Words");
  });

  test("empty string", () => {
    expect(formatBreadcrumb("")).toBe("");
  });
});
