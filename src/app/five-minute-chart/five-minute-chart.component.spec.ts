import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveMinuteChartComponent } from './five-minute-chart.component';

describe('FiveMinuteChartComponent', () => {
  let component: FiveMinuteChartComponent;
  let fixture: ComponentFixture<FiveMinuteChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveMinuteChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveMinuteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
