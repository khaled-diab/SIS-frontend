import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMemberFilterComponent } from './studentEnrollment-filter.component';

describe('StudentFilterComponent', () => {
  let component: FacultyMemberFilterComponent;
  let fixture: ComponentFixture<FacultyMemberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyMemberFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyMemberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
