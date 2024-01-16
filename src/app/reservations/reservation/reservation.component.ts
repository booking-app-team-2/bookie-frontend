import {Component, Input} from '@angular/core';
import {ReservationOwner} from "../../shared/model/ReservationOwner.model";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  @Input()
  reservation: ReservationOwner | undefined;
}
