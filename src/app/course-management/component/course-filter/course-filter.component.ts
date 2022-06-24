import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CourseManagementService} from '../../service/course-management.service';
import {CourseRequestModel} from '../../../shared/model/course-management/course-request-model';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {MatSelect} from '@angular/material/select';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit, AfterViewInit {
  courseRequestModel: CourseRequestModel = new CourseRequestModel();
  colleges: CollegeModel [];
  departments: DepartmentModel[];


  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;

  constructor(private courseManagementService: CourseManagementService,
              private collegeManagementService: CollegeManagementService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.collegeManagementService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });
    this.departmentService.getDepartments();
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined) {
        this.departmentSelect.setDisabledState(false);
        this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
      } else {
        this.resetFilter();
        this.departmentSelect.setDisabledState(true);
      }
      this.courseRequestModel.filterCollege = value;
      this.courseManagementService.courseFilterEvent.next(this.courseRequestModel);
    });

    this.departmentSelect.valueChange.subscribe(value => {
      this.courseRequestModel.filterDepartment = value;
      this.courseManagementService.courseFilterEvent.next(this.courseRequestModel);
    });
  }

  applyFilter(): void {
    this.courseManagementService.courseFilterEvent.next(this.courseRequestModel);
  }

  resetFilter(): void {
    this.collegeSelect.value = undefined;
    this.departmentSelect.value = undefined;
    this.departmentSelect.setDisabledState(true);
    this.courseRequestModel = new CourseRequestModel();
    this.courseManagementService.courseFilterEvent.next(this.courseRequestModel);
  }
}
