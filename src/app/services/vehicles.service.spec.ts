import { TestBed } from '@angular/core/testing';

import { vehiclesService } from './vehicles.service';

describe('vehiclesService', () => {
  let service: vehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(vehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
