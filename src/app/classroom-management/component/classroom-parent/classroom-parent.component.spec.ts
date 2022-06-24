import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassroomParentComponent} from './classroom-parent.component';

describe('ClassroomParentComponent', () => {
  let component: ClassroomParentComponent;
  let fixture: ComponentFixture<ClassroomParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
