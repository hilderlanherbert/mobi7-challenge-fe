import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountTimeTableComponent } from './amount-time-table.component';

describe('AmountTimeTableComponent', () => {
  let component: AmountTimeTableComponent;
  let fixture: ComponentFixture<AmountTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
