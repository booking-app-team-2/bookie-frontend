import { Component } from '@angular/core';

@Component({
  selector: 'app-request-screen',
  templateUrl: './request-screen.component.html',
  styleUrl: './request-screen.component.scss'
})
export class RequestScreenComponent {
  search="";
  dropdownOptions = [
    { label: 'location', value: 'location' },
    { label: 'number of guests', value: 'number of guests' },
    { label: 'trip start date', value: 'trip start date' },
    { label: 'trip end date', value: 'trip end date' },
    { label: 'price', value: 'price' },
    { label: 'status', value: 'status' }
  ];

  selectedOption: string = '';
}
