import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcademicTermComponent } from './view-academic-term.component';

describe('ViewAcademicTermComponent', () => {
  let component: ViewAcademicTermComponent;
  let fixture: ComponentFixture<ViewAcademicTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAcademicTermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcademicTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
