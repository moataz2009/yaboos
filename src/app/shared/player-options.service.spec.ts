import { TestBed } from '@angular/core/testing';

import { PlayerOptionsService } from './player-options.service';

describe('PlayerOptionsService', () => {
  let service: PlayerOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
