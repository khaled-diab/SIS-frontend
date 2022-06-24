import { TestBed } from '@angular/core/testing';

import { AcademicProgramService } from './academic-program.service';

describe('AcademicProgramService', () => {
  let service: AcademicProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
