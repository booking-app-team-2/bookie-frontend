import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-deletion-dialog',
  templateUrl: './profile-deletion-dialog.component.html',
  styleUrl: './profile-deletion-dialog.component.scss'
})
export class ProfileDeletionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ProfileDeletionDialogComponent>) { }
}
