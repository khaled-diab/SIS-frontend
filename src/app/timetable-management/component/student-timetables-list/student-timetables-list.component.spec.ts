import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentTimetablesListComponent} from './student-timetables-list.component';

describe('StudentTimetablesListComponent', () => {
  let component: StudentTimetablesListComponent;
  let fixture: ComponentFixture<StudentTimetablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTimetablesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimetablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
