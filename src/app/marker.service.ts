import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-rotatedmarker';
import 'leaflet.heat';
import { PopupService } from './popup.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private markersLayer = L.layerGroup();
  private markersMap = new Map<number, L.Marker | L.CircleMarker>();
  private heatmapLayer!: L.HeatLayer;
  private heatmapEnabled: boolean = false;
  private heatmapData: [number, number, number][] = [];
  private map!: L.Map;

  constructor(
    private popupService: PopupService,
    private socketService: SocketService
  ) {
    this.listenToSocketEvents();
  }

  private getMarkerColor(type: number): string {
    if (type >= 20 && type <= 29) return '#9ACD32'; // WIG
    if (type == 30) return '#FF8D1A'; // Fishing
    if (type >= 31 && type <= 32) return '#9370DB'; // Towing
    if (type == 33) return '#00008B'; // Dredging
    if (type == 35) return '#1E90FF'; // Military
    if (type == 36) return '#FFD700'; // Sailing
    if (type == 37) return '#FF5733'; // Pleasure Craft
    if (type >= 40 && type <= 49) return '#4B0082'; // HSC
    if (type == 50) return '#8B0000'; // Pilot
    if (type == 51) return '#8B4513'; // Search and Rescue
    if (type == 52) return '#FFA500'; // Tug
    if (type == 53) return '#40E0D0'; // Port Tender
    if (type >= 56 && type <= 57) return '#D2691E'; // Spare
    if (type >= 60 && type <= 69) return '#32CD32'; // Passenger
    if (type >= 70 && type <= 79) return '#FFCA48'; // Cargo
    if (type >= 80 && type <= 89) return '#B90E0A'; // Tanker
    return '#A9A9A9'; // Unknown
  }

  private createShipMarker(lat: number, lon: number, heading: number, color: string): L.Marker {
    const svgIcon = L.divIcon({
      html: `<svg width="40" height="40" viewBox="0 0 40 40" fill="${color}" xmlns="http://www.w3.org/2000/svg">
               <path d="M 8 3 L 11 0 L 14 3 L 15 14 L 11 10 L 7 14 L 8 3 0Z" stroke="#808080" stroke-width="0.4" />
             </svg>`,
      className: 'ship-icon',
      iconSize: [60, 60],
      iconAnchor: [20, 20]
    });

    const marker = L.marker([lat, lon], { icon: svgIcon });
    (marker as any).setRotationAngle(heading);
    return marker;
  }

  private createCircleMarker(lat: number, lon: number, color: string): L.CircleMarker {
    return L.circleMarker([lat, lon], {
      radius: 5,
      color: 'grey',
      weight: 0.5,
      fillColor: color,
      fillOpacity: 0.8
    });
  }

  makeCapitalCircleMarkers(map: L.Map): void {
    this.map = map;
    this.markersLayer.addTo(map);
    this.heatmapLayer = L.heatLayer(this.heatmapData, {
      radius: 15,
      gradient: { 0.5: 'blue', 0.65: 'lime', 1: 'red' },
      blur: 15,
      maxZoom: 8
    })
  }

  private updateMarker(data: any): void {
    const mmsi = data.mmsi;
    const lon = data.dynamic?.lon || data.location?.coordinates[0] || null;
    const lat = data.dynamic?.lat || data.location?.coordinates[1] || null;
    const heading = data.dynamic?.heading || null;

    if (lon === null || lat === null) {
      return;
    }

    const markerColor = this.getMarkerColor(data.type);

    let marker: L.Marker | L.CircleMarker;

    if (heading !== null && heading !== undefined && heading >= 0 && heading <= 360) {
      marker = this.createShipMarker(lat, lon, heading, markerColor);
    } else {
      marker = this.createCircleMarker(lat, lon, markerColor);
    }

    if (this.markersMap.has(mmsi)) {
      const existingMarker = this.markersMap.get(mmsi);
      if (existingMarker instanceof L.Marker) {
        existingMarker.setLatLng([lat, lon]);
        if (heading !== null) {
          (existingMarker as any).setRotationAngle(heading);
        }
      } else if (existingMarker instanceof L.CircleMarker) {
        existingMarker.setLatLng([lat, lon]);
      }
    } else {
      marker.bindPopup(this.popupService.makeCapitalPopup(data));
      this.markersLayer.addLayer(marker);
      this.markersMap.set(mmsi, marker);
    }

    this.heatmapData.push([lat, lon, 1]);

    if (this.heatmapEnabled) {
      this.heatmapLayer.setLatLngs(this.heatmapData);
    }
  }

  toggleHeatmap(): void {
    this.heatmapEnabled = !this.heatmapEnabled;
    if (this.heatmapEnabled) {
      this.heatmapLayer.addTo(this.map);
      this.heatmapLayer.setLatLngs(this.heatmapData);
    } else {
      this.map.removeLayer(this.heatmapLayer);
    }
  }

  private listenToSocketEvents(): void {
    this.socketService.onEvent('INSERT_RECENTS', (data) => {
      this.updateMarker(data);
    });

    this.socketService.onEvent('UPDATE_RECENTS', (data) => {
      this.updateMarker(data);
    });
  }
}