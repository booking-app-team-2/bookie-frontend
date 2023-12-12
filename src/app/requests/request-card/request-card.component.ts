import { Component } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  accommodation_name:string="Vampires castle";
  guest_count:string="2 people";
  start_date:string="1.1.1970.";
  end_date:string="10.1.1970.";
  price:string="250$";
  status:string="Unapproved";
}
