import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerAccommodationsComponent } from './owner-accommodations/owner-accommodations.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../layout/layout.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    OwnerAccommodationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class OwnerAccommodationsModule { }
