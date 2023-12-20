import { Component, Input } from '@angular/core';
import {AccommodationDTO} from "./model/accommodation.model";
@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.scss'
})
export class AccommodationCardComponent{

  @Input()
  accommodation: AccommodationDTO;

}
