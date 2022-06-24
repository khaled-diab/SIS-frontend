import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAcademicProgramComponent } from './delete-academic-program.component';

describe('DeleteAcademicProgramComponent', () => {
  let component: DeleteAcademicProgramComponent;
  let fixture: ComponentFixture<DeleteAcademicProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAcademicProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
