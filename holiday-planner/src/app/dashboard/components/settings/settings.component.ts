import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { COUNTRY_CODES, defaultFormValues } from 'src/app/core/utils';
import { HUNT_MODES } from '../../dashboard.models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  @Input() form: FormGroup;

  get formNumberOfLeaves(): FormControl {
    return this.form.get('numberOfLeaves') as FormControl;
  }

  get formHuntMode(): FormControl {
    return this.form.get('huntMode') as FormControl;
  }

  get formHolidaySource(): FormControl {
    return this.form.get('holidaySource') as FormControl;
  }

  get formWillIncludeSpecialHolidays(): FormControl {
    return this.form.get('willIncludeSpecialHolidays') as FormControl;
  }

  get holidaySourceText(): string {
    const value = this.formHolidaySource.value;
    return value.join(', ');
  }

  getHuntModeStr(): string {
    switch (+this.formHuntMode.value) {
      case HUNT_MODES.BACKWARD:
        return 'Backward';
      case HUNT_MODES.FORWARD:
        return 'Forward';
      case HUNT_MODES.SURROUND:
        return 'Surround';
      default:
        return '';
    }
  }

  handleCountryChange(eventObj: MatCheckboxChange): void {
    const value = eventObj.source.value;
    const isChecked = eventObj.checked;

    const currentValue: string[] = this.formHolidaySource.value;

    if (isChecked) {
      currentValue.push(value);
      this.formHolidaySource.setValue(currentValue);
    } else {
      this.formHolidaySource.setValue(
        currentValue.filter((val) => val !== value)
      );
    }
  }

  isCheckboxChecked(value: string): boolean {
    return this.formHolidaySource.value.includes(value);
  }

  resetForm() {
    this.form.setValue({
      ...defaultFormValues,
      holidaySource: [COUNTRY_CODES.PH],
    });
  }

  handleWillIncludeSpecialHolidayChange(eventObj: MatSlideToggleChange) {
    const isChecked = eventObj.checked;
    this.formWillIncludeSpecialHolidays.setValue(isChecked);
  }
}
