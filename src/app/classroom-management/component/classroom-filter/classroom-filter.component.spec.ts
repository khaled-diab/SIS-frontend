import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassroomFilterComponent} from './classroom-filter.component';

describe('ClassroomFilterComponent', () => {
  let component: ClassroomFilterComponent;
  let fixture: ComponentFixture<ClassroomFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
