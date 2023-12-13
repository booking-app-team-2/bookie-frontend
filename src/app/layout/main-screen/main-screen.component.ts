import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {Component, OnInit} from '@angular/core';
import {AccommodationDTO} from "../accommodation-card/model/accommodation.model";
import {Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss'
})

export class MainScreenComponent  implements OnInit{
  value="";

  accommodations: AccommodationDTO[];

  search="";
  openFilterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }
  dropdownOptions = [
    { label: 'location', value: 'location' },
    { label: 'number of guests', value: 'number of guests' },
    { label: 'trip start date', value: 'trip start date' },
    { label: 'trip end date', value: 'trip end date' }
  ];

  selectedOption: string = '';
  constructor(private accommodationService:AccommodationService,public dialog: MatDialog) {}
  ngOnInit():void{
    this.accommodationService.get().subscribe({
      next:(accommodations: AccommodationDTO[]):AccommodationDTO[]=> this.accommodations=accommodations,
      error:(_)=>{}
  });
  }
}
