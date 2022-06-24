import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuildingParentComponent} from './building-parent.component';

describe('BuildingParentComponent', () => {
  let component: BuildingParentComponent;
  let fixture: ComponentFixture<BuildingParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildingParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
