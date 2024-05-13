import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<div>MMSI: ${ data._id }</div>` +
      `<div>Name: ${ data.name }</div>` +
      `<div>Lat: ${ data.lat }</div>` +
      `<div>Lon: ${ data.lon }</div>`
  }
}
