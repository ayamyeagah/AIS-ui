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
  private lastClickedMarker: L.CircleMarker | null = null;

  constructor(
    private http: HttpClient,
    private popupService: PopupService
  ) { }

  // Function to get marker color based on type range
  private getMarkerColor(type: number): string {
    if (type >= 20 && type <= 29) return '#9ACD32'; // WIG (Wing In Ground effect)
    if (type == 30) return '#FF8D1A'; // Fishing
    if (type >= 31 && type <= 32) return '#9370DB'; // Towing
    if (type == 33) return '#00008B'; // Dredging
    if (type == 35) return '#1E90FF'; // Military
    if (type == 36) return '#FFD700'; // Sailing
    if (type == 37) return '#FF5733'; // Pleasure Craft
    if (type >= 40 && type <= 49) return '#4B0082'; // HSC (High-Speed Craft)
    if (type == 50) return '#8B0000'; // Pilot
    if (type == 51) return '#8B4513'; // Search and Rescue
    if (type == 52) return '#FFA500'; // Tug
    if (type == 53) return '#40E0D0'; // Port Tender
    if (type >= 56 && type <= 57) return '#D2691E'; // Spare
    if (type >= 60 && type <= 69) return '#32CD32'; // Passenger
    if (type >= 70 && type <= 79) return '#FFCA48'; // Cargo
    if (type >= 80 && type <= 89) return '#B90E0A'; // Tanker
    return '#A9A9A9'; // Unknown type (default)
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

        // Add click event to change marker style
        marker.on('click', () => {
          if (this.lastClickedMarker) {
            this.lastClickedMarker.setStyle({ weight: 1 }); // Reset the style of the last clicked marker
          }
          marker.setStyle({ weight: 3, color: 'black' }); // Highlight the clicked marker
          this.lastClickedMarker = marker; // Store the clicked marker
        });

        this.markersLayer.addLayer(marker);
      }
    }
  }
}
