import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { cilGlobeAlt, cilBoatAlt, cilBuilding, cilChart } from '@coreui/icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  icons = {
    cilGlobeAlt, cilBoatAlt, cilBuilding, cilChart
  };

  public navItems: INavData[] = [
    { name: 'Live Map', url: '/', iconComponent: { name: 'cilGlobeAlt' } },
    { name: 'Vessel', url: '/vessel', iconComponent: { name: 'cilBoatAlt' } },
    { name: 'Station', url: '/station', iconComponent: { name: 'cilBuilding' } }
  ];
}
