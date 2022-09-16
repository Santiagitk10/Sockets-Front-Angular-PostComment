import { TestBed } from '@angular/core/testing';

import { AuthprotectService } from './authprotect.service';

describe('AuthprotectService', () => {
  let service: AuthprotectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthprotectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
