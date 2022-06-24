import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuildingFilterComponent} from './building-filter.component';

describe('BuildingFilterComponent', () => {
  let component: BuildingFilterComponent;
  let fixture: ComponentFixture<BuildingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
