export interface ReviewDTO {
  id: number;
  grade: number;
  comment: string;
  timestampOfCreation: number;
  reviewerId: number;
  reviewerName:string;
}
