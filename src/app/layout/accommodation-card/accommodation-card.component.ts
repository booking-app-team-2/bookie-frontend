import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.scss'
})
export class AccommodationCardComponent {

  accommodation_name:string="Placeholder accommodation";
  rating:string="4.5";
  description:string="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n" +
    "        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\n" +
    "        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat\n" +
    "        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit\n" +
    "        anim id est laborum.";
  price:string="$10 Per person";
  constructor(private router: Router) {}

  redirectDetails() {
    this.router.navigate(['/details']);
  }
}
