export type HolidayItem = {
  date: string;
  name: string;
  category: HOLIDAY_CATEGORY;
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
  willIncludeSpecialHolidays: boolean;
};

export enum HUNT_MODES {
  FORWARD,
  BACKWARD,
  SURROUND,
}

export enum HOLIDAY_CATEGORY {
  REGULAR = 'REGULAR',
  SPECIAL = 'SPECIAL',
}
