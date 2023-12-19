import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../env/env";
import {catchError, Observable, throwError} from "rxjs";
import {AccommodationDTO} from "./accommodation-card/model/accommodation.model";
import {
  AccommodationBasicInfoDTO
} from "../accommodation-updating/accommodation-updating/model/accommodation.basic-info.model";

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
  updateAccommodationBasicInfo(accommodation:AccommodationBasicInfoDTO): Observable<AccommodationBasicInfoDTO>{
    return this.httpClient.put<AccommodationBasicInfoDTO>(this.accommodationControllerRoute+'/'+accommodation.id+"/basic-info",accommodation).pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status === 500) {
          console.error('Internal Server Error:', error);
        }
        return throwError(()=>error);
      })
    );
  }

}
