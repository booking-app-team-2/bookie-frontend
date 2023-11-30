import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from "../infrastructure/material/material.module";
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgOptimizedImage,
    RouterModule,
  ]
})

export class LoginRegisterModule { }