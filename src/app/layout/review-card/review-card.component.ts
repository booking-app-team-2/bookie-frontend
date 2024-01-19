import {Component, Input, OnInit} from '@angular/core';
import {ReviewDTO} from "./model/review.model";
import {TokenService} from "../../shared/token.service";
import {AccommodationReviewDTO} from "./model/accommodation-review.model";
import {OwnerReviewDTO} from "./model/owner-review.model";
import {
  CustomMessageBoxDialogComponent
} from "../../shared/custom-message-box-dialog/custom-message-box-dialog.component";
import {AccommodationApproval} from "../accommodation-details-screen/model/accommodation-approval.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ReviewService} from "./review.service";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent{
  @Input() review: ReviewDTO;
  @Input() ownerId:number;
  @Input() isUnapproved:boolean;
  userId: number = this.tokenService.getIdFromToken() ?? 0;
  userRole: string = this.tokenService.getRoleFromToken() ?? 'unauthenticated';

  constructor(private tokenService:TokenService,public dialog: MatDialog,private reviewService:ReviewService,private sharedService:SharedService) {
  }

  get stars(): string[] {
    const fullStars = Math.floor(this.review.grade);
    const hasHalfStar = this.review.grade % 1 >= 0.5;
    const result = Array(5).fill('star_border');
    for (let i = 0; i < fullStars; i++) {
      result[i] = 'star';
    }

    if (hasHalfStar) {
      result[fullStars] = 'star_half';
    }

    return result;
  }
  isAccommodationReview(review: ReviewDTO): review is AccommodationReviewDTO {
    return 'accommodationId' in review;
  }

  isOwnerReview(review: ReviewDTO): review is OwnerReviewDTO {
    return 'revieweeId' in review;
  }
  getRevieweeId(review: ReviewDTO): number {
    return (review as OwnerReviewDTO).revieweeId;
  }
  getAccommodationId(review: ReviewDTO): number {
    return (review as AccommodationReviewDTO).accommodationId;
  }
  deleteReview(enterAnimationDuration: string, exitAnimationDuration: string):void{
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this review?',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return
        if(this.isAccommodationReview(this.review)){
          if(this.userRole=='Admin'){
            this.reviewService.deleteReportedAccommodationReview(this.review.id).subscribe({
              next:(result)=>{
                this.sharedService.openSnackBar('Successfully deleted');
                window.location.reload();
              },
              error:(error)=>{
                this.sharedService.openSnackBar(error);
              }
            });
          }
          else{
            this.reviewService.deleteAccommodationReview(this.review.id).subscribe({
              next:(result)=>{
                this.sharedService.openSnackBar('Successfully deleted');
                window.location.reload();
              },
              error:(error)=>{
                this.sharedService.openSnackBar(error);
              }
            });
          }
        }
        else{
          if(this.isOwnerReview(this.review)){
            if(this.userRole=='Admin'){
              this.reviewService.deleteReportedOwnerReview(this.review.id).subscribe({
                next:(result)=>{
                  this.sharedService.openSnackBar('Successfully deleted');
                  window.location.reload();
                },
                error:(error)=>{
                  this.sharedService.openSnackBar(error);
                }
              });
            }
            else{
              this.reviewService.deleteOwnerReview(this.review.id).subscribe({
                next:(result)=>{
                  this.sharedService.openSnackBar('Successfully deleted');
                  window.location.reload();
                },
                error:(error)=>{
                  this.sharedService.openSnackBar(error);
                }
              });
            }

          }
        }


      },
    });
  }
  approveReview(enterAnimationDuration: string, exitAnimationDuration: string):void{
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to approve this review?',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return
        if(this.isAccommodationReview(this.review)){
            this.reviewService.approveAccommodationReview(this.review.id).subscribe({
              next:(result)=>{
                this.sharedService.openSnackBar('Successfully approved');
                window.location.reload();
              },
              error:(error)=>{
                this.sharedService.openSnackBar(error);
              }
            });
        }
        else{
          if(this.isOwnerReview(this.review)){
              this.reviewService.approveOwnerReview(this.review.id).subscribe({
                next:(result)=>{
                  this.sharedService.openSnackBar('Successfully approved');
                  window.location.reload();
                },
                error:(error)=>{
                  this.sharedService.openSnackBar(error);
                }
              });
          }
        }


      },
    });
  }
  reportReview(enterAnimationDuration: string, exitAnimationDuration: string):void{
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to report this review?',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return
        if(this.isAccommodationReview(this.review)){
          this.reviewService.reportAccommodationReview(this.review.id).subscribe({
            next:(result)=>{
              this.sharedService.openSnackBar('Successfully reported');
            },
            error:(error)=>{
              this.sharedService.openSnackBar(error);
            }
          });
        }
        else{
          if(this.isOwnerReview(this.review)){
            this.reviewService.reportOwnerReview(this.review.id).subscribe({
              next:(result)=>{
                this.sharedService.openSnackBar('Successfully reported');
              },
              error:(error)=>{
                this.sharedService.openSnackBar(error);
              }
            });
          }
        }
      },
    });
  }

}
