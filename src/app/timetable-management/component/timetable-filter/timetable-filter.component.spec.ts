import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TimetableFilterComponent} from './timetable-filter.component';

describe('TimetableFilterComponent', () => {
  let component: TimetableFilterComponent;
  let fixture: ComponentFixture<TimetableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimetableFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
