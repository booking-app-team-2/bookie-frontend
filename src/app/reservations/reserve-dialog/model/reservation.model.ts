import {PeriodDTO} from "../../../shared/model/periodDTO.model";

export interface Reservation {
  numberOfGuests: number,
  accommodationId: number,
  reserveeId: number,
  periodDTO: PeriodDTO
}
