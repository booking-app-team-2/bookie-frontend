import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 2500 });
  }
}
