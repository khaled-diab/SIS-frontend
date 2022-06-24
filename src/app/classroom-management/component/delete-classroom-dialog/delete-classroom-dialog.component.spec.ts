import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteClassroomDialogComponent} from './delete-classroom-dialog.component';

describe('DeleteClassroomModalComponent', () => {
  let component: DeleteClassroomDialogComponent;
  let fixture: ComponentFixture<DeleteClassroomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteClassroomDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClassroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
