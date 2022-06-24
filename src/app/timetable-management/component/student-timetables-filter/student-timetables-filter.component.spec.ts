import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTimetablesFilterComponent} from './student-timetables-filter.component';

describe('StudentTimetablesFilterComponent', () => {
  let component: StudentTimetablesFilterComponent;
  let fixture: ComponentFixture<StudentTimetablesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTimetablesFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimetablesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
