import moment from 'moment';
import {
  FormSettings,
  HolidayItem,
  HUNT_MODES,
} from '../dashboard/dashboard.models';

export const DATE_FORMAT = 'MM/DD/YYYY';
export const DATE_FORMAT_YEAR_FIRST = 'YYYY-MM-DD';

export const COUNTRY_CODES = {
  PH: 'PH',
  SG: 'SG',
};

export const isFreeDay = (
  date: moment.Moment,
  allHolidays: HolidayItem[]
): boolean => {
  const isWeekend = date.day() === 0 || date.day() === 6;
  const isHoliday = allHolidays.some((holiday) => {
    const holidayDateParsed = moment(holiday.date, DATE_FORMAT).format(
      DATE_FORMAT
    );
    return holidayDateParsed === date.format(DATE_FORMAT);
  });

  return isWeekend || isHoliday;
};

export const defaultFormValues: FormSettings = {
  huntMode: HUNT_MODES.FORWARD,
  numberOfLeaves: 2,
  holidaySource: ['PH'],
};
