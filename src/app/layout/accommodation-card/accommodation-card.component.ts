import {Component, Input, OnInit} from '@angular/core';
import {AccommodationDTO} from "./model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {ReviewService} from "../review-card/review.service";
@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.scss'
})
export class AccommodationCardComponent implements OnInit{

  @Input()
  accommodation: AccommodationDTO;

  @Input()
  isOwnerScreen:boolean;

  image:any="../../../assets/images/bookie-quirky.svg";

  averageGrade:number=0;

  ngOnInit(): void{
    this.loadAccommodationImage();
    this.loadAverageGrade();
  }

  constructor(private accommodationService:AccommodationService, private reviewService:ReviewService) {
  }


  loadAccommodationImage():void{
    if(this.accommodation.images.length>0){
      this.accommodationService.loadImage(this.accommodation.images[0].id).subscribe(
        (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.image = reader.result;
          };
          reader.readAsDataURL(imageBlob);
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
    }
  }
  loadAverageGrade():void{
    this.reviewService.getAccommodationAverageGrade(this.accommodation.id).subscribe({
      next:(averageGrade:number)=>{
        this.averageGrade=averageGrade;
      },
      error:(_)=>{

      }
    });
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
}
