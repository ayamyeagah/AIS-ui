import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private apiUrl = 'http://localhost:3000/api/live'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getVessels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

