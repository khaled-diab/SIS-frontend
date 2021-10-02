import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollegeFilterComponent} from './college-filter.component';

describe('CollegeFilterComponent', () => {
  let component: CollegeFilterComponent;
  let fixture: ComponentFixture<CollegeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollegeFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
