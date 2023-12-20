import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
    numberOfGuests: new FormControl<number | null>(null, [Validators.required]),
  });

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

  getNumberOfGuestsErrorMessage(): string {
    return 'Drool';
  }

  getStartDateErrorMessage(): string {
    return 'Drool';
  }

  getEndDateErrorMessage(): string {
    return 'Drool';
  }

  createReservation(): void {

  }
}
