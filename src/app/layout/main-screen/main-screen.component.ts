import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {AccommodationDTO} from "../accommodation-card/model/accommodation.model";
import {AccommodationService} from "../accommodation.service";
import {FormControl, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss',
  host: {ngSkipHydration: 'true'},
})
export class MainScreenComponent{

    wifi:boolean=false;
    parking:boolean=false;
    ac:boolean=false;
    kitchen:boolean=false;
    apartment:boolean=false;
    room:boolean=false;
    studio:boolean=false;
    startThumbValue:number=0;
    endThumbValue:number=100;
    value="";
    image:any;

  accommodations: AccommodationDTO[];
  filteredAccommodations:AccommodationDTO[];

  openFilterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef=this.dialog.open(FilterDialogComponent, {
      data: {
        wifi:this.wifi,
        parking:this.parking,
        ac:this.ac,
        kitchen:this.kitchen,
        apartment:this.apartment,
        room:this.room,
        studio:this.studio,
        startThumbValue:this.startThumbValue,
        endThumbValue:this.endThumbValue
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.componentInstance.filterApplied.subscribe((updatedData: any) => {
      this.wifi=updatedData.wifi;
      this.ac=updatedData.ac;
      this.kitchen=updatedData.kitchen;
      this.parking=updatedData.parking;
      this.room=updatedData.room;
      this.studio=updatedData.studio;
      this.apartment=updatedData.apartment;
      this.startThumbValue=updatedData.startThumbValue;
      this.endThumbValue=updatedData.endThumbValue;
      const selectedAmenities:string[]=[];
      if(this.wifi) selectedAmenities.push("WiFi");
      if(this.ac) selectedAmenities.push("AC");
      if(this.kitchen) selectedAmenities.push("Kitchen");
      if(this.parking) selectedAmenities.push("Parking");
      this.filteredAccommodations=this.accommodations.filter(accommodation =>
        selectedAmenities.every(selectedAmenity => accommodation.amenities.includes(selectedAmenity as never))
      );
      const selectedAccommodationTypes:string[]=[];
      if(this.room) selectedAccommodationTypes.push("Room");
      if(this.studio) selectedAccommodationTypes.push("Studio");
      if(this.apartment) selectedAccommodationTypes.push("Apartment");
      this.filteredAccommodations = this.accommodations.filter((accommodation) =>
        selectedAccommodationTypes.some((selectedType) => accommodation.type === selectedType)
      );
      const priceFilteredAccommodations:AccommodationDTO[]=[];
      this.filteredAccommodations.forEach((accommodation)=>{
        accommodation.availabilityPeriods.some((availabilityPeriod)=>{
          if(availabilityPeriod.price>=this.startThumbValue && availabilityPeriod.price<=this.endThumbValue){
            priceFilteredAccommodations.push(accommodation);
            return true;
          }
          return false;
        });
      });
      this.filteredAccommodations=JSON.parse(JSON.stringify(priceFilteredAccommodations));
    });
  }
  constructor(private accommodationService:AccommodationService,public dialog: MatDialog,@Inject(PLATFORM_ID) private platformId: Object) {

  }

  location:string="";
  guestNumber:string="";
  isButtonEnabled: boolean = false;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  searchButton():void {
    let startDate:number=0;
    let endDate:number=0;
    if(this.range.value.start!=null && this.range.value.end!=null){
      startDate=this.range.value.start.getTime();
      endDate=this.range.value.end.getTime();
      console.log(startDate);
    }
    this.accommodationService.getSearchedAccommodations(this.location,this.guestNumber,startDate,endDate).subscribe({
      next: (accommodations: AccommodationDTO[]): void => {
        this.accommodations=accommodations;
        if (this.accommodations.length > 0) {
          this.isButtonEnabled = true;
          this.filteredAccommodations=JSON.parse(JSON.stringify(this.accommodations));
        }
      },
      error: (_) => {
      }
    });
  }
}
