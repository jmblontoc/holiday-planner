import { Component, OnDestroy, OnInit } from '@angular/core';
import { default as phHolidays } from '../../../../../holiday-data/ph-data.json';
import { default as sgHolidays } from '../../../../../holiday-data/sg-data.json';
import { HolidayHuntItem, HolidayItem, HUNT_MODES } from '../dashboard.models';
import executeAlgorithm from 'src/app/core/algorithm';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { COUNTRY_CODES, defaultFormValues } from 'src/app/core/utils';

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
    this.plannedDates = executeAlgorithm(
      this.settingsForm.value,
      this.getChosenHolidays()
    );

    this.listenToSettingsForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getMergedHolidays(): HolidayItem[] {
    return this.getChosenHolidays();
  }

  initializeSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      numberOfLeaves: [],
      holidaySource: [],
      huntMode: [],
    });

    this.settingsForm.patchValue(defaultFormValues);
  }

  listenToSettingsForm(): void {
    this.subs.push(
      this.settingsForm.valueChanges.subscribe((value) => {
        this.plannedDates = executeAlgorithm(value, this.getChosenHolidays());
      })
    );
  }

  getChosenHolidays(): HolidayItem[] {
    const countries: string[] = this.settingsForm.get('holidaySource')!.value;
    let result: HolidayItem[] = [];

    if (countries.includes(COUNTRY_CODES.SG)) {
      result = [...result, ...sgHolidays];
    }

    if (countries.includes(COUNTRY_CODES.PH)) {
      result = [...result, ...phHolidays];
    }

    return result;
  }
}
