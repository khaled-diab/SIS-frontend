import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCodeComponent } from './attendance-code.component';

describe('AttendanceCodeComponent', () => {
  let component: AttendanceCodeComponent;
  let fixture: ComponentFixture<AttendanceCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
