import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {AccommodationDTO} from "./accommodation-card/model/accommodation.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  accommodationControllerRoute: string= environment.apiHost + 'accommodations';
  constructor(private httpClient: HttpClient) { }
  getSearchedAccommodations(location:string,numberOfGuests:string,startDate:string,endDate:string): Observable<AccommodationDTO[]>{
    const params = {
      location,
      numberOfGuests,
      startDate,
      endDate,
    };
    if(location=="" && numberOfGuests=="" && startDate=="0" && endDate=="0"){
      return this.httpClient.get<AccommodationDTO[]>(this.accommodationControllerRoute+'/search');
    }
    return this.httpClient.get<AccommodationDTO[]>(this.accommodationControllerRoute+'/search',{params});
  }
  getAccommodationDetails(id:string): Observable<AccommodationDTO>{
    return this.httpClient.get<AccommodationDTO>(this.accommodationControllerRoute+'/'+id);
  }

}
