import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearFilterComponent } from './academic-year-filter.component';

describe('AcademicYearFilterComponent', () => {
  let component: AcademicYearFilterComponent;
  let fixture: ComponentFixture<AcademicYearFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicYearFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
