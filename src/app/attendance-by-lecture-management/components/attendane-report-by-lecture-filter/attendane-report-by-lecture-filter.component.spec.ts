import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneReportByLectureFilterComponent } from './attendane-report-by-lecture-filter.component';

describe('AttendaneReportByLectureFilterComponent', () => {
  let component: AttendaneReportByLectureFilterComponent;
  let fixture: ComponentFixture<AttendaneReportByLectureFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneReportByLectureFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneReportByLectureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
