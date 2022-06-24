import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicProgramPreviewComponent } from './academic-program-preview.component';

describe('AcademicProgramPreviewComponent', () => {
  let component: AcademicProgramPreviewComponent;
  let fixture: ComponentFixture<AcademicProgramPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicProgramPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicProgramPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
