import {ReviewDTO} from "./review.model";

export interface OwnerReviewDTO extends ReviewDTO {
  revieweeId: number;
}
