import { Injectable } from '@angular/core';
import {environment} from "../../env/env";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {NotificationDTO} from "./notifications-screen/model/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  NotificationControllerRoute: string = environment.apiHost + 'notifications';

  constructor(private  httpClient: HttpClient) { }

  getNotifications(id:number):Observable<NotificationDTO[]>{
    return this.httpClient.get<NotificationDTO[]>(this.NotificationControllerRoute+"/"+id.toString()).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      }));
  }
}
