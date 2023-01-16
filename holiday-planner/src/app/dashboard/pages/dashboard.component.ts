import { Component } from '@angular/core';
import { default as phHolidays } from '../../../../../holiday-data/ph-data.json';
import { default as sgHolidays } from '../../../../../holiday-data/sg-data.json';
import { HolidayItem } from '../dashboard.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  getMergedHolidays(): HolidayItem[] {
    return [...phHolidays, ...sgHolidays];
  }
}
