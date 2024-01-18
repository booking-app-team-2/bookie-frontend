import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {AccommodationDetailsScreenComponent} from "./accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {ReviewCardComponent} from './review-card/review-card.component';
import {FilterDialogComponent} from "./filter-dialog/filter-dialog.component";
import {CdkListbox} from "@angular/cdk/listbox";
import { MapComponent } from '../shared/map/map.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomMessageBoxDialogComponent } from '../shared/custom-message-box-dialog/custom-message-box-dialog.component';
import {ReservationsModule} from "../reservations/reservations.module";

@NgModule({
  declarations: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent,
    ReviewCardComponent,
    FilterDialogComponent,
    MapComponent,
    CustomMessageBoxDialogComponent
  ],
  imports: [
    ReservationsModule,
    CommonModule,
    MaterialModule,
    RouterLink,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    CdkListbox
  ],
  exports: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent,
    ReviewCardComponent,
    FilterDialogComponent,
    MapComponent
  ]
})
export class LayoutModule { }
