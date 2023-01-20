export type HolidayItem = {
  date: string;
  name: string;
  category: string;
  country: string;
};

export type HuntedDay = {
  date: string;
  isFree: boolean;
};

export type HolidayHuntItem = {
  holiday: HolidayItem;
  holidayDayRangeList: HuntedDay[];
};

export type FormSettings = {
  numberOfLeaves: number;
  holidaySource: string[];
  huntMode: HUNT_MODES;
};

export enum HUNT_MODES {
  FORWARD,
  BACKWARD,
  SURROUND,
}
