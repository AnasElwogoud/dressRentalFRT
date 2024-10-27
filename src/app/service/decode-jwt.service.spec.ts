import { TestBed } from '@angular/core/testing';

import { DecodeJWTService } from './decode-jwt.service';

describe('DecodeJWTService', () => {
  let service: DecodeJWTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecodeJWTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
