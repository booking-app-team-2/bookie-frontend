import { Component } from '@angular/core';

@Component({
  selector: 'app-reservations-layout',
  templateUrl: './reservations-layout.component.html',
  styleUrl: './reservations-layout.component.scss'
})
export class ReservationsLayoutComponent {
  userRole: string = 'Owner';
}
