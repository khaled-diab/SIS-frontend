import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from '../../../shared/constants';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';
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
   gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();
   academicTerms: AcademicTermModel[];
   courses: CourseModel[];

   constructor(private gradeBookManagementService: GradeBookManagementService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.student = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.academicTerms = AcademicTermService.academicTermsList;
      this.academicTermSelect.value = AcademicTermService.currentTerm.id;
      this.gradeBookRequestModel.filterStudent = this.student.id;
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }

   ngAfterViewInit(): void {
      this.academicTermSelect.valueChange.subscribe(value => {
         this.gradeBookRequestModel.filterAcademicTerm = value;
         this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
      });
   }

   applyFilter(): void {
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }
}
