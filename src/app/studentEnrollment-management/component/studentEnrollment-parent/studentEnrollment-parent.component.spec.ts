import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentEnrollmentParentComponent} from './studentEnrollment-parent.component';

describe('StudentParentComponent', () => {
  let component: StudentEnrollmentParentComponent;
  let fixture: ComponentFixture<StudentEnrollmentParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentEnrollmentParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollmentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
