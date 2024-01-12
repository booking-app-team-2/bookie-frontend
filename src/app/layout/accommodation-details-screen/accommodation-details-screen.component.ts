import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AccommodationDTO} from "../accommodation-card/model/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {AccommodationService} from "../accommodation.service";
import {MatDialog} from "@angular/material/dialog";
import {ReserveDialogComponent} from "../reserve-dialog/reserve-dialog.component";
import {SharedService} from "../../shared/shared.service";
import {TokenService} from "../../shared/token.service";
import {
  CustomMessageBoxDialogComponent
} from "../../shared/custom-message-box-dialog/custom-message-box-dialog.component";
import {AccommodationApproval} from "./model/accommodation-approval.model";
import {HttpErrorResponse} from "@angular/common/http";
import {MapComponent} from "../../shared/map/map.component";
import {ImageService} from "../../shared/image.service";

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

  @ViewChild('mapComponent') mapComponent: MapComponent;
  accommodation: AccommodationDTO;
  selected: any;
  dateRange: calendarDate[] = [];
  price:string="Click here to see the availability periods";
  mapCenter: [number, number]=[0,0];
  images:any[]=[];
  userType: string = this.tokenService.getRoleFromToken() ?? 'unauthenticated';
  selectedImage:any="";


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
  currentIndex=0;
  shiftPictureRight():void{
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage=this.images[this.currentIndex];
  }
  shiftPictureLeft():void{
    this.currentIndex = (this.currentIndex - 1) % this.images.length;
    this.selectedImage=this.images[this.currentIndex];
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

  constructor(private accommodationService:AccommodationService,private imageService:ImageService,private route: ActivatedRoute,
              public dialog: MatDialog, private sharedService: SharedService, private tokenService: TokenService){
  }

  parseDateString(dateString: string): Date | null {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript
      const day = parseInt(dateParts[2], 10);
      const parsedDate = new Date(year, month, day);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
    return null;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      this.accommodationService.getAccommodationDetails(id.toString()).subscribe({
        next: (accommodation: AccommodationDTO) => {
          this.accommodation = accommodation;
          this.dateRange = [];
          this.mapCenter = [this.accommodation?.location.latitude, this.accommodation?.location.longitude];
          for (const period of this.accommodation?.availabilityPeriods || []) {
            this.dateRange.push({
              start: this.parseDateString(period.period.startDate)!,
              end: this.parseDateString(period.period.endDate)!,
              price: period.price
            });
          }
        },
        error: (_) => {
        }
      });
      this.accommodation.images.forEach((image)=>{
        this.imageService.loadImage(image.id).subscribe(
          (imageSrc: string | null) => {
            if (imageSrc) {
              console.log('Image loaded:', imageSrc);
              this.images.push(imageSrc);
            } else {
              console.error('Error loading image');
            }
          }
        );
      })
      this.imageService.loadImage(0).subscribe(
        (imageSrc: string | null) => {
          if (imageSrc) {
            console.log('Image loaded:', imageSrc);
            this.selectedImage=imageSrc;
          } else {
            console.error('Error loading image');
          }
        }
      );

    });
  }
  trackByImage(index: number, image: any): any {
    return image;
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

  openApproveAccommodationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to approve this accommodation?',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return

        const accommodationApproval: AccommodationApproval = {
          approved: true,
        }

        this.accommodationService.putAccommodationIsApproved(this.accommodation?.id, accommodationApproval)
          .subscribe({
            next: () => this.sharedService.openSnackBar("Accommodation successfully approved."),
            error: (error: HttpErrorResponse): void => {
              if (error)
                this.sharedService.openSnackBar(error.error.message);
              else
                this.sharedService.openSnackBar("Error reaching the server.");
            },
          });
      },
    });
  }

  openUnapproveAccommodationDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CustomMessageBoxDialogComponent, {
      data: {
        message: 'Are you sure you want to this accommodation back for revision?',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (!dialogResult)
          return

        const accommodationApproval: AccommodationApproval = {
          approved: false,
        }

        this.accommodationService.putAccommodationIsApproved(this.accommodation?.id, accommodationApproval)
          .subscribe({
            next: () => this.sharedService.openSnackBar("Accommodation sent back for revision"),
            error: (error: HttpErrorResponse): void => {
              if (error)
                this.sharedService.openSnackBar(error.error.message);
              else
                this.sharedService.openSnackBar("Error reaching the server.");
            },
          })
      },
    });
  }
}
