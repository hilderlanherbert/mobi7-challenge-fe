import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PositionModel } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class vehiclesService {

  URL_API: string = 'http://backend.mobi7-challenge.io:8080'

  constructor(
    private http: HttpClient,
  ) { }

 public getPlates(): Observable<Array<string>> {
  return this.http.get<Array<string>>(`${this.URL_API}/posicao/placas`)
 }

 public getPosition(plate?: string, date?: Date): Observable<Array<PositionModel>> {
  let parameter = plate && date ? `?placa=${ plate }&data=${ date }` : plate ? `?placa=${ plate }` : date ? `?data=${ date }` : `` ;
  return this.http.get<Array<PositionModel>>(`${this.URL_API}/posicao${ parameter }`);
 }
}