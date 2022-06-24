import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProgramFilterComponent } from './academic-program-filter.component';

describe('AcademicProgramFilterComponent', () => {
  let component: AcademicProgramFilterComponent;
  let fixture: ComponentFixture<AcademicProgramFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicProgramFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicProgramFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
