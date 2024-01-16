import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccommodationDetailsScreenComponent} from "./layout/accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./layout/main-screen/main-screen.component";
import {ProfileComponent} from "./profiles/profile/profile.component";
import {LoginComponent} from "./login-register/login/login.component";
import {RegisterComponent} from "./login-register/register/register.component";
import {AccommodationUpdatingComponent} from "./accommodation-updating/accommodation-updating/accommodation-updating.component";
import {OwnerAccommodationsComponent} from "./owner-accommodations/owner-accommodations/owner-accommodations.component";
import {
  ReservationsLayoutComponent
} from "./reservations/reservations-layout/reservations-layout.component";

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'details/:id', component: AccommodationDetailsScreenComponent },
  { component: LoginComponent, path: "login"},
  { component: ProfileComponent, path: "profile"},
  { component: RegisterComponent, path: "register"},
  { component: AccommodationUpdatingComponent, path: "updating/:id"},
  { component: OwnerAccommodationsComponent, path: "owner/:id/accommodations"},
  { component: ReservationsLayoutComponent, path: "reservations" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
