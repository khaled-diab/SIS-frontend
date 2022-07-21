import {ComponentFixture, TestBed} from '@angular/core/testing';

// @ts-ignore
import {StudentGradeBookListComponent} from './student-gradeBook-list.component';

describe('StudentGradeBookListComponent', () => {
   let component: StudentGradeBookListComponent;
   let fixture: ComponentFixture<StudentGradeBookListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [StudentGradeBookListComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(StudentGradeBookListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
