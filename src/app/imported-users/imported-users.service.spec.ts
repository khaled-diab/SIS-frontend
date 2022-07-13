import { TestBed } from '@angular/core/testing';

import { ImportedUsersService } from './imported-users.service';

describe('ImportedUsersService', () => {
  let service: ImportedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
