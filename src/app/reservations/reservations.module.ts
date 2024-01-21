import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsLayoutComponent } from './reservations-layout/reservations-layout.component';
import { ReservationComponent } from './reservation/reservation.component';
import {ReserveDialogComponent} from "./reserve-dialog/reserve-dialog.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ReservationsLayoutComponent,
    ReservationComponent,
    ReserveDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ReserveDialogComponent
  ]
})
export class ReservationsModule { }
