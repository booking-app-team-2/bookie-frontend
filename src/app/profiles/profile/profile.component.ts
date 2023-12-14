import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProfileDeletionDialogComponent} from "../profile-deletion-dialog/profile-deletion-dialog.component";
import {BasicInfoDialogComponent} from "../basic-info-dialog/basic-info-dialog.component";
import {TelephoneDialogComponent} from "../telephone-dialog/telephone-dialog.component";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {PasswordChangeDialogComponent} from "../password-change-dialog/password-change-dialog.component";
import {User} from "./model/user.model";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  // TODO: Get userId from JWT
  userId: number = 2;

  user: User | undefined;

  constructor(private profileService: ProfileService, public dialog: MatDialog) { }

  getProfileData(): void {
    this.profileService.get(this.userId).subscribe({
      next: (userDTO: User): User => this.user = userDTO,

      // TODO: React to a user not being found
      error: () => console.log('Not found')
    })
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  openChangeBasicInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BasicInfoDialogComponent, {
      data: {
        name: this.user?.name,
        surname: this.user?.surname,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)
          this.getProfileData();
      }
    });
  }

  openChangeContactInfoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TelephoneDialogComponent, {
      data: {
        telephone: this.user?.telephone,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)
          this.getProfileData();
      }
    });
  }

  openChangeAddressDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddressDialogComponent, {
      data: {
        address: this.user?.addressOfResidence
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)
          this.getProfileData();
      }
    });
  }

  openChangePasswordDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PasswordChangeDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult)
          this.getProfileData();
      }
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
