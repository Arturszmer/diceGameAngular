import { TestBed } from '@angular/core/testing';

import { DicesService } from './dices.service';

describe('DicesService', () => {
  let service: DicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
