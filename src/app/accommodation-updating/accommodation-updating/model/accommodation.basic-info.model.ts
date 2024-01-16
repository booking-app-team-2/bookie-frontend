export interface AccommodationBasicInfoDTO{
  id:number;
  name:string;
  description:string;
  minimumGuests:number;
  maximumGuests:number;
  location: {
    latitude: number;
    longitude: number;
  };
  amenities:string[];
  images:{
    id:number;
    path:string;
    name:string;
    type:string;
    isDeleted:boolean;
  }[];
  type:string;
  reservationAutoAccepted:boolean;
  availabilityPeriods:{
    id:number;
    price:number;
    period:{
      startTimestamp:number;
      endTimestamp:number;
    }
    deleted:boolean;
  }[];
}
