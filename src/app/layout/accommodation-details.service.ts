import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationDTO} from "./accommodation-card/model/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {

  accommodationControllerRoute: string= environment.apiHost + '/accommodations';
  constructor(private httpClient: HttpClient) { }
  get(id:string): Observable<AccommodationDTO>{
    return this.httpClient.get<AccommodationDTO>(this.accommodationControllerRoute+'/'+id);
  }
}
