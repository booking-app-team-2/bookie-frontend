import {Component, Inject} from '@angular/core';
import {TokenService} from "../../shared/token.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccommodationReviewDTO} from "../review-card/model/accommodation-review.model";
import {ReviewService} from "../review-card/review.service";
import {OwnerReviewDTO} from "../review-card/model/owner-review.model";

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss'
})
export class ReviewDialogComponent {
  reviewerId:number=this.tokenService.getIdFromToken() ?? 0;
  comment:string;
  grade:number;

  constructor(private tokenService:TokenService,@Inject(MAT_DIALOG_DATA) public data: {recipientId:number;isAccommodationReview:boolean},public dialogRef:MatDialogRef<ReviewDialogComponent>,private reviewService:ReviewService) {
  }
  postReview():void{
    if(this.data.isAccommodationReview){
      const accommodationReview:AccommodationReviewDTO={
        accommodationId: this.data.recipientId,
        comment: this.comment,
        grade: this.grade,
        id: 0,
        reviewerId: this.reviewerId,
        reviewerName: "",
        timestampOfCreation: new Date().getTime()
      }
      this.reviewService.postAccommodationReview(accommodationReview).subscribe({
        next:(accommodationReviewResult:AccommodationReviewDTO)=>{
          this.dialogRef.close('Successfully reviewed');
        },
        error:(error)=>{
          this.dialogRef.close(error);
        }
      });
    }
    else{
      const ownerReview:OwnerReviewDTO={
        revieweeId: this.data.recipientId,
        comment: this.comment,
        grade: this.grade,
        id: 0,
        reviewerId: this.reviewerId,
        reviewerName: "",
        timestampOfCreation: new Date().getTime()
      }
      this.reviewService.postOwnerReview(ownerReview).subscribe({
        next:(accommodationReviewResult:AccommodationReviewDTO)=>{
          this.dialogRef.close('Successfully reviewed');
        },
        error:(error)=>{
          this.dialogRef.close(error);
        }
      });
    }
  }
  isInvalidGrade(): boolean {
    return this.grade === undefined || isNaN(this.grade) || this.grade < 1 || this.grade > 5;
  }

  clearGrade(): void {
    this.grade = 0;
  }
}
