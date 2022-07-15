import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {SectionManagementService} from '../../service/sectionManagement.service';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {StudyTypeModel} from '../../../shared/model/studyType-model';
import {MajorModel} from '../../../shared/model/major-model';
import {
   StudentEnrollmentManagementService
} from '../../../studentEnrollment-management/service/studentEnrollment-management.service';

@Component({
   selector: 'app-section-filter',
   templateUrl: './section-filter.component.html',
   styleUrls: ['./section-filter.component.css']
})
export class SectionFilterComponent implements OnInit, AfterViewInit {

   sectionRequestModel: SectionRequestModel = new SectionRequestModel();

   constructor(private sectionManagementService: SectionManagementService,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private courseService: CourseManagementService,
               private studyTypeService: StudentEnrollmentManagementService,
               private majorService: StudentEnrollmentManagementService) {
   }

   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('studyTypeSelect', {static: true}) studyTypeSelect: MatSelect;
   @ViewChild('majorSelect', {static: true}) majorSelect: MatSelect;

   colleges: CollegeModel[];
   departments: DepartmentModel[];
   academicYears: AcademicYear[];
   academicTerms: AcademicTermModel[];
   courses: CourseModel[];
   studyTypes: StudyTypeModel[];
   majors: MajorModel[];

   ngOnInit(): void {
      this.academicYears = AcademicYearService.yearsList;

      this.academicTerms = AcademicTermService.academicTermsList;

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
         this.sectionRequestModel.filterAcademicYear = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

      this.academicTermSelect.valueChange.subscribe(value => {
         this.sectionRequestModel.filterAcademicTerm = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
         this.sectionRequestModel.filterCollege = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
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
         this.sectionRequestModel.filterDepartment = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

      this.courseSelect.valueChange.subscribe(value => {
         this.sectionRequestModel.filterCourse = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

      this.majorSelect.valueChange.subscribe(value => {
         this.sectionRequestModel.filterMajor = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

      this.studyTypeSelect.valueChange.subscribe(value => {
         this.sectionRequestModel.filterStudyType = value;
         this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
      });

   }

   applyFilter(): void {
      this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
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
      this.majorSelect.value = undefined;
      this.majorSelect.setDisabledState(true);
      this.studyTypeSelect.value = undefined;
      this.sectionRequestModel = new SectionRequestModel();
      this.sectionManagementService.sectionFilterEvent.next(this.sectionRequestModel);
   }

}
