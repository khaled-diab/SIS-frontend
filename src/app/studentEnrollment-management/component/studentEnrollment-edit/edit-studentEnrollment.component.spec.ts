import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditStudentEnrollmentComponent} from './edit-studentEnrollment.component';

describe('EditStudentEnrollmentComponent', () => {
  let component: EditStudentEnrollmentComponent;
  let fixture: ComponentFixture<EditStudentEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStudentEnrollmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
