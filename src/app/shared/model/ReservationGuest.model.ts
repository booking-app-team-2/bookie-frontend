import {AccommodationName} from "./AccommodationName.model";
import {Period} from "./period.model";

export interface ReservationGuest {
  id: number,
  numberOfGuests: number,
  status: string,
  accommodationName: AccommodationName,
  period: Period,
  price: number,
}
