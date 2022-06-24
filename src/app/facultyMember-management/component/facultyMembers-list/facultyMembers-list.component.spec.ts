import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMembersListComponent} from './facultyMembers-list.component';

describe('FacultyMembersListComponent', () => {
  let component: FacultyMembersListComponent;
  let fixture: ComponentFixture<FacultyMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyMembersListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
