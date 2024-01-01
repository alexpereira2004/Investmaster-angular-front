import { TestBed } from '@angular/core/testing';

import { DividendoService } from './dividendo.service';

describe('DividendoService', () => {
  let service: DividendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DividendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
