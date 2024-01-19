import {Component, OnInit} from '@angular/core';
import {AccommodationReviewDTO} from "../../layout/review-card/model/accommodation-review.model";
import {OwnerReviewDTO} from "../../layout/review-card/model/owner-review.model";
import {ReviewService} from "../../layout/review-card/review.service";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-unapproved-reviews',
  templateUrl: './unapproved-reviews.component.html',
  styleUrl: './unapproved-reviews.component.scss'
})
export class UnapprovedReviewsComponent implements OnInit {
  accommodationUnapprovedReviews:AccommodationReviewDTO[];
  ownerUnapprovedReviews:OwnerReviewDTO[];
  constructor(private reviewService:ReviewService,private sharedService:SharedService) {
  }
  ngOnInit(): void {
    this.reviewService.getUnapprovedAccommodationReviews().subscribe({
      next:(accommodationReviews:AccommodationReviewDTO[])=>{
        this.accommodationUnapprovedReviews=accommodationReviews;
      },
      error:(error)=>{
      }
    });
    this.reviewService.getUnapprovedOwnerReviews().subscribe({
      next:(ownerReviews:OwnerReviewDTO[])=>{
        this.ownerUnapprovedReviews=ownerReviews;
      },
      error:(error)=>{
      }
    });
  }
}
