import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../infrastructure/material/material.module";
import { ProfileComponent } from './profile/profile.component';
import { ProfileDeletionDialogComponent } from './profile-deletion-dialog/profile-deletion-dialog.component';
import { BasicInfoDialogComponent } from './basic-info-dialog/basic-info-dialog.component';
import { ContactInfoDialogComponent } from './contact-info-dialog/contact-info-dialog.component';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDeletionDialogComponent,
    BasicInfoDialogComponent,
    ContactInfoDialogComponent,
    AddressDialogComponent,
    PasswordChangeDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ProfilesModule { }
