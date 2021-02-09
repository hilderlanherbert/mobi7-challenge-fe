import { TestBed } from '@angular/core/testing';

import { PointInterestService } from './point-interest.service';

describe('PointInterestService', () => {
  let service: PointInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
