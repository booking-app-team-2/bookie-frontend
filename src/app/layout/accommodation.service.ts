import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {AccommodationDTO} from "./accommodation-card/model/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  accommodationControllerRoute: string= environment.apiHost + '/accommodations/cards';
  constructor(private httpClient: HttpClient) { }
  get(): Observable<AccommodationDTO[]>{
    return this.httpClient.get<AccommodationDTO[]>(this.accommodationControllerRoute);
  }

}
