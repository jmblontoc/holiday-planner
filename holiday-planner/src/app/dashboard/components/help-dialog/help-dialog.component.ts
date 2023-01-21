import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { COLORS } from 'src/app/core/theme';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
})
export class HelpDialogComponent {
  constructor(public dialogRef: DialogRef<void>) {}

  getBlockBackgroundColor = (color: string): string => {
    return COLORS[color as keyof typeof COLORS];
  };

  closeHelpDialog() {
    this.dialogRef.close();
  }
}
