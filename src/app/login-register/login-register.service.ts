import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {environment} from "../../env/env";
import {catchError, Observable, retry, throwError} from "rxjs";
import {LoginCredentials} from "./login/model/login-credentials.model";
import {NewUser} from "./register/model/new-user.model";

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  userControllerRoute: string = /*environment.apiHost + */'users';

  constructor(private httpClient: HttpClient) { }
  get(id: number): Observable<LoginCredentials> {
    return this.httpClient.get<LoginCredentials>(this.userControllerRoute + '/' + id);
  }

  postNewUser(id: number, newUser : NewUser): Observable<NewUser> {
    return this.httpClient.post<NewUser>(this.userControllerRoute + '/' + id, newUser);
  }
}
