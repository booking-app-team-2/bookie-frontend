import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../infrastructure/material/material.module";
import { ReportedReviewsComponent } from './reported-reviews/reported-reviews.component';
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    ReportedReviewsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule
  ]
})
export class ReportedReviewsModule { }
