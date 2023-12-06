import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatBadgeModule} from "@angular/material/badge";
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatNativeDateModule,
  ],
  exports: [
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatNativeDateModule,
  ]
})
export class MaterialModule { }
