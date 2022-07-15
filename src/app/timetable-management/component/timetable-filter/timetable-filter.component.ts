import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TimetableManagementService} from '../../service/timetable-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {TimetableRequestModel} from '../../../shared/model/timetable-management/timetable-request-model';
import {AcademicYear} from '../../../shared/model/academicYear-Management/academic-year';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {AcademicYearService} from '../../../academic-year-management/service/academic-year.service';
import {CourseModel} from '../../../shared/model/course-management/course-model';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {SectionModel} from '../../../shared/model/section-management/section-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {CourseManagementService} from '../../../course-management/service/course-management.service';
import {SectionManagementService} from '../../../section-management/service/sectionManagement.service';
import {Constants} from '../../../shared/constants';

@Component({
   selector: 'app-timetable-filter',
   templateUrl: './timetable-filter.component.html',
   styleUrls: ['./timetable-filter.component.css']
})
export class TimetableFilterComponent implements OnInit, AfterViewInit {

   constructor(private timetableManagementService: TimetableManagementService,
               private academicYearService: AcademicYearService,
               private academicTermService: AcademicTermService,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService,
               private courseService: CourseManagementService,
               private sectionService: SectionManagementService) {
   }

   timetableRequestModel: TimetableRequestModel = new TimetableRequestModel();
   @ViewChild('academicYearSelect', {static: true}) academicYearSelect: MatSelect;
   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;
   @ViewChild('courseSelect', {static: true}) courseSelect: MatSelect;
   @ViewChild('sectionSelect', {static: true}) sectionSelect: MatSelect;
   @ViewChild('daySelect', {static: true}) daySelect: MatSelect;

   colleges: CollegeModel[];
   departments: DepartmentModel[];
   academicYears: AcademicYear[];
   academicTerms: AcademicTermModel[];
   newAcademicTerms: AcademicTermModel[] = [];
   courses: CourseModel[];
   courseModelRequestModel = new CourseRequestModel();
   sections: SectionModel[];
   sectionRequestModel = new SectionRequestModel();
   days: string[] = Constants.Days;

   ngOnInit(): void {
      this.academicYears = AcademicYearService.yearsList;
      this.academicTerms = AcademicTermService.academicTermsList;
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
   }

   ngAfterViewInit(): void {
      this.academicYearSelect.valueChange.subscribe(value => {
         if (this.academicYearSelect.value !== undefined) {
            this.academicTermSelect.setDisabledState(false);
            this.academicTerms = this.academicTermService.getAcademicTermsByAcademicYears(this.academicYearSelect.value);
            // this.newAcademicTerms = [];
            // for (const academicTerm of this.academicTerms) {
            //    if (academicTerm.academicYearDTO.id === this.academicYearSelect.value) {
            //       this.newAcademicTerms.push(academicTerm);
            //    }
            // }
         } else {
            this.academicTermSelect.setDisabledState(true);
         }
         this.timetableRequestModel.filterAcademicYear = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });
      this.academicTermSelect.valueChange.subscribe(value => {
         this.timetableRequestModel.filterAcademicTerm = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });

      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
         this.timetableRequestModel.filterCollege = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });

      this.departmentSelect.valueChange.subscribe(value => {
         if (this.departmentSelect.value !== undefined) {
            this.courseSelect.setDisabledState(false);
            this.courseService.getCoursesByDepartment(this.departmentSelect.value).subscribe(value1 => {
               this.courses = value1;
            });
            // this.courseModelRequestModel.filterCollege = this.collegeSelect.value;
            // this.courseModelRequestModel.filterDepartment = this.departmentSelect.value;
            // this.courseService.getCoursePage(1, 500, this.courseModelRequestModel).subscribe(Response => {
            //    this.courses = Response.data;
            // });
         } else {
            this.courseSelect.setDisabledState(true);
         }
         this.timetableRequestModel.filterDepartment = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });

      this.courseSelect.valueChange.subscribe(value => {
         if (this.courseSelect.value !== undefined) {
            this.sectionSelect.setDisabledState(false);
            // this.sectionRequestModel.filterCourse = this.courseSelect.value;
            this.sectionService.getSectionsByCourse(this.courseSelect.value).subscribe(Response => {
               this.sections = Response;
            });
         } else {
            this.sectionSelect.setDisabledState(true);
         }
         this.timetableRequestModel.filterCourse = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });

      this.sectionSelect.valueChange.subscribe(value => {
         this.timetableRequestModel.filterSection = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });

      this.daySelect.valueChange.subscribe(value => {
         this.timetableRequestModel.filterDay = value;
         this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
      });
   }

   applyFilter(): void {
      this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
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
      this.daySelect.value = undefined;
      this.timetableRequestModel = new TimetableRequestModel();
      this.timetableManagementService.timetableFilterEvent.next(this.timetableRequestModel);
   }

}
