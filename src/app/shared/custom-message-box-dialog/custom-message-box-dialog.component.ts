import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-message-box-dialog',
  templateUrl: './custom-message-box-dialog.component.html',
  styleUrl: './custom-message-box-dialog.component.scss'
})
export class CustomMessageBoxDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
