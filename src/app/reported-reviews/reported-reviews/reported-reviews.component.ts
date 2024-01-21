import {Component, OnInit} from '@angular/core';
import {ReviewService} from "../../layout/review-card/review.service";
import {AccommodationReviewDTO} from "../../layout/review-card/model/accommodation-review.model";
import {OwnerReviewDTO} from "../../layout/review-card/model/owner-review.model";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-reported-reviews',
  templateUrl: './reported-reviews.component.html',
  styleUrl: './reported-reviews.component.scss'
})
export class ReportedReviewsComponent implements OnInit{

  accommodationReportedReviews:AccommodationReviewDTO[];
  ownerReportedReviews:OwnerReviewDTO[];
  constructor(private reviewService:ReviewService,private sharedService:SharedService) {
  }
  ngOnInit(): void {
    this.reviewService.getReportedAccommodationReviews().subscribe({
      next:(accommodationReviews:AccommodationReviewDTO[])=>{
        this.accommodationReportedReviews=accommodationReviews;
      },
      error:(error)=>{
      }
    });
    this.reviewService.getReportedOwnerReviews().subscribe({
      next:(ownerReviews:OwnerReviewDTO[])=>{
        this.ownerReportedReviews=ownerReviews;
      },
      error:(error)=>{
      }
    });
  }

}
