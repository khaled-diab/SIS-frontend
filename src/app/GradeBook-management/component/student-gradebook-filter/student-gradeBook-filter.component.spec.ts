import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
   FacultyMemberGradeBookFilterComponent
} from './student-gradeBook-filter.component';

describe('FacultyMemberGradeBookFilterComponent', () => {
   let component: FacultyMemberGradeBookFilterComponent;
   let fixture: ComponentFixture<FacultyMemberGradeBookFilterComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [FacultyMemberGradeBookFilterComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(FacultyMemberGradeBookFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
