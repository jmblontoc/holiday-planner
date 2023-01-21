import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';

import { HelpDialogComponent } from './help-dialog.component';

describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpDialogComponent],
      imports: [DialogModule, MatDividerModule],
      providers: [
        {
          provide: DialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
