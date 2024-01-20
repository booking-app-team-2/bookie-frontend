import {Component, Input, OnInit} from '@angular/core';
import {ReviewService} from "../../layout/review-card/review.service";
import {OwnerReviewDTO} from "../../layout/review-card/model/owner-review.model";
import {SharedService} from "../../shared/shared.service";
import {ActivatedRoute} from "@angular/router";
import {ReviewDialogComponent} from "../../layout/review-dialog/review-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-owner-reviews',
  templateUrl: './owner-reviews.component.html',
  styleUrl: './owner-reviews.component.scss'
})
export class OwnerReviewsComponent implements OnInit {
  reviews: OwnerReviewDTO[] = [];
  ownerId: number;
  userType: string = this.tokenService.getRoleFromToken() ?? 'unauthenticated';
  averageGrade:number;

  constructor(private reviewService: ReviewService, private sharedService: SharedService, private route: ActivatedRoute, public dialog: MatDialog,private tokenService:TokenService) {
  }

  get stars(): string[] {
    const fullStars = Math.floor(this.averageGrade);
    const hasHalfStar = this.averageGrade % 1 >= 0.5;
    const result = Array(5).fill('star_border');
    for (let i = 0; i < fullStars; i++) {
      result[i] = 'star';
    }

    if (hasHalfStar) {
      result[fullStars] = 'star_half';
    }

    return result;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.ownerId = id;
      this.reviewService.getOwnerReviews(id).subscribe({
        next: (ownerReviews: OwnerReviewDTO[]) => {
          this.reviews = ownerReviews;
        },
        error: (error) => {
          this.sharedService.openSnackBar(error);
        }
      });
      this.reviewService.getOwnerAverageGrade(id).subscribe({
        next: (grade:number) => {
          this.averageGrade = grade;
        },
        error: (error) => {
          this.sharedService.openSnackBar(error);
        }
      });
    });
  }

  openReviewDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {
        recipientId: this.ownerId,
        isAccommodationReview: false
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return
        this.sharedService.openSnackBar(dialogResult);
      },
    });


  }
}
