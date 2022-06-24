import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentModalComponent } from './delete-student-modal.component';

describe('DeleteStudentModalComponent', () => {
  let component: DeleteStudentModalComponent;
  let fixture: ComponentFixture<DeleteStudentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStudentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
