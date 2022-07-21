import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GradeBookParentComponent} from './gradeBook-parent.component';

describe('GradeBookParentComponent', () => {
   let component: GradeBookParentComponent;
   let fixture: ComponentFixture<GradeBookParentComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [GradeBookParentComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(GradeBookParentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
