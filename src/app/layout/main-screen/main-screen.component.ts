import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss'
})
export class MainScreenComponent {
  search="";

  constructor(public dialog: MatDialog) { }
  openFilterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }
  dropdownOptions = [
    { label: 'location', value: 'location' },
    { label: 'number of guests', value: 'number of guests' },
    { label: 'trip start date', value: 'trip start date' },
    { label: 'trip end date', value: 'trip end date' }
  ];

  selectedOption: string = '';
}
