import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {UserPassword} from "./model/user-password.model";
import {HttpErrorResponse, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrl: './password-change-dialog.component.scss'
})
export class PasswordChangeDialogComponent {

  // TODO: Get userId from JWT
  userId: number = 2;

  userPasswordForm: FormGroup<{
    oldPassword: FormControl<string | null>,
    newPassword: FormControl<string | null>,
  }> = new FormGroup<{
    oldPassword: FormControl<string | null>,
    newPassword: FormControl<string | null>,
  }>({
    oldPassword: new FormControl<string | null>('', [Validators.required]),
    newPassword: new FormControl<string | null>('', [Validators.required]),
  });

  constructor(public dialogRef: DialogRef,
              private profileService: ProfileService) { }

  updateUserPassword(): void {
    if (!this.userPasswordForm.valid)
      return;

    const userPassword: UserPassword = {
      oldPassword: this.userPasswordForm.value.oldPassword ?? '',
      newPassword: this.userPasswordForm.value.newPassword ?? '',
    }

    this.profileService.putUserPassword(this.userId, userPassword).subscribe({
      next: (): void => this.dialogRef.close('true'),
      error: (error: HttpErrorResponse): void => console.log(error.status),
    });

  }
}
