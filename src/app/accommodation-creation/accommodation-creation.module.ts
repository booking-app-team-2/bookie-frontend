import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationCreationScreenComponent } from './accommodation-creation-screen/accommodation-creation-screen.component';
import { MaterialModule} from "../infrastructure/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AccommodationCreationScreenComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ]
})
export class AccommodationCreationModule { }
