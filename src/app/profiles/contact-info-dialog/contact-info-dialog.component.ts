import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-contact-info-dialog',
  templateUrl: './contact-info-dialog.component.html',
  styleUrl: './contact-info-dialog.component.scss'
})
export class ContactInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {email: string, telephone: string}) { }
}
