import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsLayoutComponent } from './reservations-layout/reservations-layout.component';
import { ReservationComponent } from './reservation/reservation.component';
import {ReserveDialogComponent} from "./reserve-dialog/reserve-dialog.component";
import {MaterialModule} from "../infrastructure/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    ReservationsLayoutComponent,
    ReservationComponent,
    ReserveDialogComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
  exports: [
    ReserveDialogComponent
  ]
})
export class ReservationsModule { }
