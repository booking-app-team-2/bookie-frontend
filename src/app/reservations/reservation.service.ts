import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reservation} from "./reserve-dialog/model/reservation.model";
import {Observable} from "rxjs";
import {ReservationOwner} from "../shared/model/ReservationOwner.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationControllerRoute: string = environment.apiHost + 'reservations';

  constructor(private httpClient: HttpClient) { }

  searchAndFilter(
    name: string,
    startDate: Date | null,
    endDate: Date | null,
    statuses: string[]
  ): Observable<ReservationOwner[]> {
    const options: { params: HttpParams } = {
      params: new HttpParams({
        fromObject: Object.assign(
          {},
          {name: name},
          startDate && {start_timestamp: startDate.getTime()},
          endDate && {end_timestamp: endDate.getTime()},
          {status: statuses}
        )
      })
    };

    return this.httpClient.get<ReservationOwner[]>(
      this.reservationControllerRoute + '/accommodation/owner',
      options
    );
  }

  post(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.reservationControllerRoute, reservation);
  }
}
