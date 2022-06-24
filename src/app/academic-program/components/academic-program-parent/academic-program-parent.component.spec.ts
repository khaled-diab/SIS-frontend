import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProgramParentComponent } from './academic-program-parent.component';

describe('AcademicProgramParentComponent', () => {
  let component: AcademicProgramParentComponent;
  let fixture: ComponentFixture<AcademicProgramParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicProgramParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicProgramParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
