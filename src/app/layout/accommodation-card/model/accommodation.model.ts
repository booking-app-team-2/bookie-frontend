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
  reservationCancellationDeadline:string;
  type:string;
}
