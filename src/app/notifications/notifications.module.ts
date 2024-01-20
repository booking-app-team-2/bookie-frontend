import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsScreenComponent } from './notifications-screen/notifications-screen.component';
import {MaterialModule} from "../infrastructure/material/material.module";


@NgModule({
  declarations: [
    NotificationsScreenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class NotificationsModule { }
