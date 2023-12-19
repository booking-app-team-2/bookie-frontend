import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../reservation.service";
import {Reservation} from "./model/reservation.model";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrl: './reserve-dialog.component.scss'
})
export class ReserveDialogComponent {
  minDate: Date = new Date();

  numberOfGuestsForm: FormGroup<{
    numberOfGuests: FormControl<number | null>,
  }> = new FormGroup<{
    numberOfGuests: FormControl<number | null>,
  }>({
    numberOfGuests: new FormControl<number | null>(null, [Validators.required]),
  });

  minDate: Date = new Date();

  periodForm: FormGroup<{
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
  }> = new FormGroup<{
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
  }>({
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<ReserveDialogComponent>, private reservationService: ReservationService) {
  }

  getNumberOfGuestsErrorMessage(): string {
    if (this.numberOfGuestsForm.get('numberOfGuests')?.hasError('required'))
      return "You must state the number of guests"

    return "Something went wrong";
  }

  createReservation(): void {
    if (!this.numberOfGuestsForm.valid || !this.periodForm.valid)
      return;

    const reservation: Reservation = {
      numberOfGuests: this.numberOfGuestsForm.value.numberOfGuests ?? 0,

      // TODO: Get accommodation id from selected accommodation

      accommodationId: 1,

      // TODO: Get reservee id from JWT

      reserveeId: 3,
      period: {
        startDate: Math.floor((this.periodForm.value.startDate?.getTime() ?? 0) / 1000),
        endDate: Math.floor((this.periodForm.value.endDate?.getTime() ?? 0) / 1000),
      },
    }

    this.reservationService.post(reservation).subscribe({
      next: (): void => this.dialogRef.close(true),
      error: (error: HttpErrorResponse): void => {
        if (error)

          // TODO: Open snack bar with error message

          return;
        else

        // TODO: Open snack bar with generic error message

        return;
      },
    });
  }
}
