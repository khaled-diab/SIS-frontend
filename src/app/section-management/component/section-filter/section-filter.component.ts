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
import {PageRequest} from '../../../shared/model/page-request';
import {SectionManagementService} from '../../service/sectionManagement.service';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {SectionRequestModel} from '../../../shared/model/section-management/section-request-model';
import {StudyTypeModel} from '../../../shared/model/studyType-model';
import {MajorModel} from '../../../shared/model/major-model';
import {StudentEnrollmentManagementService} from '../../../studentEnrollment-management/service/studentEnrollment-management.service';

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
  newAcademicTerms: AcademicTermModel[] = [];
  courses: PageRequest<CourseModel>;
  newCourses: CourseModel[];
  studyTypes: StudyTypeModel[];
  majors: MajorModel[];
  newMajors: MajorModel[] = [];
  courseModelRequestModel = new CourseRequestModel();

  ngOnInit(): void {
    this.academicYearService.getAcademicYears().subscribe(Response => {
      this.academicYears = Response;
    });

    this.academicTermService.getAcademicTerms().subscribe(Response => {
      this.academicTerms = Response;
    });

    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });

    this.departmentService.getDepartments();

    this.majorService.getAllMajors().subscribe(Response => {
      this.majors = Response;
    });
    this.studyTypeService.getAllStudyTypes().subscribe(Response => {
      this.studyTypes = Response;
    });

  }

  ngAfterViewInit(): void {
    this.academicYearSelect.valueChange.subscribe(value => {
      if (this.academicYearSelect.value !== undefined) {
        this.newAcademicTerms = [];
        this.academicTermSelect.setDisabledState(false);
        for (const academicTerm of this.academicTerms) {
          if (academicTerm.academicYearDTO.id === this.academicYearSelect.value) {
            this.newAcademicTerms.push(academicTerm);
          }
        }
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
        this.courseModelRequestModel.filterCollege = this.collegeSelect.value;
        this.courseModelRequestModel.filterDepartment = this.departmentSelect.value;
        this.courseService.getCoursePage(1, 500, this.courseModelRequestModel).subscribe(Response => {
          this.courses = Response;
          console.log(this.courses.data);
          this.newCourses = this.courses.data;
          console.log(this.newCourses);
        });

        this.newMajors = [];
        this.majorSelect.setDisabledState(false);
        for (const major of this.majors) {
          if (major.departmentDTO.id === this.departmentSelect.value) {
            this.newMajors.push(major);
          }
        }
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
