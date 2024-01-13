import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-owner',
  templateUrl: './reservation-owner.component.html',
  styleUrl: './reservation-owner.component.scss'
})
export class ReservationOwnerComponent {
  userRole: string = 'Guest';
  status: string = 'Accepted';
}
