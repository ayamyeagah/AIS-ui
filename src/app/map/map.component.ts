import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

const iconRetinaUrl = '../../assets/marker-icon-2x.png';
const iconUrl = '../../assets/marker-icon.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  public isHeatmapOn: boolean = false;

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map);
    this.addHeatmapControl();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-7.181611970939602, 112.71309354738638],
      zoom: 13,
      zoomControl: false
    });

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    // Base Layer
    var baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> </a>'
    });

    // Seamark Layer
    var seamarkLayer = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
    });

    baseLayer.addTo(this.map);
    seamarkLayer.addTo(this.map);
  }

  private addHeatmapControl(): void {
    const heatmapControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },
      onAdd: (map: L.Map) => {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.innerHTML = '<button id="heatmapToggle" style="background-color: white; border: none; cursor: pointer;">Heatmap</button>';
        container.style.backgroundColor = 'white';
        container.style.width = '68px';
        container.style.height = '28px';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        L.DomEvent.on(container, 'click', this.toggleHeatmap, this);
        return container;
      }
    });

    this.map.addControl(new heatmapControl());
  }

  private toggleHeatmap(): void {
    this.isHeatmapOn = !this.isHeatmapOn;
    this.markerService.toggleHeatmap();
    this.updateHeatmapButton();
  }

  private updateHeatmapButton(): void {
    const button = document.getElementById('heatmapToggle');
    if (button) {
      button.style.backgroundColor = this.isHeatmapOn ? '#29333C' : 'white';
      button.style.color = this.isHeatmapOn ? 'white' : 'black';
    }
  }
}
