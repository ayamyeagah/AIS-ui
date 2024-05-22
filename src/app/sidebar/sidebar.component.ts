import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public navItems: INavData[] = [
    {
      name: 'Live Map',
      url: '/live',
      icon: 'icon-speedometer',
    },
    {
      name: 'Vessel',
      url: '/vessels',
      icon: 'icon-speedometer',
    },
    {
      name: 'Station',
      url: '/station',
      icon: 'icon-speedometer',
    },
    {
      name: 'Traffic',
      url: '/traffic',
      icon: 'icon-people',
    },
    // Add more items as needed
  ];
}
