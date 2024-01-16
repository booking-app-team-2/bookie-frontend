import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationOwner} from "../../shared/model/ReservationOwner.model";
import {ReservationService} from "../reservation.service";
import {NumberOfCancelledReservations} from "./model/NumberOfCancelledReservations.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  @Input()
  reservation: ReservationOwner | undefined;

  numberOfCancelledReservations: NumberOfCancelledReservations | undefined;

  @Output()
  reservationStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private reservationService: ReservationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this
      .reservationService
      .getNumberOfCancelledReservationsForReservee(this.reservation?.reserveeBasicInfoDTO.id ?? 0)
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

  acceptReservation(): void {
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

  declineReservation(): void {
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
}
