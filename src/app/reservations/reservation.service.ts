import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Reservation} from "./reserve-dialog/model/reservation.model";
import {map, Observable} from "rxjs";
import {ReservationOwnerDTO} from "../shared/model/ReservationOwnerDTO.model";
import {ReservationOwner} from "../shared/model/ReservationOwner.model";
import {NumberOfCancelledReservations} from "./reservation/model/NumberOfCancelledReservations.model";
import {ReservationStatus} from "./reservation/model/ReservationStatus.model";
import {ReservationGuest} from "../shared/model/ReservationGuest.model";
import {ReservationGuestDTO} from "../shared/model/ReservationGuestDTO.model";
import {
  ReservationSearchAndFilterParameters
} from "./reservations-layout/model/ReservationSearchAndFilterParameters.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationControllerRoute: string = environment.apiHost + 'reservations';

  constructor(private httpClient: HttpClient) { }

  private getOptions(
    reservationSearchAndFilterParameters: ReservationSearchAndFilterParameters
  ): { params: HttpParams } {
    return {
      params: new HttpParams({
        fromObject: Object.assign(
          {},
          {name: reservationSearchAndFilterParameters.name},
          reservationSearchAndFilterParameters.startDate && {
            start_timestamp: reservationSearchAndFilterParameters.startDate.getTime()
          },
          reservationSearchAndFilterParameters.endDate && {
            end_timestamp: reservationSearchAndFilterParameters.endDate.getTime()
          },
          {status: reservationSearchAndFilterParameters.statuses}
        )
      })
    }
  }

  searchAndFilterGuest(
    reservationSearchAndFilterParameters: ReservationSearchAndFilterParameters
  ): Observable<ReservationGuest[]> {
    return this
      .httpClient
      .get<ReservationGuestDTO[]>(
        this.reservationControllerRoute + '/reservee',
        this.getOptions(reservationSearchAndFilterParameters))
      .pipe(map((reservationGuestDTOs: ReservationGuestDTO[]) => reservationGuestDTOs
        .map((reservationGuestDTO: ReservationGuestDTO): ReservationGuest => {
          return {
            id: reservationGuestDTO.id,
            numberOfGuests: reservationGuestDTO.numberOfGuests,
            status: reservationGuestDTO.status,
            accommodationName: reservationGuestDTO.accommodationNameDTO,
            period: {
              startDate: new Date(reservationGuestDTO.periodDTO.startTimestamp),
              endDate: new Date(reservationGuestDTO.periodDTO.endTimestamp),
            },
            price: reservationGuestDTO.price,
          }
        }))
      );
  }

  searchAndFilterOwner(
    reservationSearchAndFilterParameters: ReservationSearchAndFilterParameters
  ): Observable<ReservationOwner[]> {
    return this
      .httpClient
      .get<ReservationOwnerDTO[]>(
        this.reservationControllerRoute + '/accommodation/owner',
        this.getOptions(reservationSearchAndFilterParameters))
      .pipe(map((reservationOwnerDTOs: ReservationOwnerDTO[]) => reservationOwnerDTOs
        .map((reservationOwnerDTO: ReservationOwnerDTO): ReservationOwner => {
          return {
            id: reservationOwnerDTO.id,
            numberOfGuests: reservationOwnerDTO.numberOfGuests,
            status: reservationOwnerDTO.status,
            accommodationName: reservationOwnerDTO.accommodationNameDTO,
            reserveeBasicInfo: reservationOwnerDTO.reserveeBasicInfoDTO,
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

  cancelReservation(id: number): Observable<ReservationStatus> {
    return this.httpClient.put<ReservationStatus>(
      `${this.reservationControllerRoute}/${id}/status/cancelled`,
      null
    );
  }

  deleteReservation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.reservationControllerRoute}/${id}`);
  }
}
