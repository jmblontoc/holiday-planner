import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { COUNTRY_CODES, defaultFormValues } from 'src/app/core/utils';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { HUNT_MODES } from '../../dashboard.models';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent, YesNoPipe],
      imports: [
        MatSliderModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      numberOfLeaves: new FormControl(),
      holidaySource: new FormControl([]),
      huntMode: new FormControl(),
      willIncludeSpecialHolidays: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "Backward" in getHuntModeStr_POSITIVE', () => {
    component.formHuntMode.setValue(HUNT_MODES.BACKWARD);
    expect(component.getHuntModeStr()).toBe('Backward');
  });

  it('should return "Forward" in getHuntModeStr_POSITIVE', () => {
    component.formHuntMode.setValue(HUNT_MODES.FORWARD);
    expect(component.getHuntModeStr()).toBe('Forward');
  });

  it('should return "Surround" in getHuntModeStr_POSITIVE', () => {
    component.formHuntMode.setValue(HUNT_MODES.SURROUND);
    expect(component.getHuntModeStr()).toBe('Surround');
  });

  it('should resetForm_POSITIVE', () => {
    component.resetForm();
    expect(component.formNumberOfLeaves.value).toBe(
      defaultFormValues.numberOfLeaves
    );
  });

  it('should handle checked value handleCountryChange_POSITIVE', () => {
    const changeEvent = {
      source: {
        value: 'SG',
      },
      checked: true,
    };
    component.handleCountryChange(changeEvent as MatCheckboxChange);
    expect(
      component.formHolidaySource.value.includes(COUNTRY_CODES.SG)
    ).toBeTrue();
  });

  it('should handle unchecked value handleCountryChange_POSITIVE', () => {
    const changeEvent = {
      source: {
        value: 'SG',
      },
      checked: false,
    };
    component.formHolidaySource.setValue([COUNTRY_CODES.PH]);
    component.handleCountryChange(changeEvent as MatCheckboxChange);
    expect(
      component.formHolidaySource.value.includes(COUNTRY_CODES.SG)
    ).toBeFalse();
  });
});
