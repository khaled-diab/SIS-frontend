import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddMajorComponent} from './add-major.component';

describe('AddMajorModelComponent', () => {
   let component: AddMajorComponent;
   let fixture: ComponentFixture<AddMajorComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [AddMajorComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(AddMajorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
