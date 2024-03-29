import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TokenService} from "../../shared/token.service";
import {ReservationOwner} from "../../shared/model/ReservationOwner.model";
import {ReservationService} from "../reservation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {ReservationGuest} from "../../shared/model/ReservationGuest.model";
import {ReservationSearchAndFilterParameters} from "./model/ReservationSearchAndFilterParameters.model";

@Component({
  selector: 'app-reservations-layout',
  templateUrl: './reservations-layout.component.html',
  styleUrl: './reservations-layout.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ReservationsLayoutComponent implements OnInit {
  userRole: string = this.tokenService.getRoleFromToken() ?? 'Unauthenticated';

  searchAndFilterForm: FormGroup<{
    name: FormControl<string | null>,
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
    waiting: FormControl<boolean | null>,
    accepted: FormControl<boolean | null>,
    declined: FormControl<boolean | null>,
    cancelled: FormControl<boolean | null>,
  }> = new FormGroup<{
    name: FormControl<string | null>,
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
    waiting: FormControl<boolean | null>,
    accepted: FormControl<boolean | null>,
    declined: FormControl<boolean | null>,
    cancelled: FormControl<boolean | null>,
  }>({
    name: new FormControl<string | null>(''),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    waiting: new FormControl<boolean | null>(false),
    accepted: new FormControl<boolean | null>(false),
    declined: new FormControl<boolean | null>(false),
    cancelled: new FormControl<boolean | null>(false),
  });

  reservations: ReservationOwner[] | ReservationGuest[] | undefined;

  constructor(private tokenService: TokenService, private reservationService: ReservationService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    if(this.userRole == 'Guest')
      this.searchAndFilterReservationsGuest();
    else
      this.searchAndFilterReservationsOwner();
  }

  private getStatuses(): string[] {
    let statuses: string[] = [];

    this.searchAndFilterForm.value.waiting && statuses.push('Waiting');
    this.searchAndFilterForm.value.accepted && statuses.push('Accepted');
    this.searchAndFilterForm.value.declined && statuses.push('Declined');
    this.searchAndFilterForm.value.cancelled && statuses.push('Cancelled');

    return statuses;
  }

  private getSearchAndFilterParameters(): ReservationSearchAndFilterParameters {
    return {
      name: this.searchAndFilterForm.value.name ?? '',
      startDate: this.searchAndFilterForm.value.startDate ?? null,
      endDate: this.searchAndFilterForm.value.endDate ?? null,
      statuses: this.getStatuses()
    }
  }

  searchAndFilterReservationsGuest(): void {
    this.reservationService.searchAndFilterGuest(this.getSearchAndFilterParameters()).subscribe({
      next: (reservationsGuest: ReservationGuest[]): ReservationGuest[] => this.reservations = reservationsGuest,
      error: (error: HttpErrorResponse): void => {
        if (error) {
          this.sharedService.openSnackBar(error.error.message);
        }
        else
          this.sharedService.openSnackBar("Error reaching the server.");
      }
    });
  }

  searchAndFilterReservationsOwner(): void {
    this.reservationService.searchAndFilterOwner(this.getSearchAndFilterParameters()).subscribe({
      next: (reservationsOwner: ReservationOwner[]): ReservationOwner[] => this.reservations = reservationsOwner,
      error: (error: HttpErrorResponse): void => {
        if (error) {
          this.sharedService.openSnackBar(error.error.message);
        }
        else
          this.sharedService.openSnackBar("Error reaching the server.");
      }
    });
  }
}
