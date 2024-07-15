import { Injectable } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

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

  makeCapitalPopup(data: any): string {
    const typeName = this.getTypeName(data.type);

    const lat = parseFloat(data.location.coordinates[1]).toFixed(5);
    const lon = parseFloat(data.location.coordinates[0]).toFixed(5);

    const updatedAt = new Date(data.updatedAt.$date);
    const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

    return `
      <div class="popup-content">
        <div><strong>${data.name} | ${typeName}</strong></div>
        <div>${lat}, ${lon}</div>
        <div>Received: <strong>${timeAgo}</strong></div>
      </div>
    `;
  }
}


