import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationOwner} from "../../shared/model/ReservationOwner.model";
import {ReservationService} from "../reservation.service";
import {NumberOfCancelledReservations} from "./model/NumberOfCancelledReservations.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CustomMessageBoxDialogComponent
} from "../../shared/custom-message-box-dialog/custom-message-box-dialog.component";
import {ReservationGuest} from "../../shared/model/ReservationGuest.model";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  @Input()
  userRole: string

  @Input()
  reservation: ReservationOwner | ReservationGuest | undefined;

  numberOfCancelledReservations: NumberOfCancelledReservations | undefined;

  @Output()
  reservationStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private reservationService: ReservationService, private sharedService: SharedService,
              public dialog: MatDialog) { }

  isReservationOwner(reservation: ReservationOwner | ReservationGuest | undefined): reservation is ReservationOwner {
    return (reservation as ReservationOwner).reserveeBasicInfo !== undefined;
  }

  protected getReserveeBasicInfo(): string {
    return this.isReservationOwner(this.reservation) ?
      `${this.reservation.reserveeBasicInfo.name} ${this.reservation.reserveeBasicInfo.surname}` :
      'Placeholder';
  }

  ngOnInit(): void {
    if (this.isReservationOwner(this.reservation))
      this
        .reservationService
        .getNumberOfCancelledReservationsForReservee(this.reservation?.reserveeBasicInfo.id ?? 0)
        .subscribe({
          next: (numberOfCancelledReservations: NumberOfCancelledReservations): NumberOfCancelledReservations =>
            this.numberOfCancelledReservations = numberOfCancelledReservations,
          error: (error: HttpErrorResponse): void => {
            if (error)
              this.sharedService.openSnackBar(error.error.message);
            else
              this.sharedService.openSnackBar('Error reaching the server.');
          }
        })
  }

  openAcceptReservationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to accept this reservation?'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return;

        this.reservationService.acceptReservation(this.reservation?.id ?? 0).subscribe({
          next: (): void => {
            this.sharedService.openSnackBar('Reservation successfully accepted.');
            this.reservationStatusChanged.emit();
          },
          error: (error: HttpErrorResponse): void => {
            if (error)
              this.sharedService.openSnackBar(error.error.message);
            else
              this.sharedService.openSnackBar('Error reaching the server.');
          }
        });
      }
    });
  }

  openDeclineReservationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to decline this reservation?'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return

        this.reservationService.declineReservation(this.reservation?.id ?? 0).subscribe({
          next: (): void => {
            this.sharedService.openSnackBar('Reservation successfully declined.');
            this.reservationStatusChanged.emit();
          },
          error: (error: HttpErrorResponse): void => {
            if (error)
              this.sharedService.openSnackBar(error.error.message);
            else
              this.sharedService.openSnackBar('Error reaching the server.');
          }
        })
      }
    });
  }

  openCancelReservationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this reservation?'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return

        this.reservationService.cancelReservation(this.reservation?.id ?? 0).subscribe({
          next: (): void => {
            this.sharedService.openSnackBar('Reservation successfully cancelled.');
            this.reservationStatusChanged.emit();
          },
          error: (error: HttpErrorResponse): void => {
            if (error)
              this.sharedService.openSnackBar(error.error.message);
            else
              this.sharedService.openSnackBar('Error reaching the server.');
          }
        })
      }
    });
  }

  openDeleteReservationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this reservation?'
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return

        this.reservationService.deleteReservation(this.reservation?.id ?? 0).subscribe({
          next: (): void => {
            this.sharedService.openSnackBar('Reservation successfully deleted.');
            this.reservationStatusChanged.emit();
          },
          error: (error: HttpErrorResponse): void => {
            if (error)
              this.sharedService.openSnackBar(error.error.message);
            else
              this.sharedService.openSnackBar('Error reaching the server.');
          }
        })
      }
    });
  }
}
