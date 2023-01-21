import { DialogModule } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { FullCalendarModule } from '@fullcalendar/angular';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { HelpDialogComponent } from '../components/help-dialog/help-dialog.component';
import { SettingsComponent } from '../components/settings/settings.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        CalendarComponent,
        SettingsComponent,
        HelpDialogComponent,
        YesNoPipe,
      ],
      imports: [
        DialogModule,
        MatIconModule,
        FullCalendarModule,
        MatSliderModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatDividerModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
