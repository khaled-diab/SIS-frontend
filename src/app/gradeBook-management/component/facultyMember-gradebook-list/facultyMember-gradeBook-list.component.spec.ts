import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FacultyMemberGradeBookListComponent} from './facultyMember-gradeBook-list.component';

describe('FacultyMemberGradeBookListComponent', () => {
   let component: FacultyMemberGradeBookListComponent;
   let fixture: ComponentFixture<FacultyMemberGradeBookListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [FacultyMemberGradeBookListComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(FacultyMemberGradeBookListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
