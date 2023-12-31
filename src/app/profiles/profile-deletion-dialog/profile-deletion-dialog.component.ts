import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedService} from "../../shared/shared.service";
import {Observable} from "rxjs";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-profile-deletion-dialog',
  templateUrl: './profile-deletion-dialog.component.html',
  styleUrl: './profile-deletion-dialog.component.scss'
})
export class ProfileDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: number },
              private router: Router,
              private profileService: ProfileService,
              private sharedService: SharedService,
              private tokenService: TokenService) { }

  deleteProfile(): void {
    this.profileService.remove(this.data.userId).subscribe({
      next: (): Promise<Boolean> => {
        this.tokenService.removeToken()
        return this.router.navigate(['login'])
      },
      error: (error: HttpErrorResponse): void =>  {
        if (error)
          this.sharedService.openSnackBar(error.error.message);
        else
          this.sharedService.openSnackBar('Error reaching the server.');
      }
    });
  }
}
