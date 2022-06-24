import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFilterComponent } from './department-filter.component';

describe('DepartmentFilterComponent', () => {
  let component: DepartmentFilterComponent;
  let fixture: ComponentFixture<DepartmentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
