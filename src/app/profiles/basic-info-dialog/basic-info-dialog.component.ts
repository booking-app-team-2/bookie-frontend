import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-basic-info-dialog',
  templateUrl: './basic-info-dialog.component.html',
  styleUrl: './basic-info-dialog.component.scss'
})
export class BasicInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, surname: string}) { }
}
