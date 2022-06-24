import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionStudentsListComponent} from './section-students-list.component';

describe('StudentsListComponent', () => {
  let component: SectionStudentsListComponent;
  let fixture: ComponentFixture<SectionStudentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionStudentsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
