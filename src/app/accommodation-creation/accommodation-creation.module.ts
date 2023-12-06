import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationCreationScreenComponent } from './accommodation-creation-screen/accommodation-creation-screen.component';
import { MaterialModule} from "../infrastructure/material/material.module";


@NgModule({
  declarations: [
    AccommodationCreationScreenComponent,
  ],
    imports: [
        CommonModule,
        MaterialModule,
        NgOptimizedImage,
    ]
})
export class AccommodationCreationModule { }
