import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-updating',
  templateUrl: './accommodation-updating.component.html',
  styleUrl: './accommodation-updating.component.scss',
  host: {ngSkipHydration: 'true'},

})
export class AccommodationUpdatingComponent {
  amenities: string[] = ['WiFi', 'Parking', 'Kitchen', 'AC'];
  accommodationTypes: string[] = ['Apartment', 'Studio', 'Room'];
}
