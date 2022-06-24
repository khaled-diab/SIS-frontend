import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTermParentComponent } from './academic-term-parent.component';

describe('AcademicTermParentComponent', () => {
  let component: AcademicTermParentComponent;
  let fixture: ComponentFixture<AcademicTermParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicTermParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicTermParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
