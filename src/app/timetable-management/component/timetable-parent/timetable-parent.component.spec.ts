import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableParentComponent } from './timetable-parent.component';

describe('TimetableParentComponent', () => {
  let component: TimetableParentComponent;
  let fixture: ComponentFixture<TimetableParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimetableParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
