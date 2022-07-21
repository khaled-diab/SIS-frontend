import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from '../../../shared/constants';
import {GradeBookService} from '../../service/gradeBook.service';
import {MatSelect} from '@angular/material/select';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {StudentModel} from '../../../shared/model/student-management/student-model';

@Component({
   selector: 'app-student-gradeBook-filter',
   templateUrl: './student-gradeBook-filter.component.html',
   styleUrls: ['./student-gradeBook-filter.component.css']
})
export class StudentGradeBookFilterComponent implements OnInit {

   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;

   student = new StudentModel();
   academicTerms: AcademicTermModel[];
   courses: CourseModel[];

   constructor(private gradeBookManagementService: GradeBookService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.student = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.academicTerms = AcademicTermService.academicTermsList;
   }

   ngAfterViewInit(): void {
      this.academicTermSelect.valueChange.subscribe(value => {
         this.gradeBookManagementService.gradeBookStudentRecordsFilterEvent.next([value, this.student.id]);
      });
   }
}
