import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMemberTimetablesListComponent} from './facultyMember-timetables-list.component';

describe('FacultyMemberTimetablesListComponent', () => {
  let component: FacultyMemberTimetablesListComponent;
  let fixture: ComponentFixture<FacultyMemberTimetablesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyMemberTimetablesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMemberTimetablesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
