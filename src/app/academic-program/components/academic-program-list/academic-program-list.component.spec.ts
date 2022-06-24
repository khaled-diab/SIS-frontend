import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProgramListComponent } from './academic-program-list.component';

describe('AcademicProgramListComponent', () => {
  let component: AcademicProgramListComponent;
  let fixture: ComponentFixture<AcademicProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicProgramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
