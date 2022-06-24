import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMemberTimetablesFilterComponent} from './facultyMember-timetables-filter.component';

describe('FacultyMemberTimetablesFilterComponent', () => {
  let component: FacultyMemberTimetablesFilterComponent;
  let fixture: ComponentFixture<FacultyMemberTimetablesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyMemberTimetablesFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMemberTimetablesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
