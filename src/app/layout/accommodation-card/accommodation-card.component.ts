import {Component, Input, OnInit} from '@angular/core';
import {AccommodationDTO} from "./model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
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

  ngOnInit(): void{
    this.loadAccommodationImage();
  }

  constructor(private accommodationService:AccommodationService) {
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
}
