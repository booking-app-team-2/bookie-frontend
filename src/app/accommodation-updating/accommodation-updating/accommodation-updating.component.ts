import { Component } from '@angular/core';
import {AccommodationDTO} from "../../layout/accommodation-card/model/accommodation.model";
import {AccommodationService} from "../../layout/accommodation.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccommodationBasicInfoDTO} from "./model/accommodation.basic-info.model";


@Component({
  selector: 'app-accommodation-updating',
  templateUrl: './accommodation-updating.component.html',
  styleUrl: './accommodation-updating.component.scss',
  host: {ngSkipHydration: 'true'},

})
export class AccommodationUpdatingComponent {
  amenities: string[] = ['WiFi', 'Parking', 'Kitchen', 'AC'];
  accommodationTypes: string[] = ['Apartment', 'Studio', 'Room'];
  accommodation:AccommodationDTO;
  newStartDate:Date;
  newEndDate:Date;
  newPrice:string;
  constructor(private accommodationService:AccommodationService,private route: ActivatedRoute,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.accommodationService.getAccommodationDetails(id.toString()).subscribe({
        next: (accommodation: AccommodationDTO): AccommodationDTO => this.accommodation = accommodation,
        error: (_) => {
        }
      });
    });
  }

  updateAmenities(amenity: string): void {
    if (this.accommodation.amenities.includes(amenity)) {
      this.accommodation.amenities = this.accommodation.amenities.filter(a => a !== amenity);
    } else {
      this.accommodation.amenities.push(amenity);
    }
  }
  SaveChanges():void{
    console.log(this.accommodation)
    let accommodationBasicInfo:AccommodationBasicInfoDTO={
      id:this.accommodation.id,
      name:this.accommodation.name,
      description:this.accommodation.description,
      minimumGuests:this.accommodation.minimumGuests,
      maximumGuests:this.accommodation.maximumGuests,
      location:this.accommodation.location,
      amenities:this.accommodation.amenities,
      images:this.accommodation.images,
      type:this.accommodation.type,
      reservationAutoAccepted:this.accommodation.reservationAutoAccepted,
      availabilityPeriods:this.accommodation.availabilityPeriods
    }
    this.accommodationService.updateAccommodationBasicInfo(accommodationBasicInfo)
      .subscribe(updatedInfo => {
        this._snackBar.open('Successfully changed information', 'Close',{
          duration: 2000,
        });
      },

      error =>{
        this._snackBar.open('Something went wrong', 'Close',{
          duration: 2000,
        });
      });
  }
  formatDate(unixTimestamp: number): Date {
    return new Date(unixTimestamp * 1000);
  }

  deletePeriod(index: number): void {
    this.accommodation.availabilityPeriods.splice(index, 1);
  }
  addPeriod():void{
    if(isNaN(Number(this.newPrice))){
      this._snackBar.open('The price you added is not a number', 'Close');
      return;
    }
    if(this.newStartDate==undefined || this.newEndDate==undefined){
      this._snackBar.open('Please select a valid date range', 'Close');
      return;
    }
    let flag=false;
    this.accommodation.availabilityPeriods.forEach((availabilityPeriod)=>{
      if((Math.floor(new Date(this.newStartDate.setHours(1)).getTime()/1000)>=availabilityPeriod.period.startDate && Math.floor(new Date(this.newStartDate.setHours(1)).getTime()/1000)<availabilityPeriod.period.endDate)||(Math.floor(new Date(this.newEndDate.setHours(1)).getTime()/1000)>availabilityPeriod.period.startDate && Math.floor(new Date(this.newEndDate.setHours(1)).getTime()/1000)<=availabilityPeriod.period.endDate)){
        console.log(new Date(availabilityPeriod.period.startDate*1000))
        this._snackBar.open('The entered period overlaps with another one', 'Close');
        flag=true;
        return;
      }
    })
    if(flag){
      return;
    }
    this.accommodation.availabilityPeriods.push({
      id:this.accommodation.availabilityPeriods.length+1,
      price:parseInt(this.newPrice),
      period:{
        startDate:Math.floor(this.newStartDate.getTime()/1000),
        endDate:Math.floor(this.newEndDate.getTime()/1000)
      },
      deleted:false
    })
  }
}
