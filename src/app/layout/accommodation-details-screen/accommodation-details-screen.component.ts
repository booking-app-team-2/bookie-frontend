import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details-screen',
  templateUrl: './accommodation-details-screen.component.html',
  styleUrl: './accommodation-details-screen.component.scss'
})
export class AccommodationDetailsScreenComponent {
  selected: Date=new Date();
}
