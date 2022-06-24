import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentParentComponent } from './department-parent.component';

describe('DepartmentParentComponent', () => {
  let component: DepartmentParentComponent;
  let fixture: ComponentFixture<DepartmentParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
