import {AccommodationName} from "./AccommodationName.model";
import {ReserveeBasicInfo} from "./ReserveeBasicInfo.model";
import {Period} from "./period.model";

export interface ReservationOwner {
  id: number,
  numberOfGuests: number,
  status: string,
  accommodationName: AccommodationName,
  reserveeBasicInfo: ReserveeBasicInfo,
  period: Period,
  price: number,
}
