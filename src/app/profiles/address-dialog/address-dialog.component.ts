import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss'
})
export class AddressDialogComponent {

  // TODO: Get userId from JWT
  userId: number = 2;

  userAddressForm: FormGroup<{
    address: FormControl<string | null>,
  }> = new FormGroup<{
    address: FormControl<string | null>,
  }>({
    address: new FormControl<string | null>(this.data.address, [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: {address: string},
              private profileService: ProfileService) { }

  updateUserAddress(): void {
    if (!this.userAddressForm.valid)
      return;

    this.profileService.putUserAddress(this.userId, this.userAddressForm.value.address ?? '').subscribe({
      error: () => { }
    });
  }
}
