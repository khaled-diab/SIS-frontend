import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateFacultyMemberComponent} from './update-facultyMember.component';

describe('UpdateFacultyMemberComponent', () => {
  let component: UpdateFacultyMemberComponent;
  let fixture: ComponentFixture<UpdateFacultyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFacultyMemberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFacultyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
