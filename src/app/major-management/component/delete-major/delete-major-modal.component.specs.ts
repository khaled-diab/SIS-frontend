import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DeleteMajorModalComponent} from './delete-major-modal.component';

describe('DeleteMajorModelComponent', () => {
   let component: DeleteMajorModalComponent;
   let fixture: ComponentFixture<DeleteMajorModalComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [DeleteMajorModalComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(DeleteMajorModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
