import {AccommodationName} from "./AccommodationName.model";
import {ReserveeBasicInfo} from "./ReserveeBasicInfo.model";
import {PeriodDTO} from "./periodDTO.model";

export interface ReservationOwnerDTO {
  id: number,
  numberOfGuests: number,
  status: string,
  accommodationNameDTO: AccommodationName,
  reserveeBasicInfoDTO: ReserveeBasicInfo,
  periodDTO: PeriodDTO,
  price: number,
}
