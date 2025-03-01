import { TIME_PERIOD } from "./types";

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
