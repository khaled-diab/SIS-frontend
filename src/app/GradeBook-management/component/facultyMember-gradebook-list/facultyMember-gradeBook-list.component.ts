import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {GradeBookModel} from '../../../shared/model/gradebook-management/gradeBook-model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';


@Component({
   selector: 'app-facultyMember-gradeBook-list',
   templateUrl: './facultyMember-gradeBook-list.component.html',
   styleUrls: ['./facultyMember-gradeBook-list.component.css']
})
export class FacultyMemberGradeBookListComponent implements OnInit, OnDestroy {

   course = new CourseModel();
   courseId: any;
   term: any;
   tableData: StudentModel[];
   gradeBooks: GradeBookModel[] = [];
   displayedColumns = ['No.', 'university_id', 'name_ar', 'finalExamGrade', 'practicalGrade', 'oralGrade', 'midGrade'];
   subscription: Subscription;
   form: FormGroup;
   pageIndex = 0;
   defaultPageSize = 10;
   totalCount = 0;
   @ViewChild('paginator') paginator: MatPaginator;

   constructor(private gradeBookManagementService: GradeBookManagementService,
               private courseManagementService: CourseManagementService,
               private snackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.form = new FormGroup({
            academicTerm: new FormControl(this.term, Validators.required),
            course: new FormControl(this.course.id, Validators.required),
            finalExamGrade: new FormControl(undefined),
            practicalGrade: new FormControl(undefined),
            oralGrade: new FormControl(undefined),
            midGrade: new FormControl(undefined),
         }
      );
      this.subscription = this.gradeBookManagementService.gradeBookFilterCourseIdEvent.subscribe(array => {
         this.term = array[0];
         this.courseId = array[1];
         this.gradeBookManagementService.getStudentsByCoursesId(this.pageIndex, this.defaultPageSize, this.courseId).subscribe(value1 => {
            this.tableData = value1.data;
            this.totalCount = value1.totalCount;
            this.courseManagementService.getCourse(this.courseId).subscribe(course => {
               this.course = course;
            });
         });
      });
   }

   pageChangeEvent(event: PageEvent): void {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      this.gradeBookManagementService.getStudentsByCoursesId(this.paginator
         .pageIndex, this.paginator.pageSize, this.courseId).subscribe(value1 => {
         this.tableData = value1.data;
         this.totalCount = value1.totalCount;
      });
   }

   save(): any {
      this.tableData.forEach(student => {
         const gradeBook = new GradeBookModel();
         gradeBook.academicTermDTO = new AcademicTermModel();
         gradeBook.academicTermDTO.id = this.term;
         gradeBook.courseDTO = new CourseModel();
         gradeBook.courseDTO.id = this.courseId;
         // gradeBook.studentDTO = new StudentModel();
         gradeBook.studentDTO = student;
         gradeBook.finalExamGrade = this.form.get('finalExamGrade')?.value;
         gradeBook.midGrade = this.form.get('midGrade')?.value;
         gradeBook.practicalGrade = this.form.get('practicalGrade')?.value;
         gradeBook.oralGrade = this.form.get('oralGrade')?.value;
         console.log(gradeBook);
         this.gradeBooks.push(gradeBook);
      });


      this.gradeBookManagementService.updateGradeBook(this.gradeBooks).subscribe(value => {
         this.snackBar.open('GradeBook Updated Successfully', undefined, {
            duration: 4000,
            panelClass: 'successSnackBar'
         });
      }, error => {
         this.snackBar.open('Failed To Update GradeBook', undefined, {duration: 4000});
      });
   }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }

}
