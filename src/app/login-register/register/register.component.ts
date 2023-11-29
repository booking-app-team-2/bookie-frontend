import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  onSubmit() {
    // Add your registration logic here
    console.log('Registration button clicked!');
  }
}
