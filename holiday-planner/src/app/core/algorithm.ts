import {
  FormSettings,
  HolidayHuntItem,
  HolidayItem,
  HOLIDAY_CATEGORY,
  HuntedDay,
  HUNT_MODES,
} from '../dashboard/dashboard.models';
import moment from 'moment';
import { COUNTRY_CODES, DATE_FORMAT, isFreeDay } from './utils';

const executeAlgorithm = (
  settings: FormSettings,
  allHolidays: HolidayItem[]
): HolidayHuntItem[] => {
  const finalData: HolidayHuntItem[] = [];
  const filteredHolidays = filterHolidays(allHolidays, settings);

  filteredHolidays.forEach((holiday) => {
    const holidayDateParsed: moment.Moment = moment(holiday.date, DATE_FORMAT);
    let holidayDayRangeList: HuntedDay[] = [];

    switch (+settings.huntMode) {
      case HUNT_MODES.FORWARD:
        holidayDayRangeList = huntLinearDays(
          holidayDateParsed,
          allHolidays,
          settings
        );
        break;
      case HUNT_MODES.BACKWARD:
        holidayDayRangeList = huntLinearDays(
          holidayDateParsed,
          allHolidays,
          settings
        );
        break;
      case HUNT_MODES.SURROUND:
        holidayDayRangeList = huntNeighbourDays(
          holidayDateParsed,
          allHolidays,
          settings
        );
        break;
      default:
        holidayDayRangeList = huntNeighbourDays(
          holidayDateParsed,
          allHolidays,
          settings
        );
    }

    finalData.push({
      holiday,
      holidayDayRangeList,
    });
  });

  return finalData;
};

const huntLinearDays = (
  holiday: moment.Moment,
  allHolidays: HolidayItem[],
  formSettings: FormSettings
): HuntedDay[] => {
  const { huntMode, numberOfLeaves } = formSettings;
  const nearByDays: HuntedDay[] = [];

  let counter = 0;
  let currentDay = holiday;

  while (counter < numberOfLeaves) {
    currentDay = getNextDay(+huntMode, currentDay);
    if (!isFreeDay(currentDay, allHolidays)) {
      nearByDays.push({
        date: currentDay.format(DATE_FORMAT),
        isFree: false,
      });

      counter++;
    } else {
      nearByDays.push({
        date: currentDay.format(DATE_FORMAT),
        isFree: true,
      });
    }
  }

  return nearByDays;
};

const huntNeighbourDays = (
  holiday: moment.Moment,
  allHolidays: HolidayItem[],
  formSettings: FormSettings
): HuntedDay[] => {
  let runningCounter = 0;
  let dayLimitCounter = 0;

  let baseDate = holiday;
  let currentMode: HUNT_MODES = HUNT_MODES.BACKWARD;

  const nearByDays: HuntedDay[] = [];
  let currentDay: moment.Moment = moment();

  while (dayLimitCounter < formSettings.numberOfLeaves) {
    runningCounter++;
    currentDay = getNextDay(currentMode, baseDate, runningCounter);

    if (nearByDays.find((day) => day.date === currentDay.format(DATE_FORMAT))) {
      continue;
    }

    if (!isFreeDay(currentDay, allHolidays)) {
      nearByDays.push({
        date: currentDay.format(DATE_FORMAT),
        isFree: false,
      });

      currentMode = getOtherMode(currentMode);
      runningCounter = 0;
      dayLimitCounter++;
    } else {
      nearByDays.push({
        date: currentDay.format(DATE_FORMAT),
        isFree: true,
      });
    }
  }
  return nearByDays;
};

const getNextDay = (
  mode: HUNT_MODES,
  currentDay: moment.Moment,
  dayJump = 1
): moment.Moment => {
  if (mode === HUNT_MODES.FORWARD) {
    return currentDay.clone().add(dayJump, 'days');
  } else if (mode === HUNT_MODES.BACKWARD) {
    return currentDay.clone().subtract(dayJump, 'days');
  }

  return moment();
};

const getOtherMode = (mode: HUNT_MODES): HUNT_MODES => {
  if (mode === HUNT_MODES.BACKWARD) {
    return HUNT_MODES.FORWARD;
  } else {
    return HUNT_MODES.BACKWARD;
  }
};

export const filterHolidays = (
  allHolidays: HolidayItem[],
  settings: FormSettings
): HolidayItem[] => {
  const countries: string[] = settings.holidaySource;
  const willIncludeSpecialHolidays: boolean =
    settings.willIncludeSpecialHolidays;

  let result: HolidayItem[] = [];

  if (countries.includes(COUNTRY_CODES.SG)) {
    result = [
      ...result,
      ...allHolidays.filter((holiday) => holiday.country === COUNTRY_CODES.SG),
    ] as HolidayItem[];
  }

  if (countries.includes(COUNTRY_CODES.PH)) {
    result = [
      ...result,
      ...allHolidays.filter((holiday) => holiday.country === COUNTRY_CODES.PH),
    ] as HolidayItem[];
  }

  if (!willIncludeSpecialHolidays) {
    result = result.filter(
      (holiday) => holiday.category !== HOLIDAY_CATEGORY.SPECIAL
    );
  }

  return result;
};

export default executeAlgorithm;
