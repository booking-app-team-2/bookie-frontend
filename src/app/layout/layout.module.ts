import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {AccommodationDetailsScreenComponent} from "./accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {ReviewCardComponent} from './review-card/review-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReserveDialogComponent } from './reserve-dialog/reserve-dialog.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent,
    ReviewCardComponent,
    ReserveDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent,
    ReviewCardComponent
  ]
})
export class LayoutModule { }
