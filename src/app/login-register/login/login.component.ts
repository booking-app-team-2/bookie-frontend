import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginCredentials} from "./model/login-credentials.model";
import {AuthenticationService} from "../authentication.service";
import {TokenModel} from "./model/token.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {}

  loginForm : FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  login(): void {
      const login: LoginCredentials = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }

      this.authenticationService.login(login).subscribe({
        next : (data : TokenModel) : void => {
          localStorage.setItem('jwt', data.jwt);
          this.router.navigate(['']);
      },
        error : error => {
        console.log(error);
        }
      });
  }
}
