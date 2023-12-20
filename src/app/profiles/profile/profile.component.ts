import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProfileDeletionDialogComponent} from "../profile-deletion-dialog/profile-deletion-dialog.component";
import {BasicInfoDialogComponent} from "../basic-info-dialog/basic-info-dialog.component";
import {TelephoneDialogComponent} from "../telephone-dialog/telephone-dialog.component";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {PasswordChangeDialogComponent} from "../password-change-dialog/password-change-dialog.component";
import {User} from "./model/user.model";
import {ProfileService} from "../profile.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userId: number = this.tokenService.getIdFromToken() ?? 0;

  user: User | undefined;

  constructor(private profileService: ProfileService, public dialog: MatDialog,
              private sharedService: SharedService,
              private tokenService: TokenService) { }

  getProfileData(): void {
    this.profileService.get(this.userId).subscribe({
      next: (userDTO: User): User => this.user = userDTO,
      error: (error: HttpErrorResponse) => {
        if (error.status === 404)
          this.sharedService.openSnackBar('User not found.');
        else
          this.sharedService.openSnackBar('Error reaching the server.');
      }
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
        if (dialogResult) {
          this.getProfileData();
          this.sharedService.openSnackBar('Password successfully changed.');
        }
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
