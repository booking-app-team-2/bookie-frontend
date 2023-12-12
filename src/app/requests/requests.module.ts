import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../infrastructure/material/material.module";
import { RequestCardComponent } from './request-card/request-card.component';
import { RequestScreenComponent } from './request-screen/request-screen.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RequestCardComponent,
    RequestScreenComponent
  ],
  exports: [
    RequestCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class RequestsModule { }
