import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile-deletion-dialog',
  templateUrl: './profile-deletion-dialog.component.html',
  styleUrl: './profile-deletion-dialog.component.scss'
})
export class ProfileDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: number },
              private router: Router,
              private profileService: ProfileService) { }

  deleteProfile(): void {
    this.profileService.remove(this.data.userId).subscribe({
      next: (_): Promise<Boolean> => this.router.navigate(['login']),
      error: (_): void => {}
    });
  }
}
