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
  amenities:[];
  availabilityPeriods:{
    id:number;
    price:number;
    period:{
      startDate:number;
      endDate:number;
    }
    deleted:boolean;
  }[];
  reservationCancellationDeadline:string;
  type:string;
}
