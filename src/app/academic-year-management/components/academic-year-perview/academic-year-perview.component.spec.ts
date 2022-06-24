import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearPerviewComponent } from './academic-year-perview.component';

describe('AcademicYearPerviewComponent', () => {
  let component: AcademicYearPerviewComponent;
  let fixture: ComponentFixture<AcademicYearPerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicYearPerviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearPerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
