import { Injectable } from '@angular/core';
import {AccommodationService} from "../layout/accommodation.service";
import {Observable, Observer} from "rxjs";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  constructor(private accommodationService:AccommodationService,private http:HttpClient) { }

  loadImage(id: number): Observable<string | null> {
    if (typeof window !== 'undefined') {
      return new Observable((observer: Observer<string | null>) => {
        this.accommodationService.loadImage(id).subscribe(
          (imageBlob: Blob) => {
            const reader = new window.FileReader();
            reader.onloadend = () => {
              observer.next(reader.result as string);
              observer.complete();
            };
            reader.readAsDataURL(imageBlob);
          },
          (error) => {
            console.error('Error loading image:', error);
            observer.next(null);
            observer.complete();
          }
        );
      });
    }

    return Observable.create(null); // Return an empty Observable if window is not defined
  }
  uploadImageToAccommodation(image:File,id:number):Observable<any>{
    const formData=new FormData();
    formData.append('image',image);
    return this.http.post<any>(environment.apiHost+"images/"+id.toString(),formData);

  }
  deleteImage(id:number):Observable<any>{
    return this.http.delete<any>(environment.apiHost+"images/"+id.toString());
  }
}
