import {PeriodDTO} from "../../../shared/model/periodDTO.model";
import {ReservationStatus} from "../../reservation/model/ReservationStatus.model";

export interface Reservation {
  numberOfGuests: number,
  status: ReservationStatus | null,
  accommodationId: number,
  reserveeId: number,
  periodDTO: PeriodDTO
}
