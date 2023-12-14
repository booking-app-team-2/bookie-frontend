import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  constructor() { }
}
