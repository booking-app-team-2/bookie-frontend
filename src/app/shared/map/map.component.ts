import {Component, AfterViewInit, Input} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Input() newCenter: [number, number]=[0,0];

  constructor() {}

  private initMap(): void {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        this.map = L.map('map', {
          center:this.newCenter,
          zoom: 13,
        });

        const tiles = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            minZoom: 3,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        );
        tiles.addTo(this.map);
      });
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
