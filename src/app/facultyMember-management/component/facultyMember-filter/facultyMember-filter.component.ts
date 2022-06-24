import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FacultyMemberManagementService} from '../../service/facultyMember-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {FacultyMemberRequestModel} from '../../../shared/model/facultyMember-management/facultyMember-request-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-facultyMember-filter',
  templateUrl: './facultyMember-filter.component.html',
  styleUrls: ['./facultyMember-filter.component.css']
})
export class FacultyMemberFilterComponent implements OnInit, AfterViewInit {
  facultyMemberFilterModel: FacultyMemberRequestModel = new FacultyMemberRequestModel();
  @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;

  colleges: CollegeModel[];
  departments: DepartmentModel[];

  constructor(private facultyMemberManagementService: FacultyMemberManagementService,
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
        this.departmentSelect.setDisabledState(true);
      }
      this.facultyMemberFilterModel.filterCollege = value;
      this.facultyMemberManagementService.facultyMemberFilterEvent.next(this.facultyMemberFilterModel);
    });

    this.departmentSelect.valueChange.subscribe(value => {
      this.facultyMemberFilterModel.filterDepartment = value;
      this.facultyMemberManagementService.facultyMemberFilterEvent.next(this.facultyMemberFilterModel);
    });

  }

  applyFilter(): void {
    this.facultyMemberManagementService.facultyMemberFilterEvent.next(this.facultyMemberFilterModel);
  }

  resetFilter(): void {
    this.collegeSelect.value = undefined;
    this.departmentSelect.value = undefined;
    this.departmentSelect.setDisabledState(true);
    this.facultyMemberFilterModel = new FacultyMemberRequestModel();
    this.facultyMemberManagementService.facultyMemberFilterEvent.next(this.facultyMemberFilterModel);
  }
}
