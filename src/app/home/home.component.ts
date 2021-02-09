import { Component, OnInit } from '@angular/core';

import { PointInterestModel } from '../models/point-interest.model';
import { PositionModel } from '../models/position.model';
import { ConvertDatePipe } from '../pipe/convert-date.pipe';
import { PointInterestService } from '../services/point-interest.service';
import { vehiclesService } from '../services/vehicles.service';

import haversine from 'haversine-distance'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date: Date;
  maxDate: Date;
  plates: Array<string> = [];
  points: Array<PointInterestModel> = [];
  selectedCar: string = "";
  vehiclePerPosition: Array<any> = [];
  positionsMatchTracked: Array<PositionModel> = [];
  trackingList: Array<any> = [];
  dateOfBirth: string;

  constructor(
    private vehicles: vehiclesService,
    private convertData: ConvertDatePipe,
    private pointInterest: PointInterestService,
  ) {
    this.maxDate = new Date(Date.now());
  }

  ngOnInit(): void {
    this.initPlates();
    this.initPointsInterest();
  }

  public search() {
    this.vehiclePerPosition = [];
    this.getVehiclePosition(this.selectedCar || undefined, this.date);
  }

  public filterTracking(plate: string) {
    return this.trackingList.filter(tracking => tracking.plate === plate);
  }

  private initPlates(): void {
    this.vehicles.getPlates().subscribe((data) => {
      this.plates = data;
      this.getVehiclePosition();
    });
  }

  private initPointsInterest(): void {
    this.pointInterest.getPointsInterest().subscribe((data) => {
      this.points = data;
    });
  }

  private getVehiclePosition(plate?: string, date?: Date): void {
    this.trackingList = [];
    this.vehicles.getPosition(plate, this.convertData.transform(date)).subscribe(async (data) => {
      if (plate) {
        this.vehiclePerPosition.push({
          plate: plate,
          positions: data
        })
      } else {
        this.vehiclePerPosition = this.plates.map(plate => ({
          plate: plate,
          positions: data.filter((positions) => {
            return positions.placa == plate;
          })
        }))
      }
      this.getInnerPOI();
    });
  }

  private isMatchPositions(latPosition: number, lonPosition: number, latPOI: number, lonPOI: number, radius: number): boolean {
    let vehiclePositon = { lat: latPosition, lon: lonPosition };
    let POIs = { lat: latPOI, lon: lonPOI }
    let distance = haversine(vehiclePositon, POIs);
    return distance <= radius;
  }

  private getInnerPOI() {
    this.vehiclePerPosition.forEach(vehicles => {
      this.points.forEach(poi => {
        this.positionsMatchTracked = [];
        vehicles.positions.forEach((pos: PositionModel) => {
          if (this.isMatchPositions(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio) && (vehicles.positions.indexOf(pos) + 1) !== vehicles.positions.length) {
            this.positionsMatchTracked.push(pos);
          } else if (this.isMatchPositions(pos.latitude, pos.longitude, poi.latitude, poi.longitude, poi.raio) && (vehicles.positions.indexOf(pos) + 1) === vehicles.positions.length) {
            this.positionsMatchTracked.push(pos);
            this.tracking(pos.placa, poi.nome, this.positionsMatchTracked);
            this.positionsMatchTracked = [];
          } else {
            if (this.positionsMatchTracked.length !== 0) {
              this.tracking(pos.placa, poi.nome, this.positionsMatchTracked);
              this.positionsMatchTracked = [];
            }
          }
        });
      });
    });
  }

  private tracking(plate: string, poiName: string, positions: Array<any>) {
    this.trackingList.push({
      plate: plate,
      poiName: poiName,
      start: positions[0].data,
      end: positions[positions.length - 1].data,
      period: this.periodInnerPOI(positions[0].data, positions[positions.length - 1].data),
      positions: this.positionsMatchTracked,
    });
  }

  private periodInnerPOI(start: Date, end: Date) {
    return this.timeElapsed(start, end);
  }

  private timeElapsed(startDate: Date, endDate: Date) {
    let delta: number = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000;
    return [
      ['days', 24 * 60 * 60],
      ['hours', 60 * 60],
      ['minutes', 60],
      ['seconds', 1]
    ].reduce((acc: any, [key, value]) => (acc[key] = key == 'seconds' ? (Math.floor(delta / Number(value)) >= 1 ? Math.floor(delta / Number(value)) : 1) : Math.floor(delta / Number(value)), delta -= acc[key] * Number(value), acc), {});
  }
}
