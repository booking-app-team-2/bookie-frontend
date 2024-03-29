import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../reservation.service";
import {Reservation} from "./model/reservation.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrl: './reserve-dialog.component.scss'
})
export class ReserveDialogComponent {
  numberOfGuestsForm: FormGroup<{
    numberOfGuests: FormControl<number | null>,
  }> = new FormGroup<{
    numberOfGuests: FormControl<number | null>,
  }>({
    numberOfGuests: new FormControl<number | null>(
      null,
      [
        Validators.required,
        Validators.min(this.data.minimumGuests),
        Validators.max(this.data.maximumGuests)
      ]
    ),
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

  private getDateInLocalTimezone(date: Date): Date {
    return new Date(date.toLocaleDateString([], { timeZone: 'Europe/Belgrade' }));
  }

  availabilityPeriodFilter = (d: Date | null): boolean => {
    return this.data.availabilityPeriods.some(
      (availabilityPeriod: {
        id: number,
        price: number,
        period: {
          startDate: number,
          endDate: number
        },
        deleted: boolean}) =>
        this.getDateInLocalTimezone(new Date(availabilityPeriod.period.startDate)) <= (d ?? new Date()) &&
        this.getDateInLocalTimezone(new Date(availabilityPeriod.period.endDate)) >= (d ?? new Date())
    );
  }

  constructor(public dialogRef: MatDialogRef<ReserveDialogComponent>, private reservationService: ReservationService,
              private tokenService: TokenService, private sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data:
                {
                  accommodationId: number,
                  minimumGuests: number,
                  maximumGuests: number,
                  availabilityPeriods: {
                    id:number;
                    price:number;
                    period:{
                      startDate:number;
                      endDate:number;
                    }
                    deleted:boolean;
                  }[],
                }) {
  }

  getNumberOfGuestsErrorMessage(): string {
    if (this.numberOfGuestsForm.get('numberOfGuests')?.hasError('required'))
      return "You must state the number of guests";
    else if (this.numberOfGuestsForm.get('numberOfGuests')?.hasError('min'))
      return "Number of guests is less than the minimum";
    else if (this.numberOfGuestsForm.get('numberOfGuests')?.hasError('max'))
      return "Number of guests is more than the maximum";

    return "Something went wrong";
  }

  createReservation(): void {
    if (!this.numberOfGuestsForm.valid || !this.periodForm.valid)
      return;

    const reservation: Reservation = {
      numberOfGuests: this.numberOfGuestsForm.value.numberOfGuests ?? 0,
      accommodationId: this.data.accommodationId,
      reserveeId: this.tokenService.getIdFromToken() ?? 0,
      periodDTO: {
        startTimestamp: this.periodForm.value.startDate?.getTime() ?? 0,
        endTimestamp: this.periodForm.value.endDate?.getTime() ?? 0,
      },
    }

    this.reservationService.post(reservation).subscribe({
      next: (): void => this.dialogRef.close(true),
      error: (error: HttpErrorResponse): void => {
        if (error)
          this.sharedService.openSnackBar(error.error.message);
        else
          this.sharedService.openSnackBar("Error reaching the server.");
      },
    });
  }
}
