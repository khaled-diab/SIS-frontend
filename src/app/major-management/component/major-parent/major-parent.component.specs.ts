import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MajorParentComponent} from './major-parent.component';

describe('MajorParentComponent', () => {
   let component: MajorParentComponent;
   let fixture: ComponentFixture<MajorParentComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [MajorParentComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(MajorParentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
