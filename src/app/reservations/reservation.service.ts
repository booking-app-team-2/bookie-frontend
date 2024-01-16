import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reservation} from "./reserve-dialog/model/reservation.model";
import {map, Observable} from "rxjs";
import {ReservationOwnerDTO} from "../shared/model/ReservationOwnerDTO.model";
import {ReservationOwner} from "../shared/model/ReservationOwner.model";
import {NumberOfCancelledReservations} from "./reservation/model/NumberOfCancelledReservations.model";
import {ReservationStatus} from "./reservation/model/ReservationStatus.model";

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

    return this
      .httpClient
      .get<ReservationOwnerDTO[]>(
        this.reservationControllerRoute + '/accommodation/owner',
        options)
      .pipe(map((reservationOwnerDTOs: ReservationOwnerDTO[]) => reservationOwnerDTOs
        .map((reservationOwnerDTO: ReservationOwnerDTO): ReservationOwner => {
          return {
            id: reservationOwnerDTO.id,
            numberOfGuests: reservationOwnerDTO.numberOfGuests,
            status: reservationOwnerDTO.status,
            accommodationNameDTO: reservationOwnerDTO.accommodationNameDTO,
            reserveeBasicInfoDTO: reservationOwnerDTO.reserveeBasicInfoDTO,
            period: {
              startDate: new Date(reservationOwnerDTO.periodDTO.startTimestamp),
              endDate: new Date(reservationOwnerDTO.periodDTO.endTimestamp),
            },
            price: reservationOwnerDTO.price,
          }
        }))
      );
  }

  getNumberOfCancelledReservationsForReservee(reserveeId: number): Observable<NumberOfCancelledReservations> {
    const options: { params: HttpParams } = {
      params: new HttpParams().set('reservee_id', reserveeId),
    }

    return this.httpClient.get<NumberOfCancelledReservations>(
      this.reservationControllerRoute + '/status/cancelled',
      options
    );
  }

  post(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(this.reservationControllerRoute, reservation);
  }

  acceptReservation(id: number): Observable<ReservationStatus> {
    return this.httpClient.put<ReservationStatus>(
      `${this.reservationControllerRoute}/${id}/status/accepted`,
      null
    );
  }

  declineReservation(id: number): Observable<ReservationStatus> {
    return this.httpClient.put<ReservationStatus>(
      `${this.reservationControllerRoute}/${id}/status/declined`,
      null
    );
  }
}
