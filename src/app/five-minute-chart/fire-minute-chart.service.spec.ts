import { TestBed } from '@angular/core/testing';

import { FireMinuteChartService } from './fire-minute-chart.service';

describe('FireMinuteChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireMinuteChartService = TestBed.get(FireMinuteChartService);
    expect(service).toBeTruthy();
  });
});
