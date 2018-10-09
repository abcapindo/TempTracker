import { TestBed } from '@angular/core/testing';

import { FullChartService } from './full-chart.service';

describe('FullChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullChartService = TestBed.get(FullChartService);
    expect(service).toBeTruthy();
  });
});
