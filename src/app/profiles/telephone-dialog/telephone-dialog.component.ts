import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {UserTelephone} from "./model/user-telephone.model";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-telephone-dialog',
  templateUrl: './telephone-dialog.component.html',
  styleUrl: './telephone-dialog.component.scss'
})
export class TelephoneDialogComponent {
  userId: number = this.tokenService.getIdFromToken() ?? 0;

  userTelephoneForm: FormGroup<{
    telephone: FormControl<string | null>,
  }> = new FormGroup<{
    telephone: FormControl<string | null>
  }>({
    telephone: new FormControl<string | null>(
      this.data.telephone,
      [
        Validators.required,
        Validators.pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]? ?[0-9]{2,3}[ /]?[0-9]{3}[- ]?[0-9]{4,6}$')),
      ]
    ),
  });
  constructor(public dialogRef: MatDialogRef<TelephoneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { telephone: string },
              private profileService: ProfileService,
              private sharedService: SharedService,
              private tokenService: TokenService) { }

  getErrorMessage(): string {
    if (this.userTelephoneForm.get('telephone')?.hasError('required'))
      return 'Telephone is required';
    else if (this.userTelephoneForm.get('telephone')?.hasError('pattern'))
      return 'Invalid telephone';

    return 'Something went wrong';
  }

  updateUserTelephone(): void {
    if (!this.userTelephoneForm.valid)
      return;

    const userTelephone: UserTelephone = {
      telephone: this.userTelephoneForm.value.telephone ?? '',
    }

    this.profileService.putUserTelephone(this.userId, userTelephone)
      .subscribe({
        next: (): void => this.dialogRef.close('true'),
        error: (error: HttpErrorResponse): void => {
          if (error.status === 404)
            this.sharedService.openSnackBar('User not found.');
          else
            this.sharedService.openSnackBar('Error reaching the server.');
        }
      });
  }
}
