import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicTermListComponent } from './academic-term-list.component';

describe('AcademicTermListComponent', () => {
  let component: AcademicTermListComponent;
  let fixture: ComponentFixture<AcademicTermListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicTermListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicTermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
