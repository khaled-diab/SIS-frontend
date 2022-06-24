import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceComponent } from './add-attendance.component';

describe('AddAttendanceComponent', () => {
  let component: AddAttendanceComponent;
  let fixture: ComponentFixture<AddAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
