import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details-screen',
  templateUrl: './accommodation-details-screen.component.html',
  styleUrl: './accommodation-details-screen.component.scss'
})
export class AccommodationDetailsScreenComponent {
  name:string="Placeholder accommodation";
  rating:string="4.5";
  description:string="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n" +
    "        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\n" +
    "        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat\n" +
    "        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit\n" +
    "        anim id est laborum.";
  guest_count:string="Suited for 4 to 6 guests";
  deadline:string="7";
  type:string="Apartment";
  price:string="$10 Per person";
  selected: Date=new Date();
}
