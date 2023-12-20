import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";

@Component({
  selector: 'app-accommodation-details-screen',
  templateUrl: './accommodation-details-screen.component.html',
  styleUrl: './accommodation-details-screen.component.scss'
})
export class AccommodationDetailsScreenComponent {
  selected: Date=new Date();

  // TODO: Get user role from JWT
  userType = "Guest";
  constructor(public dialog: MatDialog) { }

  openReserveDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReserveDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)

          // TODO: Show snackbar confirming reservation creation

          return;
      }
    });
  }
}
