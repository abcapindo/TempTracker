import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullChartService {

  constructor(private http: HttpClient) { }

  getFullBurn() {
    return this.http.get('update');
  }
}
