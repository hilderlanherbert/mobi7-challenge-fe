import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PointInterestModel } from '../models/point-interest.model';

@Injectable({
  providedIn: 'root'
})
export class PointInterestService {
  
  URL_API: string = 'http://backend.mobi7-challenge.io:8080'

  constructor(
    private http: HttpClient
  ) { }

  public getPointsInterest(): Observable<Array<PointInterestModel>> {
    return this.http.get<Array<PointInterestModel>>(`${this.URL_API}/pois`);
  }
}





