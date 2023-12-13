import {Component, OnInit} from '@angular/core';
import {AccommodationDTO} from "../accommodation-card/model/accommodation.model";
import {AccommodationDetailsService} from "../accommodation-details.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-accommodation-details-screen',
  templateUrl: './accommodation-details-screen.component.html',
  styleUrl: './accommodation-details-screen.component.scss'
})
export class AccommodationDetailsScreenComponent implements OnInit{

  accommodation: AccommodationDTO;
  selected: Date=new Date();

  constructor(private accommodationDetailsService:AccommodationDetailsService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.accommodationDetailsService.get(id.toString()).subscribe({
        next: (accommodation: AccommodationDTO): AccommodationDTO => this.accommodation = accommodation,
        error: (_) => {
        }
      });
    });
  }


}
