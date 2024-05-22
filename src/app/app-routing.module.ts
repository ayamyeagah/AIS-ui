import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { VesselComponent } from './vessel/vessel.component';
import { StationComponent } from './station/station.component';
import { TrafficComponent } from './traffic/traffic.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'vessel', component: VesselComponent },
  { path: 'station', component: StationComponent },
  { path: 'traffic', component: TrafficComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
