import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {UserBasicInfo} from "./model/user-basic-info.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-basic-info-dialog',
  templateUrl: './basic-info-dialog.component.html',
  styleUrl: './basic-info-dialog.component.scss'
})
export class BasicInfoDialogComponent {

  // TODO: Get userId from JWT
  userId: number = 2;

  userBasicInfoForm: FormGroup<{
    name: FormControl<string | null>,
    surname: FormControl<string | null>,
  }> = new FormGroup<{
    name: FormControl<string | null>,
    surname: FormControl<string | null>,
  }>({
    name: new FormControl<string | null>(this.data.name, [Validators.required]),
    surname: new FormControl<string | null>(this.data.surname, [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, surname: string},
              private profileService: ProfileService) { }

  updateUserBasicInfo(): void {
    if (!this.userBasicInfoForm.valid)
      return;

    const userBasicInfo: UserBasicInfo = {
      name: this.userBasicInfoForm.value.name ?? '',
      surname: this.userBasicInfoForm.value.surname ?? '',
    }

    this.profileService.putUserBasicInfo(this.userId, userBasicInfo).subscribe({
      error: () => {
      },
    });
  }
}
