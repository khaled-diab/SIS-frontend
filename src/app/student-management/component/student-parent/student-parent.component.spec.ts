import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParentComponent } from './student-parent.component';

describe('StudentParentComponent', () => {
  let component: StudentParentComponent;
  let fixture: ComponentFixture<StudentParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
