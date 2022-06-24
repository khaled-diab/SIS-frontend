import { TestBed } from '@angular/core/testing';

import { AcademicTermService } from './academic-term.service';

describe('AcademicTermService', () => {
  let service: AcademicTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
