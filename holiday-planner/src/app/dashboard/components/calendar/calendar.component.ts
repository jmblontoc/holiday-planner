import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HolidayHuntItem, HolidayItem } from '../../dashboard.models';
import moment from 'moment';
import {
  DATE_FORMAT,
  DATE_FORMAT_YEAR_FIRST,
  isFreeDay,
} from 'src/app/core/utils';
import { COLORS } from 'src/app/core/theme';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnChanges {
  @Input() holidays: HolidayItem[] = [];
  @Input() plannedDates: HolidayHuntItem[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.onDateClick,
    eventClick: this.onEventClick,
    aspectRatio: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plannedDates']) {
      this.initializeCalendarEvents();
      this.putPlannedDates();
    }
  }

  onDateClick(value: any): void {
    console.log(value);
  }

  onEventClick(value: any): void {
    console.log(value.event.title);
  }

  private initializeCalendarEvents(): void {
    this.calendarOptions.events = this.holidays.map((holiday) => ({
      title: holiday.name,
      date: this.convertToReadableDate(holiday.date),
      backgroundColor: this.getBackgroundColor(holiday),
      borderColor: this.getBackgroundColor(holiday),
    }));
  }

  private convertToReadableDate(date: string): string {
    const oldFormat = DATE_FORMAT;
    const newFormat = DATE_FORMAT_YEAR_FIRST;

    return moment(date, oldFormat).format(newFormat);
  }

  private getBackgroundColor(holiday: HolidayItem): string {
    const { country, category } = holiday;
    if (country === 'SG') {
      return COLORS.SG_RED;
    } else if (country === 'PH' && category === 'REGULAR') {
      return COLORS.PH_BLUE;
    } else if (country === 'PH' && category === 'SPECIAL') {
      return COLORS.PH_YELLOW;
    }

    return COLORS.BLACK;
  }

  private putPlannedDates(): void {
    const mergedPlannedDates = this.getMergedPlannedDates();

    const plannedDatesToEvents = mergedPlannedDates.map((plannedDate) => ({
      title: '',
      date: this.convertToReadableDate(plannedDate),
      display: 'background',
      backgroundColor: COLORS.LEAVE_DAY,
    }));

    const datesNotFree = plannedDatesToEvents.filter(
      (eventDate) =>
        !isFreeDay(
          moment(eventDate.date, DATE_FORMAT_YEAR_FIRST),
          this.holidays
        )
    );

    this.calendarOptions.events = [
      ...datesNotFree,
      ...(this.calendarOptions.events as []),
    ];
  }

  private getMergedPlannedDates(): string[] {
    let datesArr: string[] = [];
    this.plannedDates.forEach((plan) => {
      const dateRangeList = plan.holidayDayRangeList.map((item) => item.date);
      datesArr.push(...dateRangeList);
    });

    return [...new Set(datesArr)];
  }
}
