import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {UserAddress} from "./model/user-address.model";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss'
})
export class AddressDialogComponent {
  userId: number = this.tokenService.getIdFromToken() ?? 0;

  userAddressForm: FormGroup<{
    address: FormControl<string | null>,
  }> = new FormGroup<{
    address: FormControl<string | null>,
  }>({
    address: new FormControl<string | null>(this.data.address, [Validators.required]),
  })

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {address: string},
              private profileService: ProfileService,
              private sharedService: SharedService,
              private tokenService : TokenService,
              ) { }

  getErrorMessage(): string {
    if (this.userAddressForm.get('address')?.hasError('required'))
      return 'Address is required';

    return 'Something went wrong';
  }

  updateUserAddress(): void {
    if (!this.userAddressForm.valid)
      return;

    const userAddress: UserAddress = {
      addressOfResidence: this.userAddressForm.value.address ?? '',
    }

    this.profileService.putUserAddress(this.userId, userAddress)
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
