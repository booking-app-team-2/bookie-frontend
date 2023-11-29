import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccommodationDetailsScreenComponent} from "./layout/accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./layout/main-screen/main-screen.component";
import {ProfileComponent} from "./profiles/profile/profile.component";

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'details', component: AccommodationDetailsScreenComponent },
  {component: ProfileComponent, path: "profile"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
