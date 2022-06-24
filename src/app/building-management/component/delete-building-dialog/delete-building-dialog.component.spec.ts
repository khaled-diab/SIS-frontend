import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteBuildingDialogComponent} from './delete-building-dialog.component';

describe('DeleteBuildingModalComponent', () => {
  let component: DeleteBuildingDialogComponent;
  let fixture: ComponentFixture<DeleteBuildingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBuildingDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBuildingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
