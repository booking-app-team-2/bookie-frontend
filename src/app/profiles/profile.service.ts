import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {catchError, Observable, retry, throwError} from "rxjs";
import {User} from "./profile/model/user.model";
import {UserBasicInfo} from "./basic-info-dialog/model/user-basic-info.model";
import {UserPassword} from "./password-change-dialog/model/user-password.model";
import {UserTelephone} from "./telephone-dialog/model/user-telephone.model";
import {UserAddress} from "./address-dialog/model/user-address.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userControllerRoute: string = environment.apiHost + 'users';

  constructor(private httpClient: HttpClient) { }
  get(id: number): Observable<User> {
    return this.httpClient.get<User>(this.userControllerRoute + '/' + id);
  }


  putUserBasicInfo(id: number, userBasicInfo: UserBasicInfo): Observable<UserBasicInfo> {
    return this.httpClient.put<UserBasicInfo>(this.userControllerRoute + '/' + id + '/basic-info', userBasicInfo);
  }

  putUserAddress(id: number, userAddress: UserAddress): Observable<UserAddress> {
    return this.httpClient.put<UserAddress>(this.userControllerRoute + '/' + id + '/addressOfResidence', userAddress);
  }

  putUserTelephone(id: number, userTelephone: UserTelephone): Observable<UserTelephone> {
    return this.httpClient.put<UserTelephone>(this.userControllerRoute + '/' + id + '/telephone', userTelephone);
  }

  putUserPassword(id: number, userPassword: UserPassword): Observable<UserPassword> {
    return this.httpClient.put<UserPassword>(this.userControllerRoute + '/' + id + '/password', userPassword);
  }

  remove(id: number): Observable<string> {
    return this.httpClient.delete<string>(this.userControllerRoute + '/' + id);
  }
}
