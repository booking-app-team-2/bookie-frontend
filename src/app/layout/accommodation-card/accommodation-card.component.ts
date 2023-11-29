import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrl: './accommodation-card.component.scss'
})
export class AccommodationCardComponent {
  constructor(private router: Router) {}

  redirectDetails() {
    this.router.navigate(['/details']);
  }
}
