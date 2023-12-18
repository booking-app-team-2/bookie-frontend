import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-creation-screen',
  templateUrl: './accommodation-creation-screen.component.html',
  styleUrl: './accommodation-creation-screen.component.scss',
  host: {ngSkipHydration: 'true'},
})


export class AccommodationCreationScreenComponent {
  amenities: string[] = ['WiFi', 'Parking', 'Kitchen', 'AC'];
  accommodationTypes: string[] = ['Apartment', 'Studio', 'Room'];
}
