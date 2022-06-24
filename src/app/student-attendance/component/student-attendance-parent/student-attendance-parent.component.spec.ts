import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceParentComponent } from './student-attendance-parent.component';

describe('StudentAttendanceParentComponent', () => {
  let component: StudentAttendanceParentComponent;
  let fixture: ComponentFixture<StudentAttendanceParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendanceParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
