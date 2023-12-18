export interface NewUser {
  id : string;
  email : string;
  password : string;
  name : string;
  surname : string;
  addressOfResidence: string;
  role : string;
  isBlocked : boolean;
  isDeleted : boolean;
}
