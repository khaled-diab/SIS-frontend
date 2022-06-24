import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveBuildingComponent} from './save-building.component';

describe('CreateBuildingComponent', () => {
  let component: SaveBuildingComponent;
  let fixture: ComponentFixture<SaveBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveBuildingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
