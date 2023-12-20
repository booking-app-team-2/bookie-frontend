import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccommodationDTO} from "../accommodation-card/model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {AccommodationService} from "../accommodation.service";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {SharedService} from "../../shared/shared.service";

export interface calendarDate{
  start:Date;
  end:Date;
  price:number;
}
@Component({
  selector: 'app-accommodation-details-screen',
  templateUrl: './accommodation-details-screen.component.html',
  styleUrl: './accommodation-details-screen.component.scss',
  host: {ngSkipHydration: 'true'},
  encapsulation: ViewEncapsulation.None,
})
export class AccommodationDetailsScreenComponent implements OnInit{

  accommodation: AccommodationDTO;
  selected: any;
  dateRange: calendarDate[] = [];
  price:string="Click on the date to see its price";
  mapCenter: [number, number];

  // TODO: Get user role from JWT

  userType = "Guest";

  dateClass(): (date: Date) => MatCalendarCellCssClasses {
    return (date: Date): MatCalendarCellCssClasses => {
      for (const range of this.dateRange) {
        if (date >= range.start && date <= range.end) {
          return { 'special-date': true, 'has-tooltip': true };
        }
      }
      return '';
    };
  }

  displayPrice():void {
    let flag:boolean=false;
    for (const range of this.dateRange) {
      if (this.selected >= range.start && this.selected <= range.end) {
        this.price = "Price: " + range.price;

        flag=true;
      }
    }
    if(!flag){
      this.price="Click on the date to see its price";
    }
  }

  constructor(private accommodationService:AccommodationService,private route: ActivatedRoute,
              public dialog: MatDialog, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.accommodationService.getAccommodationDetails(id.toString()).subscribe({
        next: (accommodation: AccommodationDTO): AccommodationDTO => this.accommodation = accommodation,
        error: (_) => {
        }
      });
      this.mapCenter= [this.accommodation?.location?.latitude,this.accommodation?.location?.longitude];
      for(const period of this.accommodation?.availabilityPeriods){
        this.dateRange.push({
          start: new Date(
            period.period.startDate * 1000
          ),
          end: new Date(
            period.period.endDate * 1000
          ),
          price:period.price
        });
      }
    });
  }

  openReserveDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReserveDialogComponent, {
      data: {
        accommodationId: this.accommodation?.id,
        minimumGuests: this.accommodation?.minimumGuests,
        maximumGuests: this.accommodation?.maximumGuests,
        availabilityPeriods: this.accommodation?.availabilityPeriods,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)
          this.sharedService.openSnackBar("Accommodation successfully reserved");
      }
    });
  }
}
