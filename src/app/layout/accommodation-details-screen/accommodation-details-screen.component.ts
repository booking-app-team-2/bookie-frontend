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
  userType = "Guest";
  constructor(public dialog: MatDialog) { }

  openReserveDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReserveDialogComponent, {
      data: {

      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
