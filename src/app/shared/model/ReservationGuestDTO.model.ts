import {AccommodationName} from "./AccommodationName.model";
import {PeriodDTO} from "./periodDTO.model";

export interface ReservationGuestDTO {
  id: number,
  numberOfGuests: number,
  status: string,
  accommodationNameDTO: AccommodationName,
  periodDTO: PeriodDTO,
  price: number,
}
