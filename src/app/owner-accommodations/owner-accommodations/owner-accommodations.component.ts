import {Component, OnInit} from '@angular/core';
import {AccommodationService} from "../../layout/accommodation.service";
import {AccommodationDTO} from "../../layout/accommodation-card/model/accommodation.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-owner-accommodations',
  templateUrl: './owner-accommodations.component.html',
  styleUrl: './owner-accommodations.component.scss'
})
export class OwnerAccommodationsComponent implements OnInit {

  accommodations: AccommodationDTO[];

  constructor(private accommodationService: AccommodationService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.accommodationService.getAccommodationsByOwner(id).subscribe({
        next: (accommodations: AccommodationDTO[]): void => {
          this.accommodations = accommodations;
        },
        error: (_) => {
        }
      });
    });
  }
}
