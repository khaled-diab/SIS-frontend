import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTermFilterComponent } from './academic-term-filter.component';

describe('AcademicTermFilterComponent', () => {
  let component: AcademicTermFilterComponent;
  let fixture: ComponentFixture<AcademicTermFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicTermFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicTermFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
