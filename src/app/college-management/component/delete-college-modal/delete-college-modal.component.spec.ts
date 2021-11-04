import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCollegeModalComponent} from './delete-college-modal.component';

describe('DeleteCollegeModalComponent', () => {
  let component: DeleteCollegeModalComponent;
  let fixture: ComponentFixture<DeleteCollegeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCollegeModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCollegeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
