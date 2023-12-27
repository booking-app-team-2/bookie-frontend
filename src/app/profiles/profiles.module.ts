import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../infrastructure/material/material.module";
import { ProfileComponent } from './profile/profile.component';
import { ProfileDeletionDialogComponent } from './profile-deletion-dialog/profile-deletion-dialog.component';
import { BasicInfoDialogComponent } from './basic-info-dialog/basic-info-dialog.component';
import { TelephoneDialogComponent } from './telephone-dialog/telephone-dialog.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDeletionDialogComponent,
    BasicInfoDialogComponent,
    TelephoneDialogComponent,
    AddressDialogComponent,
    PasswordChangeDialogComponent
  ],
  imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      SharedModule,
  ]
})
export class ProfilesModule { }
