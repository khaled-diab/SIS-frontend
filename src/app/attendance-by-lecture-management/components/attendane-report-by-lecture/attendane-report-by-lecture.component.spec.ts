import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneReportByLectureComponent } from './attendane-report-by-lecture.component';

describe('AttendaneReportByLectureComponent', () => {
  let component: AttendaneReportByLectureComponent;
  let fixture: ComponentFixture<AttendaneReportByLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneReportByLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneReportByLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
