import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private reservationService: ReservationService, private sharedService: SharedService) { }

  ngOnInit() {
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
}
