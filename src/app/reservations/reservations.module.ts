import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsLayoutOwnerComponent } from './reservations-layout-owner/reservations-layout-owner.component';
import { ReservationOwnerComponent } from './reservation-owner/reservation-owner.component';
import {ReserveDialogComponent} from "./reserve-dialog/reserve-dialog.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ReservationsLayoutOwnerComponent,
    ReservationOwnerComponent,
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
