import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMemberFilterComponent} from './facultyMember-filter.component';

describe('FacultyMemberFilterComponent', () => {
  let component: FacultyMemberFilterComponent;
  let fixture: ComponentFixture<FacultyMemberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyMemberFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMemberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
