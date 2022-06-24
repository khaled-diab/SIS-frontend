import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddFacultyMemberComponent} from './add-facultyMember.component';

describe('AddFacultyMemberComponent', () => {
  let component: AddFacultyMemberComponent;
  let fixture: ComponentFixture<AddFacultyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFacultyMemberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFacultyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
