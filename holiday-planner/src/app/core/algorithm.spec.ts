import {
  FormSettings,
  HolidayItem,
  HUNT_MODES,
} from '../dashboard/dashboard.models';
import executeAlgorithm from './algorithm';
import { default as SG_HOLIDAYS } from '../../../../holiday-data/sg-data.json';
import { default as PH_HOLIDAYS } from '../../../../holiday-data/ph-data.json';

describe('Algorithm', () => {
  const ALL_HOLIDAYS = [...SG_HOLIDAYS, ...PH_HOLIDAYS];
  it('should run huntNeighbourDays in executeAlgorithm_POSITIVE', () => {
    const settings: FormSettings = {
      numberOfLeaves: 2,
      holidaySource: ['SG'],
      huntMode: HUNT_MODES.SURROUND,
      willIncludeSpecialHolidays: false,
    };

    const result = executeAlgorithm(settings, ALL_HOLIDAYS as HolidayItem[]);
    console.log(result);
  });
});
