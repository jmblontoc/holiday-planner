import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './pages/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SettingsComponent } from './components/settings/settings.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarComponent, DashboardComponent, SettingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    FullCalendarModule,
    MatSliderModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
