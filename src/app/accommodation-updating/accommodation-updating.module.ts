import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationUpdatingComponent } from './accommodation-updating/accommodation-updating.component';
import {MaterialModule} from "../infrastructure/material/material.module";


@NgModule({
  declarations: [
    AccommodationUpdatingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AccommodationUpdatingModule { }
