import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

interface Station {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrl: './station.component.css'
})
export class StationComponent {
  stations: any[] = [];
  areas = {
    surabaya: 4554,
    batam: 5190,
    semarang: 2897
  };

  constructor(private stationService: StationService) { }

  ngOnInit(): void {
    this.stationService.getStationData().subscribe(data => {
      this.stations = [
        { name: 'Surabaya', data: data[0], area: this.areas.surabaya },
        { name: 'Batam', data: data[1], area: this.areas.batam },
        { name: 'Semarang', data: data[2], area: this.areas.semarang }
      ];
    });
  }

  getTotalShips(data: any[]): number {
    return data.length;
  }

  getDensity(data: any[], area: number): number {
    return data.length / area;
  }

  navigateToDetail(stationName: string): void {
    // Implementasi navigasi ke halaman detail jika diperlukan
  }
}
