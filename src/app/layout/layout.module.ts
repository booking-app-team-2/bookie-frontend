import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AccommodationCardComponent} from "./accommodation-card/accommodation-card.component";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {AccommodationDetailsScreenComponent} from "./accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ReviewCardComponent } from './review-card/review-card.component';

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
    MatButtonModule,
    RouterLink,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    NgOptimizedImage,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule
  ],
  exports: [
    NavbarComponent,
    AccommodationCardComponent,
    AccommodationDetailsScreenComponent,
    MainScreenComponent
  ]
})
export class LayoutModule { }
