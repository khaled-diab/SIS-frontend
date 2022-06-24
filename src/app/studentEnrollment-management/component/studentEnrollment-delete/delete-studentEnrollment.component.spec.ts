import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DeleteStudentEnrollmentComponent} from './delete-studentEnrollment.component';

describe('DeleteStudentEnrollmentComponent', () => {
  let component: DeleteStudentEnrollmentComponent;
  let fixture: ComponentFixture<DeleteStudentEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteStudentEnrollmentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStudentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
