import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationUpdatingComponent } from './accommodation-updating/accommodation-updating.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AccommodationUpdatingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgOptimizedImage
  ]
})
export class AccommodationUpdatingModule { }
