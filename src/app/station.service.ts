import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrls = {
    surabaya: 'http://localhost:3000/api/surabaya',
    batam: 'http://localhost:3000/api/batam',
    semarang: 'http://localhost:3000/api/semarang'
  };

  constructor(private http: HttpClient) { }

  getStationData(): Observable<any[]> {
    const requests = [
      this.http.get(this.apiUrls.surabaya),
      this.http.get(this.apiUrls.batam),
      this.http.get(this.apiUrls.semarang)
    ];

    return forkJoin(requests);
  }
}
