import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
   selector: 'app-facultyMember-gradeBook-list',
   templateUrl: './facultyMember-gradeBook-list.component.html',
   styleUrls: ['./facultyMember-gradeBook-list.component.css']
})
export class FacultyMemberGradeBookListComponent implements OnInit, OnDestroy {

   course = new CourseModel();
   term: any;
   tableData: StudentModel[];
   displayedColumns = ['No.', 'university_id', 'name_ar', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade'];
   subscriptionList: Subscription[] = [];
   form: FormGroup;

   constructor(private gradeBookManagementService: GradeBookManagementService,
               private courseManagementService: CourseManagementService) {
   }

   ngOnInit(): void {
      this.subscriptionList = this.subscriptions();
      this.form = new FormGroup({
            academicTerm: new FormControl(this.term, Validators.required),
            course: new FormControl(this.course.id, Validators.required),
            finalExamGrade: new FormControl(undefined),
            practicalGrade: new FormControl(undefined),
            oralGrade: new FormControl(undefined),
            midGrade: new FormControl(undefined),
         }
      );
   }

   private subscriptions(): Subscription[] {
      const subscriptions = [];
      subscriptions.push(this.filterEventSubscription());
      return subscriptions;
   }

   private filterEventSubscription(): Subscription {
      this.gradeBookManagementService.gradeBookFilterEvent.subscribe(value => {
         this.term = value.filterAcademicTerm;
      });
      return this.gradeBookManagementService.gradeBookFilterCourseIdEvent.subscribe(value => {
         this.term = value.term;
         this.gradeBookManagementService.getStudentsByCoursesId(value).subscribe(value1 => {
            this.tableData = value1;
            this.courseManagementService.getCourse(value).subscribe(value2 => {
               this.course = value2;
            });
         });
      });
   }

   save(): any{
      // type your code here, please
   }

   ngOnDestroy(): void {
      this.subscriptionList.forEach(sub => sub.unsubscribe());
   }

}
