import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAcademicYearComponent } from './delete-academic-year.component';

describe('DeleteAcademicYearComponent', () => {
  let component: DeleteAcademicYearComponent;
  let fixture: ComponentFixture<DeleteAcademicYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAcademicYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
