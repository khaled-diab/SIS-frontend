import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewClassroomComponent} from './view-classroom.component';

describe('CreateClassroomComponent', () => {
  let component: ViewClassroomComponent;
  let fixture: ComponentFixture<ViewClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClassroomComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
