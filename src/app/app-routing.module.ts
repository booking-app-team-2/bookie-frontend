import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccommodationDetailsScreenComponent} from "./layout/accommodation-details-screen/accommodation-details-screen.component";
import {MainScreenComponent} from "./layout/main-screen/main-screen.component";

const routes: Routes = [
  { path: 'main', component: MainScreenComponent },
  { path: 'details', component: AccommodationDetailsScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
