import {AccommodationName} from "./AccommodationName.model";
import {Period} from "./period.model";
import {UserBasicInfo} from "./user-basic-info.model";

export interface ReservationOwner {
  id: number,
  numberOfGuests: number,
  status: string,
  accommodationNameDTO: AccommodationName,
  userBasicInfoDTO: UserBasicInfo,
  periodDTO: Period,
  price: number,
}
