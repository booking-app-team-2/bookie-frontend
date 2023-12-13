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

  constructor(private accommodationService:AccommodationService) {}
  ngOnInit():void{
    this.accommodationService.get().subscribe({
      next:(accommodations: AccommodationDTO[]):AccommodationDTO[]=> this.accommodations=accommodations,
      error:(_)=>{}
  });
  }
}
