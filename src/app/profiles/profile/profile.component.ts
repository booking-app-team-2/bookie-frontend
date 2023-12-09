import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProfileDeletionDialogComponent} from "../profile-deletion-dialog/profile-deletion-dialog.component";
import {BasicInfoDialogComponent} from "../basic-info-dialog/basic-info-dialog.component";
import {ContactInfoDialogComponent} from "../contact-info-dialog/contact-info-dialog.component";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {PasswordChangeDialogComponent} from "../password-change-dialog/password-change-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name: string = "Bookie";
  surname: string = "Bookie";
  email: string = "bookie@bookie.com";
  telephone: string = "Placeholder";
  address: string = "Bookshelf";

  constructor(public dialog: MatDialog) { }

  openChangeBasicInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: this.name,
        surname: this.surname
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChangeContactInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ContactInfoDialogComponent, {
      data: {
        email: this.email,
        telephone: this.telephone
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChangeAddressDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddressDialogComponent, {
      data: {
        address: this.address
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChangePasswordDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PasswordChangeDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openProfileDeletionDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProfileDeletionDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
