import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CollegesListComponent} from './colleges-list.component';

describe('CollegesListComponent', () => {
  let component: CollegesListComponent;
  let fixture: ComponentFixture<CollegesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollegesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
