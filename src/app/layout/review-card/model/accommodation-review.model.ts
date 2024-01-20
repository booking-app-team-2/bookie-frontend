import {ReviewDTO} from "./review.model";

export interface AccommodationReviewDTO extends ReviewDTO {
  accommodationId: number;
}
