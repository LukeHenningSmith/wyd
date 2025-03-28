import { TIME_PERIOD } from "@/types";
import { convertTimePeriodToMilliSeconds } from "@/util";

export const getFrequentedWebsites = async (
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

export const getWebVisitsBetweenDates = async (
  start: Date,
  end: Date
): Promise<chrome.history.HistoryItem[]> => {
  return new Promise((resolve, reject) => {
    chrome.history.search(
      {
        text: "",
        startTime: start.getTime(),
        endTime: end.getTime(),
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

// export const getWebsiteVisit = async (
//   url: string
// ): Promise<chrome.history.VisitItem[]> => {
//   return new Promise((resolve, reject) => {
//     chrome.history.getVisits({ url: url }, (results) => {
//       if (chrome.runtime.lastError) {
//         reject(chrome.runtime.lastError);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// };
