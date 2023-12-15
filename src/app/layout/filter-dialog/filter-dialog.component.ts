import {Component, Inject, Output,EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {

  // @ts-ignore
  @Output() filterApplied=new EventEmitter<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {wifi:boolean;parking:boolean;ac:boolean;kitchen:boolean;apartment:boolean;room:boolean;studio:boolean;startThumbValue:number;endThumbValue:number;},public dialogRef:MatDialogRef<FilterDialogComponent>) { }

  applyFilter():void{
    this.filterApplied.emit(this.data);
    this.dialogRef.close('true');
  }
}
