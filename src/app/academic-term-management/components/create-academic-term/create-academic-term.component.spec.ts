import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAcademicTermComponent } from './create-academic-term.component';

describe('CreateAcademicTermComponent', () => {
  let component: CreateAcademicTermComponent;
  let fixture: ComponentFixture<CreateAcademicTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAcademicTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAcademicTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
