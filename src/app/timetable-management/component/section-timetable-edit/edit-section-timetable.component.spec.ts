import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditSectionTimetableComponent} from './edit-section-timetable.component';

describe('EditSectionTimetableComponent', () => {
  let component: EditSectionTimetableComponent;
  let fixture: ComponentFixture<EditSectionTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSectionTimetableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSectionTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
