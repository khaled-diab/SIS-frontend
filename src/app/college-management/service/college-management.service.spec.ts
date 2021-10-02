import {TestBed} from '@angular/core/testing';

import {CollegeManagementService} from './college-management.service';

describe('CollegeManagementService', () => {
  let service: CollegeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
