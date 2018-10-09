import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from '../../../node_modules/rxjs/operators';
import { Temp } from '../shared/temp';

@Injectable({
  providedIn: 'root'
})
export class FireMinuteChartService {

  constructor(private http: HttpClient) { }

  getTemp5Min() {
    return this.http.get('fiveMinute');
  }
}
