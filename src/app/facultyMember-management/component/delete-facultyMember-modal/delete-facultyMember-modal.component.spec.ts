import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteFacultyMemberModalComponent} from './delete-facultyMember-modal.component';

describe('DeleteFacultyMemberModalComponent', () => {
  let component: DeleteFacultyMemberModalComponent;
  let fixture: ComponentFixture<DeleteFacultyMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFacultyMemberModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFacultyMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
