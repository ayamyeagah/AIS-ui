import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public navItems: INavData[] = [
    { name: 'Live Map', url: '/', icon: 'icon-map' },
    { name: 'Vessel', url: '/vessel', icon: 'icon-ship' },
    { name: 'Station', url: '/station', icon: 'icon-anchor' },
    { name: 'Traffic', url: '/traffic', icon: 'icon-graph' },
  ];
}
