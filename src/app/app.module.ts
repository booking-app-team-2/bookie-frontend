import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import {FormsModule} from "@angular/forms";
import { ProfilesModule } from "./profiles/profiles.module";
import {LoginRegisterModule} from "./login-register/login-register.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AccommodationUpdatingModule} from "./accommodation-updating/accommodation-updating.module";
import {OwnerAccommodationsModule} from "./owner-accommodations/owner-accommodations.module";
import {TokenInterceptor} from "./shared/interceptor/token-interceptor";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ProfilesModule,
    LoginRegisterModule,
    AccommodationUpdatingModule,
    HttpClientModule,
    OwnerAccommodationsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
