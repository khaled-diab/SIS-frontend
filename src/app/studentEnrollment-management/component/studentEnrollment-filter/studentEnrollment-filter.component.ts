import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
   StudentEnrollmentRequestModel
} from '../../../shared/model/studentEnrollment-management/student-enrollment-request-model';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {MajorModel} from '../../../shared/model/major-management/major-model';
import {StudyTypeModel} from '../../../shared/model/studyType-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {StudentEnrollmentManagementService} from '../../service/studentEnrollment-management.service';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';

@Component({
   selector: 'app-studentEnrollment-filter',
   templateUrl: './studentEnrollment-filter.component.html',
   styleUrls: ['./studentEnrollment-filter.component.css']
})
export class StudentEnrollmentFilterComponent implements OnInit, AfterViewInit {

   studentEnrollmentFilterModel: StudentEnrollmentRequestModel = new StudentEnrollmentRequestModel();

   constructor(private studentEnrollmentManagementService: StudentEnrollmentManagementService,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private majorService: StudentEnrollmentManagementService,
               private studyTypeService: StudentEnrollmentManagementService,
               private courseService: CourseManagementService,
               private sectionService: SectionManagementService) {
   }

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('majorSelect', {static: true}) majorSelect: MatSelect;
   @ViewChild('studyTypeSelect', {static: true}) studyTypeSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('sectionSelect', {static: true}) sectionSelect: MatSelect;

   colleges: CollegeModel[];
   departments: DepartmentModel[];
   academicYears: AcademicYear[];
   academicTerms: AcademicTermModel[];
   majors: MajorModel[];
   studyTypes: StudyTypeModel[];
   courses: CourseModel[];
   sections: SectionModel[];
   sectionRequestModel = new SectionRequestModel();

   ngOnInit(): void {
      this.academicYears = AcademicYearService.yearsList;
      this.academicYearSelect.value = AcademicTermService.currentTerm.academicYearDTO.id;
      this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
      this.academicTermSelect.value = AcademicTermService.currentTerm.id;

      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });

      this.studyTypeService.getAllStudyTypes().subscribe(Response => {
         this.studyTypes = Response;
      });
   }

   ngAfterViewInit(): void {
      this.academicYearSelect.valueChange.subscribe(value => {
         if (this.academicYearSelect.value !== undefined) {
            this.academicTermSelect.setDisabledState(false);
            this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
         } else {
            this.academicTermSelect.setDisabledState(true);
         }
         this.studentEnrollmentFilterModel.filterAcademicYear = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.academicTermSelect.valueChange.subscribe(value => {
         this.studentEnrollmentFilterModel.filterAcademicTerm = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
         this.studentEnrollmentFilterModel.filterCollege = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.departmentSelect.valueChange.subscribe(value => {
         if (this.departmentSelect.value !== undefined) {
            this.courseSelect.setDisabledState(false);
            this.majorSelect.setDisabledState(false);
            this.courseService.getCoursesByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.courses = value1;
            });
            this.majorService.getMajorsByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.majors = value1;
            });
         } else {
            this.courseSelect.setDisabledState(true);
            this.majorSelect.setDisabledState(true);
         }
         this.studentEnrollmentFilterModel.filterDepartment = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.courseSelect.valueChange.subscribe(value => {
         if (this.courseSelect.value !== undefined) {
            this.sectionSelect.setDisabledState(false);
            this.sectionService.getSectionsByCourse(this.courseSelect.value).subscribe(Response => {
               this.sections = Response;
               console.log(this.sections);
            });
         } else {
            this.sectionSelect.setDisabledState(true);
         }
         this.studentEnrollmentFilterModel.filterCourse = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.sectionSelect.valueChange.subscribe(value => {
         this.studentEnrollmentFilterModel.filterSection = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.majorSelect.valueChange.subscribe(value => {
         this.studentEnrollmentFilterModel.filterMajor = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

      this.studyTypeSelect.valueChange.subscribe(value => {
         this.studentEnrollmentFilterModel.filterStudyType = value;
         this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
      });

   }

   applyFilter(): void {
      this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
   }

   resetFilter(): void {
      this.academicYearSelect.value = undefined;
      this.academicTermSelect.value = undefined;
      this.academicTermSelect.setDisabledState(true);
      this.collegeSelect.value = undefined;
      this.departmentSelect.value = undefined;
      this.departmentSelect.setDisabledState(true);
      this.courseSelect.value = undefined;
      this.courseSelect.setDisabledState(true);
      this.sectionSelect.value = undefined;
      this.sectionSelect.setDisabledState(true);
      this.majorSelect.value = undefined;
      this.majorSelect.setDisabledState(true);
      this.studyTypeSelect.value = undefined;
      this.studentEnrollmentFilterModel = new StudentEnrollmentRequestModel();
      this.studentEnrollmentManagementService.studentEnrollmentFilterEvent.next(this.studentEnrollmentFilterModel);
   }
}
