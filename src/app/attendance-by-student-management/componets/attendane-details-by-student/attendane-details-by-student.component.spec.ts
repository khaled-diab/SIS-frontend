import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneDetailsByStudentComponent } from './attendane-details-by-student.component';

describe('AttendaneDetailsByStudentComponent', () => {
  let component: AttendaneDetailsByStudentComponent;
  let fixture: ComponentFixture<AttendaneDetailsByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneDetailsByStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneDetailsByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
