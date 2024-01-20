import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerReviewsComponent } from './owner-reviews/owner-reviews.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [
    OwnerReviewsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule
  ]
})
export class OwnerReviewsModule { }
