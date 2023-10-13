import { TestBed } from '@angular/core/testing';

import { MultipleGameCreationService } from './multiple-game-creation.service';

describe('MultipleCreationGameService', () => {
  let service: MultipleGameCreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultipleGameCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
