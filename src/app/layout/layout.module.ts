import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
  ],
  exports: [
    NavbarComponent
  ]
})
export class LayoutModule { }
