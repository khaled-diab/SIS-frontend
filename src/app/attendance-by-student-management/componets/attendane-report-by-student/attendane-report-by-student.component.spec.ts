import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneReportByStudentComponent } from './attendane-report-by-student.component';

describe('AttendaneReportByStudentComponent', () => {
  let component: AttendaneReportByStudentComponent;
  let fixture: ComponentFixture<AttendaneReportByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneReportByStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneReportByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
