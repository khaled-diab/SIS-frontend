import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourseParentComponent} from './course-parent.component';

describe('CourseParentComponent', () => {
  let component: CourseParentComponent;
  let fixture: ComponentFixture<CourseParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
