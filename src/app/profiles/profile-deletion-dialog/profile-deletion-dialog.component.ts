import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-profile-deletion-dialog',
  templateUrl: './profile-deletion-dialog.component.html',
  styleUrl: './profile-deletion-dialog.component.scss'
})
export class ProfileDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: number },
              private router: Router,
              private profileService: ProfileService,
              private sharedService: SharedService) { }

  deleteProfile(): void {
    this.profileService.remove(this.data.userId).subscribe({

      // TODO: Clear the local storage of the current user
      next: (): Promise<Boolean> => this.router.navigate(['login']),

      error: (error: HttpErrorResponse): void => this.sharedService.openSnackBar('Error reaching the server.')
    });
  }
}
