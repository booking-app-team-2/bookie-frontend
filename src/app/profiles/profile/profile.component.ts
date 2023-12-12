import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProfileDeletionDialogComponent} from "../profile-deletion-dialog/profile-deletion-dialog.component";
import {BasicInfoDialogComponent} from "../basic-info-dialog/basic-info-dialog.component";
import {ContactInfoDialogComponent} from "../contact-info-dialog/contact-info-dialog.component";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {PasswordChangeDialogComponent} from "../password-change-dialog/password-change-dialog.component";
import {UserDTO} from "./model/profile.model";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  // TODO: Get userId from JWT
  userId: number = 4;

  userDTO: UserDTO;

  constructor(private profileService: ProfileService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.profileService.get(this.userId).subscribe({
      next: (userDTO: UserDTO): UserDTO => this.userDTO = userDTO,

      // TODO: React to a user not being found
      error: (_) => {}
    })
  }

  openChangeBasicInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: this.userDTO.name,
        surname: this.userDTO.surname,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChangeContactInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ContactInfoDialogComponent, {
      data: {
        email: this.userDTO.email,
        telephone: this.userDTO.telephone,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openChangeAddressDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddressDialogComponent, {
      data: {
        address: this.userDTO.addressOfResidence
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
      data: {
        userId: this.userId
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
