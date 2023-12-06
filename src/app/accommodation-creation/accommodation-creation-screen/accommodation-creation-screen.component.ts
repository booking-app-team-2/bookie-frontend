import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-creation-screen',
  templateUrl: './accommodation-creation-screen.component.html',
  styleUrl: './accommodation-creation-screen.component.scss',
})


export class AccommodationCreationScreenComponent {
  amenities: string[] = ['WiFi', 'Parking', 'Kitchen', 'Air Conditioning'];
  accommodationTypes: string[] = ['Hotel', 'Apartment', 'House', 'Villa'];
}
