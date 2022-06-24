import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewFacultyMemberComponent} from './preview-facultyMember.component';

describe('PreviewFacultyMemberComponent', () => {
  let component: PreviewFacultyMemberComponent;
  let fixture: ComponentFixture<PreviewFacultyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewFacultyMemberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFacultyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
