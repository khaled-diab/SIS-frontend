import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionParentComponent} from './section-parent.component';

describe('SectionParentComponent', () => {
  let component: SectionParentComponent;
  let fixture: ComponentFixture<SectionParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionParentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
