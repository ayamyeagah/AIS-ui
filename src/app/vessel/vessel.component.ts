import { Component, OnInit } from '@angular/core';
import { VesselService } from '../vessel.service';

interface Vessel {
  _id: number;
  name: string;
  type: number;
}

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {
  vessels: Vessel[] = [];
  filteredVessels: Vessel[] = [];
  searchQuery: string = '';

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
        result.push(vessel);
      }
    });

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }

  search(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredVessels = this.vessels.filter(vessel =>
      vessel.name.toLowerCase().includes(query) ||
      vessel._id.toString().includes(query)
    );
  }
}
