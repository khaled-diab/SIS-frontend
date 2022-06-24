import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveClassroomComponent} from './save-classroom.component';

describe('CreateClassroomComponent', () => {
  let component: SaveClassroomComponent;
  let fixture: ComponentFixture<SaveClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveClassroomComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
