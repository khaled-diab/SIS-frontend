import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from '../../../shared/constants';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';
import {MatSelect} from '@angular/material/select';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';

@Component({
   selector: 'app-facultyMember-gradeBook-filter',
   templateUrl: './facultyMember-gradeBook-filter.component.html',
   styleUrls: ['./facultyMember-gradeBook-filter.component.css']
})
export class FacultyMemberGradeBookFilterComponent implements OnInit {

   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;

   facultyMember = new FacultyMemberModel();
   gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();
   academicTerms: AcademicTermModel[];
   courses: CourseModel[];

   constructor(private gradeBookManagementService: GradeBookManagementService,
               private courseService: CourseManagementService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.facultyMember = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.academicTerms = AcademicTermService.academicTermsList;
      this.academicTermSelect.value = AcademicTermService.currentTerm.id;
      this.courseService.getCoursesByFacultyMemberId(this.facultyMember.id).subscribe(value => {
         this.courses = value;
      });
      this.gradeBookRequestModel.filterFacultyMember = this.facultyMember.id;
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }

   ngAfterViewInit(): void {
      this.academicTermSelect.valueChange.subscribe(value => {
         this.gradeBookRequestModel.filterAcademicTerm = value;
         this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
      });
      this.courseSelect.valueChange.subscribe(value => {
         this.gradeBookRequestModel.filterCourse = value;
         this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
      });
   }

   applyFilter(): void {
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }
}
