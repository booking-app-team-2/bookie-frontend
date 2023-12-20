import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerAccommodationsComponent } from './owner-accommodations/owner-accommodations.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../layout/layout.module";
import {MaterialModule} from "../infrastructure/material/material.module";


@NgModule({
  declarations: [
    OwnerAccommodationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class OwnerAccommodationsModule { }
