// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PopupService {

//   constructor() { }

//   makeCapitalPopup(data: any): string {
//     return `` +
//       `<div>MMSI: ${data._id}</div>` +
//       `<div>Name: ${data.name}</div>` +
//       `<div>Type: ${data.type}</div>` +
//       `<div>Lat: ${data.lat}</div>` +
//       `<div>Lon: ${data.lon}</div>`
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  private getTypeName(type: number): string {
    if (type >= 20 && type <= 29) return 'WIG';
    if (type == 30) return 'Fishing';
    if (type >= 31 && type <= 32) return 'Towing';
    if (type == 33) return 'Dredging';
    if (type == 35) return 'Military';
    if (type == 36) return 'Sailing';
    if (type == 37) return 'Pleasure Craft';
    if (type >= 40 && type <= 49) return 'HSC';
    if (type == 50) return 'Pilot';
    if (type == 51) return 'Search and Rescue';
    if (type == 52) return 'Tug';
    if (type == 53) return 'Port Tender';
    if (type >= 56 && type <= 57) return 'Spare';
    if (type >= 60 && type <= 69) return 'Passenger';
    if (type >= 70 && type <= 79) return 'Cargo';
    if (type >= 80 && type <= 89) return 'Tanker';
    return 'Unknown'; // Default for any other type
  }

  // makeCapitalPopup(data: any): string {
  //   const typeName = this.getTypeName(data.static.typeAndCargo);
  //   return `
  //     <div class="popup-content">
  //       <div><strong>${data.static.name}</strong></div>
  //       <div>Type: ${typeName}</div>
  //       <div>${data.dynamic.lat}, ${data.dynamic.lon}</div>
  //     </div>
  //   `;
  // }

  makeCapitalPopup(data: any): string {
    const typeName = this.getTypeName(data.type);
    return `
      <div class="popup-content">
        <div><strong>${data.name}</strong></div>
        <div>Type: ${typeName}</div>
        <div>${data.lat}, ${data.lon}</div>
        <div>Position Received: <strong>${data.lastReceived}</strong></div>
      </div>
    `;
  }
}


