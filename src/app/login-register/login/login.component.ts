import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginCredentials} from "./model/login-credentials.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login(): void {

    if (this.loginForm.valid) {
      const login: LoginCredentials = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      /*this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser()
          this.router.navigate([''])
        }
      })*/
    }
  }
}
