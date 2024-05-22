import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';

import { AlertModule } from '@coreui/angular';
import { SidebarModule } from '@coreui/angular';
import { TableModule, UtilitiesModule } from '@coreui/angular';
import { SpinnerModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VesselComponent } from './vessel/vessel.component';
import { StationComponent } from './station/station.component';
import { TrafficComponent } from './traffic/traffic.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchBoxComponent,
    SidebarComponent,
    VesselComponent,
    StationComponent,
    TrafficComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule,
    SidebarModule,
    TableModule,
    UtilitiesModule,
    SpinnerModule,
    FormsModule
  ],
  providers: [
    MarkerService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
