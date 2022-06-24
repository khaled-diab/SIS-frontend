import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaneDetailsByLectureComponent } from './attendane-details-by-lecture.component';

describe('AttendaneDetailsByLectureComponent', () => {
  let component: AttendaneDetailsByLectureComponent;
  let fixture: ComponentFixture<AttendaneDetailsByLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendaneDetailsByLectureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaneDetailsByLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
