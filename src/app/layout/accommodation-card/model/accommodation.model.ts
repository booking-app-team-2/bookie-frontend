export interface AccommodationDTO{
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
  availabilityPeriods:{
    id:number;
    price:number;
    period:{
      startDate:number;
      endDate:number;
    }
    deleted:boolean;
  }[];
  images:{
    id:number;
    path:string;
    name:string;
    type:string;
    isDeleted:boolean;
  }[];
  reservationCancellationDeadline:string;
  type:string;
  reservationAutoAccepted:boolean;
}
