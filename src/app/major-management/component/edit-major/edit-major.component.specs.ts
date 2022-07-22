import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditMajorComponent} from './edit-major.component';

describe('EditMajorModelComponent', () => {
   let component: EditMajorComponent;
   let fixture: ComponentFixture<EditMajorComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [EditMajorComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(EditMajorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
