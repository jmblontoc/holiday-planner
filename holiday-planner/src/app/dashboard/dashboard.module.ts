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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { YesNoPipe } from '../pipes/yes-no.pipe';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';

@NgModule({
  declarations: [
    CalendarComponent,
    DashboardComponent,
    SettingsComponent,
    YesNoPipe,
    HelpDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    FullCalendarModule,
    MatSliderModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule,
    DialogModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
