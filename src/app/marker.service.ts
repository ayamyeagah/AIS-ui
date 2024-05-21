import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { debounce } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  // API from backend service
  capitals: string = 'http://localhost:3000/api/live';

  private markersLayer = L.layerGroup();

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }

  // Function to get marker color based on type range
  private getMarkerColor(type: number): string {
    if (type >= 10 && type <= 20) return '#40E0D0'; // Bright Red
    if (type >= 21 && type <= 30) return '#FF8D1A'; // Bright Orange
    if (type >= 31 && type <= 40) return '#9370DB'; // Bright Yellow
    if (type >= 41 && type <= 50) return '#32CD32'; // Bright Green
    if (type >= 51 && type <= 60) return '#1E90FF'; // Bright Blue
    if (type >= 61 && type <= 70) return '#FFD700'; // Medium Purple
    if (type >= 71 && type <= 80) return '#FF5733'; // Turquoise
    if (type >= 81 && type <= 90) return '#3CB371'; // Medium Sea Green
    if (type >= 91 && type <= 100) return '#FF6347'; // Tomato Red
    return '#A9A9A9'; // Dark Gray for any other type
  }

  // Create a circle marker with a black border
  private createCircleMarker(lat: number, lon: number, color: string): L.CircleMarker {
    return L.circleMarker([lat, lon], {
      radius: 7, // Adjust the size of the marker here
      color: 'black', // Border color
      weight: 1,
      fillColor: color,
      fillOpacity: 0.8
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    // Add the markers layer to the map
    this.markersLayer.addTo(map);

    this.http.get<any[]>(this.capitals).subscribe((res: any[]) => {
      // Call the debounced function on map move end and zoom end
      map.on('moveend', debounce(() => this.updateMarkers(map, res), 200));
      map.on('zoomend', debounce(() => this.updateMarkers(map, res), 200));

      // Initial marker update
      this.updateMarkers(map, res);
    });
  }

  // Update markers based on the current map view
  private updateMarkers(map: L.Map, data: any[]): void {
    // Clear existing markers
    this.markersLayer.clearLayers();

    const bounds = map.getBounds();

    for (const c of data) {
      const lon = c.lon;
      const lat = c.lat;

      // Only add markers within the current view bounds
      if (bounds.contains([lat, lon])) {
        const type = c.type;
        const markerColor = this.getMarkerColor(type);
        const marker = this.createCircleMarker(lat, lon, markerColor);

        marker.bindPopup(this.popupService.makeCapitalPopup(c));
        this.markersLayer.addLayer(marker);
      }
    }
  }
}
