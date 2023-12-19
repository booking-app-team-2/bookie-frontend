import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    FormsModule
  ]
})
export class AccommodationUpdatingModule { }
