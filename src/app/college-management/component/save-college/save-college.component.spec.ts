import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveCollegeComponent} from './save-college.component';

describe('CreateCollegeComponent', () => {
  let component: SaveCollegeComponent;
  let fixture: ComponentFixture<SaveCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveCollegeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
