import { Component, OnInit } from '@angular/core';
import { VesselService } from '../vessel.service';

interface Vessel {
  _id: number;
  name: string;
  type: number;
  typeDescription?: string;
}

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {
  vessels: Vessel[] = [];
  filteredVessels: Vessel[] = [];

  // Define a mapping of type numbers to descriptions
  private typeMapping: { [key: number]: string } = {
    0: 'Unknown',
    30: 'Fishing',
    33: 'Dredging',
    35: 'Military',
    36: 'Sailing',
    37: 'Pleasure Craft',
    50: 'Pilot',
    51: 'Search and Rescue',
    52: 'Tug',
    53: 'Port Tender',
    80: 'Tanker',
    // Ranges
    ...Array.from({ length: 10 }, (_, i) => 20 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'WIG (Wing In Ground effect)' }), {}),
    ...Array.from({ length: 2 }, (_, i) => 31 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'Towing' }), {}),
    ...Array.from({ length: 10 }, (_, i) => 40 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'HSC (High-Speed Craft)' }), {}),
    ...Array.from({ length: 2 }, (_, i) => 56 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'Spare' }), {}),
    ...Array.from({ length: 10 }, (_, i) => 60 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'Passenger' }), {}),
    ...Array.from({ length: 10 }, (_, i) => 70 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'Cargo' }), {}),
    ...Array.from({ length: 10 }, (_, i) => 80 + i).reduce((acc, cur) => ({ ...acc, [cur]: 'Tanker' }), {}),
  };

  constructor(private vesselService: VesselService) { }

  ngOnInit(): void {
    this.vesselService.getVessels().subscribe((data: Vessel[]) => {
      console.log('Fetched data:', data);
      this.filteredVessels = this.filterAndSortVessels(data);
      console.log('Filtered data:', this.filteredVessels);
    }, (error) => {
      console.error('Error fetching vessels', error);
    });
  }

  filterAndSortVessels(data: Vessel[]): Vessel[] {
    const uniqueVessels: { [key: number]: boolean } = {};
    const result: Vessel[] = [];

    data.forEach(vessel => {
      if (!uniqueVessels[vessel._id]) {
        uniqueVessels[vessel._id] = true;
        // Map the type number to the type description
        vessel.typeDescription = this.typeMapping[vessel.type] || 'Other';
        result.push(vessel);
      }
    });

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }
}
