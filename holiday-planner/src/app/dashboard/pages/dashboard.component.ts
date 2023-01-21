import { Component, OnDestroy, OnInit } from '@angular/core';
import { default as phHolidays } from '../../../../../holiday-data/ph-data.json';
import { default as sgHolidays } from '../../../../../holiday-data/sg-data.json';
import { HolidayHuntItem, HolidayItem } from '../dashboard.models';
import executeAlgorithm, { filterHolidays } from 'src/app/core/algorithm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { defaultFormValues } from 'src/app/core/utils';

const ALL_HOLIDAYS = [...sgHolidays, ...phHolidays] as HolidayItem[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  plannedDates: HolidayHuntItem[] = [];

  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.initializeSettingsForm();
  }

  ngOnInit(): void {
    // To display leaves by default
    this.plannedDates = executeAlgorithm(this.settingsForm.value, ALL_HOLIDAYS);

    this.listenToSettingsForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getMergedHolidays(): HolidayItem[] {
    return filterHolidays(ALL_HOLIDAYS, this.settingsForm.value);
  }

  initializeSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      numberOfLeaves: [],
      holidaySource: [],
      huntMode: [],
      willIncludeSpecialHolidays: [],
    });

    this.settingsForm.patchValue(defaultFormValues);
  }

  listenToSettingsForm(): void {
    this.subs.push(
      this.settingsForm.valueChanges.subscribe((value) => {
        this.plannedDates = executeAlgorithm(value, ALL_HOLIDAYS);
      })
    );
  }
}
