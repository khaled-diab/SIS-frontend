import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAcademicTermComponent } from './delete-academic-term.component';

describe('DeleteAcademicTermComponent', () => {
  let component: DeleteAcademicTermComponent;
  let fixture: ComponentFixture<DeleteAcademicTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAcademicTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAcademicTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
