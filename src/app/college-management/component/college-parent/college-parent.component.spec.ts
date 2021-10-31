import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollegeParentComponent} from './college-parent.component';

describe('CollegeParentComponent', () => {
  let component: CollegeParentComponent;
  let fixture: ComponentFixture<CollegeParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollegeParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
