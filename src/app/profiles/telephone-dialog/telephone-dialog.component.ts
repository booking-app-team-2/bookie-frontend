import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-telephone-dialog',
  templateUrl: './telephone-dialog.component.html',
  styleUrl: './telephone-dialog.component.scss'
})
export class TelephoneDialogComponent {

  // TODO: Get userId from JWT
  userId: number = 2;

  userTelephoneForm: FormGroup<{
    telephone: FormControl<string | null>,
  }> = new FormGroup<{
    telephone: FormControl<string | null>
  }>({
    telephone: new FormControl<string | null>(this.data.telephone, [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: { telephone: string },
              private profileService: ProfileService) { }

  updateUserTelephone(): void {
    if (!this.userTelephoneForm.valid)
      return;

    this.profileService.putUserTelephone(this.userId, this.userTelephoneForm.value.telephone ?? '')
      .subscribe({
        error: () => { }
      });
  }
}
