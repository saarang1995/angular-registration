import { TestBed } from '@angular/core/testing';

import { GeocoderService } from './geocoder-service.service';

describe('GeocoderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocoderService = TestBed.get(GeocoderService);
    expect(service).toBeTruthy();
  });
});
