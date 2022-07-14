import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStudentParentComponent } from './report-student-parent.component';

describe('ReportStudentParentComponent', () => {
  let component: ReportStudentParentComponent;
  let fixture: ComponentFixture<ReportStudentParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportStudentParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStudentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
