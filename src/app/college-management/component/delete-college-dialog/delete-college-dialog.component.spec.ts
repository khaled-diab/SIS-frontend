import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteCollegeDialogComponent} from './delete-college-dialog.component';

describe('DeleteBuildingModalComponent', () => {
  let component: DeleteCollegeDialogComponent;
  let fixture: ComponentFixture<DeleteCollegeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCollegeDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCollegeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
