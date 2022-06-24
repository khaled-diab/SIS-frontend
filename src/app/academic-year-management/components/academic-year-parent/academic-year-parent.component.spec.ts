import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearParentComponent } from './academic-year-parent.component';

describe('AcademicYearParentComponent', () => {
  let component: AcademicYearParentComponent;
  let fixture: ComponentFixture<AcademicYearParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicYearParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicYearParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
