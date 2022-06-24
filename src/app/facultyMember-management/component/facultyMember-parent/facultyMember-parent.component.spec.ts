import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMemberParentComponent} from './facultyMember-parent.component';

describe('FacultyMemberParentComponent', () => {
  let component: FacultyMemberParentComponent;
  let fixture: ComponentFixture<FacultyMemberParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacultyMemberParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMemberParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
