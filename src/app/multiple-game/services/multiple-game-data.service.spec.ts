import { TestBed } from '@angular/core/testing';

import { MultipleGameDataService } from './multiple-game-data.service';

describe('GameDataService', () => {
  let service: MultipleGameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleGameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
