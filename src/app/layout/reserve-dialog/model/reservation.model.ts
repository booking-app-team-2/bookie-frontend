import {Period} from "../../../model/period.model";

export interface Reservation {
  numberOfGuests: number,
  accommodationId: number,
  reserveeId: number,
  period: Period
}
