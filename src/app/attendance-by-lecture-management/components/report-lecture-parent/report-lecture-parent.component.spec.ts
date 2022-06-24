import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLectureParentComponent } from './report-lecture-parent.component';

describe('ReportLectureParentComponent', () => {
  let component: ReportLectureParentComponent;
  let fixture: ComponentFixture<ReportLectureParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLectureParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLectureParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
