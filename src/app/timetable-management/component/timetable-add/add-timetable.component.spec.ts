import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTimetableComponent} from './add-timetable.component';

describe('AddTimetableComponent', () => {
  let component: AddTimetableComponent;
  let fixture: ComponentFixture<AddTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimetableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
