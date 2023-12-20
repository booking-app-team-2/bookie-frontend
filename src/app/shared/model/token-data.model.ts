import {JwtPayload} from "jwt-decode";

export interface TokenData extends JwtPayload {
  id : number,
  role : string,
  name : string,
}
