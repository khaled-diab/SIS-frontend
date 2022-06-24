import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneReportByStudentFilterComponent } from './attendane-report-by-student-filter.component';

describe('AttendaneReportByStudentFilterComponent', () => {
  let component: AttendaneReportByStudentFilterComponent;
  let fixture: ComponentFixture<AttendaneReportByStudentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneReportByStudentFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneReportByStudentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
