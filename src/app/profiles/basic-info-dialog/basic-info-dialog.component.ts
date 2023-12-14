import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {UserBasicInfo} from "./model/user-basic-info.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";

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

  constructor(public dialogRef: MatDialogRef<BasicInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {name: string, surname: string},
              private profileService: ProfileService,
              private sharedService: SharedService) { }

  getNameErrorMessage(): string {
    if (this.userBasicInfoForm.get('name')?.hasError('required'))
      return 'Name is required';

    return 'Something went wrong';
  }

  getSurnameErrorMessage(): string {
    if(this.userBasicInfoForm.get('surname')?.hasError('required'))
      return 'Surname is required';

    return 'Something went wrong';
  }

  updateUserBasicInfo(): void {
    if (!this.userBasicInfoForm.valid)
      return;

    const userBasicInfo: UserBasicInfo = {
      name: this.userBasicInfoForm.value.name ?? '',
      surname: this.userBasicInfoForm.value.surname ?? '',
    }

    this.profileService.putUserBasicInfo(this.userId, userBasicInfo).subscribe({
      next: (): void => {
        this.dialogRef.close(true);
      },
      error: (error: HttpErrorResponse): void => {
        if (error.status === 404)
          this.sharedService.openSnackBar('User not found.');
        else
          this.sharedService.openSnackBar('Error reaching the server.');
      },
    });
  }
}
