import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteTimetableComponent} from './delete-timetable.component';

describe('DeleteTimetableComponent', () => {
  let component: DeleteTimetableComponent;
  let fixture: ComponentFixture<DeleteTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTimetableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
