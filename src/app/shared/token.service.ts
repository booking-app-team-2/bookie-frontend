import { Injectable } from '@angular/core';
import {TokenModel} from "../login-register/login/model/token.model";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {TokenData} from "./model/token-data.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private access_token : TokenModel | null;

  setToken(token : TokenModel) {
    typeof window !== 'undefined' ? localStorage.setItem('jwt', token.jwt) : null;
  }

  removeToken() : void {
    typeof window !== 'undefined' ? localStorage.removeItem('jwt') : null;
  }

  tokenIsPresent() : boolean | null {
    return typeof window !== 'undefined' ? localStorage.getItem('jwt') != null : null;
  }

  getToken() : string | null {
    let token : string | null = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    return token;
  }

  getTokenData() : TokenData | null {
    let token : string | null = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if(token != null) {
      return jwtDecode(token);
    } else return null;
  }

  getIdFromToken() : number | null {
    let token : TokenData | null = this.getTokenData();
    if(token != null) {
      return token.id;
    } else return null;
  }

  getRoleFromToken() : string | null {
    let token : TokenData | null = this.getTokenData();
    if(token != null) {
      return token.role;
    } else return null;
  }

  getNameFromToken() : string | null {
    let token : TokenData | null = this.getTokenData();
    if(token != null) {
      return token.name;
    } else return null;
  }

}
