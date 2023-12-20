import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {Reservation} from "./reserve-dialog/model/reservation.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationControllerRoute: string = environment.apiHost + 'reservations';

  constructor(private httpClient: HttpClient) { }

  post(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.reservationControllerRoute, reservation);
  }
}
