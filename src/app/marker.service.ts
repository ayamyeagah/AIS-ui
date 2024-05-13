import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // API from backend service
  capitals: string = 'http://localhost:3000/api/live'

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }
  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get<any[]>(this.capitals).subscribe((res: any[]) => {
      for (const c of res) {
        const lon = c.lon;
        const lat = c.lat;
        const circle = L.circleMarker([lat, lon], { radius: 7} );

        circle.bindPopup(this.popupService.makeCapitalPopup(c))

        circle.addTo(map);
      }
    })
  }
}
