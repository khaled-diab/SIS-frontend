import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentEnrollmentsListComponent} from './studentEnrollments-list.component';

describe('StudentsListComponent', () => {
  let component: StudentEnrollmentsListComponent;
  let fixture: ComponentFixture<StudentEnrollmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentEnrollmentsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrollmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
