import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnapprovedReviewsComponent } from './unapproved-reviews/unapproved-reviews.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    UnapprovedReviewsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule
  ]
})
export class UnapprovedReviewsModule { }
