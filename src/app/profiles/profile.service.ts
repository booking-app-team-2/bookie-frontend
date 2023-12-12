import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
import {UserDTO} from "./profile/model/profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userControllerRoute: string = environment.apiHost + 'users';

  constructor(private httpClient: HttpClient) { }
  get(id: number): Observable<UserDTO> {
    return this.httpClient.get<UserDTO>(this.userControllerRoute + '/' + id);
  }

  // TODO: Edit return type once known
  remove(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(this.userControllerRoute + '/' + id);
  }
}
