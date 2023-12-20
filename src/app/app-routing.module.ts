import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccommodationDetailsScreenComponent} from "./layout/accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./layout/main-screen/main-screen.component";
import {ProfileComponent} from "./profiles/profile/profile.component";
import {LoginComponent} from "./login-register/login/login.component";
import {RegisterComponent} from "./login-register/register/register.component";

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'details/:id', component: AccommodationDetailsScreenComponent },
  { component: LoginComponent, path: "login"},
  { component: ProfileComponent, path: "profile"},
  { component: RegisterComponent, path: "register"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
