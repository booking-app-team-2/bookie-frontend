import { Injectable } from '@angular/core';
import {environment} from "../../../env/env";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AccommodationReviewDTO} from "./model/accommodation-review.model";
import {OwnerReviewDTO} from "./model/owner-review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  OwnerReviewControllerRoute: string= environment.apiHost + 'owner-reviews';
  AccommodationReviewControllerRoute: string= environment.apiHost + 'accommodation-reviews';
  constructor(private httpClient: HttpClient) { }

  getAccommodationReviews(id:number):Observable<AccommodationReviewDTO[]>{
    return this.httpClient.get<AccommodationReviewDTO[]>(this.AccommodationReviewControllerRoute+"/"+id.toString()).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getReportedAccommodationReviews():Observable<AccommodationReviewDTO[]>{
    return this.httpClient.get<AccommodationReviewDTO[]>(this.AccommodationReviewControllerRoute+"/reported").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getUnapprovedAccommodationReviews():Observable<AccommodationReviewDTO[]>{
    return this.httpClient.get<AccommodationReviewDTO[]>(this.AccommodationReviewControllerRoute+"/unapproved").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getAccommodationAverageGrade(id:number):Observable<number>{
    return this.httpClient.get<number>(this.AccommodationReviewControllerRoute+"/"+id.toString()+"/grade").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getOwnerReviews(id:number):Observable<OwnerReviewDTO[]>{
    return this.httpClient.get<OwnerReviewDTO[]>(this.OwnerReviewControllerRoute+"/"+id.toString()).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getReportedOwnerReviews():Observable<OwnerReviewDTO[]>{
    return this.httpClient.get<OwnerReviewDTO[]>(this.OwnerReviewControllerRoute+"/reported").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getUnapprovedOwnerReviews():Observable<OwnerReviewDTO[]>{
    return this.httpClient.get<OwnerReviewDTO[]>(this.OwnerReviewControllerRoute+"/unapproved").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  getOwnerAverageGrade(id:number):Observable<number>{
    return this.httpClient.get<number>(this.OwnerReviewControllerRoute+"/"+id.toString()+"/grade").pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  postAccommodationReview(accommodationReview:AccommodationReviewDTO):Observable<any>{
    return this.httpClient.post<any>(this.AccommodationReviewControllerRoute,accommodationReview).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  postOwnerReview(ownerReview:OwnerReviewDTO):Observable<any>{
    return this.httpClient.post<any>(this.OwnerReviewControllerRoute,ownerReview).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }

  reportAccommodationReview(id:number):Observable<any>{
    return this.httpClient.put<any>(this.AccommodationReviewControllerRoute+"/"+id.toString(),{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  reportOwnerReview(id:number):Observable<any>{
    return this.httpClient.put<any>(this.OwnerReviewControllerRoute+"/"+id.toString(),{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  approveAccommodationReview(id:number):Observable<any>{
    return this.httpClient.put<any>(this.AccommodationReviewControllerRoute+"/unapproved/"+id.toString(),{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  approveOwnerReview(id:number):Observable<any>{
    return this.httpClient.put<any>(this.OwnerReviewControllerRoute+"/unapproved/"+id.toString(),{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
  deleteAccommodationReview(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.AccommodationReviewControllerRoute+"/"+id.toString()).pipe(
      catchError((error : HttpErrorResponse)=>{
        return throwError(error.error.message);
    }));
  }
  deleteReportedAccommodationReview(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.AccommodationReviewControllerRoute+"/reported/"+id.toString()).pipe(
      catchError((error : HttpErrorResponse)=>{
        return throwError(error.error.message);
      }));
  }
  deleteOwnerReview(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.OwnerReviewControllerRoute+"/"+id.toString()).pipe(
      catchError((error : HttpErrorResponse)=>{
        return throwError(error.error.message);
      }));
  }
  deleteReportedOwnerReview(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.OwnerReviewControllerRoute+"/reported/"+id.toString()).pipe(
      catchError((error : HttpErrorResponse)=>{
        return throwError(error.error.message);
      }));
  }
}
