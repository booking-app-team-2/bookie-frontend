import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-reservations-layout',
  templateUrl: './reservations-layout.component.html',
  styleUrl: './reservations-layout.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ReservationsLayoutComponent {
  userRole: string = this.tokenService.getRoleFromToken() ?? 'Unauthenticated';

  periodForm: FormGroup<{
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
  }> = new FormGroup<{
    startDate: FormControl<Date | null>,
    endDate: FormControl<Date | null>,
  }>({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  constructor(private tokenService: TokenService) { }
}
