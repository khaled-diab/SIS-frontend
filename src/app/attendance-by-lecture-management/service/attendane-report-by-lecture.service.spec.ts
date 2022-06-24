import { TestBed } from '@angular/core/testing';

import { AttendaneReportByLectureService } from './attendane-report-by-lecture.service';

describe('AttendaneReportByLectureService', () => {
  let service: AttendaneReportByLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendaneReportByLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
