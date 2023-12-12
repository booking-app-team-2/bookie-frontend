import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {AccommodationDetailsScreenComponent} from "./accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {ReviewCardComponent} from './review-card/review-card.component';
import {FormsModule} from "@angular/forms";
import {RequestsModule} from "../requests/requests.module";


@NgModule({
  declarations: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent,
    ReviewCardComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
        NgOptimizedImage,
        FormsModule,
        RequestsModule,

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
