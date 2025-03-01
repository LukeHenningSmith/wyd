import { TIME_PERIOD } from "@/types";
import { convertTimePeriodToMilliSeconds } from "@/util";

export const getHistory = async (
  timePeriod: TIME_PERIOD,
  duration: number
): Promise<chrome.history.HistoryItem[]> => {
  const millisecondsInPast = convertTimePeriodToMilliSeconds(
    timePeriod,
    duration
  );
  const queryFrom = new Date().getTime() - millisecondsInPast;

  return new Promise((resolve, reject) => {
    chrome.history.search(
      {
        text: "",
        startTime: queryFrom,
        maxResults: 100000,
      },
      (results) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(results);
        }
      }
    );
  });
};
