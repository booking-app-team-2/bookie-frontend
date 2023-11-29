import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss'
})
export class AddressDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {address: string}) { }
}
