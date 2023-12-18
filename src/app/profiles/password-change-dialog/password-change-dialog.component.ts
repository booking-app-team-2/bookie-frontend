import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {UserPassword} from "./model/user-password.model";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrl: './password-change-dialog.component.scss'
})
export class PasswordChangeDialogComponent {

  // TODO: Get userId from JWT
  userId: number = 2;

  hideCurrentPassword: boolean = true;
  hideNewPassword: boolean = true;

  userPasswordForm: FormGroup<{
    currentPassword: FormControl<string | null>,
    newPassword: FormControl<string | null>,
  }> = new FormGroup<{
    currentPassword: FormControl<string | null>,
    newPassword: FormControl<string | null>,
  }>({
    currentPassword: new FormControl<string | null>('', [Validators.required]),
    newPassword: new FormControl<string | null>(
      '',
      [
        Validators.pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$'))
      ]
    ),
  });

  constructor(public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
              private profileService: ProfileService,
              private sharedService: SharedService) { }

  getCurrentPasswordErrorMessage(): string {
    if (this.userPasswordForm.get('currentPassword')?.hasError('required'))
      return 'Current password is required';

    return 'Something went wrong';
  }

  getNewPasswordErrorMessage(): string {
    if (this.userPasswordForm.get('newPassword')?.hasError('pattern'))
      return 'Invalid password';

    return 'Something went wrong';
  }

  updateUserPassword(): void {
    if (!this.userPasswordForm.valid)
      return;

    const userPassword: UserPassword = {
      currentPassword: this.userPasswordForm.value.currentPassword ?? '',
      newPassword: this.userPasswordForm.value.newPassword ?? '',
    }

    this.profileService.putUserPassword(this.userId, userPassword).subscribe({
      next: (): void => this.dialogRef.close('true'),
      error: (error: HttpErrorResponse): void => {
        if (error.status === 403)
          this.sharedService.openSnackBar('Incorrect password.');
        else if (error.status === 404)
          this.sharedService.openSnackBar('User not found.');
        else
          this.sharedService.openSnackBar('Error reaching the server.');
      },
    });

  }
}
